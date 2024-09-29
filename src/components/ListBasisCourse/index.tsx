import { Children } from 'react'
import { Flex } from 'antd'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import styles from './index.module.scss'

interface IListBasisCourseProps {
  children: React.ReactNode
  className?: string
  gap?: number
  rowClassName?: string
}

const ListBasisCourse = ({ children, gap = 20, className, rowClassName }: IListBasisCourseProps) => {
  const items = Children.toArray(children)

  return (
    <Flex className={className} wrap>
      {items.map((child, idx) => (
        <div className={classNames(styles.root, idx >= 3 ? styles.margin : '')} key={idx}>
          <motion.li
            className={rowClassName}
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}>
            {child}
          </motion.li>
        </div>
      ))}
    </Flex>
  )
}

export default ListBasisCourse
