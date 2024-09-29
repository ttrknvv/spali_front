import { useSearchParams } from 'react-router-dom'
import { Flex } from 'antd'
import ItemCourse from 'components/ItemCourse'
import ListCourses from 'components/ListCourses'
import Pagination from 'components/Pagination'
import SearchForm from 'components/SearchForm'
import styles from './index.module.scss'

const Courses = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <Flex className={styles.root} gap={40} vertical>
      <Flex gap={20} vertical>
        <div className={styles.title}>Java</div>
        <div className={styles.description}>
          Курсы программирования на Java для новичков и опытных разработчиков. Вы сможете освоить создание приложений,
          разработку веб-сайтов и создание игр.
        </div>
      </Flex>
      <SearchForm />
      <ListCourses className={styles.list}>
        <ItemCourse />
        <ItemCourse />
        <ItemCourse />
        <ItemCourse />
        <ItemCourse />
      </ListCourses>
      <Pagination
        className={styles.pagination}
        pageSize={10}
        defaultCurrent={1}
        total={200}
        current={Number(searchParams.get('page')) || 1}
        onChange={(page) =>
          setSearchParams((prev) => {
            prev.set('page', String(page))
            return prev
          })
        }
      />
    </Flex>
  )
}

export default Courses
