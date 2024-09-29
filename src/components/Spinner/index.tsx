import { useTranslation } from 'react-i18next'
import { Spin } from 'antd'
import { SpinProps } from 'antd/es/spin'
import styles from './index.module.scss'

interface ISpinner extends SpinProps {
  spinnerText?: string
}

const Spinner = ({ spinnerText }: ISpinner) => {
  const { t } = useTranslation('', { keyPrefix: 'spinner' })

  return (
    <div className={styles.root}>
      <Spin tip={spinnerText || t('textSpin')} size="large">
        <div className={styles.contentStyle} />
      </Spin>
    </div>
  )
}

export default Spinner
