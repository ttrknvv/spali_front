import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Flex } from 'antd'
import CategorySelect from 'components/AllSelects/CategorySelect'
import Button from 'components/Button'
import CheckboxControl from 'components/ControlElements/CheckboxControl'
import InputControl from 'components/ControlElements/InputControl'
import useFormCategory from './hooks/useFormCategory'
import { MAX_LENGHT_CATEGORY_NAME } from 'constants/schemesLimit'
import styles from '../../index.module.scss'

const FormCategory = () => {
  const { t } = useTranslation('catalog', { keyPrefix: 'form' })
  const { methods, onSave, onEdit, isEdit } = useFormCategory()

  const { watch } = methods

  return (
    <FormProvider {...methods}>
      <Flex gap={10} className={styles.block} vertical>
        {isEdit && <CategorySelect style={{ width: '100%' }} needLabel requried />}
        <InputControl
          name="name"
          label={isEdit ? t('newName') : t('categoryLabel')}
          placeholder={t('categoryPlaceholder')}
          maxLength={MAX_LENGHT_CATEGORY_NAME}
          styleItem={{ marginBottom: '0' }}
          disabled={isEdit && !watch('categoryId')}
          required
        />
      </Flex>

      {!isEdit && <CheckboxControl name="isOnlySubcat" label={t('isOnlySubCatLabel')} layout="vertical" />}
      <Flex justify="flex-end">
        <Button
          onClick={isEdit ? onEdit : onSave}
          style={isEdit ? { marginTop: '40px' } : {}}
          className={styles.buttonCreate}>
          {isEdit ? t('edit') : t('add')}
        </Button>
      </Flex>
    </FormProvider>
  )
}

export default FormCategory
