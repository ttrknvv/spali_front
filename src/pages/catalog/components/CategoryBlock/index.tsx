import { useNavigate } from 'react-router-dom'
import { Flex } from 'antd'
import SubCategoryBlock from '../SubCategoryBlock'
import TopicItem from '../SubCategoryBlock/components/TopicItem'
import Empty from 'components/Empty'
import { PATH } from 'routes/enums/path'
import { ICategoryRecursive } from 'models/Category'
import styles from './index.module.scss'

interface ICategoryBlock {
  data: ICategoryRecursive
}

const CategoryBlock = ({ data }: ICategoryBlock) => {
  const navigate = useNavigate()

  const onClickTopic = (id: number) => {
    navigate(`${PATH.SUBCATEGORY}/${id}`)
  }

  return (
    <Flex gap={20} vertical>
      <Flex align="center" justify="space-between">
        <div className={styles.header}>{data.name}</div>
      </Flex>
      {data.subCategories.length > 0 ? (
        data.isOnlySubcat ? (
          <Flex gap={20} wrap>
            {data.subCategories.map(({ name, id }, idx) => (
              <TopicItem header={name} onClick={() => onClickTopic(id)} key={idx} />
            ))}
          </Flex>
        ) : (
          <Flex vertical gap={40}>
            {data.subCategories.map((item, idx) => (
              <SubCategoryBlock subCategory={item} key={idx} />
            ))}
          </Flex>
        )
      ) : (
        <Empty />
      )}
    </Flex>
  )
}

export default CategoryBlock
