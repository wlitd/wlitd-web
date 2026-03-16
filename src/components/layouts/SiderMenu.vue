<script setup lang="ts">
import type { MenuInst } from 'naive-ui'

const menuRef = ref<MenuInst>()

const route = useRoute()
// 根据路由元信息设置菜单选中
const activeKey = computed<string>(() => route.meta.titleKey || '')

// 监听路由变化，展开菜单
watch(route, () => {
  nextTick(() => {
    menuRef.value?.showOption()
  })
})

const { menuCollapsed } = storeToRefs(useGlobalStore())

const { menuOpts } = useMenuOpts()
</script>

<template>
  <NScrollbar class="flex-1">
    <NMenu
      ref="menuRef" accordion :value="activeKey" :collapsed="menuCollapsed" :collapsed-width="64"
      :options="menuOpts" responsive :indent="16"
    />
  </NScrollbar>
</template>
