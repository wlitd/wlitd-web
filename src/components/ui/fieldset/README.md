# Fieldset

A fieldset component that wraps native `<fieldset>` element with collapsible functionality and Naive UI theming support.

## Features

- Collapsible content with smooth animation
- Customizable legend via slot
- Programmatic toggle control via ref
- Multiple sizes (tiny, small, medium, large)
- Uses Naive UI's CSS variables for seamless theme integration

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| size | `'tiny' \| 'small' \| 'medium' \| 'large'` | `'medium'` | Size of the fieldset padding and legend font |
| legend | `string` | `''` | Legend text displayed in the fieldset header |
| toggleable | `boolean` | `false` | Whether the fieldset can be collapsed/expanded |

## Events

| Name | Parameters | Description |
|------|------------|-------------|
| update:expand | `boolean` | Emitted when expand state changes (for v-model:expand) |

## Slots

| Name | Description | Slot Props |
|------|-------------|------------|
| default | Content inside the fieldset | - |
| legend | Custom legend rendering | - |

## Methods

| Name | Parameters | Description |
|------|------------|-------------|
| toggleExpand | - | Toggle the expand/collapse state programmatically |

## Usage

```vue
<script setup lang="ts">
import type { FieldsetInst } from '@/components/ui/fieldset/types'

// Basic
const basicLegend = 'Header'

// Toggleable
const toggleableLegend = 'Toggleable'

// Custom legend with ref control
const fieldsetRef = ref<FieldsetInst>()
function handleClick(): void {
  fieldsetRef.value?.toggleExpand()
}
</script>

<template>
  <!-- Basic -->
  <Fieldset :legend="basicLegend">
    Content goes here...
  </Fieldset>

  <!-- Toggleable -->
  <Fieldset :legend="toggleableLegend" toggleable>
    Collapsible content goes here...
  </Fieldset>

  <!-- Custom Legend -->
  <Fieldset ref="fieldsetRef">
    <template #legend>
      <NFlex align="center" class="px-2 cursor-pointer" @click="handleClick">
        <img class="rounded-full size-8" src="/logo.svg" alt="">
        <span>Custom Legend</span>
      </NFlex>
    </template>
    Content with custom legend...
  </Fieldset>
</template>
```
