import { Controller, useFormContext } from 'react-hook-form'
import type { ControllerRenderProps, ControllerFieldState, FieldValues } from 'react-hook-form'
import { Form } from 'antd'
import classNames from 'classnames'
import Required from 'components/Required'
import type { FormItemProps } from 'antd'
import type { FormItemLayout } from 'antd/es/form/Form'
import styles from './index.module.scss'

export type FormContextControllerProps = {
  name: string
  label?: React.ReactNode
  layout?: FormItemLayout
  noStyle?: boolean
  disabled?: boolean
  requiredLabel?: boolean
  defaultValue?: any
  className?: string
  help?: FormItemProps['help']
  validateStatus?: FormItemProps['validateStatus']
}

export default function FormContextController(
  props: FormContextControllerProps & {
    children:
      | React.ReactNode
      | ((
          value: any,
          setValue: (newValue: any) => void,
          state: ControllerFieldState,
          field: ControllerRenderProps<FieldValues, string>,
        ) => React.ReactNode)
  },
) {
  const context = useFormContext()

  return (
    <Controller
      defaultValue={props.defaultValue}
      name={props.name}
      control={context.control}
      render={({ field, fieldState }) => {
        let validateStatus = props.validateStatus
        let helpMessage = props.help

        if (fieldState.error) {
          helpMessage = fieldState.error.message
          validateStatus = 'error'
        }

        let label: React.ReactNode

        if (props.label) {
          label = <b className={styles.label}>{props.label}</b>

          if (props.requiredLabel) {
            label = <Required>{label}</Required>
          }
        }

        return (
          <Form.Item
            className={classNames(styles.formItemWrapper, props.className)}
            help={helpMessage}
            validateStatus={validateStatus}
            colon={false}
            label={<span className={props.disabled ? styles.disabledLabel : ''}>{label}</span>}
            layout={props.layout}
            noStyle={props.noStyle}>
            <div>
              {typeof props.children === 'function'
                ? props.children(field.value, field.onChange, fieldState, field)
                : props.children}
            </div>
          </Form.Item>
        )
      }}
    />
  )
}
