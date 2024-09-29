import { ReactNode } from 'react'
import usePermissions from 'hooks/usePermissions'
import { Actions, Components } from 'enums/permissions'

interface IUserCan {
  action: Actions
  children: ReactNode
  component: Components
}

const UserCan = ({ action, component, children }: IUserCan) => {
  const permission = usePermissions(component)
  if (permission?.[action]) {
    return <>{children}</>
  }
  return <></>
}

export default UserCan
