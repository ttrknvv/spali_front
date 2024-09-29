import { useTranslation } from 'react-i18next'
import FormContextController from '../FormContextController'
import FileUploader from 'components/FileUploader'

interface IFileControlProps {
  disabled?: boolean
  label?: string
  name?: string
  multi?: boolean
}

const FileControl = ({ disabled, label, name, multi }: IFileControlProps) => {
  const { t } = useTranslation('', { keyPrefix: 'formController' })

  return (
    <FormContextController
      name={name || 'file'}
      label={label || t('label.fileUploader')}
      layout="vertical"
      disabled={disabled}>
      {(value, setValue) => (
        <>
          <FileUploader
            disabled={disabled}
            onUpload={(files, isMulti) => setValue(isMulti ? Object.values(files) : Object.values(files)[0])}
            multi={multi}
          />
          {value && <div>{value.name}</div>}
        </>
      )}
    </FormContextController>
  )
}

export default FileControl
