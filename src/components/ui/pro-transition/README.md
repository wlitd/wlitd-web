# ProTransition

A transition component that wraps Vue's built-in Transition with a default fade effect.

## Features

- Built-in fade transition with out-in mode
- Supports all properties and events from Vue's Transition component via `v-bind="$attrs"`
- Customizable transition styles with CSS
- Supports all standard transition slots

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| name | string | `'fade'` | The name of the transition effect |
| mode | `'in-out' \| 'out-in' \| 'default'` | `'out-in'` | The transition mode |

In addition, all properties from Vue's [Transition component](https://vuejs.org/api/built-in-components.html#transition) are supported via `v-bind="$attrs"`.

## Events

| Name | Parameters | Description |
|------|------------|-------------|
| before-enter | - | Emitted before the enter transition starts |
| enter | - | Emitted during the enter transition |
| after-enter | - | Emitted after the enter transition ends |
| enter-cancelled | - | Emitted when the enter transition is cancelled |
| before-leave | - | Emitted before the leave transition starts |
| leave | - | Emitted during the leave transition |
| after-leave | - | Emitted after the leave transition ends |
| leave-cancelled | - | Emitted when the leave transition is cancelled |

## Slots

| Name | Description |
|------|-------------|
| default | The content to be transitioned |

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import ProTransition from '@/components/ui/pro-transition/ProTransition.vue'

const show = ref(true)

const toggle = () => {
  show.value = !show.value
}
</script>

<template>
  <div>
    <NFlex vertical>
      <NButton @click="toggle">Toggle Content</NButton>

      <ProTransition>
        <div v-if="show" class="p-4 bg-blue-100 rounded mt-4">
          This content has a fade transition!
        </div>
      </ProTransition>
    </NFlex>
  </div>
</template>
```

## Advanced Usage

You can customize the transition by passing any valid Transition props:

```vue
<template>
  <div>
    <!-- Custom transition name -->
    <ProTransition name="slide-fade">
      <div v-if="show">Content with custom transition</div>
    </ProTransition>

    <!-- Custom transition events -->
    <ProTransition
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @after-enter="onAfterEnter"
    >
      <div v-if="show">Content with custom events</div>
    </ProTransition>
  </div>
</template>

<style scoped>
/* Custom transition styles */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
  transform: translateX(20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>
```
