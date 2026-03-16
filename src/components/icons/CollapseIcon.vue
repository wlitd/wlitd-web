<script setup lang="ts">
const { menuCollapsed } = storeToRefs(useGlobalStore())
const { toggleMenuCollapsed } = useGlobalStore()
</script>

<template>
  <div
    class="size-5 cursor-pointer" :class="menuCollapsed ? 'i-line-md:menu-fold-right' : 'i-line-md:menu-fold-left'"
    @click="toggleMenuCollapsed"
  />
</template>
