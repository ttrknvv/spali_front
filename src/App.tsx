import { useEffect } from 'react'
import { checkAuth } from 'reduxApp/authefication'
import ConfigProvider from './styles/ConfigProvider'
import Router from './routes'
import { useAppDispatch, useAppSelector } from 'hooks/customReduxHooks'
import 'styles/scss/base.scss'

function App() {
  const dispatch = useAppDispatch()

  const auth = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth())
    }
  }, [])

  useEffect(() => {
    console.log(auth)
  }, [auth])

  return (
    <ConfigProvider>
      <Router />
    </ConfigProvider>
  )
}

export default App
