/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getExcelRecord = /* GraphQL */ `
  query GetExcelRecord($id: ID!) {
    getExcelRecord(id: $id) {
      id
      name
      content
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listExcelRecords = /* GraphQL */ `
  query ListExcelRecords(
    $filter: ModelExcelRecordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listExcelRecords(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        content
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
