<script setup lang="ts">
import type { FieldsetInst } from '@/components/ui/fieldset/types'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const basicCode = `
<template>
  <Fieldset legend="Header">
    我们在田野上面找猪
    想象中已找到了三只
    小鸟在白云上面追逐
    它们在树底下跳舞
    啦啦啦啦啦啦啦啦咧
    啦啦啦啦咧
    我们在想象中度过了许多年
    想象中我们是如此的疯狂
    我们在城市里面找猪
    想象中已找到了几百万只
    小鸟在公园里面唱歌
    它们独自在想象里跳舞
    啦啦啦啦啦啦啦啦咧
    啦啦啦啦咧
    我们在想象中度过了许多年
    许多年之后我们又开始想象
    啦啦啦啦啦啦啦啦咧
  </Fieldset>
</template>
`

const toggleableCode = `
<template>
  <Fieldset legend="Toggleable" toggleable>
    我们在田野上面找猪
    想象中已找到了三只
    小鸟在白云上面追逐
    它们在树底下跳舞
    啦啦啦啦啦啦啦啦咧
    啦啦啦啦咧
    我们在想象中度过了许多年
    想象中我们是如此的疯狂
    我们在城市里面找猪
    想象中已找到了几百万只
    小鸟在公园里面唱歌
    它们独自在想象里跳舞
    啦啦啦啦啦啦啦啦咧
    啦啦啦啦咧
    我们在想象中度过了许多年
    许多年之后我们又开始想象
    啦啦啦啦啦啦啦啦咧
  </Fieldset>
</template>
`

const fieldsetRef = ref<FieldsetInst>()
function handleClick(): void {
  fieldsetRef.value?.toggleExpand()
}

const slotsCode = `
<template>
  <Fieldset ref="fieldsetRef">
    <template #legend>
      <NFlex align="center" class="px-2 cursor-pointer" @click="handleClick">
        <img class="rounded-full size-8" src="/logo.svg" alt="">
        <span>自定义</span>
      </NFlex>
    </template>

    我们在田野上面找猪
    想象中已找到了三只
    小鸟在白云上面追逐
    它们在树底下跳舞
    啦啦啦啦啦啦啦啦咧
    啦啦啦啦咧
    我们在想象中度过了许多年
    想象中我们是如此的疯狂
    我们在城市里面找猪
    想象中已找到了几百万只
    小鸟在公园里面唱歌
    它们独自在想象里跳舞
    啦啦啦啦啦啦啦啦咧
    啦啦啦啦咧
    我们在想象中度过了许多年
    许多年之后我们又开始想象
    啦啦啦啦啦啦啦啦咧
  </Fieldset>
</template>

<script setup lang="ts">
import type { FieldsetInst } from '@/components/ui/fieldset/types'

const fieldsetRef = ref<FieldsetInst>()
function handleClick(): void {
  fieldsetRef.value?.toggleExpand()
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
        <Fieldset legend="Header">
          我们在田野上面找猪
          想象中已找到了三只
          小鸟在白云上面追逐
          它们在树底下跳舞
          啦啦啦啦啦啦啦啦咧
          啦啦啦啦咧
          我们在想象中度过了许多年
          想象中我们是如此的疯狂
          我们在城市里面找猪
          想象中已找到了几百万只
          小鸟在公园里面唱歌
          它们独自在想象里跳舞
          啦啦啦啦啦啦啦啦咧
          啦啦啦啦咧
          我们在想象中度过了许多年
          许多年之后我们又开始想象
          啦啦啦啦啦啦啦啦咧
        </Fieldset>
      </ComponentDemo>

      <ComponentDemo :title="t('toggleable')" :code="toggleableCode">
        <Fieldset legend="Toggleable" toggleable>
          我们在田野上面找猪
          想象中已找到了三只
          小鸟在白云上面追逐
          它们在树底下跳舞
          啦啦啦啦啦啦啦啦咧
          啦啦啦啦咧
          我们在想象中度过了许多年
          想象中我们是如此的疯狂
          我们在城市里面找猪
          想象中已找到了几百万只
          小鸟在公园里面唱歌
          它们独自在想象里跳舞
          啦啦啦啦啦啦啦啦咧
          啦啦啦啦咧
          我们在想象中度过了许多年
          许多年之后我们又开始想象
          啦啦啦啦啦啦啦啦咧
        </Fieldset>
      </ComponentDemo>

      <ComponentDemo :title="t('slots')" :code="slotsCode">
        <Fieldset ref="fieldsetRef">
          <template #legend>
            <NFlex align="center" class="px-2 cursor-pointer" @click="handleClick">
              <img class="rounded-full size-8" src="/logo.svg" alt="">
              <span>自定义</span>
            </NFlex>
          </template>
          我们在田野上面找猪
          想象中已找到了三只
          小鸟在白云上面追逐
          它们在树底下跳舞
          啦啦啦啦啦啦啦啦咧
          啦啦啦啦咧
          我们在想象中度过了许多年
          想象中我们是如此的疯狂
          我们在城市里面找猪
          想象中已找到了几百万只
          小鸟在公园里面唱歌
          它们独自在想象里跳舞
          啦啦啦啦啦啦啦啦咧
          啦啦啦啦咧
          我们在想象中度过了许多年
          许多年之后我们又开始想象
          啦啦啦啦啦啦啦啦咧
        </Fieldset>
      </ComponentDemo>
    </ComponentDemos>
  </CommonPage>
</template>

<i18n lang="json">
{
  "zh": {
    "description": "该如何描述呢？就是对原生 fieldset 进行了封装",
    "basic": "基础",
    "toggleable": "可切换",
    "slots": "插槽"
  },
  "en": {
    "description": "How to describe it? It's a wrapper for native fieldset",
    "basic": "Basic",
    "toggleable": "Toggleable",
    "slots": "Slots"
  }
}
</i18n>
