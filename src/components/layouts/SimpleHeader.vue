<script setup lang="tsx">
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

const { menuOpts } = useMenuOpts()
</script>

<template>
  <NLayoutHeader class="flex flex-col pl-4 pr-3 pb-2 w-full">
    <div class="flex justify-between items-center">
      <div class="flex items-center flex-1 overflow-hidden">
        <Brand />
        <NScrollbar class="flex-1">
          <NMenu
            ref="menuRef" accordion :value="activeKey" mode="horizontal" :options="menuOpts" responsive
            :indent="16"
          />
        </NScrollbar>
      </div>
      <div class="flex justify-end items-center shrink-0">
        <NDivider vertical />
        <div class="flex gap-4 items-center">
          <GitHubIcon />
          <ThemeIcon />
          <LayoutSettingIcon />
          <ColorPicker />
          <LocalePicker />
          <SimpleUserDropdown />
        </div>
      </div>
    </div>
    <Tabs />
  </NLayoutHeader>
</template>
