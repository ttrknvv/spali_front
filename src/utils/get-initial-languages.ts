// import cookies from './cookies'
import { DEFAULT_LANGUAGE } from '../constants/locales'

export const getInitialLanguage = () => {
  let initLanguage = DEFAULT_LANGUAGE
  //   const savedLanguage = cookies.get('pll_language')

  //   if (savedLanguage) {
  //     initLanguage = savedLanguage.toUpperCase()
  //   }

  return initLanguage
}
