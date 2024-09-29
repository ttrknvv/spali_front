import React from 'react'
import { notification } from 'antd'
import type { NotificationInstance } from 'antd/es/notification/interface'

export type NotificationProviderProps = {
  notification: NotificationInstance
}

export const NotificationContext = React.createContext<NotificationProviderProps>({
  notification: {} as unknown as NotificationInstance,
})

export const withNotification =
  <P extends object>(Component: React.ComponentType<P>): React.FC<Omit<P, keyof NotificationProviderProps>> =>
  // eslint-disable-next-line react/display-name
  (props) => (
    <NotificationContext.Consumer>
      {(value) => <Component {...(props as P)} notification={value.notification} />}
    </NotificationContext.Consumer>
  )

export default function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notificationApi, notificationContextHolder] = notification.useNotification({
    duration: 3,
    placement: 'bottomLeft',
  })

  return (
    <NotificationContext.Provider
      value={{
        notification: notificationApi,
      }}>
      {notificationContextHolder}
      {children}
    </NotificationContext.Provider>
  )
}
