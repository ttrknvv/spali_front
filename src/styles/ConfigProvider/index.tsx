import { ReactNode, useEffect, useState } from 'react'
import { ConfigProvider as AntProvider } from 'antd'
import i18next from 'i18next'
import theme from './theme'
import inputStyles from './input.module.scss'
import selectStyles from './select.module.scss'
import spinStyles from './spin.module.scss'

export const providerOptions = {
  spin: { className: spinStyles.root },
  select: { className: selectStyles.root },
  input: { className: inputStyles.root },
  theme,
}

interface IConfigProvider {
  children: ReactNode
}

const ConfigProvider = ({ children }: IConfigProvider) => {
  const [lang, setLang] = useState(i18next.language)

  useEffect(() => {
    i18next.on('languageChanged', () => {
      setLang(i18next.language)
    })
  }, [])

  return (
    <AntProvider wave={{ disabled: true }} {...providerOptions}>
      {children}
    </AntProvider>
  )
}

export default ConfigProvider
