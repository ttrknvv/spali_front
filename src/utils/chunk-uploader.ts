import FileService from 'api/FileService'

export class ChunkUploader {
  private files: File[] = []
  private currentFileIndex: number = -1
  private currentChunkIndex: number = 0
  private totalChunks: number
  private chunkSize: number
  public result: { isGood: boolean; nameFile?: string }[] = []
  private uniqueFileName: string
  private finishHandler: (results: { isGood: boolean; nameFile?: string }[]) => void = () => null

  public async upload(files: File[]) {
    this.files = files
    this.currentFileIndex = -1
    this.setNextCurrentFile()
  }

  public onFinish(handler: (results: { isGood: boolean; nameFile?: string }[]) => void) {
    this.finishHandler = handler
  }

  private setNextCurrentFile() {
    if (this.files && this.files.length > 0) {
      this.currentFileIndex += 1
      if (this.currentFileIndex < this.files.length) {
        this.uploadCurrentFile()
      } else {
        this.finishUploading()
      }
    }
  }

  private async uploadCurrentFile() {
    const file = this.files[this.currentFileIndex]
    try {
      if (file) {
        const { chunkSize, totalChunks, uniqueFileName } = (
          await FileService.startSession({ fileName: file.name, fileType: file.type, fileSize: file.size })
        ).data
        this.totalChunks = totalChunks
        this.chunkSize = chunkSize
        this.uniqueFileName = uniqueFileName
        if (totalChunks === 1) {
          await FileService.uploadFullFile(file)
          this.result.push({ isGood: true, nameFile: this.uniqueFileName })
          this.setNextCurrentFile()
        } else {
          this.currentChunkIndex = 0
          this.uploadCurrentChunk()
        }
      }
    } catch (e) {
      this.result.push({ isGood: false })
    }
  }

  private async uploadCurrentChunk() {
    const file = this.files[this.currentFileIndex]
    if (this.currentChunkIndex < this.totalChunks && file) {
      const reader = new FileReader()
      const from = this.currentChunkIndex * this.chunkSize
      const to = from + this.chunkSize
      const blob = file.slice(from, to)

      reader.onloadend = async (e) => {
        const data = e.target?.result as ArrayBuffer
        try {
          await FileService.uploadChunk(this.uniqueFileName, this.currentChunkIndex, data)
          this.currentChunkIndex += 1
          if (this.currentChunkIndex < this.totalChunks) {
            this.uploadCurrentChunk()
          } else {
            await FileService.endSession(this.uniqueFileName, this.totalChunks)
            this.result.push({ isGood: true, nameFile: this.uniqueFileName })
            this.setNextCurrentFile()
          }
        } catch (e) {
          FileService.endBadSession(this.uniqueFileName, this.currentChunkIndex)
          this.result.push({ isGood: false })
        }
      }
      reader.readAsArrayBuffer(blob)
    } else {
      this.setNextCurrentFile()
    }
  }

  private finishUploading() {
    if (this.finishHandler) {
      this.finishHandler(this.result)
    }
  }
}
