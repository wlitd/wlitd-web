<script setup lang="ts">
import type { ButtonSize } from 'naive-ui'
import type { CSSProperties } from 'vue'
import type { SpeedDialItem, SpeedDialProps, SpeedDialSize } from './types'

const {
  items,
  direction = 'up',
  type = 'linear',
  size = 'medium',
  buttonType = 'primary',
  radius = 80,
  disabled = false,
  transitionDelay = 80,
  showTooltip = true,
  tooltipPlacement = 'top'
} = defineProps<SpeedDialProps>()

const emit = defineEmits<{
  click: [item: SpeedDialItem]
}>()

defineSlots<{
  button?: (props: { expand: boolean, toggle: () => void }) => any
  item?: (props: { item: SpeedDialItem }) => any
}>()

const expand = ref<boolean>(false)

/** 菜单项按钮尺寸映射 */
const itemSizeMap: Record<SpeedDialSize, ButtonSize> = {
  small: 'tiny',
  medium: 'small',
  large: 'medium'
}

const { height } = useNaiveSize(itemSizeMap[size])

/** 切换展开/收起状态 */
function toggle(): void {
  if (disabled)
    return
  useToggle(expand)()
}

/** 处理菜单项点击事件 */
function handleItemClick(item: SpeedDialItem): void {
  if (item.disabled)
    return
  emit('click', item)
}

/**
 * 获取线性布局的 Flex 方向类名
 */
function getLinearFlexDirection(): string {
  switch (direction) {
    case 'up':
      return 'flex-col-reverse'
    case 'down':
      return 'flex-col'
    case 'left':
      return 'flex-row-reverse'
    case 'right':
      return 'flex-row'
    default:
      return 'flex-col-reverse'
  }
}

/**
 * 获取线性布局容器的定位样式
 */
function getLinearContainerStyle(): CSSProperties {
  // 根据方向设置容器位置
  switch (direction) {
    case 'up':
      return { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '8px' }
    case 'down':
      return { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '8px' }
    case 'left':
      return { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: '8px' }
    case 'right':
      return { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: '8px' }
    default:
      return { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '8px' }
  }
}

/**
 * 获取线性布局下的菜单项样式
 */
function getLinearItemStyle(index: number): CSSProperties {
  const count = items.length
  const delay = expand.value
    ? index * transitionDelay
    : (count - index - 1) * transitionDelay

  return {
    transitionDelay: `${delay}ms`
  }
}

/**
 * 获取圆形布局下的 transform 值
 */
function getCircleTransform(index: number, count: number): string {
  const itemPixelSize = Number.parseFloat(height.value)
  const halfSize = itemPixelSize / 2
  const angle = (index / count) * 2 * Math.PI - Math.PI / 2
  const x = Math.cos(angle) * radius - halfSize
  const y = Math.sin(angle) * radius - halfSize
  return `translate(${x}px, ${y}px)`
}

/**
 * 获取半圆布局下的角度范围
 */
function getSemiCircleAngles(): { startAngle: number, endAngle: number } {
  switch (direction) {
    case 'up':
      return { startAngle: Math.PI, endAngle: 2 * Math.PI }
    case 'down':
      return { startAngle: 0, endAngle: Math.PI }
    case 'left':
      return { startAngle: Math.PI / 2, endAngle: 3 * Math.PI / 2 }
    case 'right':
      return { startAngle: -Math.PI / 2, endAngle: Math.PI / 2 }
    default:
      return { startAngle: Math.PI, endAngle: 2 * Math.PI }
  }
}

/**
 * 获取半圆布局下的 transform 值
 */
function getSemiCircleTransform(index: number, count: number): string {
  const itemPixelSize = Number.parseFloat(height.value)
  const halfSize = itemPixelSize / 2
  const { startAngle, endAngle } = getSemiCircleAngles()
  const angle = startAngle + (index / (count - 1 || 1)) * (endAngle - startAngle)
  const x = Math.cos(angle) * radius - halfSize
  const y = Math.sin(angle) * radius - halfSize
  return `translate(${x}px, ${y}px)`
}

/**
 * 获取四分之一圆布局下的起始角度
 */
function getQuarterCircleStartAngle(): number {
  switch (direction) {
    case 'up-left':
      return Math.PI
    case 'up-right':
      return -Math.PI / 2
    case 'down-left':
      return Math.PI / 2
    case 'down-right':
      return 0
    default:
      return 0
  }
}

/**
 * 获取四分之一圆布局下的 transform 值
 */
function getQuarterCircleTransform(index: number, count: number): string {
  const itemPixelSize = Number.parseFloat(height.value)
  const halfSize = itemPixelSize / 2
  const startAngle = getQuarterCircleStartAngle()
  const angle = startAngle + (index / (count - 1 || 1)) * (Math.PI / 2)
  const x = Math.cos(angle) * radius - halfSize
  const y = Math.sin(angle) * radius - halfSize
  return `translate(${x}px, ${y}px)`
}

/**
 * 计算菜单项的样式
 * @param index 菜单项索引
 */
function getItemStyle(index: number): CSSProperties {
  // linear 类型使用 Flex 布局，不需要计算 transform
  if (type === 'linear') {
    return getLinearItemStyle(index)
  }

  const count = items.length
  const delay = expand.value
    ? index * transitionDelay
    : (count - index - 1) * transitionDelay

  const opacity = expand.value ? 1 : 0
  const pointerEvents = expand.value ? 'auto' : 'none'

  let transform = ''
  switch (type) {
    case 'circle':
      transform = getCircleTransform(index, count)
      break
    case 'semi-circle':
      transform = getSemiCircleTransform(index, count)
      break
    case 'quarter-circle':
      transform = getQuarterCircleTransform(index, count)
      break
  }

  return {
    transform,
    opacity,
    pointerEvents,
    transitionDelay: `${delay}ms`
  }
}
</script>

<template>
  <div class="absolute">
    <!-- 菜单项容器 -->
    <div
      class="z-1000" :class="[
        type === 'linear' ? 'absolute flex items-center gap-2' : 'absolute-center',
        type === 'linear' ? getLinearFlexDirection() : '',
      ]" :style="type === 'linear' ? getLinearContainerStyle() : undefined"
    >
      <div
        v-for="(item, index) in items" :key="item.key" :class="[
          type === 'linear' ? 'wl-speed-dial__linear-item' : 'wl-speed-dial__item',
          expand ? 'wl-speed-dial__item--visible' : 'wl-speed-dial__item--hidden',
        ]" :style="getItemStyle(index)" @click="handleItemClick(item)"
      >
        <slot name="item" :item="item">
          <NTooltip v-if="showTooltip && item.label" :placement="tooltipPlacement">
            <template #trigger>
              <RippleButton tertiary circle :disabled="item.disabled" :size="itemSizeMap[size]">
                <template #icon>
                  <div v-if="item.icon" :class="item.icon" />
                </template>
              </RippleButton>
            </template>
            {{ item.label }}
          </NTooltip>
          <RippleButton v-else tertiary circle :disabled="item.disabled" :size="itemSizeMap[size]">
            <template #icon>
              <div v-if="item.icon" :class="item.icon" />
            </template>
          </RippleButton>
        </slot>
      </div>
    </div>

    <!-- 主按钮 -->
    <div class="relative z-1000">
      <slot name="button" :expand="expand" :toggle="toggle">
        <RippleButton :size="size" :disabled="disabled" circle :type="buttonType" @click="toggle">
          <template #icon>
            <div class="i-mdi:plus transition-transform duration-300 ease-in-out" :class="{ 'rotate-45': expand }" />
          </template>
        </RippleButton>
      </slot>
    </div>
  </div>
</template>

<style lang="css" scoped>
.wl-speed-dial__item {
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.wl-speed-dial__linear-item {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 菜单项可见状态 */
.wl-speed-dial__item--visible {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
}

/* 菜单项隐藏状态 */
.wl-speed-dial__item--hidden {
  opacity: 0;
  transform: scale(0);
  pointer-events: none;
}
</style>
