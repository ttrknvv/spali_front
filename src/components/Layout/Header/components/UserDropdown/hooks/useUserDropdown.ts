import { useNavigate } from 'react-router-dom'
import { getUser, logout } from 'reduxApp/authefication'
import { PATH } from 'routes/enums/path'
import { useAppDispatch, useAppSelector } from 'hooks/customReduxHooks'

const useUserDropdown = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector(getUser)

  const onLogout = () => {
    dispatch(logout())
  }

  const onProfile = () => {
    navigate(`${PATH.PROFILE}/${user.id}`)
  }

  return { onLogout, onProfile }
}

export default useUserDropdown
