import type { CSSProperties } from 'vue'

export type SelectionMode = 'single' | 'multiple'

export interface OrgChartNode {
  /** Unique key for the node */
  key: string
  /** CSS class for the node */
  nodeClass?: string
  /** Inline styles for the node */
  nodeStyle?: CSSProperties
  /** Whether the node can be collapsed/expanded */
  collapsible?: boolean
  /** Whether the node is selectable */
  selectable?: boolean
  /** Custom data for the node */
  [key: string]: any
  /** Child nodes */
  children?: OrgChartNode[]
}

export interface OrgChartNodeProps {
  node: OrgChartNode
}

export interface OrgChartProps {
  /** Tree data to display */
  value: OrgChartNode[]
  /** Selection mode: 'single', 'multiple', or null */
  selectionMode?: SelectionMode
  /** Whether nodes can be collapsed/expanded */
  collapsible?: boolean
}

export type OrgChartInst = InstanceType<typeof OrgChart>
