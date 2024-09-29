import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Flex } from 'antd'
import CategorySelect from 'components/AllSelects/CategorySelect'
import SubCategorySelect from 'components/AllSelects/SubCategorySelect'
import TopicSelect from 'components/AllSelects/TopicSelect'
import Button from 'components/Button'
import FileControl from 'components/ControlElements/FileControl'
import InputControl from 'components/ControlElements/InputControl'
import useFormTopic from './hooks/useFormTopic'
import { MAX_LENGHT_DESCRIPTION, MAX_LENGHT_TOPIC_NAME } from 'constants/schemesLimit'
import styles from '../../index.module.scss'

const FormTopic = () => {
  const { t } = useTranslation('catalog', { keyPrefix: 'form' })
  const { methods, onSave, isEdit, onEdit } = useFormTopic()

  const { watch, resetField } = methods

  return (
    <FormProvider {...methods}>
      <Flex gap={10} vertical>
        <CategorySelect
          style={{ width: '100%' }}
          onChange={() => {
            resetField('subCategoryId')
            resetField('topicId')
          }}
          extraParams={{ isOnlySubcat: false }}
          needLabel
          requried
        />
        <SubCategorySelect
          style={{ width: '100%' }}
          disabled={!watch('categoryId')}
          extraParams={{ categoryId: watch('categoryId') }}
          onChange={() => resetField('topicId')}
          needLabel
          requried
        />
        {isEdit && (
          <TopicSelect
            style={{ width: '100%' }}
            disabled={!watch('subCategoryId')}
            extraParams={{ subCategoryId: watch('subCategoryId') }}
            requried
            needLabel
          />
        )}
        <InputControl
          name="name"
          label={isEdit ? t('newName') : t('topicLabel')}
          placeholder={t('topicPlaceholder')}
          maxLength={MAX_LENGHT_TOPIC_NAME}
          styleItem={{ marginBottom: '0' }}
          disabled={!watch('subCategoryId')}
          required
        />
        <InputControl
          name="description"
          label={isEdit ? t('newDescription') : t('descriptionLabel')}
          placeholder={t('descriptionPlaceholder')}
          maxLength={MAX_LENGHT_DESCRIPTION}
          disabled={!watch('subCategoryId')}
          type="textArea"
        />
        <FileControl disabled={!watch('subCategoryId')} label={t('fileLabel')} />
      </Flex>
      <Flex style={{ marginTop: '10px' }} justify="flex-end">
        <Button onClick={isEdit ? onEdit : onSave} className={styles.buttonCreate}>
          {isEdit ? t('edit') : t('add')}
        </Button>
      </Flex>
    </FormProvider>
  )
}

export default FormTopic
