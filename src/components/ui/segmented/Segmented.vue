<script setup lang="ts">
import type { FormItemInjection } from 'naive-ui/es/_mixins/use-form-item'
import type { CSSProperties } from 'vue'
import type { SegmentedOption, SegmentedProps, SegmentedSize } from './types'
import { useThemeVars } from 'naive-ui'
import { formItemInjectionKey } from 'naive-ui/es/_mixins/use-form-item'

const { options, size = 'medium', disabled = false, block = false } = defineProps<SegmentedProps>()

const emit = defineEmits<{
  change: [seg: SegmentedOption]
}>()

defineSlots<{
  label?: (props: { option: SegmentedOption }) => any
}>()

const value = defineModel<string | number>('value', { required: true })

// Inject form item context for NFormItem integration
const formItemContext = inject<FormItemInjection | null>(formItemInjectionKey, null)
const _size = computed<SegmentedSize>(() => formItemContext?.mergedSize.value || size)
const _disabled = computed<boolean>(() => formItemContext?.disabled.value || disabled)

const themeVars = useThemeVars()
const { height, fontSize, commonFont, paddingX } = useNaiveSize(_size.value)

const containerRef = ref<HTMLElement | null>(null)
const itemRefs = ref<Map<string | number, HTMLElement>>(new Map())

// Thumb only shows during switch animation (reference: Ant Design rc-segmented)
const thumbStyle = ref<CSSProperties>({})
const thumbShow = ref(false)
const enableThumbTransition = ref(false)

let containerResizeObserver: ResizeObserver | null = null
let resizeTimeout: ReturnType<typeof setTimeout> | null = null

const containerPadding = 2

const containerStyles = computed<CSSProperties>(() => ({
  minHeight: height.value,
  fontSize: fontSize.value,
  ...commonFont.value,
  backgroundColor: themeVars.value.tagColor,
  cursor: _disabled.value ? 'not-allowed' : 'auto',
  width: block ? '100%' : 'fit-content',
  flexShrink: block ? undefined : 0
}))

/**
 * Calculate thumb style using offset properties instead of getBoundingClientRect.
 * This approach is more reliable in dynamic containers like Modal.
 */
function calcThumbStyle(targetElement: HTMLElement | null): CSSProperties | null {
  if (!targetElement || !targetElement.offsetParent) {
    return null
  }
  return {
    transform: `translateX(${targetElement.offsetLeft}px)`,
    width: `${targetElement.clientWidth}px`,
    height: `${targetElement.clientHeight}px`
  }
}

/**
 * Execute thumb sliding animation from one option to another.
 */
function doThumbAnimation(fromValue: string | number, toValue: string | number): void {
  const fromElement = itemRefs.value.get(fromValue)
  const toElement = itemRefs.value.get(toValue)
  const fromStyle = calcThumbStyle(fromElement ?? null)
  const toStyle = calcThumbStyle(toElement ?? null)

  if (fromStyle && toStyle) {
    // Set initial position without animation
    enableThumbTransition.value = false
    thumbStyle.value = fromStyle
    thumbShow.value = true

    // Enable animation and move to target position on next frame
    requestAnimationFrame(() => {
      enableThumbTransition.value = true
      thumbStyle.value = toStyle
    })
  }
}

function onThumbTransitionEnd(): void {
  thumbShow.value = false
  enableThumbTransition.value = false
}

function setItemRef(el: HTMLElement | null, optionValue: string | number): void {
  if (el) {
    itemRefs.value.set(optionValue, el)
  }
}

function getItemStyle(opt: SegmentedOption): CSSProperties {
  const isSelected = opt.value === value.value
  const isDisabled = _disabled.value || opt.disabled

  return {
    flex: block ? 1 : undefined,
    minWidth: 0,
    padding: `0 ${paddingX.value}px`,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    color: isDisabled
      ? themeVars.value.textColorDisabled
      : isSelected
        ? themeVars.value.primaryColor
        : themeVars.value.textColorBase
  }
}

function handleClick(opt: SegmentedOption): void {
  if (_disabled.value || opt.disabled || value.value === opt.value) {
    return
  }
  value.value = opt.value
  emit('change', opt)
}

// Watch value changes to trigger thumb animation
watch(value, (newVal, oldVal) => {
  if (oldVal !== undefined && oldVal !== null && newVal !== oldVal) {
    nextTick(() => doThumbAnimation(oldVal, newVal))
  }
})

onMounted(() => {
  nextTick(() => {
    if (containerRef.value && typeof ResizeObserver !== 'undefined') {
      containerResizeObserver = new ResizeObserver(() => {
        // Update thumb position on container resize if thumb is visible
        if (thumbShow.value) {
          const toElement = itemRefs.value.get(value.value)
          const toStyle = calcThumbStyle(toElement ?? null)
          if (toStyle) {
            enableThumbTransition.value = false
            thumbStyle.value = toStyle
            if (resizeTimeout) {
              clearTimeout(resizeTimeout)
            }
            resizeTimeout = setTimeout(() => {
              enableThumbTransition.value = true
            }, 100)
          }
        }
      })
      containerResizeObserver.observe(containerRef.value)
    }
  })
})

onUnmounted(() => {
  if (containerResizeObserver) {
    containerResizeObserver.disconnect()
    containerResizeObserver = null
  }
  if (resizeTimeout) {
    clearTimeout(resizeTimeout)
    resizeTimeout = null
  }
})
</script>

<template>
  <div
    ref="containerRef" class="wl-segmented"
    :class="{ 'wl-segmented--block': block, 'wl-segmented--disabled': _disabled }"
    :style="{ ...containerStyles, '--container-padding': `${containerPadding}px` }"
  >
    <!-- Sliding thumb - only visible during switch animation -->
    <div
      v-show="thumbShow" class="wl-segmented__thumb"
      :class="{ 'wl-segmented__thumb--animated': enableThumbTransition }" :style="thumbStyle"
      @transitionend="onThumbTransitionEnd"
    />

    <div
      v-for="opt in options" :key="opt.value" :ref="(el) => setItemRef(el as HTMLElement, opt.value)"
      v-ripple="!_disabled && !opt.disabled" class="wl-segmented__item" :class="{
        'wl-segmented__item--selected': opt.value === value && !thumbShow,
        'wl-segmented__item--disabled': _disabled || opt.disabled,
      }" :style="getItemStyle(opt)" @click="handleClick(opt)"
    >
      <slot name="label" :option="opt">
        <NFlex class="h-full" justify="center" align="center">
          <span class="wl-segmented__label">{{ opt.label }}</span>
        </NFlex>
      </slot>
    </div>
  </div>
</template>

<style lang="css" scoped>
.wl-segmented {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  position: relative;
  border-radius: v-bind('themeVars.borderRadius');
  padding: var(--container-padding);
}

.wl-segmented__thumb {
  position: absolute;
  top: var(--container-padding);
  left: var(--container-padding);
  background-color: v-bind('themeVars.inputColor');
  border-radius: v-bind('themeVars.borderRadius');
  pointer-events: none;
  box-shadow: v-bind('themeVars.boxShadow1');
}

.wl-segmented__thumb--animated {
  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
    width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
    height 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.wl-segmented__item {
  position: relative;
  z-index: 1;
  align-self: stretch;
  border-radius: v-bind('themeVars.borderRadius');
  transition: background-color 0.2s ease;
}

.wl-segmented__item--selected {
  background-color: v-bind('themeVars.inputColor');
}

.wl-segmented__item:not(.wl-segmented__item--disabled):not(.wl-segmented__item--selected):hover {
  background-color: v-bind('themeVars.inputColor');
  color: v-bind('themeVars.primaryColor') !important;
}

.wl-segmented__label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
