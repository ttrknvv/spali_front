import { Flex } from 'antd'
import styles from './index.module.scss'

interface IEmptyProps {
  title?: string
}

const Empty = ({ title = 'EMPTY' }: IEmptyProps) => {
  return (
    <Flex align="center" className={styles.root} vertical>
      <div className={styles.title}>{title}</div>
    </Flex>
  )
}

export default Empty
