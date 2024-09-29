import { Flex } from 'antd'
import styles from './index.module.scss'

interface IPrivilegeItemProps {
  icon: React.ReactNode
  description: string
}

const PrivilegeItem = ({ icon, description }: IPrivilegeItemProps) => {
  return (
    <Flex gap={20} align="center" className={styles.root} vertical>
      {icon}
      <div className={styles.description}>{description}</div>
    </Flex>
  )
}

export default PrivilegeItem
