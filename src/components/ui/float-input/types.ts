import type { FormValidationStatus, InputProps } from 'naive-ui'
import type { Size } from 'naive-ui/es/input/src/interface'

export interface FloatInputProps extends /* @vue-ignore */ InputProps {
  placeholder: string
  pair?: boolean
  type?: 'text' | 'password' | 'textarea'
  size?: Size
  defaultValue?: string
  status?: FormValidationStatus
  disabled?: boolean
}

export type FloatInputInst = InstanceType<typeof FloatInput>
