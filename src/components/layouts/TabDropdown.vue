<script setup lang="ts">
import type { DropdownOption } from 'naive-ui'
import type { TabItem } from '@/stores/tab'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useTabStore } from '@/stores/tab'

interface TabDropdownProps {
  x: number
  y: number
  tab: TabItem
  activeKey: string
}

const { x, y, tab, activeKey } = defineProps<TabDropdownProps>()

const showDropdown = defineModel<boolean>('show')

const { t } = useI18n()

const { tabList } = storeToRefs(useTabStore())

const opts = computed<DropdownOption[]>(() => [
  {
    label: t('reload'),
    key: 'reload',
    disabled: activeKey !== tab.fullPath,
    icon: () => h('div', { class: 'i-icon-park-outline:refresh' })
  },
  {
    label: t('close'),
    key: 'close',
    disabled: tabList.value.length === 1 && tab.fullPath === '/',
    icon: () => h('div', { class: 'i-icon-park-outline:close' })
  },
  {
    key: 'divider',
    type: 'divider'
  },
  {
    label: t('left'),
    key: 'left',
    disabled: tab.fullPath === tabList.value[0]?.fullPath,
    icon: () => h('div', { class: 'i-icon-park-outline:to-left' })
  },
  {
    label: t('right'),
    key: 'right',
    disabled: tab.fullPath === tabList.value[tabList.value.length - 1]?.fullPath,
    icon: () => h('div', { class: 'i-icon-park-outline:to-right' })
  },
  {
    key: 'divider',
    type: 'divider'
  },
  {
    label: t('other'),
    key: 'other',
    disabled: tabList.value.length <= 1,
    icon: () => h('div', { class: 'i-icon-park-outline:auto-width' })
  },
  {
    label: t('all'),
    key: 'all',
    disabled: tabList.value.length === 1 && tab.fullPath === '/',
    icon: () => h('div', { class: 'i-icon-park-outline:close-one' })
  }
])

const router = useRouter()
const { closeTab, closeLeftTabs, closeRightTabs, closeOtherTabs, closeAllTabs } = useTabStore()

function handleSelect(key: string): void {
  switch (key) {
    case 'reload':
      // 重新加载当前页面
      router.go(0)
      break
    case 'close':
      closeTab(tab, router)
      break
    case 'left':
      closeLeftTabs(tab, router)
      break
    case 'right':
      closeRightTabs(tab, router)
      break
    case 'other':
      closeOtherTabs(tab, router)
      break
    case 'all':
      closeAllTabs(router)
      break
    default:
      break
  }

  showDropdown.value = false
}
</script>

<template>
  <NDropdown
    placement="bottom-start" :show="showDropdown" trigger="manual" :x="x" :y="y" :options="opts"
    :on-clickoutside="() => showDropdown = false" @select="handleSelect"
  />
</template>

<i18n lang="json">
{
  "zh": {
    "reload": "重新加载",
    "close": "关闭",
    "left": "关闭左侧标签",
    "right": "关闭右侧标签",
    "other": "关闭其他标签",
    "all": "关闭所有标签"
  },
  "en": {
    "reload": "Reload",
    "close": "Close",
    "left": "Close Left Tabs",
    "right": "Close Right Tabs",
    "other": "Close Other Tabs",
    "all": "Close All Tabs"
  }
}
</i18n>
