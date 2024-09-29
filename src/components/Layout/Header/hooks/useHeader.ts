import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import i18next from 'i18next'
import { PATH } from 'routes/enums/path'
import { useAppSelector } from 'hooks/customReduxHooks'
import getLanguageOptions from '../utils/getLanguageOptions'
import getMenuItems from '../utils/getMenuItems'
import isCurrentPathname from 'utils/is-current-pathname'

const useHeader = () => {
  const navigate = useNavigate()
  const menuItems = getMenuItems()
  const languageOptions = getLanguageOptions()

  const { isAuth, user } = useAppSelector((state) => state.auth)

  const handleChangeLanguage = useCallback((value: string) => {
    i18next.changeLanguage(value)
  }, [])

  const onClickItemMenu = useCallback(
    (path: string) => {
      if (!isCurrentPathname(path)) {
        navigate(path)
      }
    },
    [navigate],
  )

  const onClickAvatar = useCallback(() => {
    if (!isAuth && !isCurrentPathname(PATH.LOGIN)) {
      navigate(PATH.LOGIN)
    } else if (isAuth && !isCurrentPathname(`${PATH.PROFILE}/${user.id}`)) {
      navigate(`${PATH.PROFILE}/${user.id}`)
    }
  }, [isAuth, navigate])

  return {
    handleChangeLanguage,
    onClickItemMenu,
    onClickAvatar,
    menuItems,
    languageOptions,
    isAuth,
    user,
  }
}

export default useHeader
