import { useNavigate } from 'react-router-dom'
import { Flex } from 'antd'
import TopicItem from './components/TopicItem'
import { PATH } from 'routes/enums/path'
import { ISubCategory } from 'models/Category'
import styles from './index.module.scss'

interface ISubCategoryBlock {
  subCategory: ISubCategory
}

const SubCategoryBlock = ({ subCategory }: ISubCategoryBlock) => {
  const navigate = useNavigate()

  const onClickTopic = (id: number, isAll?: boolean) => {
    if (isAll) {
      navigate(`${PATH.SUBCATEGORY}/${subCategory.id}`)
    } else {
      navigate(`${PATH.TOPIC}/${id}`)
    }
  }

  return (
    <Flex gap={20} vertical>
      <div className={styles.header}>{subCategory.name}</div>
      <Flex gap={20} wrap>
        <TopicItem header={'/Все курсы/'} onClick={() => onClickTopic(subCategory.id, true)} />
        {subCategory?.topics.map(({ name, id }, idx) => (
          <TopicItem header={name} onClick={() => onClickTopic(id)} key={idx} />
        ))}
      </Flex>
    </Flex>
  )
}

export default SubCategoryBlock
