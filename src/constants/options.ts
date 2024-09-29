import i18next from 'i18next'
import { Languages, TypeEdu } from 'enums/common'
import { DifficultyLevel } from 'enums/difficultyLevels'

export const DIFFICULTY_LEVEL_OPTIONS = () => [
  { label: i18next.t('common:difficultyLevels.start'), value: DifficultyLevel.START },
  { label: i18next.t('common:difficultyLevels.medium'), value: DifficultyLevel.MEDIUM },
  { label: i18next.t('common:difficultyLevels.professional'), value: DifficultyLevel.PROFESSIONAL },
]

export const LANGUAGES_OPTIONS = () => [
  { label: i18next.t('common:languages.ru'), value: Languages.RU },
  { label: i18next.t('common:languages.en'), value: Languages.EN },
]

export const TYPE_EDU_OPTIONS = () => [
  { label: i18next.t('common:typeEdu.course'), value: TypeEdu.COURSE },
  { label: i18next.t('common:typeEdu.courseKit'), value: TypeEdu.COURSE_KIT },
]
