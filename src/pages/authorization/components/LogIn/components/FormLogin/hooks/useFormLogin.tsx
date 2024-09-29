import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { Flex } from 'antd'
import { ModalContext } from 'contexts/ModalContext'
import i18next from 'i18next'
import { login, resetAuthError } from 'reduxApp/authefication'
import { LoginScheme, loginValidationScheme } from 'schemes/authorization'
import Button from 'components/Button'
import Feather from 'components/Feather'
import { PATH } from 'routes/enums/path'
import { useAppDispatch, useAppSelector } from 'hooks/customReduxHooks'
import styles from '../index.module.scss'

const useFormLogin = () => {
  const methods = useForm<LoginScheme>({ resolver: yupResolver(loginValidationScheme) })

  const dispatch = useAppDispatch()
  const auth = useAppSelector((state) => state.auth)
  const { setOpen, setModal } = useContext(ModalContext)
  const navigate = useNavigate()

  const { t } = useTranslation('authorization')

  const { handleSubmit, setError, formState, trigger, reset } = methods

  const onLogin = async (data: LoginScheme) => {
    dispatch(resetAuthError())
    await dispatch(login({ email: data.gmail, password: data.password }))
  }

  const onFinallyClickModal = () => {
    setOpen(false)
    reset()
  }

  useEffect(() => {
    if (Object.keys(auth.authError).length) {
      if (auth.authError.code === 403) {
        setModal({
          title: (
            <Flex gap={5} align="center">
              <Feather className={styles.exclamationPoint} type="exclamationIcon" />
              <span className={styles.header}>{t('modal.titleActivateLogin')}</span>
            </Flex>
          ),
          children: (
            <Flex gap={20} vertical>
              <span>{t('modal.descriptionActivateLogin')}</span>
              <Flex justify="flex-end">
                <Button onClick={onFinallyClickModal} className={styles.button}>
                  {t('modal.titleButton')}
                </Button>
              </Flex>
            </Flex>
          ),
          props: { closeIcon: false, maskClosable: false },
        })
        setOpen(true)
      } else if (auth.authError.code === 401) {
        setError('gmail', { type: 'entry', message: '' })
        setError('password', { type: 'entry', message: t('errorLogin') })
      }
    }
    if (auth.isAuth) {
      navigate(PATH.HOME)
    }
  }, [auth.isAuth, auth.authError])

  useEffect(() => {
    if (formState.isSubmitted) {
      trigger()
    }
  }, [i18next.language])

  return { methods, onLogin: handleSubmit(onLogin), isLoading: auth.isLoading }
}

export default useFormLogin
