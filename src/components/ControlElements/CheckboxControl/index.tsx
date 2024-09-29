import { Checkbox as AntdCheckbox, CheckboxProps as AntdCheckboxProps } from 'antd'
import FormContextController, { FormContextControllerProps } from '../FormContextController'
import styles from './index.module.scss'

export type CheckboxProps = AntdCheckboxProps & FormContextControllerProps

const CheckboxControl = (props: CheckboxProps) => {
  return (
    <FormContextController name={props.name} className={styles.root} label={props.label}>
      {(value, setValue) => (
        <AntdCheckbox
          {...props}
          checked={props.checked ?? !!value}
          onChange={(event) => {
            setValue(event.target.checked)

            if (props.onChange) {
              props.onChange(event)
            }
          }}
        />
      )}
    </FormContextController>
  )
}

export default CheckboxControl
