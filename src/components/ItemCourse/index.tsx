import { Flex } from 'antd'
import test from 'assets/images/banner.png'
import styles from './index.module.scss'

const ItemCourse = () => {
  return (
    <Flex className={styles.root} gap={40}>
      <div className={styles.imgCourse}>
        <img src={test} />
      </div>
      <Flex gap={10} vertical>
        <div className={styles.title}>Java базовый уровень</div>
        <div className={styles.author}>Арина Степаненко</div>
        <div className={styles.description}>
          Этот курс предназначен для тех, кто только начинает изучать программирование на языке Java. В рамках курса вы
          познакомитесь с основами объектно-ориентированного программирования и научитесь создавать простые
          Java-приложения. ацдзуатщиуцашэжв лшаэуцжщЭаль цта аузкцтэазуцщ муаклтцаэозщвхуцаэ щ3уцхалзувь
          щпмоукхцауатцузатцу аумтуктщз ахцу утуцзщат цущатущах
        </div>
      </Flex>
    </Flex>
  )
}

export default ItemCourse
