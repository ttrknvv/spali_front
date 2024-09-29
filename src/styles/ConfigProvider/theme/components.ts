import { ThemeConfig } from 'antd'
import colors from '../../scss/palette.module.scss'

const components: ThemeConfig['components'] = {
  Spin: {
    dotSizeLG: 50,
  },
  Button: {},
  Select: {
    selectorBg: colors['transparent'],
    optionFontSize: 16,
    optionHeight: 40,
    optionSelectedFontWeight: 700,
    optionSelectedColor: colors['white'],
  },
  Input: {
    activeBg: colors['white'],
    activeBorderColor: colors['black'],
    activeShadow: `0 0 8px 2px rgba(0, 0, 189, 0.3)`,
    hoverBg: colors['white'],
    hoverBorderColor: colors['black'],
  },
}

export default components
