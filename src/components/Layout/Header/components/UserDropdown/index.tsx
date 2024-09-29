import { useTranslation } from 'react-i18next'
import { Flex } from 'antd'
import Button from 'components/Button'
import Feather from 'components/Feather'
import useUserDropdown from './hooks/useUserDropdown'
import styles from './index.module.scss'

const UserDropdown = () => {
  const { onLogout, onProfile } = useUserDropdown()
  const { t } = useTranslation('', { keyPrefix: 'dropdown' })

  return (
    <Flex className={styles.root} gap={6} vertical>
      <Button className={styles.item} colorScheme="text" onClick={onProfile}>
        {t('profile')}
      </Button>

      <Button
        className={styles.item}
        colorScheme="text"
        onClick={onLogout}
        iconPosition="end"
        icon={<Feather type="logoutIcon" />}>
        {t('logout')}
      </Button>
    </Flex>
  )
}

export default UserDropdown
