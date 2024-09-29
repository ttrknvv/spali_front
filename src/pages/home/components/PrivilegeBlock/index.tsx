import { useTranslation } from 'react-i18next'
import { Flex } from 'antd'
import PrivilegeItem from './components/PrivilegeItem'
import Feather from 'components/Feather'
import styles from './index.module.scss'

const PrivilegeBlock = () => {
  const { t } = useTranslation('home', { keyPrefix: 'privilegeBlock' })

  const privileges: string[] = t('privileges', {
    returnObjects: true,
  }) as string[]

  return (
    <Flex align="center" gap={40} className={styles.root} vertical>
      <div className={styles.header}>{t('title')}</div>
      <Flex justify="space-between" gap={40} wrap>
        <PrivilegeItem
          icon={<Feather type="timePrivilegeIcon" style={{ fontSize: '64px' }} />}
          description={privileges[0]}
        />
        <PrivilegeItem
          icon={<Feather type="atomPrivilegeIcon" style={{ fontSize: '64px' }} />}
          description={privileges[1]}
        />
        <PrivilegeItem
          icon={<Feather type="refreshPrivilegeIcon" style={{ fontSize: '64px' }} />}
          description={privileges[2]}
        />
      </Flex>
    </Flex>
  )
}

export default PrivilegeBlock
