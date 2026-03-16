<template>
  <NLayout has-sider class="h-full">
    <DefaultSider />
    <NLayout>
      <DefaultHeader />
      <NLayoutContent
        class="rounded-tl-8 mask flex-1 bg-surface" :native-scrollbar="false"
        content-class="pt-4 pb-3 pl-4 pr-3 h-full"
      >
        <ProTransition>
          <KeepAliveWrapper />
        </ProTransition>
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
