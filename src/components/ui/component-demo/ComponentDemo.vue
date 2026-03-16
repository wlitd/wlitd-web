<script setup lang="ts">
import type { ComponentDemoProps } from './types'
import { useI18n } from 'vue-i18n'

const { title, code } = defineProps<ComponentDemoProps>()

const { t } = useI18n()

const showCode = ref<boolean>(false)

async function copyCode(): Promise<void> {
  try {
    await navigator.clipboard.writeText(code)
    message.success(t('copySuccess'))
  } catch {
    message.error(t('copyFailed'))
  }
}
</script>

<template>
  <NCard :title="title" hoverable>
    <template #header-extra>
      <NTooltip>
        <template #trigger>
          <RippleButton text class="rounded!" @click="copyCode">
            <template #icon>
              <div class="i-icon-park-outline:copy" />
            </template>
          </RippleButton>
        </template>
        {{ t('copy') }}
      </NTooltip>
    </template>
    <NFlex vertical>
      <slot />
      <RippleButton tertiary size="tiny" block @click="showCode = !showCode">
        <template #icon>
          <div :class="showCode ? 'i-mdi:xml' : 'i-mdi:code-tags'" />
        </template>
        {{ showCode ? t('hideCode') : t('showCode') }}
      </RippleButton>
      <div v-show="showCode">
        <NCode :code="code" language="js" word-wrap />
      </div>
    </NFlex>
  </NCard>
</template>

<i18n lang="json">
{
  "zh": {
    "copy": "复制代码",
    "showCode": "显示代码",
    "hideCode": "隐藏代码",
    "copySuccess": "复制成功！",
    "copyFailed": "复制失败！"
    },
  "en": {
    "copy": "Copy Code",
    "showCode": "Show Code",
    "hideCode": "Hide Code",
    "copySuccess": "Copied Successfully!",
    "copyFailed": "Copy Failed!"
    }
}
</i18n>
