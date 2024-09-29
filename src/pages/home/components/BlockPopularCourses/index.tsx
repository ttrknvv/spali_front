import { useTranslation } from 'react-i18next'
import { Flex } from 'antd'
import CardCourses from 'components/CardCourse'
import ListBasisCourse from 'components/ListBasisCourse'
import styles from './index.module.scss'

const BlockPopularCourses = () => {
  const { t } = useTranslation('home', { keyPrefix: 'blockPopular' })

  return (
    <Flex gap={40} align="center" className={styles.root} vertical>
      <div className={styles.header}>{t('title')}</div>
      <ListBasisCourse>
        <CardCourses name="Figma gfwefwefewfwefffwef gerwfwefwefwe gerwfbiuewoh;fegwilbfew" author="Степаненко Арина" />
        <CardCourses name="C# новые возможности" author="Козленовская Кареллияrrrrrrrrrr fdsewdwq fewfdwl" />
        <CardCourses name="Figma" author="Степаненко Арина" />
        <CardCourses name="Figma" author="Степаненко Арина" />
        <CardCourses name="Figma" author="Степаненко Арина" />
      </ListBasisCourse>
    </Flex>
  )
}

export default BlockPopularCourses
