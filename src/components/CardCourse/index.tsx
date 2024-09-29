import { Avatar, Flex } from 'antd'
import { motion } from 'framer-motion'
import Feather from 'components/Feather'
import PopoverEllipsis from 'components/PopoverEllipsis'
import testImg from 'assets/images/forDelete/courseIcon.png'
import styles from './index.module.scss'

interface ICardCoursesProps {
  name: string
  author: string
}

const CardCourses = ({ name, author }: ICardCoursesProps) => {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300 }}>
      <div className={styles.root}>
        <Flex className={styles.content} justify="space-between" vertical>
          <Flex justify="space-between">
            <Flex vertical>
              <PopoverEllipsis className={styles.header} maxWidth={'auto'} rows={2}>
                {name}
              </PopoverEllipsis>
              <PopoverEllipsis className={styles.author} maxWidth={'auto'} rows={1}>
                {author}
              </PopoverEllipsis>
            </Flex>
            <div>
              <Avatar shape="square" size={104} src={<img src={testImg} />} />
            </div>
          </Flex>

          <Flex gap={10}>
            <Flex gap={4} align="center" className={styles.statisticBlock}>
              <Feather type="star" style={{ fontSize: '24px' }} />
              <span>4.5</span>
            </Flex>
            <Flex gap={4} align="center" className={styles.statisticBlock}>
              <Feather type="user" style={{ fontSize: '30px' }} />
              <span>450k</span>
            </Flex>
          </Flex>
        </Flex>
      </div>
    </motion.div>
  )
}

export default CardCourses
