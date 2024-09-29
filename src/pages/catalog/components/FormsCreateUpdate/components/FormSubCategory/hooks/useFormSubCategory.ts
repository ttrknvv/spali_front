import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { ModalContext } from 'contexts/ModalContext'
import { NotificationContext } from 'contexts/NotificationContext'
import { SubCategoryScheme, subCategoryValidationSheme } from 'schemes/categories'
import { useFormCatalogContext } from '../../../context'
import { api } from 'api/apiSpali'

const useFormSubCategory = () => {
  const methods = useForm<SubCategoryScheme>({ resolver: yupResolver(subCategoryValidationSheme) })
  const { notification } = useContext(NotificationContext)
  const { t } = useTranslation('catalog', { keyPrefix: 'notification' })
  const { setOpen } = useContext(ModalContext)
  const { reloadPage, isEdit } = useFormCatalogContext()

  const { handleSubmit, setValue } = methods

  useEffect(() => {
    setValue('_isEdit', isEdit)
  }, [isEdit])

  const onEditSubCategory = async (data: SubCategoryScheme) => {
    try {
      const { subCategoryId, ...newData } = data
      await api.editSubCategory(newData, subCategoryId)
      notification.success({ message: t('success.titleEdit'), description: t('success.subCategoryEdit') })
      reloadPage()
      setOpen(false)
    } catch (e) {
      notification.error({ message: t('error.titleEdit'), description: t('error.subCategoryEdit') })
    }
  }

  const onSaveSubCategory = async (data: SubCategoryScheme) => {
    try {
      await api.createSubCategory(data.categoryId, data)
      notification.success({ message: t('success.titleCreate'), description: t('success.subCategoryCreate') })
      reloadPage()
      setOpen(false)
    } catch (e) {
      notification.error({ message: t('error.titleCreate'), description: t('error.subCategoryCreate') })
    }
  }

  return { methods, onSave: handleSubmit(onSaveSubCategory), onEdit: handleSubmit(onEditSubCategory), isEdit }
}

export default useFormSubCategory
