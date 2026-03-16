import type { Size } from 'naive-ui/es/button/src/interface'

export interface FieldsetProps {
  size?: Size
  legend?: string
  toggleable?: boolean
}

export type FieldsetInst = InstanceType<typeof Fieldset>
