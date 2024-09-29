import { useTranslation } from 'react-i18next'
import { Flex } from 'antd'
import Button from 'components/Button'
import { PATH } from 'routes/enums/path'
import useGuestDropdown from './hooks/useGuestDropdown'
import styles from './index.module.scss'

const GuestDropdown = () => {
  const { onClickItemMenu } = useGuestDropdown()
  const { t } = useTranslation('', { keyPrefix: 'dropdown' })

  return (
    <Flex align="center" className={styles.root} gap={6} vertical>
      <Button colorScheme="text" className={styles.item} onClick={() => onClickItemMenu(PATH.LOGIN)}>
        {t('login')}
      </Button>
      <Button colorScheme="text" className={styles.item} onClick={() => onClickItemMenu(PATH.REGISTER)}>
        {t('register')}
      </Button>
    </Flex>
  )
}

export default GuestDropdown
