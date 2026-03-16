<script setup lang="ts">
const { menuCollapsed } = storeToRefs(useGlobalStore())
const { toggleMenuCollapsed } = useGlobalStore()
</script>

<template>
  <NLayoutSider
    collapse-mode="width" :width="232" :collapsed-width="64" :collapsed="menuCollapsed"
    @collapse="toggleMenuCollapsed" @expand="toggleMenuCollapsed"
  >
    <div class="flex flex-col gap-y-3 h-full">
      <Brand />
      <SiderMenu />
      <Copyright />
    </div>
  </NLayoutSider>
</template>
