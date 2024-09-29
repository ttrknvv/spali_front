import { useTranslation } from 'react-i18next'
import { Flex } from 'antd'
import CardAuthor from 'components/CardAuthor'
import ListBasisCourse from 'components/ListBasisCourse'
import styles from './index.module.scss'

const BlockAuthorCourses = () => {
  const { t } = useTranslation('home', { keyPrefix: 'blockAuthors' })

  return (
    <Flex gap={40} align="center" className={styles.root} vertical>
      <div className={styles.header}>{t('title')}</div>
      <ListBasisCourse>
        <CardAuthor />
        <CardAuthor />
        <CardAuthor />
        <CardAuthor />
        <CardAuthor />
      </ListBasisCourse>
    </Flex>
  )
}

export default BlockAuthorCourses
