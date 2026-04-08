<script setup lang="ts">
import type { CSSProperties, VNode } from 'vue'
import type { DockItem, DockProps } from './types'
import { useThemeVars } from 'naive-ui'

const { items, position = 'bottom', size = 'medium', tooltipOptions } = defineProps<DockProps>()

const emit = defineEmits<{
  click: [item: DockItem]
}>()

const themeVars = useThemeVars()
const { isDark } = storeToRefs(useThemeStore())
const dockRef = ref<HTMLElement | null>(null)
const itemRefs = ref<Map<number, HTMLElement>>(new Map())
const itemScales = ref<number[]>([])
const itemOffsets = ref<number[]>([])

/** Magnification settings */
const MAGNIFICATION_SCALE = 1.5
const MAGNIFICATION_RANGE = 80

const { height } = useNaiveSize(size)

/** Base size in pixels for calculations */
const baseSize = computed(() => Number.parseInt(height.value, 10))

/** Container classes based on position */
const containerClasses = computed(() => ['wl-dock', `wl-dock--${position}`])

/** Container styles with theme variables */
const containerStyle = computed<CSSProperties>(() => ({
  '--wl-dock-base-size': height.value,
  '--wl-dock-bg': isDark.value ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)',
  '--wl-dock-border-color': isDark.value ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.3)',
  '--wl-dock-icon-bg': themeVars.value.hoverColor,
  '--wl-dock-icon-bg-hover': themeVars.value.hoverColor
}))

/** Whether dock is positioned vertically */
const isVertical = computed(() => position === 'left' || position === 'right')

/** Initialize scales and offsets arrays */
function initScalesAndOffsets(): void {
  itemScales.value = items.map(() => 1)
  itemOffsets.value = items.map(() => 0)
}

/** Calculate item scale based on distance from mouse */
function calculateScale(distance: number): number {
  if (distance >= MAGNIFICATION_RANGE)
    return 1
  const ratio = 1 - distance / MAGNIFICATION_RANGE
  return 1 + (MAGNIFICATION_SCALE - 1) * ratio
}

/** Calculate item scale and offset based on mouse position */
function calculateScales(event: MouseEvent): void {
  if (!dockRef.value)
    return

  const { clientX: mouseX, clientY: mouseY } = event

  // First pass: calculate scales based on distance
  itemRefs.value.forEach((el, index) => {
    const rect = el.getBoundingClientRect()
    const itemCenter = isVertical.value
      ? rect.top + rect.height / 2
      : rect.left + rect.width / 2
    const mousePos = isVertical.value ? mouseY : mouseX
    const distance = Math.abs(mousePos - itemCenter)
    itemScales.value[index] = calculateScale(distance)
  })

  // Second pass: calculate offsets to prevent overlap
  let totalOffset = 0
  const baseItemSize = baseSize.value

  itemScales.value.forEach((scale, index) => {
    const extraSize = (scale - 1) * baseItemSize
    itemOffsets.value[index] = totalOffset + extraSize / 2
    totalOffset += extraSize
  })

  // Center the dock by adjusting all offsets
  const centerOffset = totalOffset / 2
  itemOffsets.value = itemOffsets.value.map(offset => offset - centerOffset)
}

/** Reset all scales and offsets to default */
function resetScales(): void {
  initScalesAndOffsets()
}

/** Get item style with scale and translate transform */
function getItemStyle(index: number): CSSProperties {
  const scale = itemScales.value[index]
  const offset = itemOffsets.value[index]
  const translate = isVertical.value ? `translateY(${offset}px)` : `translateX(${offset}px)`

  return {
    transform: `${translate} scale(${scale})`,
    transition: 'transform 0.15s ease-out'
  }
}

/** Handle item click */
function handleItemClick(item: DockItem): void {
  emit('click', item)
}

/** Set item element ref */
function setItemRef(el: Element | VNode | null, index: number): void {
  if (el) {
    const element = '$el' in el ? el.$el as HTMLElement : el as HTMLElement
    itemRefs.value.set(index, element)
  } else {
    itemRefs.value.delete(index)
  }
}

// Initialize on mount and when items change
initScalesAndOffsets()

watch(() => items, initScalesAndOffsets, { deep: true })
</script>

<template>
  <div
    ref="dockRef" :class="containerClasses" :style="containerStyle" @mousemove="calculateScales"
    @mouseleave="resetScales"
  >
    <div
      v-for="(item, index) in items" :key="item.key" :ref="(el: any) => setItemRef(el, index)" class="wl-dock__item"
      :style="getItemStyle(index)" @click="handleItemClick(item)"
    >
      <NTooltip v-bind="tooltipOptions">
        <template #trigger>
          <div class="wl-dock__icon-wrapper">
            <Component :is="item.icon" v-if="item.icon" />
          </div>
        </template>
        {{ item.label }}
      </NTooltip>
    </div>
  </div>
</template>

<style lang="css" scoped>
.wl-dock {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 16px;
  z-index: 1000;
  background-color: var(--wl-dock-bg);
  border: 1px solid var(--wl-dock-border-color);
  backdrop-filter: blur(20px);
}

.wl-dock--bottom {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  flex-direction: row;
}

.wl-dock--top {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  flex-direction: row;
}

.wl-dock--left {
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  flex-direction: column;
}

.wl-dock--right {
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  flex-direction: column;
}

.wl-dock__item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--wl-dock-base-size);
  height: var(--wl-dock-base-size);
  cursor: pointer;
  flex-shrink: 0;
}

.wl-dock__icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background-color: var(--wl-dock-icon-bg);
  transition: background-color 0.2s ease;
}

.wl-dock__item:hover .wl-dock__icon-wrapper {
  background-color: var(--wl-dock-icon-bg-hover);
}
</style>
