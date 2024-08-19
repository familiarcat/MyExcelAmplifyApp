// src/components/ExcelUploader.tsx

import React from 'react';
import { View, Button, Text, StyleSheet, FlatList } from 'react-native';
import { ExcelProcessorProps } from '../high_order_components/withExcelProcessor';

const ExcelUploader: React.FC<ExcelProcessorProps> = ({
  pickExcelFile,
  excelData
}) => {
  return (
    <View style={styles.container}>
      <Button title='Pick Excel File' onPress={pickExcelFile} />
      <FlatList
        data={excelData}
        renderItem={({ item }) => <Text>{JSON.stringify(item)}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <Text>Upload and process your Excel file.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ExcelUploader;
