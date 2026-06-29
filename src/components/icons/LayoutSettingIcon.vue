<script setup lang="ts">
import type { LayoutName } from '@/stores/layout'
import { useThemeVars } from 'naive-ui'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const themeVars = useThemeVars()

const { currentLayout } = storeToRefs(useLayoutStore())
const { setLayout } = useLayoutStore()

const showModal = ref<boolean>(false)

function onSelectLayout(name: LayoutName): void {
  if (currentLayout.value !== name) {
    setLayout(name)
  }
}
</script>

<template>
  <NTooltip placement="bottom">
    <template #trigger>
      <div class="size-5 cursor-pointer i-mdi:page-layout-body" @click="showModal = true" />
    </template>
    {{ t('layoutSetting') }}
  </NTooltip>

  <NModal
    v-model:show="showModal" :auto-focus="false" transform-origin="center" preset="card"
    :title="t('layoutSetting')" :bordered="true" :segmented="{ content: true }"
    :style="{ 'width': '520px', '--hover-color': themeVars.hoverColor }"
  >
    <div class="grid grid-cols-2 gap-4">
      <!-- Default layout -->
      <div
        class="flex flex-col gap-2 p-3 rounded-xl border-solid b-transparent transition-all-300 cursor-pointer"
        :class="currentLayout === 'Default'
          ? 'b-[var(--primary-color)]! bg-[color-mix(in_srgb,var(--primary-color)_8%,transparent)]'
          : 'hover:b-[var(--primary-color)] hover:bg-[--hover-color]'" @click="onSelectLayout('Default')"
      >
        <div
          class="flex gap-1 h-16 w-full p-1 overflow-hidden pointer-events-none"
        >
          <div class="shrink-0 w-6">
            <NSkeleton height="100%" width="100%" :sharp="false" />
          </div>
          <div class="flex flex-col gap-1 flex-1 min-w-0">
            <div class="shrink-0 h-2">
              <NSkeleton height="100%" width="100%" :sharp="false" />
            </div>
            <div class="flex-1 min-h-0">
              <NSkeleton height="100%" width="100%" :sharp="false" />
            </div>
          </div>
        </div>
        <div class="flex-center gap-1 text-13px font-500">
          <span>{{ t('defaultLayout') }}</span>
          <div v-if="currentLayout === 'Default'" class="i-mdi:check-circle text-[var(--primary-color)]" />
        </div>
      </div>

      <!-- Simple layout -->
      <div
        class="flex flex-col gap-2 p-3 rounded-xl border-solid b-transparent transition-all-300 cursor-pointer"
        :class="currentLayout === 'Simple'
          ? 'b-[var(--primary-color)]! bg-[color-mix(in_srgb,var(--primary-color)_8%,transparent)]'
          : 'hover:b-[var(--primary-color)] hover:bg-[--hover-color]'" @click="onSelectLayout('Simple')"
      >
        <div
          class="flex flex-col gap-1 h-16 w-full p-1 overflow-hidden pointer-events-none"
        >
          <div class="shrink-0 h-2">
            <NSkeleton height="100%" width="100%" :sharp="false" />
          </div>
          <div class="flex-1 min-h-0">
            <NSkeleton height="100%" width="100%" :sharp="false" />
          </div>
        </div>
        <div class="flex-center gap-1 text-13px font-500">
          <span>{{ t('simpleLayout') }}</span>
          <div v-if="currentLayout === 'Simple'" class="i-mdi:check-circle text-[var(--primary-color)]" />
        </div>
      </div>
    </div>
  </NModal>
</template>

<i18n lang="json">
{
  "zh": {
    "layoutSetting": "布局设置",
    "defaultLayout": "默认",
    "simpleLayout": "简约"
  },
  "en": {
    "layoutSetting": "Layout Setting",
    "defaultLayout": "Default",
    "simpleLayout": "Simple"
  }
}
</i18n>
