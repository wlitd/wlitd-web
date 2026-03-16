# RippleButton

An enhanced button component that wraps the Naive UI button with additional functionality and styling.

## Features

- Inherits all properties from Naive UI's button component
- Built-in ripple effect for better user experience
- Automatic rounded-xl styling (unless round or circle props are used)
- Supports all standard button slots and events
- Automatically inherits size state from parent NFormItem context
- Automatically inherits disabled from parent NFormItem context

## Props

All props are inherited from Naive UI's [ButtonProps](https://www.naiveui.com/en-US/os-theme/components/button#Button-Props).

> **Note:** The `size`、`disabled` prop will be overridden by the parent `NFormItem`'s disabled state if the button is used within a form item context.

## Events

| Name | Parameters | Description |
|------|------------|-------------|
| click | `MouseEvent` | Emitted when the button is clicked |

## Slots

| Name | Description |
|------|-------------|
| default | The content of the button |
| icon | Content placed in the icon slot |

> **Note:** The examples use UnoCSS icons (e.g., `i-line-md:cloud-alt-download-loop`) which are automatically transformed into icon elements. You can use any icon component or SVG in the icon slot.

## Usage

```vue
<script setup lang="ts">
import RippleButton from '@/components/ui/ripple-button/RippleButton.vue'

const handleClick = (event: MouseEvent) => {
  console.log('Button clicked', event)
}
</script>

<template>
  <NFlex vertical>
    <!-- Basic Usage -->
    <NFlex>
      <RippleButton @click="handleClick">Default</RippleButton>
      <RippleButton type="tertiary" @click="handleClick">Tertiary</RippleButton>
      <RippleButton type="primary" @click="handleClick">Primary</RippleButton>
      <RippleButton type="info" @click="handleClick">Info</RippleButton>
      <RippleButton type="success" @click="handleClick">Success</RippleButton>
      <RippleButton type="warning" @click="handleClick">Warning</RippleButton>
      <RippleButton type="error" @click="handleClick">Error</RippleButton>
    </NFlex>

    <!-- Button Sizes -->
    <NFlex align="center">
      <RippleButton size="tiny" @click="handleClick">Tiny</RippleButton>
      <RippleButton size="small" @click="handleClick">Small</RippleButton>
      <RippleButton size="medium" @click="handleClick">Medium</RippleButton>
      <RippleButton size="large" @click="handleClick">Large</RippleButton>
    </NFlex>

    <!-- Primary and Secondary Buttons -->
    <NFlex align="center">
      <RippleButton @click="handleClick">Default</RippleButton>
      <RippleButton strong secondary @click="handleClick">Default</RippleButton>
      <RippleButton tertiary @click="handleClick">Default</RippleButton>
      <RippleButton quaternary @click="handleClick">Default</RippleButton>
    </NFlex>

    <!-- Special Types -->
    <NFlex>
      <RippleButton dashed @click="handleClick">Dashed</RippleButton>
      <RippleButton text @click="handleClick">Text</RippleButton>
    </NFlex>

    <!-- Ghost Buttons -->
    <NFlex>
      <RippleButton ghost @click="handleClick">Default</RippleButton>
      <RippleButton ghost type="primary" @click="handleClick">Primary</RippleButton>
      <RippleButton ghost type="info" @click="handleClick">Info</RippleButton>
      <RippleButton ghost type="success" @click="handleClick">Success</RippleButton>
      <RippleButton ghost type="warning" @click="handleClick">Warning</RippleButton>
      <RippleButton ghost type="error" @click="handleClick">Error</RippleButton>
    </NFlex>

    <!-- Status -->
    <NFlex>
      <RippleButton loading @click="handleClick">Loading</RippleButton>
      <RippleButton disabled @click="handleClick">Disabled</RippleButton>
    </NFlex>

    <!-- Shape -->
    <NFlex>
      <RippleButton @click="handleClick">Default</RippleButton>
      <RippleButton round @click="handleClick">Round</RippleButton>
      <RippleButton circle @click="handleClick">Circle</RippleButton>
    </NFlex>

    <!-- Icon Buttons -->
    <NFlex>
      <RippleButton @click="handleClick">
        <template #icon>
          <div class="i-line-md:cloud-alt-download-loop" />
        </template>
        Download
      </RippleButton>
      <RippleButton circle @click="handleClick">
        <template #icon>
          <div class="i-mdi:reload" />
        </template>
      </RippleButton>
      <RippleButton quaternary circle @click="handleClick">
        <template #icon>
          <div class="i-mdi:magnify" />
        </template>
      </RippleButton>
    </NFlex>
  </NFlex>
</template>
