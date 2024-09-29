import { getPermissions } from 'reduxApp/authefication'
import { useAppSelector } from './customReduxHooks'
import { Components } from 'enums/permissions'

const usePermissions = (component?: Components) => {
  const permissions = useAppSelector(getPermissions)

  return component ? permissions[component] : permissions
}

export default usePermissions
