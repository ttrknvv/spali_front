import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Flex } from 'antd'
import Button from 'components/Button'
import InputControl from 'components/ControlElements/InputControl'
import useFormRegister from './hooks/useFormRegister'

const FormRegister = () => {
  const { methods, onRegister, isLoading } = useFormRegister()

  const { t } = useTranslation('authorization', { keyPrefix: 'form' })

  return (
    <FormProvider {...methods}>
      <InputControl name="fullName" label={t('fullName')} placeholder={t('placeholder.fullName')} required />
      <InputControl name="gmail" label={t('gmail')} placeholder={t('placeholder.gmail')} required />
      <InputControl
        name="password"
        type="password"
        label={t('password')}
        placeholder={t('placeholder.password')}
        required
      />
      <Flex justify="center">
        <Button loading={isLoading} iconPosition={'end'} onClick={onRegister}>
          {t('register')}
        </Button>
      </Flex>
    </FormProvider>
  )
}

export default FormRegister
