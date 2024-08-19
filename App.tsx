// src/index.tsx

import React from 'react';
import { registerRootComponent } from 'expo';
import ExcelUploader from './src/components/ExcelUploader';
import withExcelProcessor from './src/high_order_components/withExcelProcessor';

const ExcelUploaderWithProcessor = withExcelProcessor(ExcelUploader);

const App = () => {
  return <ExcelUploaderWithProcessor />;
};

registerRootComponent(App);
