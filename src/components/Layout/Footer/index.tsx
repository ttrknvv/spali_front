import { useNavigate } from 'react-router-dom'
import { Flex, Layout } from 'antd'
import Feather from 'components/Feather'
import getItemsIcon from './utils/getItemsIcon'
import styles from './index.module.scss'

const { Footer: AntdFooter } = Layout

const Footer = () => {
  const itemsIcon = getItemsIcon()

  const navigate = useNavigate()

  const onClickIcon = (path: string) => {
    window.open(path, '_blank')
  }

  return (
    <AntdFooter className={styles.footer}>
      <Flex justify="space-between" className={styles.footerContent}>
        <Flex className={styles.logoMain}>
          <Feather type="logoMain" size={80} />
        </Flex>
        <Flex align="center">spali.education@gmail.com</Flex>
        <Flex align="center" gap={24} className={styles.iconsBlock}>
          {itemsIcon.map(({ icon, href }, idx) => (
            <div className={styles.icon} onClick={() => onClickIcon(href)} key={idx}>
              {icon}
            </div>
          ))}
        </Flex>
      </Flex>
    </AntdFooter>
  )
}

export default Footer
