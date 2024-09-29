import { useEffect } from 'react'
import classNames from 'classnames'
import { useAnimate, stagger, motion } from 'framer-motion'
import styles from './index.module.scss'

export type Chip = {
  text: string
  className?: string
  icon?: React.ReactNode
  activeClassName?: string
}

export type ChipsProps = {
  items: Chip[]
  activeIndex?: number
  className?: string
  onClick?: (idx: number) => void
}

const Chips = ({ activeIndex, className, items, onClick }: ChipsProps) => {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate(
      'li',
      {
        opacity: 1,
        y: 0,
      },
      {
        duration: 0.1,
        delay: stagger(0.1, { startDelay: 0.2 }),
      },
    )
  }, [items])

  const onClickToChip = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const { idx } = event.currentTarget.dataset

    if (onClick && typeof idx === 'string') {
      onClick(parseInt(idx))
    }
  }

  return (
    <div className={styles.rootContainer}>
      <div className={classNames(styles.root, className)} ref={scope}>
        {items.map((item, idx) => {
          return (
            <div className={classNames(styles.container, idx >= 5 ? styles.margin : '')} key={idx}>
              <motion.li
                whileTap={{
                  scale: 0.9,
                }}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                className={classNames(
                  styles.item,
                  item.className,
                  {
                    [styles.active]: idx === activeIndex,
                  },
                  { [String(item.activeClassName)]: idx === activeIndex },
                )}
                ref={scope}
                key={idx}>
                <a href="#!" data-idx={idx} onClick={onClickToChip} role="button">
                  {item.icon && <div className={styles.icon}>{item.icon}</div>}
                  <div className={styles.text}>{item.text}</div>
                </a>
              </motion.li>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Chips
