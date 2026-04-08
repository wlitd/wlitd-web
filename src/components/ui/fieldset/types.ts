import type { ButtonSize } from 'naive-ui'

export interface FieldsetProps {
  size?: ButtonSize
  legend?: string
  toggleable?: boolean
}

export type FieldsetInst = InstanceType<typeof Fieldset>
