import i18next from 'i18next'

export const REQUIRED = () => i18next.t('common:validationMessages.required')
export const EMAIL_ERROR = () => i18next.t('common:validationMessages.email')
export const MIN_LENGHT_STRING = (count: number) => i18next.t('common:validationMessages.minlenght', { count })
export const MAX_LENGHT_STRING = (count: number) => i18next.t('common:validationMessages.maxlenght', { count })

export const CAPITAL_LETTER_PASSWORD = () => i18next.t('common:validationMessages.capitalPassword')
export const LOWERCASE_LETTER_PASSWORD = () => i18next.t('common:validationMessages.lowercasePassword')
export const NUMBER_PASSWORD = () => i18next.t('common:validationMessages.numberPassword')

export const UNABLE_FORMAT = () => i18next.t('common:validationMessages.unableFormat')
