<script setup lang="ts">
import type { Component } from 'vue'
import Blank from '@/layouts/blank.vue'
import Default from '@/layouts/default.vue'
import Simple from '@/layouts/simple.vue'

// 2. 建立映射表
const layoutMap: Record<LayoutName, Component> = {
  Blank: Blank,
  Default: Default,
  Simple: Simple
}

const route = useRoute()
const { currentLayout } = storeToRefs(useLayoutStore())

// 3. 计算当前应该显示哪个布局组件
const currentLayoutComponent = computed<Component>(() => {
  const layoutName = route.meta.layout || currentLayout.value
  return layoutMap[layoutName] || Default
})
</script>

<template>
  <component :is="currentLayoutComponent">
    <RouterView />
  </component>
</template>
