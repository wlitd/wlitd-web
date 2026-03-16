<script setup lang="ts">
import type { ProTransitionGroupProps } from './types'

defineOptions({
  inheritAttrs: false
})

const { name = 'list', tag = 'div' } = defineProps<ProTransitionGroupProps>()
</script>

<template>
  <TransitionGroup v-bind="{ name, tag, ...$attrs }">
    <slot />
  </TransitionGroup>
</template>

<style lang="css">
    /* 对移动中的元素应用的过渡 */
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}
</style>
