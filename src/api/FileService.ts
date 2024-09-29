import { $api } from './api'
import { IUploadStartFile, IUploadStartResult } from 'models/Files'

export default class FileService {
  static startSession(data: IUploadStartFile) {
    return $api.post<IUploadStartResult>('file/chunkupload/start', data)
  }
  static async uploadChunk(nameFile: string, indexChunk: number, data: ArrayBuffer) {
    return $api.post(`file/chunkupload/${nameFile}`, data, {
      params: { chunkIndex: indexChunk },
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    })
  }
  static async endSession(nameFile: string, totalChunk: number) {
    return $api.post(`file/chunkupload/${nameFile}/finalize`, null, { params: { totalChunk } })
  }
  static async endBadSession(nameFile: string, totalChunk: number) {
    return $api.post(`file/chunkupload/${nameFile}/badfinalize`, null, { params: { totalChunk } })
  }
  static async uploadFullFile(file: File) {
    const data = new FormData()
    data.append('file', file)

    return $api.post(`file/uploadfull`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
}
