// import Amplify, { API, graphqlOperation } from 'aws-amplify';
// import * as DocumentPicker from 'expo-document-picker';
// import * as FileSystem from 'expo-file-system';
// import * as XLSX from 'xlsx';

// export const convertRowsToDynamoDBFormat = (rows: any[], headers: string[]) => {
//   return rows.map((row) => {
//     return headers.reduce((acc, header, idx) => {
//       acc[header] = row[idx];
//       return acc;
//     }, {});
//   });
// };

// const pickExcelFile = async () => {
//   try {
//     const result = await DocumentPicker.getDocumentAsync({
//       type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
//     });

//     if (result.type === 'success') {
//       const fileContent = await FileSystem.readAsStringAsync(result.uri, {
//         encoding: FileSystem.EncodingType.Base64
//       });

//       const binary = atob(fileContent);
//       const workbook = XLSX.read(binary, { type: 'binary' });
//       const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//       const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

//       setExcelData(data);
//       await processExcelData(data);
//     }
//   } catch (error) {
//     console.error('Error reading Excel file:', error);
//   }
// };

// export const processExcelData = async (data: any[]) => {
//   const headers = data[0];
//   const rows = data.slice(1);

//   const schema = generateGraphQLSchema(headers);
//   await createDynamoDBTable(schema);
//   await insertDataIntoDynamoDB(rows, headers);
// };

// export const generateGraphQLSchema = (headers: string[]): string => {
//   const fields = headers.map((header) => `${header}: String`).join('\n');
//   return `
//       type ImportedData @model {
//         id: ID!
//         ${fields}
//       }
//     `;
// };

// const createDynamoDBTable = async (schema: string) => {
//   try {
//     await API.graphql(
//       graphqlOperation(`mutation {
//         createTable(input: { schema: "${schema}" }) {
//           tableArn
//         }
//       }`)
//     );
//     console.log('DynamoDB table created');
//   } catch (error) {
//     console.error('Error creating DynamoDB table:', error);
//   }
// };

// const insertDataIntoDynamoDB = async (rows: any[], headers: string[]) => {
//   try {
//     for (const row of rows) {
//       const inputData = headers.reduce((acc, header, idx) => {
//         acc[header] = row[idx];
//         return acc;
//       }, {});

//       await API.graphql(
//         graphqlOperation(`mutation {
//           createImportedData(input: ${JSON.stringify(inputData)}) {
//             id
//           }
//         }`)
//       );
//     }
//     console.log('Data inserted into DynamoDB');
//   } catch (error) {
//     console.error('Error inserting data into DynamoDB:', error);
//   }
// };
