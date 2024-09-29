import { useState, useEffect, useCallback } from 'react'
import { AxiosResponse, AxiosError } from 'axios'
import getServerError from 'utils/get-server-error'

const useDataLoader = <P = unknown, Data = unknown>(
  loadFunc: (params: P) => Promise<AxiosResponse<Data>>,
  params?: P,
) => {
  const [loading, setLoading] = useState(false)
  const [res, setRes] = useState<Awaited<ReturnType<typeof loadFunc>>>()
  const [error, setError] = useState<AxiosError>()

  const loadData = useCallback(
    async (...params: Parameters<typeof loadFunc>) => {
      setRes(undefined)
      setError(undefined)
      setLoading(true)

      try {
        const resp = await loadFunc(...params)
        setRes(resp)
      } catch (e) {
        console.error(e)
        const error = await getServerError(e)
        setError(error as AxiosError)
      } finally {
        setLoading(false)
      }
    },
    [loadFunc],
  )

  useEffect(() => {
    if (params) {
      loadData(params)
    }
  }, [params])

  return { loadData, loading, res, error }
}

export default useDataLoader
