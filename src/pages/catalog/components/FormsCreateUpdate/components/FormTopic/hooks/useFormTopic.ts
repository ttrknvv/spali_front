import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { ModalContext } from 'contexts/ModalContext'
import { NotificationContext } from 'contexts/NotificationContext'
import { TopicScheme, topicValidationSheme } from 'schemes/categories'
import { useFormCatalogContext } from '../../../context'
import { api } from 'api/apiSpali'
import { ChunkUploader } from 'utils/chunk-uploader'

const useFormTopic = () => {
  const methods = useForm<TopicScheme>({ resolver: yupResolver(topicValidationSheme) })
  const { notification } = useContext(NotificationContext)
  const { t } = useTranslation('catalog', { keyPrefix: 'notification' })
  const { setOpen } = useContext(ModalContext)
  const { reloadPage, isEdit } = useFormCatalogContext()

  const { handleSubmit, setValue } = methods

  useEffect(() => {
    setValue('_isEdit', isEdit)
  }, [isEdit])

  const onEditTopic = async (data: TopicScheme) => {
    try {
      const { topicId, ...newData } = data
      await api.editTopic(newData, topicId)
      notification.success({ message: t('success.titleEdit'), description: t('success.topicEdit') })
      reloadPage()
      setOpen(false)
    } catch (e) {
      notification.error({ message: t('error.titleEdit'), description: t('error.topicEdit') })
    }
  }

  const onSaveTopic = async (data: TopicScheme) => {
    try {
      const { file, ...creationData } = data
      const uploader = new ChunkUploader()
      uploader.onFinish(async (result) => {
        if (result[0].isGood) {
          await api.createTopic(data.subCategoryId, { ...creationData, fileName: result[0].nameFile })
          notification.success({ message: t('success.titleCreate'), description: t('success.topicCreate') })
          reloadPage()
          setOpen(false)
        }
      })
      uploader.upload([file as File])
      console.log(file)
    } catch (e) {
      notification.error({ message: t('error.titleCreate'), description: t('error.topicCreate') })
    }
  }

  return {
    methods,
    onSave: handleSubmit(onSaveTopic),
    onEdit: handleSubmit(onEditTopic),
    isEdit,
  }
}

export default useFormTopic
