import { useTranslation } from 'react-i18next'
import { Flex, Input, Layout, Select, Dropdown, Avatar } from 'antd'
import i18next from 'i18next'
import GuestDropdown from './components/GuestDropdown'
import UserDropdown from './components/UserDropdown'
import Button from 'components/Button'
import Feather from 'components/Feather'
import { PATH } from 'routes/enums/path'
import useHeader from './hooks/useHeader'
import isCurrentPathname from 'utils/is-current-pathname'
import defaultIcon from 'assets/images/profileDefault.png'
import styles from './index.module.scss'

const { Header: AntdHeader } = Layout

const Header = () => {
  const { t } = useTranslation('', { keyPrefix: 'header' })

  const { onClickItemMenu, menuItems, handleChangeLanguage, languageOptions, onClickAvatar, isAuth, user } = useHeader()

  return (
    <AntdHeader className={styles.header}>
      <Flex justify="space-between" className={styles.headerContent}>
        <Flex>
          <Flex onClick={() => onClickItemMenu(PATH.HOME)} className={styles.logoMain}>
            <Feather type="logoMain" size={80} />
          </Flex>
          <Flex gap={100} align="center" className={styles.menuItems}>
            {menuItems.map((item, idx) => (
              <Button
                onClick={() => onClickItemMenu(item.path)}
                colorScheme="text"
                className={isCurrentPathname(item.path) ? styles.activeItemHeader : styles.itemHeader}
                key={idx}>
                {item.title}
              </Button>
            ))}
          </Flex>
        </Flex>
        <Flex gap={30} align="center">
          <Input
            className={styles.customInputHeader}
            suffix={<Feather type="searchIcon" style={{ fontSize: '32px' }} />}
            placeholder={t('findPlaceholder')}
          />
          <Select
            className={styles.customSelectHeader}
            options={languageOptions}
            defaultValue={i18next.language}
            popupClassName={styles.customDropdown}
            onChange={handleChangeLanguage}
            suffixIcon={
              <Feather
                type="arrowDown"
                style={{
                  fontSize: 20,
                }}
              />
            }
          />
          <Dropdown
            placement="bottom"
            arrow={{ pointAtCenter: true }}
            dropdownRender={() => (isAuth ? <UserDropdown /> : <GuestDropdown />)}>
            <Avatar
              className={styles.avatar}
              size={60}
              src={<img src={isAuth && user?.personalImg ? user.personalImg : defaultIcon} onClick={onClickAvatar} />}
            />
          </Dropdown>
        </Flex>
      </Flex>
    </AntdHeader>
  )
}

export default Header
