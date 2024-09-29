import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import isCurrentPathname from 'utils/is-current-pathname'

const useGuestDropdown = () => {
  const navigate = useNavigate()

  const onClickItemMenu = useCallback(
    (path: string) => {
      if (!isCurrentPathname(path)) {
        navigate(path)
      }
    },
    [navigate],
  )

  return { onClickItemMenu }
}

export default useGuestDropdown
