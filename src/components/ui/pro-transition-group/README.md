# ProTransitionGroup

An enhanced transition group component that wraps Vue's built-in TransitionGroup with additional functionality and styling.

## Features

- Inherits all properties from Vue's TransitionGroup component
- Built-in smooth transition animations for enter, leave, and move operations
- Predefined transition styles for common use cases
- Supports all standard TransitionGroup slots and events

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| name | `string` | `'list'` | The name of the transition to be used for CSS classes |
| tag | `string` | `'div'` | The HTML tag to be used as the transition wrapper element |

In addition to these props, all standard Vue [TransitionGroup props](https://vuejs.org/api/built-in-components.html#transitiongroup) are supported.

## Events

| Name | Parameters | Description |
|------|------------|-------------|
| before-enter | `Element` | Emitted before an element enters |
| enter | `Element` | Emitted when an element enters |
| after-enter | `Element` | Emitted after an element finishes entering |
| before-leave | `Element` | Emitted before an element leaves |
| leave | `Element` | Emitted when an element leaves |
| after-leave | `Element` | Emitted after an element finishes leaving |

## Slots

| Name | Description |
|------|-------------|
| default | The content of the transition group |

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import ProTransitionGroup from '@/components/ui/pro-transition-group/ProTransitionGroup.vue'

const items = ref([
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' }
])

const addItem = () => {
  const id = items.value.length + 1
  items.value.push({ id, name: `Item ${id}` })
}

const removeItem = (id: number) => {
  items.value = items.value.filter(item => item.id !== id)
}
</script>

<template>
  <div>
    <div class="flex gap-2 mb-4">
      <button class="bg-blue-500 text-white px-4 py-2 rounded" @click="addItem">
        Add Item
      </button>
    </div>

    <ProTransitionGroup tag="ul" class="grid grid-cols-3 gap-2">
      <li
        v-for="item in items"
        :key="item.id"
        class="bg-gray-100 p-4 rounded flex justify-between items-center"
      >
        {{ item.name }}
        <button
          class="bg-red-500 text-white px-2 py-1 rounded text-sm"
          @click="removeItem(item.id)"
        >
          Remove
        </button>
      </li>
    </ProTransitionGroup>
  </div>
</template>
```
