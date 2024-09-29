import i18next from 'i18next'
import { PATH } from '../../../../routes/enums/path'

interface IMenuItem {
  title: string
  path: PATH
}

const getMenuItems = () => {
  const menuItems: IMenuItem[] = [
    { title: i18next.t('common:header.catalog'), path: PATH.CATALOG },
    { title: i18next.t('common:header.myEducatuion'), path: PATH.MY_EDUCATION },
  ]

  return menuItems
}

export default getMenuItems
