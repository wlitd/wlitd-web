# Segmented

A segmented control component for selecting one option from a set. It uses Naive UI's CSS variables for consistent theming.

## Features

- Supports multiple sizes (tiny, small, medium, large)
- Block mode for full-width display
- Disabled state support (global and per-option)
- Custom label rendering via slot
- Two-way data binding with v-model
- Uses Naive UI's CSS variables for seamless theme integration

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| value | `string \| number` | `undefined` | Currently selected value |
| options | `SegmentedOption[]` | `[]` | Array of options to display |
| size | `'tiny' \| 'small' \| 'medium' \| 'large'` | `'medium'` | Size of the segmented control |
| disabled | `boolean` | `false` | Whether the entire control is disabled |
| block | `boolean` | `false` | Whether to take full width |

### SegmentedOption

| Name | Type | Default | Description |
|------|------|---------|-------------|
| label | `string` | `undefined` | Display label (falls back to value if not provided) |
| value | `string \| number` | **required** | Unique value for the option |
| disabled | `boolean` | `false` | Whether this specific option is disabled |
| [key: string] | `any` | - | Additional custom properties can be added for use in custom label slots |

## Events

| Name | Parameters | Description |
|------|------------|-------------|
| update:value | `string \| number` | Emitted when selection changes (for v-model) |
| change | `SegmentedOption` | Emitted when selection changes, returns the selected option object |

## Slots

| Name | Description | Slot Props |
|------|-------------|------------|
| label | Custom rendering for option labels | `{ option: SegmentedOption }` |

## Usage

```vue
<script setup lang="ts">
import type { SegmentedOption } from '@/components/ui/segmented/types'
import { reactive, ref } from 'vue'

// Basic
const basicVal = ref<string>('daily')
const basicOpts: SegmentedOption[] = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' }
]

// Sizes
const tinyVal = ref<string>('daily')
const smallVal = ref<string>('daily')
const mediumVal = ref<string>('daily')
const largeVal = ref<string>('daily')
const sizeOpts: SegmentedOption[] = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' }
]

// Disabled
const disabledVal = ref<string>('free')
const blockDisabledVal = ref<string>('free')
const disabledOpts: SegmentedOption[] = [
  { label: 'Free', value: 'free' },
  { label: 'Pro', value: 'pro' },
  { label: 'Enterprise', value: 'enterprise', disabled: true }
]

// Block
const blockVal = ref<string>('option1')
const blockOpts: SegmentedOption[] = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' }
]

// Custom
const customVal = ref<string>('list')
const customOpts: SegmentedOption[] = reactive([
  { label: 'List', value: 'list', icon: 'i-mdi:format-list-bulleted' },
  { label: 'Grid', value: 'grid', icon: 'i-mdi:view-grid' },
  { label: 'Table', value: 'table', icon: 'i-mdi:table' }
])

const isLoaded = ref<boolean>(false)
function handleLoadMore(): void {
  customOpts.push({
    label: 'Loaded',
    value: 'loaded',
    icon: 'i-mdi:check'
  })
  isLoaded.value = true
}
</script>

<template>
  <!-- Basic -->
  <Segmented v-model:value="basicVal" :options="basicOpts" />

  <!-- Sizes -->
  <NFlex vertical>
    <Segmented v-model:value="tinyVal" :options="sizeOpts" size="tiny" />
    <Segmented v-model:value="smallVal" :options="sizeOpts" size="small" />
    <Segmented v-model:value="mediumVal" :options="sizeOpts" size="medium" />
    <Segmented v-model:value="largeVal" :options="sizeOpts" size="large" />
  </NFlex>

  <!-- Disabled -->
  <NFlex vertical>
    <Segmented v-model:value="disabledVal" :options="disabledOpts" />
    <Segmented v-model:value="blockDisabledVal" :options="disabledOpts" disabled />
  </NFlex>

  <!-- Block -->
  <Segmented v-model:value="blockVal" :options="blockOpts" block />

  <!-- Custom -->
  <NFlex vertical>
    <Segmented v-model:value="customVal" :options="customOpts">
      <template #label="{ option }">
        <NFlex vertical class="h-full py-1" align="center" justify="center">
          <div :class="option.icon" />
          <span>{{ option.label }}</span>
        </NFlex>
      </template>
    </Segmented>
    <RippleButton :disabled="isLoaded" @click="handleLoadMore">Load More</RippleButton>
  </NFlex>
</template>
```
