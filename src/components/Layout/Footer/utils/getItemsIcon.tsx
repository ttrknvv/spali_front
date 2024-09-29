import Feather from 'components/Feather'

const getItemsIcon = () => {
  const items = [
    {
      icon: <Feather type="telegramIcon" style={{ fontSize: '34px' }} />,
      href: 'https://t.me/ttrknvv',
    },
    {
      icon: <Feather type="linkdInIcon" style={{ fontSize: '40px' }} />,
      href: 'https://www.linkedin.com/in/nikita-tarakanov-001149273/',
    },
    {
      icon: <Feather type="vkIcon" style={{ fontSize: '40px' }} />,
      href: 'https://vk.com/student_nikitka',
    },
  ]

  return items
}

export default getItemsIcon
