import { Pagination as AntdPagination, PaginationProps } from 'antd'
import Button from '../Button'
import Feather from 'components/Feather'
import styles from './index.module.scss'

const Pagination = ({ className, ...props }: PaginationProps) => (
  <AntdPagination
    showSizeChanger={false}
    className={`${styles.pagination} ${className}`}
    hideOnSinglePage
    itemRender={(_, type, originalElement) => {
      switch (type) {
        case 'prev':
          return (
            <Button type="text">
              <Feather type="paginationArrowLeft" />
            </Button>
          )
        case 'next':
          return (
            <Button type="text">
              <Feather type="paginationArrowRight" />
            </Button>
          )
        default:
          return originalElement
      }
    }}
    {...props}
  />
)

export default Pagination
