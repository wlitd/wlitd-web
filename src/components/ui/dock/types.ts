import type { PopoverProps } from 'naive-ui'
import type { VNode } from 'vue'

export type DockPosition = 'left' | 'right' | 'top' | 'bottom'
export type DockSize = 'tiny' | 'small' | 'medium' | 'large'

export interface DockItem {
  /** Unique identifier */
  key: string | number
  /** Icon render function */
  icon?: () => VNode
  /** Additional custom properties */
  [key: string]: any
}

export interface DockProps {
  /** Array of dock items */
  items: DockItem[]
  /** Position of the dock */
  position?: DockPosition
  /** Size of dock items */
  size?: DockSize
  /** Tooltip options (Naive UI Popover props) */
  tooltipOptions?: PopoverProps
}

export type DockInst = InstanceType<typeof Dock>
