import { CSSProperties, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SelectControl from 'components/ControlElements/SelectControl'
import { api } from 'api/apiSpali'
import { ICategory } from 'models/Category'

interface ISubCategorySelectProps {
  fieldName?: string
  defaultValue?: string | number
  requried?: boolean
  disabled?: boolean
  needLabel?: boolean
  extraParams?: any
  allowClear?: boolean
  onChange?: (value: any) => void
  style?: CSSProperties
}

const SubCategorySelect = ({
  fieldName = 'subCategoryId',
  requried,
  needLabel,
  allowClear,
  disabled,
  onChange,
  extraParams,
  defaultValue,
  style,
}: ISubCategorySelectProps) => {
  const { t } = useTranslation('', { keyPrefix: 'select' })

  const [subCategories, setSubCategories] = useState<ICategory[]>([])

  const loadSubCategories = async () => {
    const subCategoriesRes = await api.getSubCategories(extraParams)
    setSubCategories(subCategoriesRes.data)
  }

  const renderOptions = () => {
    return subCategories.map(({ id, name }) => ({ label: name, value: id }))
  }

  return (
    <SelectControl
      name={fieldName}
      optionFilterProp="label"
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
      }
      required={requried}
      label={needLabel ? t('label.subCategory') : undefined}
      placeholder={t('placeholder.subCategory')}
      options={renderOptions()}
      onFocus={loadSubCategories}
      allowClear={allowClear}
      layout="vertical"
      onChange={onChange}
      defaultValue={defaultValue}
      disabled={disabled}
      style={style}
    />
  )
}

export default SubCategorySelect
