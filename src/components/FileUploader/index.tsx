import { FC, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ButtonProps } from 'antd'
import classNames from 'classnames'
import Button from 'components/Button'
import Feather from 'components/Feather'
import styles from './index.module.scss'

type IconType = ButtonProps['icon']

export type FileUploaderProps = Omit<ButtonProps, 'icon'> & {
  uploadIcon?: IconType
  withIcon?: boolean
  accept?: string
  multi?: boolean
  onUpload?: (files: FileList, isMulti?: boolean) => void
}

const FileUploader: FC<FileUploaderProps> = ({
  uploadIcon = <Feather type="arrowDown" />,
  accept = '',
  withIcon = true,
  multi,
  onUpload,
  ...props
}) => {
  const fileRef = useRef<HTMLInputElement>(null)
  const [drag, setDrag] = useState(false)
  const [changed, setChanged] = useState(false)
  const { t } = useTranslation('common')

  const onClickButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (fileRef.current) {
      fileRef.current.click()
    }

    if (props.onClick) {
      props.onClick(event)
    }
  }

  useEffect(() => {
    if (changed) {
      setChanged(false)
    }
  }, [changed])

  return (
    <div className={styles.inner} onDragOver={() => setDrag(true)} onDragLeave={() => setDrag(false)}>
      <div className={styles.input}>
        {!changed && (
          <input
            accept={accept}
            multiple={multi}
            onChange={(event) => {
              if (event.target.files && event.target.files.length > 0 && onUpload) {
                onUpload(event.target.files, multi)
                setChanged(true)
              }
            }}
            ref={fileRef}
            type="file"
          />
        )}
        <Button
          {...props}
          icon={withIcon ? uploadIcon : undefined}
          onClick={onClickButton}
          className={classNames({ [styles.drag]: drag })}
          onDrop={(e) => {
            e.preventDefault()
            setDrag(false)

            onUpload && onUpload(e.dataTransfer.files)
          }}
          onDragOver={(e) => {
            e.preventDefault()
          }}>
          {t('fileUpload')}
        </Button>
      </div>
    </div>
  )
}

export default FileUploader
