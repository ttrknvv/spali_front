import { Avatar, Flex } from 'antd'
import PopoverEllipsis from 'components/PopoverEllipsis'
import testImg from 'assets/images/forDelete/userIcon.png'
import styles from './index.module.scss'

const CardAuthor = () => {
  return (
    <div className={styles.root}>
      <Flex gap={40} className={styles.content}>
        <div>
          <Avatar shape="square" size={118} src={<img src={testImg} />} />
        </div>
        <Flex justify="space-between">
          <Flex gap={14} vertical>
            <PopoverEllipsis className={styles.name} maxWidth={'auto'} rows={2}>
              Иван ивановfwefewff
            </PopoverEllipsis>
            <PopoverEllipsis
              className={styles.description}
              maxWidth={'auto'}
              rows={1}>
              Веб-дизайнер
            </PopoverEllipsis>
          </Flex>
        </Flex>
      </Flex>
    </div>
  )
}

export default CardAuthor
