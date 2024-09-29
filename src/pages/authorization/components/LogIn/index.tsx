import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Flex } from 'antd'
import FormLogin from './components/FormLogin'
import Feather from 'components/Feather'
import { PATH } from 'routes/enums/path'
import useAuthorization, { TypeServiceAuth } from '../../hooks/useAuthorization'
import styles from '../index.module.scss'

const LogIn = () => {
  const { t } = useTranslation('authorization')
  const { onAuthAnotherService } = useAuthorization()
  const navigate = useNavigate()

  useEffect(() => {
    document.getElementById('mainApp').classList.add(styles.main)

    return () => {
      document.getElementById('mainApp').classList.remove(styles.main)
    }
  }, [])

  return (
    <Flex justify="space-between" align="center" className={styles.root} vertical>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.active}>{t('login')}</span>
          {` / `}
          <span className={styles.click} onClick={() => navigate(PATH.REGISTER)}>
            {t('register')}
          </span>
        </div>
        <FormLogin />
      </div>
      <Flex gap={12} vertical>
        <div className={styles.inSocial}>{t('inputSocial')}</div>
        <Flex gap={20} justify="center" className={styles.socialIcons}>
          <Feather type="yandexIcon" onClick={() => onAuthAnotherService(TypeServiceAuth.YANDEX)} />
          <Feather type="githubIcon" onClick={() => onAuthAnotherService(TypeServiceAuth.GITHUB)} />
          <Feather type="gmailIcon" onClick={() => onAuthAnotherService(TypeServiceAuth.GOOGLE)} />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default LogIn
