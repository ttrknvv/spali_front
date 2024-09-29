import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Flex } from 'antd'
import CategorySelect from 'components/AllSelects/CategorySelect'
import SubCategorySelect from 'components/AllSelects/SubCategorySelect'
import Button from 'components/Button'
import InputControl from 'components/ControlElements/InputControl'
import useFormSubCategory from './hooks/useFormSubCategory'
import { MAX_LENGHT_CATEGORY_NAME, MAX_LENGHT_DESCRIPTION } from 'constants/schemesLimit'
import styles from '../../index.module.scss'

const FormSubCategory = () => {
  const { t } = useTranslation('catalog', { keyPrefix: 'form' })
  const { methods, onSave, onEdit, isEdit } = useFormSubCategory()

  const { watch, resetField } = methods

  return (
    <FormProvider {...methods}>
      <Flex gap={10} vertical>
        <CategorySelect style={{ width: '100%' }} onChange={() => resetField('subCategoryId')} needLabel requried />
        {isEdit && (
          <SubCategorySelect
            style={{ width: '100%' }}
            disabled={!watch('categoryId')}
            extraParams={{ categoryId: watch('categoryId') }}
            requried
            needLabel
          />
        )}
        <InputControl
          styleItem={{ margin: 0 }}
          name="name"
          label={isEdit ? t('newName') : t('subCategoryLabel')}
          placeholder={t('subCategoryPlaceholder')}
          disabled={isEdit ? !watch('subCategoryId') : !watch('categoryId')}
          maxLength={MAX_LENGHT_CATEGORY_NAME}
          required
        />
        <InputControl
          styleItem={{ margin: 0 }}
          name="description"
          label={isEdit ? t('newDescription') : t('descriptionLabel')}
          placeholder={t('descriptionPlaceholder')}
          disabled={isEdit ? !watch('subCategoryId') : !watch('categoryId')}
          maxLength={MAX_LENGHT_DESCRIPTION}
          type="textArea"
        />
      </Flex>

      <Flex style={{ marginTop: '40px' }} justify="flex-end">
        <Button onClick={isEdit ? onEdit : onSave} className={styles.buttonCreate}>
          {isEdit ? t('edit') : t('add')}
        </Button>
      </Flex>
    </FormProvider>
  )
}

export default FormSubCategory
