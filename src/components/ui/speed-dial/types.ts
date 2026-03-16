export type SpeedDialDirection = 'up' | 'down' | 'left' | 'right' | 'up-left' | 'up-right' | 'down-left' | 'down-right'
export type SpeedDialType = 'linear' | 'circle' | 'semi-circle' | 'quarter-circle'
export type SpeedDialSize = 'small' | 'medium' | 'large'
export type SpeedDialButtonType = 'default' | 'primary'

export interface SpeedDialItem {
  key: string | number
  icon?: string
  label?: string
  disabled?: boolean
  [key: string]: any
}

export interface SpeedDialProps {
  /** 菜单项列表 */
  items: SpeedDialItem[]
  /** 展开方向 */
  direction?: SpeedDialDirection
  /** 展开类型 */
  type?: SpeedDialType
  /** 按钮大小 */
  size?: SpeedDialSize
  /** 主按钮类型 */
  buttonType?: SpeedDialButtonType
  /** 圆形/半圆/四分之一圆类型的半径 */
  radius?: number
  /** 是否显示遮罩层 */
  mask?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 动画延迟（毫秒） */
  transitionDelay?: number
  /** 是否显示工具提示 */
  showTooltip?: boolean
  /** 工具提示位置 */
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right'
}

export type SpeedDialInst = InstanceType<typeof SpeedDial>
