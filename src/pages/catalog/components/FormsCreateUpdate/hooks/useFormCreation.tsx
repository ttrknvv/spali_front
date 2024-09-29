import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { TabsProps } from 'antd'
import FormCategory from '../components/FormCategory'
import FormSubCategory from '../components/FormSubCategory'
import FormTopic from '../components/FormTopic'

const useFormCreation = () => {
  const { t } = useTranslation('catalog', { keyPrefix: 'form' })

  const items: TabsProps['items'] = useMemo(
    () => [
      {
        label: t('categoryTitle'),
        key: '1',
        children: <FormCategory />,
      },
      {
        label: t('subCategoryTitle'),
        key: '2',
        children: <FormSubCategory />,
      },
      {
        label: t('topicTitle'),
        key: '3',
        children: <FormTopic />,
      },
    ],
    [],
  )

  return { items }
}

export default useFormCreation
