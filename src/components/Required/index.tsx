import { FC, PropsWithChildren } from 'react'
import styles from './index.module.scss'

const Required: FC<PropsWithChildren> = ({ children }) => (
  <>
    {children}
    <span className={styles.asterisk}>*</span>
  </>
)

export default Required
