import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Flex } from 'antd'
import Button from 'components/Button'
import InputControl from 'components/ControlElements/InputControl'
import useFormLogin from './hooks/useFormLogin'

const FormLogin = () => {
  const { methods, onLogin, isLoading } = useFormLogin()

  const { t } = useTranslation('authorization', { keyPrefix: 'form' })

  return (
    <FormProvider {...methods}>
      <InputControl name="gmail" label={t('gmail')} placeholder={t('placeholder.gmail')} required />
      <InputControl
        name="password"
        type="password"
        label={t('password')}
        placeholder={t('placeholder.password')}
        required
      />
      <Flex justify="center">
        <Button loading={isLoading} iconPosition={'end'} onClick={onLogin}>
          {t('input')}
        </Button>
      </Flex>
    </FormProvider>
  )
}

export default FormLogin
