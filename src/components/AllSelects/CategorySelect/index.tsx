import { CSSProperties, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SelectControl from 'components/ControlElements/SelectControl'
import { api } from 'api/apiSpali'
import { ICategory } from 'models/Category'

interface ICategorySelectProps {
  fieldName?: string
  defaultValue?: string | number
  requried?: boolean
  needLabel?: boolean
  allowClear?: boolean
  extraParams?: any
  onChange?: (value: any) => void
  style?: CSSProperties
}

const CategorySelect = ({
  fieldName = 'categoryId',
  requried,
  needLabel,
  allowClear,
  onChange,
  extraParams,
  defaultValue,
  style,
}: ICategorySelectProps) => {
  const { t } = useTranslation('', { keyPrefix: 'select' })

  const [categories, setCategories] = useState<ICategory[]>([])

  const loadCategories = async () => {
    const categories = await api.getCategories(extraParams)
    setCategories(categories.data)
  }

  const renderOptions = () => {
    return categories.map(({ id, name }) => ({ label: name, value: id }))
  }

  useEffect(() => {
    loadCategories()
  }, [])

  return (
    <SelectControl
      name={fieldName}
      optionFilterProp="label"
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
      }
      required={requried}
      label={needLabel ? t('label.category') : undefined}
      placeholder={t('placeholder.category')}
      options={renderOptions()}
      allowClear={allowClear}
      layout="vertical"
      onChange={onChange}
      defaultValue={defaultValue}
      style={style}
    />
  )
}

export default CategorySelect
