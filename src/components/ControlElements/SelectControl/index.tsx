import { FC, useEffect, useState } from 'react'
import { Controller, useForm, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Empty, Form, Select, Spin } from 'antd'
import { FormLayout, FormProps } from 'antd/es/form/Form'
import { FormLabelAlign } from 'antd/es/form/interface'
import classNames from 'classnames'
import { renderLabel } from '../InputControl'
import Feather from 'components/Feather'
import styles from './index.module.scss'

type SelectParams = Parameters<typeof Select>[0]

export interface SelectControlProps extends SelectParams {
  form?: ReturnType<typeof useForm<any, any>>
  name: string
  label?: React.ReactNode
  className?: string
  classNameSelect?: string
  allowClear?: boolean
  disabled?: boolean
  layout?: FormLayout
  required?: boolean
  wrapperCol?: FormProps['wrapperCol']
  labelCol?: FormProps['labelCol']
  labelAlign?: FormLabelAlign
  size?: 'large' | 'middle' | 'small'
  onClear?: () => void
  onChange?: (arg0?: any) => void
  fullOption?: boolean
}

const SelectControl: FC<SelectControlProps> = ({
  form,
  name,
  label,
  className,
  allowClear,
  layout,
  required,
  wrapperCol,
  labelCol,
  labelAlign,
  onClear,
  onChange,
  disabled,
  size = 'large',
  defaultValue,
  classNameSelect,
  fullOption = false,
  ...selectParams
}) => {
  const context = useFormContext()
  const {
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
    trigger,
  } = form || context
  const { t } = useTranslation('common')
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue)
    }
  }, [])

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Form
          layout={layout}
          wrapperCol={wrapperCol}
          labelCol={labelCol}
          labelAlign={labelAlign as FormLabelAlign}
          component="div">
          <Form.Item
            className={classNames(className, styles.root, [disabled && styles.labelDisabled])}
            help={<>{errors[name]?.message}</>}
            validateStatus={errors[name] ? 'error' : undefined}
            label={renderLabel(label, required)}
            colon={false}>
            <Select
              {...field}
              {...selectParams}
              className={classNames(styles.select, classNameSelect)}
              disabled={disabled}
              allowClear={allowClear}
              onClear={onClear}
              onChange={(val, option) => {
                field.onChange(fullOption ? option : val)
                trigger(name)
                onChange && onChange(val)
              }}
              size={size}
              notFoundContent={
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={false}>
                  {t('empty')}
                </Empty>
              }
              suffixIcon={
                !isHovered || !allowClear || !getValues()[name] ? (
                  <Feather
                    type="arrowDown"
                    style={{
                      fontSize: 20,
                      userSelect: 'none',
                      pointerEvents: 'none',
                    }}
                  />
                ) : null
              }
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
            {selectParams.loading && <Spin style={{ position: 'absolute', left: 16, top: 12 }} size="small" />}
          </Form.Item>
        </Form>
      )}
    />
  )
}

export default SelectControl
