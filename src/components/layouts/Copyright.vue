<script setup lang="ts">
import { useThemeVars } from 'naive-ui'

const { menuCollapsed } = storeToRefs(useGlobalStore())

const themeVars = useThemeVars()

const copyright = getEnv('VITE_APP_COPYRIGHT')
</script>

<template>
  <ProTransitionGroup :style="{ color: themeVars.textColorBase }" class="flex-center h-10 overflow-x-hidden">
    <div v-if="!menuCollapsed" key="1" class="flex gap-2 items-center">
      <div class="i-mdi:copyright" />
      <div class="shrink-0 text-xs">{{ copyright }}</div>
    </div>
    <div v-else key="2" class="flex-center">
      <NTooltip trigger="hover" placement="right" style="padding: 4px 8px">
        <template #trigger>
          <div class="i-mdi:copyright cursor-pointer" />
        </template>
        <span class="text-xs">{{ copyright }}</span>
      </NTooltip>
    </div>
  </ProTransitionGroup>
</template>
