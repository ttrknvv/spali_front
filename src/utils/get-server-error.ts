import axios from 'axios'

const getServerError = async (error: any) => {
  if (axios.isAxiosError(error) && error.response) {
    const { data } = error.response
    const isJsonBlob = data instanceof Blob && data.type === 'application/json'
    const responseData = isJsonBlob ? await data.text() : data || {}
    const responseJson: Record<string, any> = typeof responseData === 'string' ? JSON.parse(responseData) : responseData

    if (typeof responseJson.errorMessage === 'string') {
      return new Error(responseJson.errorMessage)
    }
  }

  if (error instanceof Error) {
    return error
  }

  return new Error('Неизвестная ошибка')
}

export default getServerError
