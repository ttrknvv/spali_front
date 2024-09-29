import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Flex } from 'antd'
import { checkAuth } from 'reduxApp/authefication'
import BlockAuthorCourses from './components//BlockAuthorCourses'
import BlockPopularCourses from './components//BlockPopularCourses'
import AnimatedBanner from './components/AnimatedBanner'
import OftenWatch from './components/OftenWatch'
import PrivilegeBlock from './components/PrivilegeBlock'
import { useAppDispatch } from 'hooks/customReduxHooks'

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (searchParams.get('refresh') === 'true') {
      dispatch(checkAuth())
      setSearchParams({}, { replace: true })
    }
  }, [])

  return (
    <Flex vertical>
      <AnimatedBanner />
      <Flex gap={70} vertical>
        <PrivilegeBlock />
        <BlockPopularCourses />
        <BlockAuthorCourses />
        <OftenWatch />
      </Flex>
    </Flex>
  )
}

export default Home
