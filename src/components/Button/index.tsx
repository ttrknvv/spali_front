import { ReactNode } from 'react'
import { Button as AntdBtn } from 'antd'
import { ButtonProps } from 'antd/lib'
import classNames from 'classnames'
import styles from './index.module.scss'

export type BtnColorSchemeType = 'text' | 'primary'

export enum BtnHeight {
  sm = 24,
  md = 36,
  lg = 40,
}

const getIconBtnSize = (size: ButtonProps['size']) => {
  if (size === 'large') {
    return BtnHeight.lg
  } else if (size === 'small') {
    return BtnHeight.sm
  }
  return BtnHeight.md
}

const getTypeFromColorScheme = (colorScheme: BtnColorSchemeType): ButtonProps['type'] => {
  if (colorScheme === 'text') {
    return 'text'
  }
  return 'primary'
}

export interface IButton extends ButtonProps {
  colorScheme?: BtnColorSchemeType
  icon?: ReactNode
}

const Button = ({ colorScheme = 'primary', className, size = 'middle', icon, ...props }: IButton) => {
  const isIconButton = !props.children

  return (
    <AntdBtn
      style={isIconButton ? { width: getIconBtnSize(size), height: getIconBtnSize(size) } : {}}
      size={size}
      type={props.type || getTypeFromColorScheme(colorScheme)}
      className={classNames(
        styles[`${colorScheme}ColorScheme`],
        className,
        [icon && styles.btnWithIcon],
        styles[props.type || getTypeFromColorScheme(colorScheme)],
      )}
      {...props}>
      {icon && icon}
      {!isIconButton && props.children}
    </AntdBtn>
  )
}

export default Button
