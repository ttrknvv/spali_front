import * as yup from 'yup'
import {
  CAPITAL_LETTER_PASSWORD,
  EMAIL_ERROR,
  LOWERCASE_LETTER_PASSWORD,
  MAX_LENGHT_STRING,
  NUMBER_PASSWORD,
  REQUIRED,
  MIN_LENGHT_STRING,
  UNABLE_FORMAT,
} from 'constants/errorTexts'
import { MAX_LENGHT_NAME, MIN_LENGHT_NAME, MIN_LENGHT_PASSWORD } from 'constants/schemesLimit'

export const loginValidationScheme = yup.object({
  gmail: yup.string().email(EMAIL_ERROR).trim().required(REQUIRED),
  password: yup.string().required(REQUIRED),
})

export const registerValidationSheme = yup.object({
  fullName: yup
    .string()
    .trim()
    .matches(/^[a-zа-яA-ZА-Я0-9.,!?:; -]+$/, UNABLE_FORMAT)
    .min(MIN_LENGHT_NAME, () => MIN_LENGHT_STRING(MIN_LENGHT_NAME))
    .max(MAX_LENGHT_NAME, () => MAX_LENGHT_STRING(MAX_LENGHT_NAME))
    .required(REQUIRED),
  gmail: yup.string().email(EMAIL_ERROR).required(REQUIRED),
  password: yup
    .string()
    .required(REQUIRED)
    .matches(/[A-ZА-Я]/, CAPITAL_LETTER_PASSWORD)
    .matches(/[a-zа-я]/, LOWERCASE_LETTER_PASSWORD)
    .matches(/[0-9]/, NUMBER_PASSWORD)
    .min(MIN_LENGHT_PASSWORD, () => MIN_LENGHT_STRING(MIN_LENGHT_PASSWORD)),
})

export type LoginScheme = yup.InferType<typeof loginValidationScheme> & {}

export type RegisterScheme = yup.InferType<typeof registerValidationSheme> & {}
