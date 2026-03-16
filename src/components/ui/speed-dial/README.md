# SpeedDial

A floating action button component that displays multiple primary actions when pressed, inspired by PrimeVue SpeedDial and adapted for Naive UI theming.

## Features

- Multiple display types: linear, circle, semi-circle, quarter-circle
- Multiple directions for linear and semi-circle types
- Mask layer support
- Tooltips for menu items
- Customizable button and item slots
- Smooth animations with configurable delay
- Four size options (tiny, small, medium, large)
- Full TypeScript support

## Tips

### Icon Usage

It's recommended to use the [Icones](https://icones.js.org/) icon library for icons. The component uses icon classes like `i-mdi:plus` for the main button and menu items.

If you prefer not to use Icones or need custom rendering, consider using the `button` and `item` slots to fully customize the appearance of the main button and menu items.

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| items | `SpeedDialItem[]` | `[]` | Array of menu items |
| direction | `'up' \| 'down' \| 'left' \| 'right' \| 'up-left' \| 'up-right' \| 'down-left' \| 'down-right'` | `'up'` | Direction of menu expansion |
| type | `'linear' \| 'circle' \| 'semi-circle' \| 'quarter-circle'` | `'linear'` | Display type of menu items |
| size | `'tiny' \| 'small' \| 'medium' \| 'large'` | `'medium'` | Size of buttons |
| radius | `number` | `80` | Radius for circle, semi-circle, and quarter-circle types |
| mask | `boolean` | `false` | Whether to show mask layer behind menu |
| disabled | `boolean` | `false` | Whether the component is disabled |
| buttonProps | `Omit<ButtonProps, 'size' \| 'disabled'>` | `{}` | Additional props for main button |
| transitionDelay | `number` | `80` | Delay between each item animation (ms) |
| showTooltip | `boolean` | `true` | Whether to show tooltips for items |
| tooltipPlacement | `'top' \| 'bottom' \| 'left' \| 'right'` | `'left'` | Tooltip placement for linear type |

## Events

| Name | Parameters | Description |
|------|------------|-------------|
| update:open | `boolean` | Emitted when open state changes |
| select | `(item: SpeedDialItem, index: number)` | Emitted when a menu item is clicked |
| show | - | Emitted when menu is opened |
| hide | - | Emitted when menu is closed |

## Slots

| Name | Props | Description |
|------|-------|-------------|
| button | `{ toggle: () => void, isOpen: boolean }` | Custom main button content |
| item | `{ item: SpeedDialItem, index: number, toggle: () => void }` | Custom menu item content |
| icon | `{ isOpen: boolean }` | Custom icon for main button |

## Methods

| Name | Description |
|------|-------------|
| toggle | Toggle open/close state |
| show | Open the menu |
| hide | Close the menu |

## Usage

### Basic Linear

```vue
<script setup lang="ts">
import type { SpeedDialItem } from '@/components/ui/speed-dial/types'

const speedDialItems: SpeedDialItem[] = [
  { key: 'copy', icon: 'i-mdi:content-copy', label: '复制' },
  { key: 'cut', icon: 'i-mdi:content-cut', label: '剪切' },
  { key: 'undo', icon: 'i-mdi:undo', label: '撤销' },
  { key: 'redo', icon: 'i-mdi:redo', label: '重做' },
  { key: 'save', icon: 'i-mdi:content-save', label: '保存' }
]
</script>

<template>
  <div class="relative w-full h-130">
    <SpeedDial class="absolute-x-center top-3" :items="speedDialItems" tooltip-placement="right" direction="down" />
    <SpeedDial class="absolute-x-center bottom-3" :items="speedDialItems" tooltip-placement="right" direction="up" />
    <SpeedDial class="absolute-y-center left-3" :items="speedDialItems" direction="right" />
    <SpeedDial class="absolute-y-center right-3" :items="speedDialItems" direction="left" />
  </div>
</template>
```

### Circle Type

```vue
<script setup lang="ts">
import type { SpeedDialItem } from '@/components/ui/speed-dial/types'

const speedDialItems: SpeedDialItem[] = [
  { key: 'copy', icon: 'i-mdi:content-copy', label: '复制' },
  { key: 'cut', icon: 'i-mdi:content-cut', label: '剪切' },
  { key: 'undo', icon: 'i-mdi:undo', label: '撤销' },
  { key: 'redo', icon: 'i-mdi:redo', label: '重做' },
  { key: 'save', icon: 'i-mdi:content-save', label: '保存' }
]
</script>

<template>
  <div class="relative w-full h-60">
    <SpeedDial class="absolute-center" :items="speedDialItems" type="circle" />
  </div>
</template>
```

### Semi Circle

```vue
<script setup lang="ts">
import type { SpeedDialItem } from '@/components/ui/speed-dial/types'

const speedDialItems: SpeedDialItem[] = [
  { key: 'copy', icon: 'i-mdi:content-copy', label: '复制' },
  { key: 'cut', icon: 'i-mdi:content-cut', label: '剪切' },
  { key: 'undo', icon: 'i-mdi:undo', label: '撤销' },
  { key: 'redo', icon: 'i-mdi:redo', label: '重做' },
  { key: 'save', icon: 'i-mdi:content-save', label: '保存' }
]
</script>

<template>
  <div class="relative w-full h-70">
    <SpeedDial class="absolute-x-center top-3" :items="speedDialItems" type="semi-circle" tooltip-placement="bottom" direction="down" />
    <SpeedDial class="absolute-x-center bottom-3" :items="speedDialItems" type="semi-circle" direction="up" />
    <SpeedDial class="absolute-y-center left-3" :items="speedDialItems" type="semi-circle" tooltip-placement="right" direction="right" />
    <SpeedDial class="absolute-y-center right-3" :items="speedDialItems" type="semi-circle" tooltip-placement="left" direction="left" />
  </div>
</template>
```

### Quarter Circle

```vue
<script setup lang="ts">
import type { SpeedDialItem } from '@/components/ui/speed-dial/types'

const speedDialItems: SpeedDialItem[] = [
  { key: 'copy', icon: 'i-mdi:content-copy', label: '复制' },
  { key: 'cut', icon: 'i-mdi:content-cut', label: '剪切' },
  { key: 'undo', icon: 'i-mdi:undo', label: '撤销' },
  { key: 'redo', icon: 'i-mdi:redo', label: '重做' },
  { key: 'save', icon: 'i-mdi:content-save', label: '保存' }
]
</script>

<template>
  <div class="relative w-full h-90">
    <SpeedDial class="top-3 left-3" :items="speedDialItems" :radius="120" type="quarter-circle" tooltip-placement="right" direction="down-right" />
    <SpeedDial class="top-3 right-3" :items="speedDialItems" :radius="120" type="quarter-circle" tooltip-placement="left" direction="down-left" />
    <SpeedDial class="bottom-3 left-3" :items="speedDialItems" :radius="120" type="quarter-circle" tooltip-placement="right" direction="up-right" />
    <SpeedDial class="bottom-3 right-3" :items="speedDialItems" :radius="120" type="quarter-circle" tooltip-placement="left" direction="up-left" />
  </div>
</template>
```

### Slots

```vue
<script setup lang="ts">
import type { SpeedDialItem } from '@/components/ui/speed-dial/types'

const speedDialItems: SpeedDialItem[] = [
  { key: 'copy', icon: 'i-mdi:content-copy', label: '复制' },
  { key: 'cut', icon: 'i-mdi:content-cut', label: '剪切' },
  { key: 'undo', icon: 'i-mdi:undo', label: '撤销' },
  { key: 'redo', icon: 'i-mdi:redo', label: '重做' },
  { key: 'save', icon: 'i-mdi:content-save', label: '保存' }
]
</script>

<template>
  <div class="relative w-full h-70">
    <SpeedDial class="absolute-x-center bottom-3" :items="speedDialItems" direction="up">
      <template #button="{ expand, toggle }">
        <NBadge :value="9">
          <RippleButton @click="toggle">
            <template #icon>
              <div :class="expand ? 'i-mdi:close' : 'i-mdi:plus'" />
            </template>
          </RippleButton>
        </NBadge>
      </template>
      <template #item="{ item }">
        <RippleButton :type="item.key === 'redo' ? 'primary' : 'default'">
          <template #icon>
            <div :class="item.icon" />
          </template>
          <span v-if="item.key === 'redo'">{{ item.label }}</span>
        </RippleButton>
      </template>
    </SpeedDial>
  </div>
</template>
```

### Type

```vue
<script setup lang="ts">
import type { SpeedDialItem } from '@/components/ui/speed-dial/types'

const speedDialItems: SpeedDialItem[] = [
  { key: 'copy', icon: 'i-mdi:content-copy', label: '复制' },
  { key: 'cut', icon: 'i-mdi:content-cut', label: '剪切' },
  { key: 'undo', icon: 'i-mdi:undo', label: '撤销' },
  { key: 'redo', icon: 'i-mdi:redo', label: '重做' },
  { key: 'save', icon: 'i-mdi:content-save', label: '保存' }
]
</script>

<template>
  <div class="flex justify-center gap-2 items-end w-full h-60">
    <SpeedDial class="relative" :items="speedDialItems" tooltip-placement="right" direction="up" />
    <SpeedDial class="relative" :items="speedDialItems" tooltip-placement="right" direction="up" button-type="default" />
  </div>
</template>
```

## Type Definitions

```typescript
interface SpeedDialItem {
  key: string | number
  icon?: string
  label?: string
  disabled?: boolean
  [key: string]: any
}

type SpeedDialDirection = 'up' | 'down' | 'left' | 'right'
  | 'up-left' | 'up-right' | 'down-left' | 'down-right'

type SpeedDialType = 'linear' | 'circle' | 'semi-circle' | 'quarter-circle'

type SpeedDialSize = 'tiny' | 'small' | 'medium' | 'large'
```
