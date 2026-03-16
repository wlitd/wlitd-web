<script setup lang="ts">
import type { OrgChartNode, OrgChartProps } from './types'

// --- Props & Emits ---
const { value, selectionMode = undefined, collapsible = true } = defineProps<OrgChartProps>()

const emit = defineEmits<{
  select: [node: OrgChartNode, selected: boolean]
  collapse: [node: OrgChartNode, collapsed: boolean]
}>()

// 支持 v-model:selectedKeys 和 v-model:collapsedKeys
const selectedKeys = defineModel<string[]>('selectedKeys', { default: () => [] })
const collapsedKeys = defineModel<string[]>('collapsedKeys', { default: () => [] })

// 提供给子节点使用
provide('orgChartSelectedKeys', selectedKeys)
provide('orgChartCollapsedKeys', collapsedKeys)
provide('orgChartSelectionMode', selectionMode)
provide('orgChartCollapsible', collapsible)

// --- State ---
const rootRef = ref<HTMLElement | null>(null)

// 视图状态
const scale = ref<number>(1)
const translateX = ref<number>(0)
const translateY = ref<number>(0)
let isDragging: boolean = false
let dragStartX: number = 0
let dragStartY: number = 0

// 判断节点是否可折叠（全局设置优先于节点设置）
function _canCollapse(node: OrgChartNode): boolean {
  return collapsible && node.collapsible !== false
}

// 判断节点是否可选（全局设置优先于节点设置）
function _canSelect(node: OrgChartNode): boolean {
  return selectionMode !== undefined && node.selectable !== false
}

// --- Interaction Logic ---
function handleToggle(node: OrgChartNode): void {
  if (!_canCollapse(node))
    return

  const index = collapsedKeys.value.indexOf(node.key)
  let newCollapsed: boolean
  const newKeys = [...collapsedKeys.value]

  if (index > -1) {
    // 当前是折叠状态，需要展开
    newKeys.splice(index, 1)
    newCollapsed = false
  } else {
    // 当前是展开状态，需要折叠
    newKeys.push(node.key)
    newCollapsed = true
  }

  collapsedKeys.value = newKeys
  emit('collapse', node, newCollapsed)
}

function handleNodeClick(node: OrgChartNode): void {
  if (!_canSelect(node))
    return

  const index = selectedKeys.value.indexOf(node.key)
  let newSelected: boolean

  if (selectionMode === 'single') {
    // 单选模式
    if (index > -1) {
      // 已选中，取消选中
      selectedKeys.value = []
      newSelected = false
    } else {
      // 未选中，选中当前，清空其他
      selectedKeys.value = [node.key]
      newSelected = true
    }
  } else {
    // 多选模式
    const newKeys = [...selectedKeys.value]
    if (index > -1) {
      // 已选中，取消选中
      newKeys.splice(index, 1)
      newSelected = false
    } else {
      // 未选中，添加到选中列表
      newKeys.push(node.key)
      newSelected = true
    }
    selectedKeys.value = newKeys
  }

  emit('select', node, newSelected)
}

// 监听 selectedKeys，确保 single 模式下只有一个选中项
watch(() => selectedKeys.value, (keys) => {
  if (selectionMode === 'single' && keys && keys.length > 1) {
    selectedKeys.value = [keys[0]]
  }
})

function handleMouseDown(e: MouseEvent): void {
  // 只有点击背景才拖拽，如果点击的是节点，由节点处理
  if ((e.target as HTMLElement).closest('.org-node-content-wrapper'))
    return

  isDragging = true
  dragStartX = e.clientX - translateX.value
  dragStartY = e.clientY - translateY.value
  rootRef.value!.style.cursor = 'grabbing'
}

function handleMouseMove(e: MouseEvent): void {
  if (!isDragging)
    return
  e.preventDefault()
  translateX.value = e.clientX - dragStartX
  translateY.value = e.clientY - dragStartY
}

function handleMouseUp(): void {
  isDragging = false
  if (rootRef.value)
    rootRef.value.style.cursor = 'grab'
}

// 鼠标滚轮缩放
function handleWheel(e: WheelEvent): void {
  e.preventDefault()
  const delta = e.deltaY > 0 ? -0.1 : 0.1
  scale.value = Math.min(Math.max(scale.value + delta, 0.2), 3)
}
</script>

<template>
  <div
    ref="rootRef" class="h-full w-full relative overflow-hidden cursor-grab select-none" @mousedown="handleMouseDown"
    @mousemove="handleMouseMove" @mouseup="handleMouseUp" @mouseleave="handleMouseUp" @wheel="handleWheel"
  >
    <!-- 画布容器：应用缩放和平移变换 -->
    <div
      class="absolute top-0 left-0 w-full h-full p-12 box-border" :style="{
        transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
        transformOrigin: '0 0',
      }"
    >
      <!-- 节点树层 -->
      <div class="h-full w-full flex justify-center items-start">
        <OrgChartNode
          v-for="node in value" :key="node.key" :node="node" @toggle="handleToggle"
          @node-click="handleNodeClick"
        >
          <!-- 关键：透传用户的自定义节点插槽 -->
          <template #node="slotProps">
            <slot name="node" v-bind="slotProps" />
          </template>
        </OrgChartNode>
      </div>
    </div>

    <!-- 空状态提示 -->
    <NEmpty v-if="!value || value.length === 0" description="暂无数据" class="absolute-center" />
  </div>
</template>
