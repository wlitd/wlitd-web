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
        <span v-if="!toggleable" :style="legendStyle">{{ legend }}</span>

        <button v-else v-ripple type="button" class="fieldset-toggle-btn" :style="legendStyle" @click="toggleExpand">
          <span :class="[expand ? 'i-mdi:minus' : 'i-mdi:plus']" />
          <span class="fieldset-legend-text">{{ legend }}</span>
        </button>
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

<style scoped>
.fieldset-toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
  color: inherit;
  font-weight: inherit;
  font-size: inherit;
  border-radius: v-bind('themeVars.borderRadius');
  transition:
    background-color 0.2s,
    color 0.2s;
}

.fieldset-toggle-btn:hover {
  background-color: v-bind('themeVars.hoverColor');
}

.fieldset-toggle-btn:active {
  background-color: v-bind('themeVars.pressedColor');
}
</style>
