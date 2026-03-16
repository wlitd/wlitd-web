<script setup lang="ts">
import type { SegmentedOption } from '@/components/ui/segmented/types'
import { useI18n } from 'vue-i18n'
import Segmented from '@/components/ui/segmented/Segmented.vue'

const { t } = useI18n()

const basicVal = ref<string>('daily')
const basicOpts: SegmentedOption[] = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' }
]

const basicCode = `
<template>
  <Segmented v-model:value="basicVal" :options="basicOpts" />
</template>

<script setup lang="ts">
import type { SegmentedOption } from '@/components/ui/segmented/types'

const basicVal = ref<string>('daily')
const basicOpts: SegmentedOption[] = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' }
]
<\/script>
`

const tinyVal = ref<string>('daily')
const smallVal = ref<string>('daily')
const mediumVal = ref<string>('daily')
const largeVal = ref<string>('daily')
const sizeOpts: SegmentedOption[] = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' }
]

const sizeCode = `
<template>
  <NFlex vertical>
    <Segmented v-model:value="tinyVal" :options="sizeOpts" size="tiny" />
    <Segmented v-model:value="smallVal" :options="sizeOpts" size="small" />
    <Segmented v-model:value="mediumVal" :options="sizeOpts" size="medium" />
    <Segmented v-model:value="largeVal" :options="sizeOpts" size="large" />
  </NFlex>
</template>

<script setup lang="ts">
import type { SegmentedOption } from '@/components/ui/segmented/types'

const tinyVal = ref<string>('daily')
const smallVal = ref<string>('daily')
const mediumVal = ref<string>('daily')
const largeVal = ref<string>('daily')
const sizeOpts: SegmentedOption[] = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' }
]
<\/script>
`

const disabledVal = ref<string>('free')
const blockDisabledVal = ref<string>('free')
const disabledOpts: SegmentedOption[] = [
  { label: 'Free', value: 'free' },
  { label: 'Pro', value: 'pro' },
  { label: 'Enterprise', value: 'enterprise', disabled: true }
]

const disabledCode = `
<template>
  <NFlex vertical>
    <Segmented v-model:value="disabledVal" :options="disabledOpts" />
    <Segmented v-model:value="blockDisabledVal" :options="disabledOpts" disabled />
  </NFlex>
</template>

<script setup lang="ts">
import type { SegmentedOption } from '@/components/ui/segmented/types'

const disabledVal = ref<string>('free')
const blockDisabledVal = ref<string>('free')
const disabledOpts = [
  { label: 'Free', value: 'free' },
  { label: 'Pro', value: 'pro' },
  { label: 'Enterprise', value: 'enterprise', disabled: true }
]
<\/script>
`

const blockVal = ref<string>('option1')
const blockOpts: SegmentedOption[] = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' }
]

const blockCode = `
<template>
  <Segmented v-model:value="blockVal" :options="blockOpts" block />
</template>

<script setup>
import type { SegmentedOption } from '@/components/ui/segmented/types'

const blockVal = ref<string>('option1')
const blockOpts: SegmentedOption[] = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' }
]
<\/script>
`

const customVal = ref<string>('list')
const customOpts: SegmentedOption[] = reactive([
  { label: 'List', value: 'list', icon: 'i-mdi:format-list-bulleted' },
  { label: 'Grid', value: 'grid', icon: 'i-mdi:view-grid' },
  { label: 'Table', value: 'table', icon: 'i-mdi:table' }
])

const isLoaded = ref<boolean>(false)
function handleLoadMore(): void {
  customOpts.push({
    label: 'Loaded',
    value: 'loaded',
    icon: 'i-mdi:check'
  })
  isLoaded.value = true
}

const customCode = `
<template>
  <NFlex vertical>
    <Segmented v-model:value="customVal" :options="customOpts">
      <template #label="{ option }">
        <NFlex vertical class="h-full py-1" align="center" justify="center">
          <div :class="option.icon" />
          <span>{{ option.label }}</span>
        </NFlex>
      </template>
    </Segmented>
  <RippleButton :disabled="isLoaded" @click="handleLoadMore">Load More</RippleButton>
  </NFlex>
</template>

<script setup lang="ts">
import type { SegmentedOption } from '@/components/ui/segmented/types'

const customVal = ref<string>('list')
const customOpts: SegmentedOption[] = reactive([
  { label: 'List', value: 'list', icon: 'i-mdi:format-list-bulleted' },
  { label: 'Grid', value: 'grid', icon: 'i-mdi:view-grid' },
  { label: 'Table', value: 'table', icon: 'i-mdi:table' }
])

const isLoaded = ref<boolean>(false)
function handleLoadMore(): void {
  customOpts.push({
    label: 'Loaded',
    value: 'loaded',
    icon: 'i-mdi:check'
  })
  isLoaded.value = true
}
<\/script>
`
</script>

<template>
  <CommonPage>
    <template #header-extra>
      <NText italic>{{ t('description') }}</NText>
    </template>

    <ComponentDemos>
      <ComponentDemo :title="t('basic')" :code="basicCode">
        <Segmented v-model:value="basicVal" :options="basicOpts" />
      </ComponentDemo>

      <ComponentDemo :title="t('size')" :code="sizeCode">
        <NFlex vertical>
          <Segmented v-model:value="tinyVal" :options="sizeOpts" size="tiny" />
          <Segmented v-model:value="smallVal" :options="sizeOpts" size="small" />
          <Segmented v-model:value="mediumVal" :options="sizeOpts" size="medium" />
          <Segmented v-model:value="largeVal" :options="sizeOpts" size="large" />
        </NFlex>
      </ComponentDemo>

      <ComponentDemo :title="t('disabled')" :code="disabledCode">
        <NFlex vertical>
          <Segmented v-model:value="disabledVal" :options="disabledOpts" />
          <Segmented v-model:value="blockDisabledVal" :options="disabledOpts" disabled />
        </NFlex>
      </ComponentDemo>

      <ComponentDemo :title="t('block')" :code="blockCode">
        <Segmented v-model:value="blockVal" :options="blockOpts" block />
      </ComponentDemo>

      <ComponentDemo :title="t('custom')" :code="customCode">
        <NFlex vertical>
          <Segmented v-model:value="customVal" :options="customOpts">
            <template #label="{ option }">
              <NFlex vertical class="h-full py-1" align="center" justify="center">
                <div :class="option.icon" />
                <span>{{ option.label }}</span>
              </NFlex>
            </template>
          </Segmented>
          <RippleButton :disabled="isLoaded" @click="handleLoadMore">Load More</RippleButton>
        </NFlex>
      </ComponentDemo>
    </ComponentDemos>
  </CommonPage>
</template>

<i18n lang="json">
{
  "zh": {
    "description": "分段控制器",
    "basic": "基础",
    "size": "尺寸",
    "disabled": "禁用",
    "block": "块级",
    "custom": "自定义渲染"
  },
  "en": {
    "description": "A segmented control",
    "basic": "Basic",
    "size": "Size",
    "disabled": "Disabled",
    "block": "Block",
    "custom": "Custom"
  }
}
</i18n>
