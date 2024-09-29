import { useCallback, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { ModalContext } from 'contexts/ModalContext'
import FormsCreateUpdate from '../components/FormsCreateUpdate'
import useDataLoader from 'hooks/useDataLoader'
import { api } from 'api/apiSpali'
import { PAGE_SIZE } from '../constants/constants'

const useCatalog = () => {
  const methods = useForm()
  const [searchParams, setSearchParams] = useSearchParams()
  const { setModal, setOpen } = useContext(ModalContext)
  const { loadData, res, loading } = useDataLoader(api.getCategoriesListRecursive)

  const { t } = useTranslation('catalog', { keyPrefix: 'form' })

  const onChangeCategory = (categoryId: string) => {
    setSearchParams(
      (prev) => {
        if (categoryId) {
          prev.set('categoryId', categoryId)
        } else {
          prev.delete('categoryId')
        }
        return prev
      },
      { preventScrollReset: true, replace: true },
    )
  }

  const onClickAdd = () => {
    setModal({
      children: <FormsCreateUpdate reloadPage={loadRecursiveList} />,
      title: <span style={{ fontSize: '20px' }}>{t('title')}</span>,
    })
    setOpen(true)
  }

  const onClickEdit = () => {
    setModal({
      children: <FormsCreateUpdate reloadPage={loadRecursiveList} isEdit />,
      title: <span style={{ fontSize: '20px' }}>{t('titleEdit')}</span>,
    })
    setOpen(true)
  }

  const loadRecursiveList = useCallback(() => {
    loadData({ ...Object.fromEntries(searchParams), pageSize: PAGE_SIZE })
  }, [searchParams])

  useEffect(() => {
    loadRecursiveList()
  }, [searchParams])

  return {
    methods,
    onChangeCategory,
    searchParams,
    setSearchParams,
    onClickAdd,
    loading: loading,
    data: res?.data,
    onClickEdit,
  }
}

export default useCatalog
