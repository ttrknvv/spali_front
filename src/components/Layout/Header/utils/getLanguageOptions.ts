import { DefaultOptionType } from 'antd/es/select'

const getLanguageOptions = () => {
  const options: DefaultOptionType[] = [
    { value: 'RU', label: 'RU' },
    { value: 'BE', label: 'BE' },
  ]

  return options
}

export default getLanguageOptions
