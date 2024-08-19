// src/types/DocumentPickerTypes.ts

export interface CustomDocumentPickerResult {
  type?: string | null; // Optional type property
  uri?: string | null; // Optional uri property
}

export interface CustomDocumentPickerSuccessResult
  extends CustomDocumentPickerResult {
  name?: string; // Optional file name property
  size?: number; // Optional file size property
  mimeType?: string; // Optional MIME type property
}

export interface CustomDocumentPickerErrorResult {
  message?: string | null; // Optional error message
}
