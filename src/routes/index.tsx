import { lazy } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import CommonLayout from 'components/Layout'
import { useAppSelector } from 'hooks/customReduxHooks'
import { PATH } from './enums/path'

const Home = lazy(() => import('pages/home'))
const NotFound = lazy(() => import('pages/notFound'))
const LogIn = lazy(() => import('pages/authorization/components/LogIn'))
const Register = lazy(() => import('pages/authorization/components/Register'))
const Catalog = lazy(() => import('pages/catalog'))
const Courses = lazy(() => import('pages/courses'))

const Router = () => {
  const { isAuth } = useAppSelector((state) => state.auth)

  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          element: <CommonLayout />,
          path: PATH.HOME,
          errorElement: (
            <CommonLayout>
              <NotFound />
            </CommonLayout>
          ),
          children: [
            { element: <Home />, index: true },
            { element: <Catalog />, path: PATH.CATALOG },
            { element: isAuth ? <Navigate to={PATH.HOME} /> : <LogIn />, path: PATH.LOGIN },
            { element: isAuth ? <Navigate to={PATH.HOME} /> : <Register />, path: PATH.REGISTER },
            { element: <Courses />, path: `${PATH.SUBCATEGORY}/:id` },
            { element: <Courses />, path: `${PATH.TOPIC}/:id` },
          ],
        },
      ])}
    />
  )
}

export default Router
