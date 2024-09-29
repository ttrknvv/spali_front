import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

const useMenuFilter = () => {
  const methods = useForm()
  const [searchParams, setSearchParams] = useSearchParams()

  const { getValues, setValue } = methods

  const onChangeSearch = (name: string) => {
    const value = getValues(name)
    setSearchParams(
      (prev) => {
        if (value) {
          prev.set(name, value)
        } else {
          prev.delete(name)
        }
        return prev
      },
      { replace: true, preventScrollReset: true },
    )
  }

  return { methods, onChangeSearch }
}

export default useMenuFilter
