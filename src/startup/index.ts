import { configureI18n } from './configureI18n'

export const startup = async () => {
  await configureI18n()
}
