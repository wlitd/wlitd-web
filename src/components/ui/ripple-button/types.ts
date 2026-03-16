import type { ButtonProps } from 'naive-ui'
import type { Size } from 'naive-ui/es/button/src/interface'

export interface RippleButtonProps extends /* @vue-ignore */ ButtonProps {
  round?: boolean
  circle?: boolean
  size?: Size
  disabled?: boolean
  block?: boolean
}

export type ProButtonInst = InstanceType<typeof RippleButton>
