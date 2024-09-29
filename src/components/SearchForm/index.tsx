import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Flex } from 'antd'
import SelectControl from 'components/ControlElements/SelectControl'
import useMenuFilter from './hooks/useMenuFilter'
import { DIFFICULTY_LEVEL_OPTIONS, LANGUAGES_OPTIONS, TYPE_EDU_OPTIONS } from 'constants/options'

const SearchForm = () => {
  const { methods, onChangeSearch } = useMenuFilter()

  const { t } = useTranslation('', { keyPrefix: 'filterCourses' })

  return (
    <FormProvider {...methods}>
      <Flex justify="space-between">
        <SelectControl
          name="difficultyLevel"
          placeholder={t('difficulty')}
          options={DIFFICULTY_LEVEL_OPTIONS()}
          onChange={() => onChangeSearch('difficultyLevel')}
          allowClear
        />
        <SelectControl
          name="language"
          placeholder={t('language')}
          options={LANGUAGES_OPTIONS()}
          onChange={() => onChangeSearch('language')}
          allowClear
        />
        <SelectControl
          name="typeEdu"
          placeholder={t('typeEdu')}
          options={TYPE_EDU_OPTIONS()}
          onChange={() => onChangeSearch('typeEdu')}
          allowClear
        />
      </Flex>
    </FormProvider>
  )
}

export default SearchForm
