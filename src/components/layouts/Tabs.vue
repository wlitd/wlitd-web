<script setup lang="ts">
const { primaryColor } = storeToRefs(useThemeStore())

const route = useRoute()
const router = useRouter()
const activeKey = ref<string>('')

watch(() => route.fullPath, (newPath) => {
  activeKey.value = newPath
}, { immediate: true })

const { tabList } = storeToRefs(useTabStore())
const { closeTab } = useTabStore()

function handleClose(fullPath: string): void {
  const tab = tabList.value.find(t => t.fullPath === fullPath)
  if (tab) {
    closeTab(tab, router)
  }
}

const showDropdown = ref<boolean>(false)
const x = ref<number>(0)
const y = ref<number>(0)
const currentTab = ref<TabItem>({ routeName: '', fullPath: '', titleKey: '' })

function handleContextMenu(event: MouseEvent, tab: TabItem): void {
  x.value = event.clientX
  y.value = event.clientY
  currentTab.value = tab
  showDropdown.value = true
}
</script>

<template>
  <div>
    <NTabs
      v-model:value="activeKey" type="card" animated :closable="tabList.length > 1 || activeKey !== '/'"
      @close="handleClose" @update:value="(fullPath: string) => router.push(fullPath)"
    >
      <NTabPane v-for="tab in tabList" :key="tab.fullPath" :name="tab.fullPath">
        <template #tab>
          <NFlex align="center" @contextmenu.prevent="handleContextMenu($event, tab)">
            <NBadge v-if="tab.fullPath === activeKey" dot :color="primaryColor" />
            <span>{{ tab.titleKey ? $t(tab.titleKey) : '' }}</span>
          </NFlex>
        </template>
      </NTabPane>
    </NTabs>

    <TabDropdown v-model:show="showDropdown" :x="x" :y="y" :tab="currentTab" :active-key="activeKey" />
  </div>
</template>

<style lang="css" scoped>
:deep(.n-tabs) {
  .n-tabs-tab {
    height: 32px;
    padding: 4px 8px !important;
    border-radius: 12px !important;
    margin-right: 4px;

    &:hover {
      color: var(--primary-color);
      border: 1px solid var(--primary-color) !important;
    }
  }

  .n-tabs-tab--active {
    border: 1px solid var(--primary-color) !important;
  }

  .n-tab-pane {
    padding: 0 !important;
  }
}
</style>
