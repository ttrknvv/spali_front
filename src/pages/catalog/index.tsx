import { ChangeEvent } from 'react'
import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Flex } from 'antd'
import CategoryBlock from './components/CategoryBlock'
import CategorySelect from 'components/AllSelects/CategorySelect'
import Button from 'components/Button'
import Empty from 'components/Empty'
import Feather from 'components/Feather'
import Pagination from 'components/Pagination'
import Spinner from 'components/Spinner'
import UserCan from 'components/UserCan'
import useCatalog from './hooks/useCatalog'
import { Actions, Components } from 'enums/permissions'
import { ChunkUploader } from 'utils/chunk-uploader'
import { PAGE_SIZE } from './constants/constants'
import styles from './index.module.scss'

const Catalog = () => {
  const { t } = useTranslation('catalog')
  const { methods, onChangeCategory, searchParams, setSearchParams, onClickAdd, loading, data, onClickEdit } =
    useCatalog()

  const onChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const uploader = new ChunkUploader()
    await uploader.upload([event.target.files[0]])
    console.log(uploader.result)
  }

  return (
    <Flex gap={40} vertical>
      <Flex align="center" justify="space-between">
        <Flex align="center" gap={18}>
          <span className={styles.header}>{t('title')}</span>
          <UserCan action={Actions.WRITE} component={Components.CATALOG}>
            <Button
              colorScheme="text"
              icon={<Feather type="plusIcon" />}
              className={styles.actionButton}
              onClick={onClickAdd}
            />
            <Button
              colorScheme="text"
              icon={<Feather type="editIcon" className={styles.editIcon} />}
              className={styles.actionButton}
              onClick={onClickEdit}
            />
          </UserCan>
        </Flex>
        <FormProvider {...methods}>
          <CategorySelect
            onChange={onChangeCategory}
            defaultValue={Number(searchParams.get('categoryId'))}
            allowClear
          />
        </FormProvider>
      </Flex>

      {loading || !data ? (
        <Flex align="center" className={styles.loadingContainer}>
          <Spinner />
        </Flex>
      ) : data?.items.length > 0 ? (
        data.items.map((item, idx) => <CategoryBlock data={item} key={idx} />)
      ) : (
        <Empty />
      )}
      {!searchParams.has('categoryId') && (
        <Pagination
          className={styles.pagination}
          pageSize={PAGE_SIZE}
          defaultCurrent={1}
          total={data?.totalCount}
          current={data?.pageNumber || 1}
          onChange={(page) =>
            setSearchParams((prev) => {
              prev.set('page', String(page))
              return prev
            })
          }
        />
      )}
    </Flex>
  )
}

export default Catalog
