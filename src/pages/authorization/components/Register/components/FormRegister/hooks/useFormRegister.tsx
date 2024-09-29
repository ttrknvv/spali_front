import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { Flex } from 'antd'
import { ModalContext } from 'contexts/ModalContext'
import i18next from 'i18next'
import { handleLogout, register, resetAuthError } from 'reduxApp/authefication'
import { RegisterScheme, registerValidationSheme } from 'schemes/authorization'
import Button from 'components/Button'
import Feather from 'components/Feather'
import { useAppDispatch, useAppSelector } from 'hooks/customReduxHooks'
import styles from '../index.module.scss'

const useFormRegister = () => {
  const methods = useForm<RegisterScheme>({ resolver: yupResolver(registerValidationSheme) })

  const { t } = useTranslation('authorization')
  const dispatch = useAppDispatch()
  const auth = useAppSelector((state) => state.auth)
  const { setOpen, setModal } = useContext(ModalContext)

  const { handleSubmit, setError, reset, trigger, formState } = methods

  const onRegister = async (data: RegisterScheme) => {
    try {
      dispatch(resetAuthError())
      await dispatch(register({ email: data.gmail, fullName: data.fullName, password: data.password }))
    } catch (e) {}
  }

  const onFinallyClickModal = () => {
    setOpen(false)
    reset()
  }

  useEffect(() => {
    if (Object.keys(auth.authError).length) {
      if (auth.authError.code === 400) {
        setError('password', { type: 'entry', message: t('errorRegister') })
        setError('fullName', { type: 'entry', message: '' })
        setError('gmail', { type: 'entry', message: '' })
      }
    }
    if (auth.isRegister) {
      setOpen(true)
      setModal({
        title: (
          <Flex gap={5} align="center">
            <Feather className={styles.exclamationPoint} type="exclamationIcon" />
            <span className={styles.header}>{t('modal.titleActivateRegister')}</span>
          </Flex>
        ),
        children: (
          <Flex gap={20} vertical>
            <span>{t('modal.descriptionActivateRegister')}</span>
            <Flex justify="flex-end">
              <Button onClick={onFinallyClickModal} className={styles.button}>
                {t('modal.titleButton')}
              </Button>
            </Flex>
          </Flex>
        ),
        props: { closeIcon: false, maskClosable: false },
      })
      dispatch(handleLogout())
    }
  }, [auth])

  useEffect(() => {
    if (formState.isSubmitted) {
      trigger()
    }
  }, [i18next.language])

  return { methods, onRegister: handleSubmit(onRegister), isLoading: auth.isLoading }
}

export default useFormRegister
