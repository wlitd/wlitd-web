<script setup lang="ts">
import type { ButtonSize } from 'naive-ui'
import type { FormItemInjection } from 'naive-ui/es/_mixins/use-form-item'
import type { RippleButtonProps } from './types'
import { formItemInjectionKey } from 'naive-ui/es/_mixins/use-form-item'

defineOptions({
  inheritAttrs: false
})

const { round = false, circle = false, size = 'medium', disabled = false, block = false } = defineProps<RippleButtonProps>()

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

defineSlots<{
  default?: () => any
  icon?: () => any
}>()

// 在 NFormItem 中使用时可以注入表单项上下文
const formItemContext = inject<FormItemInjection | null>(formItemInjectionKey, null)
const _size = computed<ButtonSize>(() => formItemContext?.mergedSize.value || size)
const _disabled = computed<boolean>(() => formItemContext?.disabled.value || disabled)

const classes = computed<string>(() => round || circle ? '' : 'rounded-xl')
</script>

<template>
  <!-- 此处在 NButton 上面添加 ripple 效果需要注意使用一个原生 dom 包裹，防止因为 dom 改变导致 NTooltip 等部分组件无法正常显示 -->
  <div class="inline-flex" :class="{ 'inline-block w-full': block }">
    <NButton
      v-ripple :class="[classes]" v-bind="{ round, circle, size: _size, disabled: _disabled, block, ...$attrs }"
      @click="emit('click', $event)"
    >
      <template #icon>
        <slot name="icon" />
      </template>
      <slot />
    </NButton>
  </div>
</template>
