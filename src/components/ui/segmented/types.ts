export type SegmentedSize = 'tiny' | 'small' | 'medium' | 'large'

export interface SegmentedOption {
  label: string
  value: string | number
  disabled?: boolean
  [key: string]: any
}

export interface SegmentedProps {
  options: SegmentedOption[]
  size?: SegmentedSize
  disabled?: boolean
  block?: boolean
}

export type SegmentedInst = InstanceType<typeof Segmented>
