# Dock

A macOS-style dock component with magnification effect on hover and frosted glass background, inspired by PrimeVue Dock.

## Features

- Four positions: top, bottom, left, right
- Magnification effect on hover (like macOS dock)
- Frosted glass background with light/dark mode support
- Tooltip support via Naive UI Popover props
- Icon render function support (like Naive UI)
- Multiple sizes (tiny, small, medium, large)
- Uses Naive UI's CSS variables for seamless theme integration

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| items | `DockItem[]` | `[]` | Array of dock items |
| position | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Position of the dock |
| size | `'tiny' \| 'small' \| 'medium' \| 'large'` | `'medium'` | Size of dock items |
| tooltipOptions | `PopoverProps` | `undefined` | Naive UI Popover props for tooltip |

### DockItem

| Name | Type | Default | Description |
|------|------|---------|-------------|
| key | `string \| number` | **required** | Unique identifier |
| icon | `() => VNode` | `undefined` | Icon render function |
| label | `string` | `undefined` | Tooltip label |
| [key: string] | `any` | - | Additional custom properties |

## Events

| Name | Parameters | Description |
|------|------------|-------------|
| click | `(item: DockItem)` | Emitted when a dock item is clicked |

## Usage

```vue
<script setup lang="ts">
import type { DockItem, DockPosition } from '@/components/ui/dock/types'

// Basic
const basicItems: DockItem[] = [
  { key: 'home', icon: () => h('div', { class: 'i-mdi:home' }), label: 'Home' },
  { key: 'search', icon: () => h('div', { class: 'i-mdi:magnify' }), label: 'Search' },
  { key: 'settings', icon: () => h('div', { class: 'i-mdi:cog' }), label: 'Settings' }
]

// Positions
const currentPosition = ref<DockPosition>('bottom')
const positionItems: DockItem[] = [
  { key: 'home', icon: () => h('div', { class: 'i-mdi:home' }), label: 'Home' },
  { key: 'search', icon: () => h('div', { class: 'i-mdi:magnify' }), label: 'Search' },
  { key: 'settings', icon: () => h('div', { class: 'i-mdi:cog' }), label: 'Settings' },
  { key: 'github', icon: () => h('div', { class: 'i-mdi:github' }), label: 'GitHub' },
  { key: 'email', icon: () => h('div', { class: 'i-mdi:email' }), label: 'Email' }
]

// Sizes
const tinyItems: DockItem[] = [
  { key: 'home', icon: () => h('div', { class: 'i-mdi:home' }), label: 'Home' },
  { key: 'search', icon: () => h('div', { class: 'i-mdi:magnify' }), label: 'Search' },
  { key: 'settings', icon: () => h('div', { class: 'i-mdi:cog' }), label: 'Settings' }
]
const smallItems: DockItem[] = [...tinyItems]
const mediumItems: DockItem[] = [...tinyItems]
const largeItems: DockItem[] = [...tinyItems]
</script>

<template>
  <!-- Basic -->
  <div class="relative w-full h-40 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
    <Dock :items="basicItems" />
  </div>

  <!-- Positions -->
  <Segmented
    v-model:value="currentPosition"
    :options="[
      { label: 'Top', value: 'top' },
      { label: 'Bottom', value: 'bottom' },
      { label: 'Left', value: 'left' },
      { label: 'Right', value: 'right' },
    ]"
  />
  <div class="relative w-full h-60 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
    <Dock :items="positionItems" :position="currentPosition" />
  </div>

  <!-- Sizes -->
  <NFlex vertical>
    <div class="relative w-full h-40 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
      <Dock :items="tinyItems" size="tiny" />
    </div>
    <div class="relative w-full h-40 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
      <Dock :items="smallItems" size="small" />
    </div>
    <div class="relative w-full h-40 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
      <Dock :items="mediumItems" size="medium" />
    </div>
    <div class="relative w-full h-40 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
      <Dock :items="largeItems" size="large" />
    </div>
  </NFlex>

  <!-- Tooltip Options -->
  <div class="relative w-full h-40 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
    <Dock :items="basicItems" :tooltip-options="{ placement: 'bottom' }" />
  </div>
</template>
```

## Tips

### Icon Usage

The `icon` property accepts a render function that returns a VNode, similar to Naive UI's approach:

```typescript
import { h } from 'vue'

const dockItems: DockItem[] = [
  {
    key: 'home',
    icon: () => h('div', { class: 'i-mdi:home' }),
    label: 'Home'
  }
]
```

It's recommended to use the [Icones](https://icones.js.org/) icon library for icons.

### Positioning

The Dock component uses `position: absolute` and should be placed inside a container with `position: relative`.

### Theme Adaptation

The Dock features a macOS-style frosted glass background:

- **Light mode**: `rgba(255, 255, 255, 0.5)` background with white border
- **Dark mode**: `rgba(255, 255, 255, 0.1)` background with lighter border
- Both modes use `backdrop-filter: blur(20px)` for the frosted glass effect
