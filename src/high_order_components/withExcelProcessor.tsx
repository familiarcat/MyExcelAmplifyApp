import React, { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as XLSX from 'xlsx';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import {
  CustomDocumentPickerSuccessResult,
  CustomDocumentPickerResult
} from '../types/DocumentPickerTypes';

export interface ExcelProcessorProps {
  pickExcelFile: () => Promise<void>;
  excelData: any[];
}

export interface DynamoDBData {
  [key: string]: string | number | null; // Allow null values
}

const withExcelProcessor = <P extends ExcelProcessorProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  const HOC: React.FC<Omit<P, keyof ExcelProcessorProps>> = (props) => {
    const [excelData, setExcelData] = useState<any[]>([]);

    const pickExcelFile = async () => {
      try {
        const result: CustomDocumentPickerResult =
          await (DocumentPicker.getDocumentAsync({
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          }) as Promise<CustomDocumentPickerResult>);

        if (result.type === 'success') {
          const successResult = result as CustomDocumentPickerSuccessResult;

          if (successResult.uri) {
            const fileContent = await FileSystem.readAsStringAsync(
              successResult.uri,
              {
                encoding: FileSystem.EncodingType.Base64
              }
            );

            const binary = atob(fileContent);
            const workbook = XLSX.read(binary, { type: 'binary' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            setExcelData(data);
            await processExcelData(data);
          } else {
            console.error('No URI found in the document picker result');
          }
        } else {
          console.error('Document picker result was not successful');
        }
      } catch (error) {
        console.error('Error reading Excel file:', error);
      }
    };

    const processExcelData = async (data: any[]) => {
      const headers = data[0];
      const rows = data.slice(1);

      const schema = generateGraphQLSchema(headers);
      await createDynamoDBTable(schema);
      await insertDataIntoDynamoDB(rows, headers);
    };

    const generateGraphQLSchema = (headers: string[]): string => {
      const fields = headers.map((header) => `${header}: String`).join('\n');
      return `
        type ImportedData @model {
          id: ID!
          ${fields}
        }
      `;
    };

    const createDynamoDBTable = async (schema: string) => {
      try {
        await API.graphql(
          graphqlOperation(`mutation {
            createTable(input: { schema: "${schema}" }) {
              tableArn
            }
          }`)
        );
        console.log('DynamoDB table created');
      } catch (error) {
        console.error('Error creating DynamoDB table:', error);
      }
    };

    const insertDataIntoDynamoDB = async (rows: any[], headers: string[]) => {
      try {
        for (const row of rows) {
          const inputData: DynamoDBData = headers.reduce(
            (acc: DynamoDBData, header, idx) => {
              acc[header] = row[idx] || null; // Handle potential undefined values
              return acc;
            },
            {}
          );

          await API.graphql(
            graphqlOperation(`mutation {
              createImportedData(input: ${JSON.stringify(inputData)}) {
                id
              }
            }`)
          );
        }
        console.log('Data inserted into DynamoDB');
      } catch (error) {
        console.error('Error inserting data into DynamoDB:', error);
      }
    };

    return (
      <WrappedComponent
        {...(props as P)}
        pickExcelFile={pickExcelFile}
        excelData={excelData}
      />
    );
  };

  return HOC;
};

export default withExcelProcessor;
