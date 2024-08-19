/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createExcelRecord = /* GraphQL */ `
  mutation CreateExcelRecord(
    $input: CreateExcelRecordInput!
    $condition: ModelExcelRecordConditionInput
  ) {
    createExcelRecord(input: $input, condition: $condition) {
      id
      name
      content
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateExcelRecord = /* GraphQL */ `
  mutation UpdateExcelRecord(
    $input: UpdateExcelRecordInput!
    $condition: ModelExcelRecordConditionInput
  ) {
    updateExcelRecord(input: $input, condition: $condition) {
      id
      name
      content
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteExcelRecord = /* GraphQL */ `
  mutation DeleteExcelRecord(
    $input: DeleteExcelRecordInput!
    $condition: ModelExcelRecordConditionInput
  ) {
    deleteExcelRecord(input: $input, condition: $condition) {
      id
      name
      content
      createdAt
      updatedAt
      __typename
    }
  }
`;
