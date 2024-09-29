import { Flex } from 'antd'
import { motion } from 'framer-motion'
import styles from './index.module.scss'

interface ITopicItemProps {
  header: string
  onClick: () => void
}

const TopicItem = ({ header, onClick }: ITopicItemProps) => {
  return (
    <motion.li
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      onClick={onClick}
      className={styles.root}
      viewport={{ once: true }}>
      <motion.div whileHover={{ y: -6 }} className={styles.content} transition={{ type: 'spring', stiffness: 300 }}>
        <Flex align="center" justify="center" gap={50}>
          <span className={styles.topicName}>{header}</span>
        </Flex>
      </motion.div>
    </motion.li>
  )
}

export default TopicItem
