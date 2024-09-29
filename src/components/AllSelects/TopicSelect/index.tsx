import { CSSProperties, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SelectControl from 'components/ControlElements/SelectControl'
import { api } from 'api/apiSpali'
import { ITopic } from 'models/Category'

interface ITopicSelectProps {
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

const TopicSelect = ({
  fieldName = 'topicId',
  requried,
  needLabel,
  allowClear,
  disabled,
  onChange,
  extraParams,
  defaultValue,
  style,
}: ITopicSelectProps) => {
  const { t } = useTranslation('', { keyPrefix: 'select' })

  const [subCategories, setSubCategories] = useState<ITopic[]>([])

  const loadSubCategories = async () => {
    const subCategoriesRes = await api.getTopics(extraParams)
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
      label={needLabel ? t('label.topic') : undefined}
      placeholder={t('placeholder.topic')}
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

export default TopicSelect
