import { Actions } from 'enums/permissions'

const componentsToFullSet = []

const getComponentTitle = (permission: string, action: Actions) => {
  let component = permission.replace(`_${action}`, '')

  return component
}

const createPermissionsMap = (permissions: string[]) => {
  let map: Record<string, Record<string, boolean>> = {}

  permissions.forEach((permission) => {
    const arrString = permission.split('_')
    const arrStringLen = arrString.length
    let action

    if ((action = Actions[arrString[arrStringLen - 1] as `${Actions}`])) {
      const component = getComponentTitle(permission, action)
      map[component] = { ...(map[component] ?? {}), [Actions[action]]: true }
    }
  })

  return map
}

export default createPermissionsMap
