import type { DropdownDividerOption, DropdownGroupOption, DropdownOption, DropdownProps, DropdownRenderOption } from 'naive-ui'
import type { VNodeChild } from 'vue'

export interface Conversation {
  key: string | number
  label: string | (() => VNodeChild)
  icon?: () => VNodeChild
  group?: string
  disabled?: boolean
  loading?: boolean
  [key: string]: any
}

export interface MenuConfig {
  options: Array<DropdownOption | DropdownGroupOption | DropdownDividerOption | DropdownRenderOption>
  onClick?: (opt: DropdownOption, conv: Conversation) => void
}

export interface ConversationsProps {
  items: Conversation[]
  menu?: (conv: Conversation) => MenuConfig
  groupable?: boolean
  dropdownProps?: Omit<DropdownProps, 'options'>
}
