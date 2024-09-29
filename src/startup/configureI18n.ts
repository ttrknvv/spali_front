import { initReactI18next } from 'react-i18next'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import i18next from 'i18next'
import HttpApi from 'i18next-http-backend'
import { getInitialLanguage } from 'utils/get-initial-languages'

export const configureI18n = async () => {
  dayjs.locale('ru')

  const initialLanguage = getInitialLanguage()

  await i18next
    .use(HttpApi)
    .use(initReactI18next)
    .init({
      lng: initialLanguage,
      fallbackLng: initialLanguage,
      ns: ['common'],
      defaultNS: 'common',
      fallbackNS: 'common',
      load: 'currentOnly',
      interpolation: {
        escapeValue: false,
      },
      backend: {
        loadPath: '/locales/{{ns}}/{{lng}}.json',
      },
    })
}
