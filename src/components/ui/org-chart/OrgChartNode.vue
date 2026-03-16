<script setup lang="ts">
import type { OrgChartNode, OrgChartNodeProps } from './types'
import { useThemeVars } from 'naive-ui'

const { node } = defineProps<OrgChartNodeProps>()

const emit = defineEmits<{
  toggle: [node: OrgChartNode]
  nodeClick: [node: OrgChartNode]
}>()

defineSlots<{
  node: (props: { node: OrgChartNode, collapsed: boolean, toggle: () => void }) => any
}>()

// 从父组件注入状态
const selectedKeys = inject<Ref<string[]>>('orgChartSelectedKeys', ref([]))
const collapsedKeys = inject<Ref<string[]>>('orgChartCollapsedKeys', ref([]))
const selectionMode = inject<SelectionMode | undefined>('orgChartSelectionMode', undefined)
const collapsible = inject<boolean>('orgChartCollapsible', true)

// Naive UI theme variables
const themeVars = useThemeVars()

function canSelect(): boolean {
  return selectionMode !== undefined && node.selectable !== false
}

// 判断节点是否允许折叠（全局设置优先于节点设置）
function canCollapse(): boolean {
  return collapsible && node.collapsible !== false
}

// 内部状态
const hasChildren = computed<boolean>(() => !!(node.children && node.children.length > 0))
// 节点是否折叠：只有允许折叠时才检查 collapsedKeys，否则强制展开
const isCollapsed = computed<boolean>(() => {
  if (!canCollapse())
    return false
  return collapsedKeys.value.includes(node.key)
})
const isSelected = computed<boolean>(() => selectedKeys.value.includes(node.key))
const isCollapsible = computed<boolean>(() => canCollapse() && hasChildren.value)

// 动态 Class 绑定
const wrapperClass = computed<string[]>(() => {
  const classes: string[] = ['org-node-wrapper']
  if (node.nodeClass) {
    classes.push(node.nodeClass)
  }
  if (isCollapsed.value) {
    classes.push('org-node-collapsed')
  }
  if (isSelected.value) {
    classes.push('org-node-selected')
  }
  if (!canSelect()) {
    classes.push('org-node-not-selectable')
  }
  return classes
})

// 切换折叠/展开
function handleToggle(): void {
  if (!isCollapsible.value)
    return
  emit('toggle', node)
}

function handleNodeClick(): void {
  emit('nodeClick', node)
}
</script>

<template>
  <div class="flex flex-col items-center">
    <!-- Node cell: always centered over its subtree -->
    <div class="flex justify-center">
      <div
        v-ripple="canSelect()" class="org-node-content-wrapper" :class="wrapperClass" :style="node.nodeStyle"
        @click="handleNodeClick"
      >
        <!-- User-defined node content slot -->
        <div class="whitespace-nowrap">
          <slot name="node" :node="node" :collapsed="isCollapsed" :toggle="handleToggle" />
        </div>

        <!-- Expand/collapse toggle button -->
        <div v-if="isCollapsible" class="absolute-x-center bottom-0 translate-y-1/2 z-10">
          <RippleButton circle size="tiny" @click.stop="handleToggle">
            <template #icon>
              <span
                class="i-mdi:chevron-up transition-all duration-300 ease"
                :class="[isCollapsed ? 'rotate-0' : 'rotate-180']"
              />
            </template>
          </RippleButton>
        </div>
      </div>
    </div>

    <!-- Vertical line from node down to horizontal bar -->
    <div
      v-if="hasChildren && !isCollapsed" class="h-6 w-0.25" :style="{
        background: themeVars.borderColor,
      }"
    />

    <!-- Children row -->
    <div v-if="hasChildren && !isCollapsed" class="flex items-start">
      <div v-for="(child, index) in node.children" :key="child.key" class="org-node-child-cell">
        <!-- Horizontal connector line above child -->
        <div
          class="org-node-line-horizontal"
          :class="{ 'is-first': index === 0, 'is-last': index === node.children!.length - 1 }"
        />
        <!-- Recursive child node -->
        <OrgChartNode :node="child" @toggle="emit('toggle', $event)" @node-click="emit('nodeClick', $event)">
          <template #node="slotProps">
            <slot name="node" v-bind="slotProps" />
          </template>
        </OrgChartNode>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
/* Node wrapper with relative positioning for toggle button */
.org-node-content-wrapper {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 0.75rem;
  margin: 0 0.5rem;
  border: 1px solid v-bind('themeVars.borderColor');
  border-radius: v-bind('themeVars.borderRadius');
  box-shadow: v-bind('themeVars.boxShadow1');
  cursor: pointer;
}

/* Each child slot: equal flex width, column layout centered */
.org-node-child-cell {
  flex: 1;
  flex-basis: 0;
  min-width: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Vertical line from horizontal bar down to child node */
.org-node-child-cell::after {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1px;
  height: 24px;
  background: v-bind('themeVars.borderColor');
}

/* Horizontal connector line above each child */
.org-node-line-horizontal {
  width: 100%;
  height: 24px;
  position: relative;
  flex-shrink: 0;
}

.org-node-line-horizontal::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: v-bind('themeVars.borderColor');
}

/* First child: only right half of horizontal line */
.org-node-line-horizontal.is-first::before {
  left: 50%;
}

/* Last child: only left half of horizontal line */
.org-node-line-horizontal.is-last::before {
  right: 50%;
}

/* Single child: no horizontal line needed */
.org-node-line-horizontal.is-first.is-last::before {
  display: none;
}

/* Selected state */
.org-node-selected {
  border-color: v-bind('themeVars.primaryColor') !important;
}

/* Not selectable state */
.org-node-not-selectable {
  cursor: default;
}
</style>
