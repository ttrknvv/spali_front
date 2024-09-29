import { Children } from 'react'
import { Flex } from 'antd'
import { motion } from 'framer-motion'

interface IListCoursesProps {
  children: React.ReactNode
  className?: string
  rowClassName?: string
}

const ListCourses = ({ children, className, rowClassName }: IListCoursesProps) => {
  const items = Children.toArray(children)

  return (
    <Flex gap={20} className={className} vertical>
      {items.map((child, idx) => (
        <div key={idx}>
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

export default ListCourses
