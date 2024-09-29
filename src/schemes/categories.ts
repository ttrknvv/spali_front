import * as yup from 'yup'
import { fileSchemaImage } from './schemes'
import { MAX_LENGHT_STRING, REQUIRED, MIN_LENGHT_STRING, UNABLE_FORMAT } from 'constants/errorTexts'
import {
  MAX_LENGHT_CATEGORY_NAME,
  MAX_LENGHT_DESCRIPTION,
  MAX_LENGHT_SUBCATEGORY_NAME,
  MAX_LENGHT_TOPIC_NAME,
  MIN_LENGHT_CATEGORY_NAME,
  MIN_LENGHT_DESCRIPTION,
  MIN_LENGHT_SUBCATEGORY_NAME,
  MIN_LENGHT_TOPIC_NAME,
} from 'constants/schemesLimit'

export const categoryValidationScheme = yup.object({
  _isEdit: yup.boolean().default(false),
  categoryId: yup.number().when('_isEdit', {
    is: true,
    then: (schema) => schema.required(REQUIRED),
  }),
  name: yup
    .string()
    .min(MIN_LENGHT_CATEGORY_NAME, () => MIN_LENGHT_STRING(MIN_LENGHT_CATEGORY_NAME))
    .max(MAX_LENGHT_CATEGORY_NAME, () => MAX_LENGHT_STRING(MAX_LENGHT_CATEGORY_NAME))
    .trim()
    .matches(/^[a-zа-яA-ZА-Я0-9.,!?:; +#-]+$/, UNABLE_FORMAT)
    .required(REQUIRED),
  isOnlySubcat: yup.boolean().default(false),
})

export const subCategoryValidationSheme = yup.object({
  _isEdit: yup.boolean().default(false),
  categoryId: yup.number().required(REQUIRED),
  subCategoryId: yup.number().when('_isEdit', {
    is: true,
    then: (schema) => schema.required(REQUIRED),
  }),
  name: yup
    .string()
    .trim()
    .min(MIN_LENGHT_SUBCATEGORY_NAME, () => MIN_LENGHT_STRING(MIN_LENGHT_SUBCATEGORY_NAME))
    .max(MAX_LENGHT_SUBCATEGORY_NAME, () => MAX_LENGHT_STRING(MAX_LENGHT_SUBCATEGORY_NAME))
    .matches(/^[a-zа-яA-ZА-Я0-9.,!?:; +#-]+$/, UNABLE_FORMAT)
    .required(REQUIRED),
  description: yup
    .string()
    .min(MIN_LENGHT_DESCRIPTION, () => MIN_LENGHT_STRING(MIN_LENGHT_DESCRIPTION))
    .max(MAX_LENGHT_DESCRIPTION, () => MAX_LENGHT_STRING(MAX_LENGHT_DESCRIPTION)),
})

export const topicValidationSheme = yup.object({
  _isEdit: yup.boolean().default(false),
  categoryId: yup.number().required(REQUIRED),
  subCategoryId: yup.number().required(REQUIRED),
  topicId: yup.number().when('_isEdit', {
    is: true,
    then: (schema) => schema.required(REQUIRED),
  }),
  name: yup
    .string()
    .trim()
    .min(MIN_LENGHT_TOPIC_NAME, () => MIN_LENGHT_STRING(MIN_LENGHT_TOPIC_NAME))
    .max(MAX_LENGHT_TOPIC_NAME, () => MAX_LENGHT_STRING(MAX_LENGHT_TOPIC_NAME))
    .matches(/^[a-zа-яA-ZА-Я0-9.,!?:; +#-]+$/, UNABLE_FORMAT)
    .required(REQUIRED),
  description: yup
    .string()
    .min(MIN_LENGHT_DESCRIPTION, () => MIN_LENGHT_STRING(MIN_LENGHT_DESCRIPTION))
    .max(MAX_LENGHT_DESCRIPTION, () => MAX_LENGHT_STRING(MAX_LENGHT_DESCRIPTION)),
  file: fileSchemaImage,
})

export type CategoryScheme = yup.InferType<typeof categoryValidationScheme> & {}
export type SubCategoryScheme = yup.InferType<typeof subCategoryValidationSheme> & {}
export type TopicScheme = yup.InferType<typeof topicValidationSheme> & {}
