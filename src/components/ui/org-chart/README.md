# OrgChart

An organization chart component for displaying hierarchical data. Supports pan, zoom, node selection, and collapsing. It uses Naive UI's CSS variables for consistent theming.

## Features

- Pan and zoom the canvas via mouse drag and scroll wheel
- Collapsible nodes with animated toggle button
- Single and multiple selection modes
- Per-node `collapsible` and `selectable` overrides
- Custom node rendering via slot
- Two-way data binding with v-model for selected and collapsed keys
- Uses Naive UI's CSS variables for seamless theme integration

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| value | `OrgChartNode[]` | **required** | Tree data to display |
| selectionMode | `'single' \| 'multiple'` | `undefined` | Node selection mode; omit to disable selection |
| collapsible | `boolean` | `true` | Whether nodes can be collapsed/expanded globally |

### v-model

| Name | Type | Default | Description |
|------|------|---------|-------------|
| selectedKeys | `string[]` | `[]` | Keys of currently selected nodes |
| collapsedKeys | `string[]` | `[]` | Keys of currently collapsed nodes |

### OrgChartNode

| Name | Type | Default | Description |
|------|------|---------|-------------|
| key | `string` | **required** | Unique identifier for the node |
| collapsible | `boolean` | `undefined` | Override global `collapsible` for this node; set `false` to prevent collapsing |
| selectable | `boolean` | `undefined` | Override global `selectionMode` for this node; set `false` to prevent selection |
| nodeClass | `string` | `undefined` | CSS class applied to the node wrapper |
| nodeStyle | `CSSProperties` | `undefined` | Inline styles applied to the node wrapper |
| children | `OrgChartNode[]` | `undefined` | Child nodes |
| [key: string] | `any` | - | Additional custom properties available in the `node` slot |

## Events

| Name | Parameters | Description |
|------|------------|-------------|
| select | `node: OrgChartNode, selected: boolean` | Emitted when a node's selection state changes |
| collapse | `node: OrgChartNode, collapsed: boolean` | Emitted when a node is collapsed or expanded |

## Slots

| Name | Description | Slot Props |
|------|-------------|------------|
| node | Custom rendering for node content | `{ node: OrgChartNode, collapsed: boolean, toggle: () => void }` |

## Usage

```vue
<script setup lang="ts">
import type { OrgChartNode } from '@/components/ui/org-chart/types'
import { useThemeVars } from 'naive-ui'

// Basic
const basicData: OrgChartNode[] = [
  {
    key: '0',
    label: 'Argentina',
    children: [
      {
        key: '0-0',
        label: 'Argentina',
        children: [
          { key: '0-0-0', label: 'Argentina' },
          { key: '0-0-1', label: 'Croatia' }
        ]
      },
      {
        key: '0-1',
        label: 'France',
        children: [
          { key: '0-1-0', label: 'Morocco' }
        ]
      }
    ]
  }
]

// Selectable
const themeVars = useThemeVars()
const selectableData: OrgChartNode[] = [
  {
    key: '0',
    label: 'Argentina',
    children: [
      {
        key: '0-0',
        label: 'Argentina',
        children: [
          { key: '0-0-0', label: 'Argentina', selectable: false },
          { key: '0-0-1', label: 'Croatia' }
        ]
      },
      {
        key: '0-1',
        label: 'France',
        children: [
          { key: '0-1-0', label: 'Morocco' }
        ]
      }
    ]
  }
]

// Collapsible
const collapsibleData: OrgChartNode[] = [
  {
    key: '0',
    label: 'Argentina',
    children: [
      {
        key: '0-0',
        label: 'Argentina',
        children: [
          { key: '0-0-0', label: 'Argentina' },
          { key: '0-0-1', label: 'Croatia' }
        ]
      },
      {
        key: '0-1',
        label: 'France',
        collapsible: false,
        children: [
          { key: '0-1-0', label: 'Morocco' }
        ]
      }
    ]
  }
]

// Slots
const slotsData: OrgChartNode[] = [
  {
    key: '0',
    label: 'Dong Ming Rui',
    icon: 'i-flag:cn-4x3',
    description: 'CEO',
    children: [
      {
        key: '0-0',
        label: 'Argentina',
        icon: 'i-flag:ar-4x3',
        description: 'CMO',
        children: [
          { key: '0-0-0', label: 'Jack', icon: 'i-flag:ar-4x3' },
          { key: '0-0-1', label: 'Mike', icon: 'i-flag:hr-4x3' }
        ]
      },
      {
        key: '0-1',
        label: 'France',
        icon: 'i-flag:fr-4x3',
        description: 'CTO',
        children: [
          { key: '0-1-0', label: 'Lucy', icon: 'i-flag:ma-4x3' },
          { key: '0-1-1', label: 'Mike', icon: 'i-flag:fr-4x3' }
        ]
      }
    ]
  }
]
</script>

<template>
  <!-- Basic -->
  <div class="h-100">
    <OrgChart :value="basicData">
      <template #node="{ node }">
        <div class="flex justify-center items-center">{{ node.label }}</div>
      </template>
    </OrgChart>
  </div>

  <!-- Selectable -->
  <NFlex vertical>
    <div class="h-100">
      <span>Single:</span>
      <OrgChart :value="selectableData" selection-mode="single">
        <template #node="{ node }">
          <div
            class="flex justify-center items-center" :style="{
              color: node.selectable === false ? themeVars.textColorDisabled : themeVars.textColorBase,
            }"
          >
            {{ node.label }}
          </div>
        </template>
      </OrgChart>
    </div>
    <div class="h-100">
      <span>Multiple:</span>
      <OrgChart :value="selectableData" selection-mode="multiple">
        <template #node="{ node }">
          <div
            class="flex justify-center items-center" :style="{
              color: node.selectable === false ? themeVars.textColorDisabled : themeVars.textColorBase,
            }"
          >
            {{ node.label }}
          </div>
        </template>
      </OrgChart>
    </div>
  </NFlex>

  <!-- Collapsible -->
  <div class="h-100">
    <OrgChart :value="collapsibleData" :default-collapsed="true">
      <template #node="{ node }">
        <div class="flex justify-center items-center">{{ node.label }}</div>
      </template>
    </OrgChart>
  </div>

  <!-- Slots -->
  <div class="h-100">
    <OrgChart :value="slotsData" selection-mode="single">
      <template #node="{ node }">
        <div class="flex flex-col items-center justify-center">
          <div :class="node.icon" />
          <div>{{ node.label }}</div>
          <div>{{ node.description }}</div>
        </div>
      </template>
    </OrgChart>
  </div>
</template>
```
