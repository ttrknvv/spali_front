import { useTranslation } from 'react-i18next'
import { Flex } from 'antd'
import Chips, { Chip } from 'components/Chips'
import styles from './index.module.scss'

const OftenWatch = () => {
  const { t } = useTranslation('home', { keyPrefix: 'oftenWatch' })

  const chipsItems: Chip[] = [
    { text: 'Java' },
    { text: 'C#' },
    { text: 'C++' },
    { text: 'HTML' },
    { text: 'SCSS' },
    { text: 'NodeJS' },
    { text: 'Express' },
    { text: 'NestJS' },
    { text: 'Flutter' },
  ]

  return (
    <Flex gap={40} align="center" className={styles.root} vertical>
      <div className={styles.header}>{t('title')}</div>
      <Chips items={chipsItems} />
    </Flex>
  )
}

export default OftenWatch
