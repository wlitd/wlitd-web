<script setup lang="ts">
const route = useRoute()

const { keepAliveNames } = storeToRefs(useTabStore())
const { addCachedView } = useTabStore()

watch(
  () => route.fullPath,
  () => {
    if (route.meta.keepAlive) {
      // 同步添加，确保渲染时 include 列表里已经有它
      addCachedView(route)
    }
  },
  { immediate: true } // 初始化时也执行
)
</script>

<template>
  <NLayout has-sider class="h-full">
    <DefaultSider />
    <NLayout>
      <DefaultHeader />
      <NLayoutContent
        class="rounded-tl-8 mask flex-1 bg-surface" :native-scrollbar="false"
        content-class="pt-4 pb-3 pl-4 pr-3 h-full"
      >
        <RouterView v-slot="{ Component }">
          <ProTransition>
            <KeepAlive :include="keepAliveNames">
              <component :is="Component" :key="route.fullPath" />
            </KeepAlive>
          </ProTransition>
        </RouterView>
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>

<style lang="css" scoped>
:deep(.n-layout-scroll-container) {
  display: flex;
  flex-direction: column;
}
</style>
