# Conversations

A conversation list component for the AI era, providing an elegant way to display and interact with conversation items.

## Features

- Support for active state selection with v-model binding
- Grouping functionality to organize conversations by category
- Built-in menu operations via dropdown
- Loading and disabled states support
- Rich customization through slots (icon, label, group, menu icon)
- Theme-aware styling using Naive UI theme variables
- Ripple effect on item hover

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| items | `Conversation[]` | `[]` | Array of conversation items to display |
| menu | `(conv: Conversation) => MenuConfig` | `undefined` | Function to generate menu configuration for each conversation |
| groupable | `boolean` | `false` | Whether to group conversations by their `group` field |
| dropdownProps | `Omit<DropdownProps, 'options'>` | `undefined` | Additional props passed to the dropdown component |

### Conversation Interface

| Property | Type | Description |
|----------|------|-------------|
| key | `string \| number` | Unique identifier for the conversation |
| label | `string \| (() => VNodeChild)` | Display label, can be string or render function |
| icon | `() => VNodeChild` | Optional icon render function |
| group | `string` | Group name for categorization (used when `groupable` is true) |
| disabled | `boolean` | Whether the item is disabled |
| loading | `boolean` | Whether to show loading spinner |

### MenuConfig Interface

| Property | Type | Description |
|----------|------|-------------|
| options | `Array<DropdownOption \| DropdownGroupOption \| DropdownDividerOption \| DropdownRenderOption>` | Dropdown menu options |
| onClick | `(opt: DropdownOption, conv: Conversation) => void` | Callback when a menu item is clicked |

## Events

| Name | Parameters | Description |
|------|------------|-------------|
| change | `(conv: Conversation)` | Emitted when a conversation item is clicked |

## Slots

| Name | Parameters | Description |
|------|------------|-------------|
| icon | `{ conv: Conversation }` | Custom icon for conversation items |
| label | `{ conv: Conversation }` | Custom label content |
| group | `{ group: string }` | Custom group header content |
| menuIcon | - | Custom menu trigger icon |

## Usage

### Basic

```vue
<script setup lang="ts">
import type { Conversation } from '@/components/ui/conversations/types'

const baseItems: Conversation[] = [
  { key: '1', label: 'Conversation Item 1' },
  { key: '2', label: 'Conversation Item 2' },
  { key: '3', label: 'Conversation Item 3' }
]

const baseActiveKey = ref<string>('1')
</script>

<template>
  <Conversations v-model:active-key="baseActiveKey" :items="baseItems" />
</template>
```

### With Menu Operations

```vue
<script setup lang="ts">
import type { Conversation, MenuConfig } from '@/components/ui/conversations/types'

const baseItems: Conversation[] = [
  { key: '1', label: 'Conversation Item 1' },
  { key: '2', label: 'Conversation Item 2' },
  { key: '3', label: 'Conversation Item 3' }
]

const operationActiveKey = ref<string>('1')

function getMenuConfig(): MenuConfig {
  return {
    options: [
      { key: 'edit', label: 'Edit', icon: () => h('div', { class: 'i-lucide:pencil-line' }) },
      { key: 'delete', label: () => h('div', { class: 'color-red' }, 'Delete'), icon: () => h('div', { class: 'i-lucide:trash color-red' }) },
      { key: 'reload', label: 'Reload', icon: () => h('div', { class: 'i-lucide:refresh-ccw' }), disabled: true }
    ],
    onClick: (opt, conv) => {
      switch (opt.key) {
        case 'edit':
          console.warn('Edit', conv)
          break
        default:
          break
      }
    }
  }
}
</script>

<template>
  <Conversations v-model:active-key="operationActiveKey" :items="baseItems" :menu="getMenuConfig" />
</template>
```

### With Status

```vue
<script setup lang="ts">
import type { Conversation } from '@/components/ui/conversations/types'

const statusActiveKey = ref<string>('1')
const statusItems: Conversation[] = [
  { key: '1', label: 'Status Item 1' },
  { key: '2', label: 'Disabled', disabled: true },
  { key: '3', label: 'Loading', loading: true }
]
</script>

<template>
  <Conversations v-model:active-key="statusActiveKey" :items="statusItems" />
</template>
```

### Grouped

```vue
<script setup lang="ts">
import type { Conversation } from '@/components/ui/conversations/types'

const groupActiveKey = ref<string>('1')
const groupItems: Conversation[] = [
  { key: '1', label: 'Group Item 1' },
  { key: '2', label: 'Group Item 2' },
  { key: '3', label: 'Group Item 3', group: 'Group 1' },
  { key: '4', label: 'Group Item 4', group: 'Group 2' },
  { key: '5', label: 'Group Item 5', group: 'Group 1' },
  { key: '6', label: 'Group Item 6', group: 'Group 1' }
]
</script>

<template>
  <Conversations v-model:active-key="groupActiveKey" :items="groupItems" groupable />
</template>
```

### Custom Slots

```vue
<script setup lang="ts">
import type { Conversation, MenuConfig } from '@/components/ui/conversations/types'

const slotsActiveKey = ref<string>('1')
const slotsItems: Conversation[] = [
  { key: '1', label: 'Slots Item 1', group: 'Group 1', icon: () => h('div', { class: 'i-lucide:message-square' }) },
  { key: '2', label: 'Slots Item 2', group: 'Group 1' },
  { key: '3', label: () => h('div', { class: 'color-red' }, 'Slots Item 3'), group: 'Group 1' },
  { key: '4', label: 'Slots Item 4', group: 'Group 2' },
  { key: '5', label: 'Slots Item 5', group: 'Group 2' }
]

function getMenuConfig(): MenuConfig {
  return {
    options: [
      { key: 'edit', label: 'Edit', icon: () => h('div', { class: 'i-lucide:pencil-line' }) },
      { key: 'delete', label: () => h('div', { class: 'color-red' }, 'Delete'), icon: () => h('div', { class: 'i-lucide:trash color-red' }) },
      { key: 'reload', label: 'Reload', icon: () => h('div', { class: 'i-lucide:refresh-ccw' }), disabled: true }
    ],
    onClick: (opt, conv) => {
      switch (opt.key) {
        case 'edit':
          console.warn('Edit', conv)
          break
        default:
          break
      }
    }
  }
}
</script>

<template>
  <Conversations v-model:active-key="slotsActiveKey" :items="slotsItems" :menu="getMenuConfig" groupable>
    <template #group="{ group }">
      <div class="flex items-center gap-2 justify-between">
        <div class="flex items-center gap-2">
          <div v-if="group === 'Group 1'" class="i-lucide:messages-square" />
          <span>{{ group }}</span>
        </div>
        <RippleButton quaternary size="small">
          <template #icon>
            <div class="i-lucide:plus" />
          </template>
        </RippleButton>
      </div>
    </template>
    <template #icon="{ conv }">
      <div v-if="conv.key === '2'" class="i-lucide:dollar-sign" />
    </template>
    <template #label="{ conv }">
      <div v-if="conv.key === '4'" class="color-blue">{{ conv.label }}</div>
    </template>
    <template #menuIcon>
      <div class="i-lucide:list" />
    </template>
  </Conversations>
</template>
```

> **Note:** The examples use UnoCSS icons (e.g., `i-lucide:pencil-line`) which are automatically transformed into icon elements. You can use any icon component or SVG in the slots.
