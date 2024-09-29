import AntdIcon from '@ant-design/icons'
import { IconProps } from 'models/IconProps'
import arrowDown from 'assets/svg/arrowDown.svg?react'
import atomPrivilegeIcon from 'assets/svg/atomPrivilegeIcon.svg?react'
import editIcon from 'assets/svg/editIcon.svg?react'
import exclamationIcon from 'assets/svg/exclamationIcon.svg?react'
import githubIcon from 'assets/svg/githubIcon.svg?react'
import gmailIcon from 'assets/svg/gmailIcon.svg?react'
import linkdInIcon from 'assets/svg/linkdInIcon.svg?react'
import logoMain from 'assets/svg/logoMain.svg?react'
import logoutIcon from 'assets/svg/logoutIcon.svg?react'
import paginationArrowLeft from 'assets/svg/paginationArrowLeft.svg?react'
import paginationArrowRight from 'assets/svg/paginationArrowRight.svg?react'
import plusIcon from 'assets/svg/plusIcon.svg?react'
import refreshPrivilegeIcon from 'assets/svg/refreshPrivilegeIcon.svg?react'
import searchIcon from 'assets/svg/searchIcon.svg?react'
import star from 'assets/svg/star.svg?react'
import telegramIcon from 'assets/svg/telegramIcon.svg?react'
import timePrivilegeIcon from 'assets/svg/timePrivilegeIcon.svg?react'
import user from 'assets/svg/user.svg?react'
import vkIcon from 'assets/svg/vkIcon.svg?react'
import yandexIcon from 'assets/svg/yandexIcon.svg?react'

const icons = {
  logoMain,
  yandexIcon,
  editIcon,
  searchIcon,
  arrowDown,
  logoutIcon,
  paginationArrowLeft,
  paginationArrowRight,
  githubIcon,
  plusIcon,
  exclamationIcon,
  telegramIcon,
  gmailIcon,
  linkdInIcon,
  vkIcon,
  timePrivilegeIcon,
  atomPrivilegeIcon,
  refreshPrivilegeIcon,
  star,
  user,
}

export type FeatherIconTypes = keyof typeof icons

export interface FeatherProps extends IconProps {
  type: FeatherIconTypes
}

const Feather = ({ type, ...props }: FeatherProps) => {
  const component = icons[type]

  return <AntdIcon component={component} {...props} />
}

export default Feather
