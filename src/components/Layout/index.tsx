import { ReactNode, Suspense } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { ModalProvider } from 'contexts/ModalContext'
import Footer from './Footer'
import Header from './Header'
import NotificationProvider from '../../contexts/NotificationContext'
import Spinner from 'components/Spinner'
import styles from './index.module.scss'

interface ICommonLayout {
  children?: ReactNode
}

const CommonLayout = ({ children }: ICommonLayout) => {
  return (
    <Layout className={styles.wrapper}>
      <NotificationProvider>
        <ModalProvider>
          <Header />
          <Suspense
            fallback={
              <Content className={styles.content}>
                <Spinner />
              </Content>
            }>
            <Content className={styles.content} id="mainApp">
              {children ? children : <Outlet />}
            </Content>
            <ScrollRestoration />
          </Suspense>
          <Footer />
        </ModalProvider>
      </NotificationProvider>
    </Layout>
  )
}

export default CommonLayout
