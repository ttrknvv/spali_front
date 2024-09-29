export interface IUploadStartFile {
  fileName: string
  fileType: string
  fileSize: number
}

export interface IUploadStartResult {
  uniqueFileName: string
  chunkSize: number
  totalChunks: number
}
