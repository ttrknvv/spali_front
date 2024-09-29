import { ThemeConfig } from 'antd'
import components from './components'
import colors from '../../scss/palette.module.scss'

const theme: ThemeConfig = {
  token: {
    colorPrimary: colors['primary-color'],
    lineType: 'solid',
    lineWidth: 2,
  },
  components,
}

export default theme
