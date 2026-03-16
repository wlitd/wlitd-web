<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { Conversation, ConversationsProps } from './types'
import { useThemeVars } from 'naive-ui'

const { items, menu = undefined, groupable = false, dropdownProps = undefined } = defineProps<ConversationsProps>()

const emit = defineEmits<{
  change: [conv: Conversation]
}>()

defineSlots<{
  group?: (props: { group: string }) => any
  icon?: (props: { conv: Conversation }) => any
  label?: (props: { conv: Conversation }) => any
  menuIcon?: () => any
}>()

const themeVars = useThemeVars()
const { fontSize, height, paddingX, commonFont, strongFont } = useNaiveSize()

const activeKey = defineModel<string | number>('activeKey')

const groupedConversations = computed<Record<string, Conversation[]>>(() => {
  if (!groupable) {
    return { ungrouped: items }
  }

  return items.reduce((groups: Record<string, Conversation[]>, conv) => {
    const group = conv.group || 'ungrouped'
    if (!groups[group]) {
      groups[group] = []
    }
    groups[group].push(conv)
    return groups
  }, {})
})

function generateItemStyle(conv: Conversation): CSSProperties {
  const isActived = activeKey.value === conv.key

  return {
    minHeight: height.value,
    padding: `0 ${paddingX.value}px`,
    fontSize: fontSize.value,
    borderRadius: themeVars.value.borderRadius,
    ...commonFont.value,
    cursor: conv.disabled ? 'not-allowed' : 'pointer',
    backgroundColor: isActived ? themeVars.value.hoverColor : undefined,
    color: conv.disabled
      ? themeVars.value.textColorDisabled
      : isActived
        ? themeVars.value.primaryColor
        : themeVars.value.textColorBase
  }
}

function handleClick(conv: Conversation): void {
  if (conv.disabled) {
    return
  }

  activeKey.value = conv.key
  emit('change', conv)
}
</script>

<template>
  <div class="w-full" :style="{ backgroundColor: themeVars.bodyColor }">
    <div v-if="!groupable" class="flex flex-col gap-3">
      <NSpin v-for="conv in items" :key="conv.key" :show="conv.loading === true" size="small">
        <div
          v-ripple="!conv.disabled" :style="generateItemStyle(conv)" class="wl-conv__item" :class="{
            'wl-conv__item--disabled': conv.disabled,
          }" @click="handleClick(conv)"
        >
          <slot name="icon" :conv="conv">
            <Component :is="conv.icon" v-if="conv.icon" />
          </slot>
          <div class="flex flex-1 min-w-0 items-center justify-between gap-2">
            <slot name="label" :conv="conv">
              <span v-if="typeof conv.label === 'string'" class="truncate">{{ conv.label }}</span>
              <component :is="conv.label" v-else-if="typeof conv.label === 'function'" />
            </slot>
            <NDropdown
              v-if="menu" trigger="click" placement="bottom-start" v-bind="dropdownProps"
              :options="menu(conv).options"
            >
              <slot name="menuIcon">
                <div class="i-lucide:ellipsis flex-shrink-0" />
              </slot>
            </NDropdown>
          </div>
        </div>
      </NSpin>
    </div>
    <div v-else class="flex flex-col gap-3">
      <div v-for="(conversations, group) in groupedConversations" :key="group">
        <div
          v-if="group !== 'ungrouped'" :style="{
            minHeight: height,
            padding: `0 ${paddingX}px`,
          }"
        >
          <slot name="group" :group="group">
            <span :style="{ ...strongFont, color: themeVars.placeholderColor }">{{ group }}</span>
          </slot>
        </div>
        <div class="flex flex-col gap-3">
          <NSpin v-for="conv in conversations" :key="conv.key" :show="conv.loading === true" size="small">
            <div
              v-ripple="!conv.disabled" :style="generateItemStyle(conv)" class="wl-conv__item" :class="{
                'wl-conv__item--disabled': conv.disabled,
              }" @click="handleClick(conv)"
            >
              <slot name="icon" :conv="conv">
                <Component :is="conv.icon" v-if="conv.icon" />
              </slot>
              <div class="flex flex-1 min-w-0 items-center justify-between gap-2">
                <slot name="label" :conv="conv">
                  <span v-if="typeof conv.label === 'string'" class="truncate">{{ conv.label }}</span>
                  <component :is="conv.label" v-else-if="typeof conv.label === 'function'" />
                </slot>
                <NDropdown
                  v-if="menu" trigger="click" placement="bottom-start" v-bind="dropdownProps"
                  :options="menu(conv).options"
                >
                  <slot name="menuIcon">
                    <div class="i-lucide:ellipsis flex-shrink-0" />
                  </slot>
                </NDropdown>
              </div>
            </div>
          </NSpin>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.wl-conv__item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.wl-conv__item:not(.wl-conv__item--disabled):hover {
  background-color: v-bind('themeVars.hoverColor');
  color: v-bind('themeVars.primaryColor') !important;
}
</style>
