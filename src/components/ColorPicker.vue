<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { builtInThemeColor } from '@/stores/theme'

const { t } = useI18n()
const { primaryColor } = storeToRefs(useThemeStore())
</script>

<template>
  <NTooltip placement="bottom">
    <template #trigger>
      <div class="size-7">
        <NColorPicker
          v-model:value="primaryColor" :render-label="() => ''"
          :swatches="builtInThemeColor"
        />
      </div>
    </template>
    {{ t('themeColor') }}
  </NTooltip>
</template>

<style lang="css" scoped>
:deep(.n-color-picker) {
  height: 28px !important;
}
</style>

<i18n lang="json">
{
  "zh": {
    "themeColor": "主题色"
  },
  "en": {
    "themeColor": "Theme Color"
  }
}
</i18n>
