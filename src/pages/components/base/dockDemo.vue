<script setup lang="ts">
import type { DockItem, DockPosition } from '@/components/ui/dock/types'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const dockItems: DockItem[] = [
  { key: 'home', icon: () => h('div', { class: 'i-mdi:home' }), label: 'Home' },
  { key: 'search', icon: () => h('div', { class: 'i-mdi:magnify' }), label: 'Search' },
  { key: 'settings', icon: () => h('div', { class: 'i-mdi:cog' }), label: 'Settings' },
  { key: 'github', icon: () => h('div', { class: 'i-mdi:github' }), label: 'GitHub' },
  { key: 'email', icon: () => h('div', { class: 'i-mdi:email' }), label: 'Email' }
]

const basicCode = `
<template>
  <div class="relative w-full h-40">
    <Dock :items="dockItems" />
  </div>
</template>

<script setup lang="ts">
import type { DockItem } from '@/components/ui/dock/types'

const dockItems: DockItem[] = [
  { key: 'home', icon: () => h('div', { class: 'i-mdi:home' }), label: 'Home' },
  { key: 'search', icon: () => h('div', { class: 'i-mdi:magnify' }), label: 'Search' },
  { key: 'settings', icon: () => h('div', { class: 'i-mdi:cog' }), label: 'Settings' },
  { key: 'github', icon: () => h('div', { class: 'i-mdi:github' }), label: 'GitHub' },
  { key: 'email', icon: () => h('div', { class: 'i-mdi:email' }), label: 'Email' }
]
<\/script>
`

const currentPosition = ref<DockPosition>('bottom')
const positionsCode = `
<template>
  <Segmented
    v-model:value="currentPosition"
    :options="[
        { label: 'Top', value: 'top' },
        { label: 'Bottom', value: 'bottom' },
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
        ]"
    />
    <div class="relative w-full h-60 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Dock :items="dockItems" :position="currentPosition" />
    </div>
</template>

<script setup lang="ts">
import type { DockItem, DockPosition } from '@/components/ui/dock/types'

const currentPosition = ref<DockPosition>('bottom')
const dockItems: DockItem[] = [
  { key: 'home', icon: () => h('div', { class: 'i-mdi:home' }), label: 'Home' },
  { key: 'search', icon: () => h('div', { class: 'i-mdi:magnify' }), label: 'Search' },
  { key: 'settings', icon: () => h('div', { class: 'i-mdi:cog' }), label: 'Settings' },
  { key: 'github', icon: () => h('div', { class: 'i-mdi:github' }), label: 'GitHub' },
  { key: 'email', icon: () => h('div', { class: 'i-mdi:email' }), label: 'Email' }
]
<\/script>
`

const sizeCode = `
<template>
  <div class="relative w-full h-40">
    <Dock :items="dockItems" size="tiny" />
  </div>

  <div class="relative w-full h-40">
    <Dock :items="dockItems" size="small" />
  </div>

  <div class="relative w-full h-40">
    <Dock :items="dockItems" size="medium" />
  </div>

  <div class="relative w-full h-40">
    <Dock :items="dockItems" size="large" />
  </div>
</template>

<script setup lang="ts">
import type { DockItem } from '@/components/ui/dock/types'

const dockItems: DockItem[] = [
  { key: 'home', icon: () => h('div', { class: 'i-mdi:home' }), label: 'Home' },
  { key: 'search', icon: () => h('div', { class: 'i-mdi:magnify' }), label: 'Search' },
  { key: 'settings', icon: () => h('div', { class: 'i-mdi:cog' }), label: 'Settings' },
  { key: 'github', icon: () => h('div', { class: 'i-mdi:github' }), label: 'GitHub' },
  { key: 'email', icon: () => h('div', { class: 'i-mdi:email' }), label: 'Email' }
]
<\/script>
`

const tooltipCode = `
<template>
  <div class="relative w-full h-40">
    <Dock :items="dockItems" :tooltip-options="{ placement: 'bottom' }" />
  </div>
</template>

<script setup lang="ts">
import type { DockItem } from '@/components/ui/dock/types'

const dockItems: DockItem[] = [
  { key: 'home', icon: () => h('div', { class: 'i-mdi:home' }), label: 'Home' },
  { key: 'search', icon: () => h('div', { class: 'i-mdi:magnify' }), label: 'Search' },
  { key: 'settings', icon: () => h('div', { class: 'i-mdi:cog' }), label: 'Settings' },
  { key: 'github', icon: () => h('div', { class: 'i-mdi:github' }), label: 'GitHub' },
  { key: 'email', icon: () => h('div', { class: 'i-mdi:email' }), label: 'Email' }
]
<\/script>
`
</script>

<template>
  <CommonPage>
    <template #header-extra>
      <NText italic>{{ t('description') }}</NText>
    </template>

    <ComponentDemos>
      <ComponentDemo :title="t('basic')" :code="basicCode">
        <div class="relative w-full h-40 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Dock :items="dockItems" />
        </div>
      </ComponentDemo>

      <ComponentDemo :title="t('positions')" :code="positionsCode">
        <Segmented
          v-model:value="currentPosition" :options="[
            { label: 'Top', value: 'top' },
            { label: 'Bottom', value: 'bottom' },
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
          ]"
        />
        <div class="relative w-full h-60 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Dock :items="dockItems" :position="currentPosition" />
        </div>
      </ComponentDemo>

      <ComponentDemo :title="t('size')" :code="sizeCode">
        <div class="flex flex-col gap-4">
          <div class="relative w-full h-40 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
            <Dock :items="dockItems" size="tiny" />
          </div>
          <div class="relative w-full h-40 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
            <Dock :items="dockItems" size="small" />
          </div>
          <div class="relative w-full h-40 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
            <Dock :items="dockItems" size="medium" />
          </div>
          <div class="relative w-full h-40 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
            <Dock :items="dockItems" size="large" />
          </div>
        </div>
      </ComponentDemo>

      <ComponentDemo :title="t('tooltip')" :code="tooltipCode">
        <div class="relative w-full h-40 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Dock :items="dockItems" :tooltip-options="{ placement: 'bottom' }" />
        </div>
      </ComponentDemo>
    </ComponentDemos>
  </CommonPage>
</template>

<i18n lang="json">
{
  "zh": {
    "description": "类似 macOS 风格的 Dock 导航栏组件",
    "basic": "基础",
    "positions": "位置",
    "size": "尺寸",
    "tooltip": "提示"
  },
  "en": {
    "description": "A macOS-style dock navigation component",
    "basic": "Basic",
    "positions": "Positions",
    "size": "Size",
    "tooltip": "Tooltip Options"
  }
}
</i18n>
