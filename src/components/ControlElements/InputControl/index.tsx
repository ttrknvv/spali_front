import { ChangeEvent, ReactNode } from 'react'
import { Controller, useForm, useFormContext } from 'react-hook-form'
import { Form as WrapperInput, Input, InputNumber, InputProps } from 'antd'
import { FormLayout } from 'antd/es/form/Form'
import { FormLabelAlign } from 'antd/es/form/interface'
import { FormProps } from 'antd/lib'
import classNames from 'classnames'
import Required from 'components/Required'
import styles from './index.module.scss'

const { Item } = WrapperInput

interface IProps {
  name: string
  defaultValue?: string | number | undefined
  label?: string | ReactNode
  type?: 'password' | 'textArea' | 'number'
  size?: 'large' | 'middle' | 'small'
  styleItem?: any
  inputStyle?: Record<string, string>
  form?: ReturnType<typeof useForm<any, any>>
  formLayout?: FormLayout
  colon?: boolean
  placeholder?: string
  disabled?: boolean
  classname?: string
  maxLength?: number
  required?: boolean
  addonAfter?: ReactNode
  addonBefore?: ReactNode
  wrapperCol?: FormProps['wrapperCol']
  labelCol?: FormProps['labelCol']
  labelAlign?: FormLabelAlign
  rows?: number
  minValue?: number
  maxValue?: number
  suffix?: React.ReactNode
  allowClear?: boolean
  status?: InputProps['status']
  extra?: ReactNode
  onFocus?: () => void
  onBlur?: () => void
  onChange?: (value: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => void
  hint?: string
  value?: string | number
}

export const renderLabel = (label?: string | ReactNode, required?: boolean) => {
  if (label && required) {
    return (
      <Required>
        <b>{label}</b>
      </Required>
    )
  }
  if (label) {
    return <b>{label}</b>
  }
}

const InputControl = ({
  name,
  defaultValue,
  label,
  type,
  size = 'large',
  styleItem,
  form,
  formLayout = 'vertical',
  colon,
  inputStyle,
  placeholder,
  disabled,
  classname,
  maxLength,
  required,
  addonAfter,
  addonBefore,
  wrapperCol,
  labelCol,
  labelAlign,
  rows = 4,
  minValue,
  maxValue,
  suffix,
  allowClear,
  status,
  extra,
  onFocus,
  onBlur,
  onChange,
  hint,
  value,
}: IProps) => {
  const formContext = useFormContext()

  const {
    register,
    control,
    formState: { errors },
  } = form || formContext

  const error: any = name
    .split(/[.\[\]'"]/)
    .filter((p) => p)
    // @ts-ignore
    .reduce((acc, cur) => acc?.[cur], errors)

  return (
    <WrapperInput
      layout={formLayout}
      wrapperCol={wrapperCol}
      labelCol={labelCol}
      labelAlign={labelAlign}
      colon={false}
      component="div">
      <Item
        colon={colon}
        style={styleItem}
        label={renderLabel(label, required)}
        className={classNames(classname, styles.root, [disabled && styles.labelDisabled])}
        {...(error && {
          help: error?.message,
          validateStatus: 'error',
        })}
        extra={extra}>
        <Controller
          control={control}
          {...register(name, defaultValue ? { value: defaultValue } : undefined)}
          // @ts-ignore
          ref={null}
          render={({ field }) => {
            const propsField = { ...field }
            if (type === 'password') {
              return (
                <Input.Password
                  {...propsField}
                  size={size}
                  autoComplete={'new-password'}
                  placeholder={placeholder}
                  disabled={disabled}
                  className={styles.passwordInput}
                  allowClear={allowClear}
                />
              )
            } else if (type === 'textArea') {
              return (
                <Input.TextArea
                  onChange={onChange || propsField.onChange}
                  value={propsField.value}
                  size={size}
                  rows={rows}
                  placeholder={placeholder}
                  disabled={disabled}
                  className={styles.inputArea}
                  maxLength={maxLength}
                  {...{ showCount: !!maxLength }}
                  allowClear={allowClear}
                />
              )
            } else if (type === 'number') {
              return (
                <InputNumber
                  {...propsField}
                  size={size}
                  placeholder={placeholder}
                  maxLength={maxLength}
                  disabled={disabled}
                  min={minValue}
                  max={maxValue}
                />
              )
            } else {
              return (
                <Input
                  addonAfter={addonAfter}
                  addonBefore={addonBefore}
                  style={{ marginBottom: '0px', ...inputStyle }}
                  {...propsField}
                  {...(onChange ? { onChange: onChange } : undefined)}
                  size={size}
                  className={styles.input}
                  placeholder={placeholder}
                  disabled={disabled}
                  maxLength={maxLength}
                  suffix={suffix}
                  {...{ showCount: !!maxLength }}
                  defaultValue={defaultValue}
                  allowClear={allowClear}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  status={status}
                  {...(value ? { value } : {})}
                />
              )
            }
          }}
        />
        {hint && <p className={styles.hint}>{hint}</p>}
      </Item>
    </WrapperInput>
  )
}

export default InputControl
