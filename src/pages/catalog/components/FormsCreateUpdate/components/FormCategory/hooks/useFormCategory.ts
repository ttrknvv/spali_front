import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { ModalContext } from 'contexts/ModalContext'
import { NotificationContext } from 'contexts/NotificationContext'
import { CategoryScheme, categoryValidationScheme } from 'schemes/categories'
import { useFormCatalogContext } from '../../../context'
import { api } from 'api/apiSpali'

const useFormCategory = () => {
  const methods = useForm<CategoryScheme>({ resolver: yupResolver(categoryValidationScheme) })
  const { notification } = useContext(NotificationContext)
  const { t } = useTranslation('catalog', { keyPrefix: 'notification' })
  const { setOpen } = useContext(ModalContext)
  const { reloadPage, isEdit } = useFormCatalogContext()

  const { handleSubmit, setValue } = methods

  useEffect(() => {
    setValue('_isEdit', isEdit)
  }, [isEdit])

  const onEditCategory = async (data: CategoryScheme) => {
    try {
      const { categoryId, ...newData } = data
      await api.editCategory(newData, categoryId)
      reloadPage()
      notification.success({ message: t('success.titleEdit'), description: t('success.categoryEdit') })
      setOpen(false)
    } catch (e) {
      notification.error({ message: t('error.titleEdit'), description: t('error.categoryEdit') })
    }
  }

  const onSaveCategory = async (data: CategoryScheme) => {
    try {
      await api.createCategory(data)
      reloadPage()
      notification.success({ message: t('success.titleCreate'), description: t('success.categoryCreate') })
      setOpen(false)
    } catch (e) {
      notification.error({ message: t('error.titleCreate'), description: t('error.categoryCreate') })
    }
  }

  return { methods, onSave: handleSubmit(onSaveCategory), onEdit: handleSubmit(onEditCategory), isEdit }
}

export default useFormCategory
