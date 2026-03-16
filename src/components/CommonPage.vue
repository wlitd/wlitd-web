<script setup lang="ts">
import { useThemeVars } from 'naive-ui'

const route = useRoute()
const titleKey = route.meta.titleKey || ''

const themeVars = useThemeVars()
</script>

<template>
  <div class="rounded-xl h-full flex flex-col" :style="{ backgroundColor: themeVars.cardColor }">
    <div class="flex justify-between py-3 px-4">
      <slot name="header">
        <NH6 prefix="bar">
          <!-- 路由的翻译资源存在全局 message 中，所以采用 $t 去翻译 -->
          <NText italic>{{ $t(titleKey) }}</NText>
        </NH6>
      </slot>
      <slot name="header-extra" />
    </div>
    <div class="flex-1 overflow-y-auto px-4 py-3 custom-scrollbar">
      <slot />
    </div>
  </div>
</template>

<style lang="css" scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: calc(v-bind('themeVars.scrollbarWidth') + 4px);
  height: v-bind('themeVars.scrollbarHeight');
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: v-bind('themeVars.scrollbarColor');
  border-radius: v-bind('themeVars.scrollbarBorderRadius');
  border: 2px solid transparent;
  background-clip: content-box;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: v-bind('themeVars.scrollbarColorHover');
  border: 2px solid transparent;
  background-clip: content-box;
}
</style>
