// // src/tests/ExcelUploaderWithProcessor.test.tsx

// import React from 'react';
// import { render, fireEvent, waitFor } from '@testing-library/react-native';
// import { Text } from 'react-native';
// import ExcelUploader from '../components/ExcelUploader';
// import withExcelProcessor from '../high_order_components/withExcelProcessor';

// // Define a mock component that uses the ExcelProcessorProps interface
// interface ExcelProcessorProps {
//   pickExcelFile: () => Promise<void>;
//   excelData: any[];
// }

// const MockExcelUploader: React.FC<ExcelProcessorProps> = ({
//   pickExcelFile,
//   excelData
// }) => (
//   <React.Fragment>
//     <ExcelUploader pickExcelFile={pickExcelFile} />
//     {excelData.map((row: any, index: any) => (
//       <Text key={index}>{JSON.stringify(row)}</Text>
//     ))}
//   </React.Fragment>
// );

// // Correct usage of creating the HOC-wrapped component
// const ExcelUploaderWithProcessor: typeof ExcelUploaderWithProcessor =
//   withExcelProcessor(MockExcelUploader);

// describe('ExcelUploaderWithProcessor', () => {
//   it('renders correctly', () => {
//     const { getByText } = render(
//       <ExcelUploaderWithProcessor
//         excelData={[]} // Add the excelData prop
//         pickExcelFile={async () => {}}
//       />
//     );
//     expect(getByText('Pick Excel File')).toBeTruthy();
//   });

//   it('processes and displays Excel data', async () => {
//     const mockExcelData = [
//       ['Name', 'Age', 'City'],
//       ['John Doe', '30', 'New York'],
//       ['Jane Smith', '25', 'Los Angeles']
//     ];

//     const mockProcessExcelData = jest.fn(async () => {
//       return mockExcelData.slice(1);
//     });

//     const { getByText } = render(
//       <ExcelUploaderWithProcessor
//         pickExcelFile={mockProcessExcelData}
//         excelData={mockExcelData.slice(1)} // Pass the data rows excluding the header
//       />
//     );

//     // Simulate the user pressing the "Pick Excel File" button
//     const pickExcelFileButton = getByText('Pick Excel File');
//     fireEvent.press(pickExcelFileButton);

//     await waitFor(() => {
//       expect(
//         getByText(JSON.stringify(['John Doe', '30', 'New York']))
//       ).toBeTruthy();
//       expect(
//         getByText(JSON.stringify(['Jane Smith', '25', 'Los Angeles']))
//       ).toBeTruthy();
//     });
//   });
// });
