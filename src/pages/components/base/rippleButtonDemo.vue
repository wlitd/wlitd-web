<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const basicCode = `
<template>
  <NFlex>
    <RippleButton>Default</RippleButton>
    <RippleButton type="tertiary">Tertiary</RippleButton>
    <RippleButton type="primary">Primary</RippleButton>
    <RippleButton type="info">Info</RippleButton>
    <RippleButton type="success">Success</RippleButton>
    <RippleButton type="warning">Warning</RippleButton>
    <RippleButton type="error">Error</RippleButton>
  </NFlex>
</template>
`

const primaryCode = `
<template>
  <NFlex align="center">
    <RippleButton>Default</RippleButton>
    <RippleButton strong secondary>Default</RippleButton>
    <RippleButton tertiary>Default</RippleButton>
    <RippleButton quaternary>Default</RippleButton>
  </NFlex>
</template>
`

const sizeCode = `
<template>
  <NFlex align="center">
    <RippleButton size="tiny">Tiny</RippleButton>
    <RippleButton size="small">Small</RippleButton>
    <RippleButton size="medium">Medium</RippleButton>
    <RippleButton size="large">Large</RippleButton>
  </NFlex>
</template>
`

const specialTypeCode = `
<template>
  <NFlex>
    <RippleButton dashed>Dashed</RippleButton>
    <RippleButton text>Text</RippleButton>
    <RippleButton text tag="a" href="https://www.naiveui.com/zh-CN/os-theme" target="_blank" type="primary">
      Link
    </RippleButton>
  </NFlex>
</template>
`

const ghostButtonCode = `
<template>
  <NFlex>
    <RippleButton ghost>Default</RippleButton>
    <RippleButton ghost type="primary">Primary</RippleButton>
    <RippleButton ghost type="info">Info</RippleButton>
    <RippleButton ghost type="success">Success</RippleButton>
    <RippleButton ghost type="warning">Warning</RippleButton>
    <RippleButton ghost type="error">Error</RippleButton>
  </NFlex>
</template>
`

const statusCode = `
<template>
  <NFlex>
    <RippleButton loading>Loading</RippleButton>
    <RippleButton disabled>Disabled</RippleButton>
  </NFlex>
</template>
`

const shapeCode = `
<template>
  <NFlex>
    <RippleButton>Default</RippleButton>
    <RippleButton round>Round</RippleButton>
    <RippleButton circle>Circle</RippleButton>
  </NFlex>
</template>
`

const iconCode = `
<template>
  <NFlex>
    <RippleButton>
      <template #icon>
        <div class="i-line-md:cloud-alt-download-loop" />
      </template>
      Download
    </RippleButton>
    <RippleButton circle>
      <template #icon>
        <div class="i-mdi:reload" />
      </template>
    </RippleButton>
    <RippleButton text>
      <template #icon>
        <div class="i-mdi:magnify" />
      </template>
    </RippleButton>
  </NFlex>
</template>
`
</script>

<template>
  <CommonPage>
    <template #header-extra>
      <NText italic>{{ t('description') }}</NText>
    </template>

    <ComponentDemos>
      <ComponentDemo :title="t('basic')" :code="basicCode">
        <NFlex>
          <RippleButton>Default</RippleButton>
          <RippleButton type="tertiary">Tertiary</RippleButton>
          <RippleButton type="primary">Primary</RippleButton>
          <RippleButton type="info">Info</RippleButton>
          <RippleButton type="success">Success</RippleButton>
          <RippleButton type="warning">Warning</RippleButton>
          <RippleButton type="error">Error</RippleButton>
        </NFlex>
      </ComponentDemo>

      <ComponentDemo :title="t('primary')" :code="primaryCode">
        <NFlex align="center">
          <RippleButton>Default</RippleButton>
          <RippleButton strong secondary>Default</RippleButton>
          <RippleButton tertiary>Default</RippleButton>
          <RippleButton quaternary>Default</RippleButton>
        </NFlex>
      </ComponentDemo>

      <ComponentDemo :title="t('size')" :code="sizeCode">
        <NFlex align="center">
          <RippleButton size="tiny">Tiny</RippleButton>
          <RippleButton size="small">Small</RippleButton>
          <RippleButton size="medium">Medium</RippleButton>
          <RippleButton size="large">Large</RippleButton>
        </NFlex>
      </ComponentDemo>

      <ComponentDemo :title="t('specialType')" :code="specialTypeCode">
        <NFlex>
          <RippleButton dashed>Dashed</RippleButton>
          <RippleButton text>Text</RippleButton>
          <RippleButton text tag="a" href="https://www.naiveui.com/zh-CN/os-theme" target="_blank" type="primary">
            Link
          </RippleButton>
        </NFlex>
      </ComponentDemo>

      <ComponentDemo :title="t('ghost')" :code="ghostButtonCode">
        <NFlex>
          <RippleButton ghost>Default</RippleButton>
          <RippleButton ghost type="primary">Primary</RippleButton>
          <RippleButton ghost type="info">Info</RippleButton>
          <RippleButton ghost type="success">Success</RippleButton>
          <RippleButton ghost type="warning">Warning</RippleButton>
          <RippleButton ghost type="error">Error</RippleButton>
        </NFlex>
      </ComponentDemo>

      <ComponentDemo :title="t('status')" :code="statusCode">
        <NFlex>
          <RippleButton loading>Loading</RippleButton>
          <RippleButton disabled>Disabled</RippleButton>
        </NFlex>
      </ComponentDemo>

      <ComponentDemo :title="t('shape')" :code="shapeCode">
        <NFlex>
          <RippleButton>Default</RippleButton>
          <RippleButton round>Round</RippleButton>
          <RippleButton circle>Circle</RippleButton>
        </NFlex>
      </ComponentDemo>

      <ComponentDemo :title="t('icon')" :code="iconCode">
        <NFlex>
          <RippleButton>
            <template #icon>
              <div class="i-line-md:cloud-alt-download-loop" />
            </template>
            Download
          </RippleButton>
          <RippleButton circle>
            <template #icon>
              <div class="i-mdi:reload" />
            </template>
          </RippleButton>
          <RippleButton quaternary circle>
            <template #icon>
              <div class="i-mdi:magnify" />
            </template>
          </RippleButton>
        </NFlex>
      </ComponentDemo>
    </ComponentDemos>
  </CommonPage>
</template>

<i18n lang="json">
{
  "zh": {
    "description": "简简单单加个点击的水波纹特效（花里胡哨）",
    "basic": "基础",
    "primary": "主次",
    "size": "尺寸",
    "specialType": "特殊类型",
    "ghost": "幽灵按钮",
    "status": "状态",
    "shape": "形状",
    "icon": "图标"
  },
  "en": {
    "description": "A simple button with a click ripple effect (flashy)",
    "basic": "Basic",
    "primary": "Primary And Secondary",
    "size": "Size",
    "specialType": "Special Type",
    "ghost": "Ghost Button",
    "status": "Status",
    "shape": "Shape",
    "icon": "Icon"
  }
}
</i18n>
