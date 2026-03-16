<script setup lang="ts">
import type { ProTransitionProps } from './types'

defineOptions({
  inheritAttrs: false
})

const { name = 'fade', mode = 'out-in' } = defineProps<ProTransitionProps>()
</script>

<template>
  <Transition v-bind="{ name, mode, ...$attrs }">
    <slot />
  </Transition>
</template>

<style lang="css">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
