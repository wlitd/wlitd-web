<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { FieldsetProps } from './types'
import { useThemeVars } from 'naive-ui'

const { size = 'medium', legend = '', toggleable = false } = defineProps<FieldsetProps>()

defineSlots<{
  default: () => any
  legend?: () => any
}>()

const expand = defineModel<boolean>('expand', { default: true })

const themeVars = useThemeVars()
const { paddingX, fontSize, strongFont } = useNaiveSize(size)

const legendStyle = computed<CSSProperties>(() => ({
  fontSize: fontSize.value,
  ...strongFont.value,
  padding: `0 ${paddingX.value}px`
}))

function toggleExpand(): void {
  useToggle(expand)()
}

defineExpose({ toggleExpand })
</script>

<template>
  <fieldset
    class="grid transition-all" :style="{
      border: `1px solid ${themeVars.borderColor}`,
      borderRadius: themeVars.borderRadius,
      padding: `0 ${paddingX}px ${paddingX}px`,
      gridTemplateRows: expand ? '1fr' : '0fr',
      transitionDuration: '400ms',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    }"
  >
    <legend>
      <slot name="legend">
        <div v-if="!toggleable" :style="legendStyle">{{ legend }}</div>

        <RippleButton v-else :size="size" quaternary @click="toggleExpand">
          <template #icon>
            <div :class="[expand ? 'i-mdi:minus' : 'i-mdi:plus']" />
          </template>
          <span>{{ legend }}</span>
        </RippleButton>
      </slot>
    </legend>

    <div
      class="overflow-hidden min-h-0 transition-opacity" :style="{
        opacity: expand ? 1 : 0,
        transitionDuration: '200ms',
        transitionDelay: expand ? '0ms' : '200ms',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }"
    >
      <slot />
    </div>
  </fieldset>
</template>
