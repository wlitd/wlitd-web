# ComponentDemo

A demo container component that displays component examples with toggleable source code view and ComponentDemos for arranging multiple demos in a grid layout.

## Features

- Displays a title for the demo
- Provides toggleable source code view
- Includes copy functionality
- Supports internationalization (Chinese/English)
- Uses highlight.js for code syntax highlighting
- Arranges multiple demos in responsive grid layouts with ComponentDemos

## Props

| Prop | Type | Description |
|------|------|-------------|
| title | `string` | The title displayed in the header of the demo card |
| code | `string` | The source code to be displayed when toggled |

## Slots

| Name | Description |
|------|-------------|
| default | The content of the demo component |

## Usage

```vue
<script setup lang="ts">
import ComponentDemo from '@/components/ui/component-demo/ComponentDemo.vue'

const demoCode = `
<template>
  <RippleButton>Sample Button</RippleButton>
</template>
`
</script>

<template>
  <ComponentDemo title="Basic Usage" :code="demoCode">
    <RippleButton>Sample Button</RippleButton>
  </ComponentDemo>
</template>
```

## Internationalization

ComponentDemo supports Chinese and English with the following translations:

- Copy: "复制代码" / "Copy Code"
- Show Code: "显示代码" / "Show Code"
- Hide Code: "隐藏代码" / "Hide Code"
- Copy Success: "复制成功！" / "Copied Successfully!"
- Copy Failed: "复制失败！" / "Copy Failed!"

## ComponentDemos

A component for arranging multiple ComponentDemo instances in a responsive grid layout.

### Features

- Responsive grid layout for multiple demos
- Configurable column span (1 or 2 columns)
- Automatically distributes child components between columns in a balanced way
- Grid layout adapts based on the span property

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| span | `Number` | `2` | Controls the number of columns in the grid layout. When set to 1, displays all demos in a single column. When set to 2, distributes demos in a two-column layout |

### Usage

```vue
<script setup lang="ts">
import ComponentDemo from '@/components/ui/component-demo/ComponentDemo.vue'
import ComponentDemos from '@/components/ui/component-demo/ComponentDemos.tsx'

const code1 = `
<template>
  <RippleButton>Sample Button</RippleButton>
</template>
`

const code2 = `
<template>
  <RippleButton type="primary">Primary Button</RippleButton>
</template>
`

const code3 = `
<template>
  <RippleButton type="success">Success Button</RippleButton>
</template>
`
</script>

<template>
  <ComponentDemos :span="2">
    <ComponentDemo title="Demo 1" :code="code1">
      <RippleButton>Sample Button</RippleButton>
    </ComponentDemo>
    <ComponentDemo title="Demo 2" :code="code2">
      <RippleButton type="primary">Primary Button</RippleButton>
    </ComponentDemo>
    <ComponentDemo title="Demo 3" :code="code3">
      <RippleButton type="success">Success Button</RippleButton>
    </ComponentDemo>
  </ComponentDemos>
</template>
```
