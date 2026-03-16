<script setup lang="ts">
import type { SpeedDialItem } from '@/components/ui/speed-dial/types'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const speedDialItems: SpeedDialItem[] = [
  { key: 'copy', icon: 'i-mdi:content-copy', label: '复制' },
  { key: 'cut', icon: 'i-mdi:content-cut', label: '剪切' },
  { key: 'undo', icon: 'i-mdi:undo', label: '撤销' },
  { key: 'redo', icon: 'i-mdi:redo', label: '重做' },
  { key: 'save', icon: 'i-mdi:content-save', label: '保存' }
]

const basicCode = `
<template>
  <div class="relative w-full h-130">
    <SpeedDial class="absolute-x-center top-3" :items="speedDialItems" tooltip-placement="right" direction="down" />
    <SpeedDial class="absolute-x-center bottom-3" :items="speedDialItems" tooltip-placement="right" direction="up" />
    <SpeedDial class="absolute-y-center left-3" :items="speedDialItems" direction="right" />
    <SpeedDial class="absolute-y-center right-3" :items="speedDialItems" direction="left" />
  </div>
</template>

<script setup lang="ts">
import type { SpeedDialItem } from '@/components/ui/speed-dial/types'

const speedDialItems: SpeedDialItem[] = [
  { key: 'copy', icon: 'i-mdi:content-copy', label: '复制' },
  { key: 'cut', icon: 'i-mdi:content-cut', label: '剪切' },
  { key: 'undo', icon: 'i-mdi:undo', label: '撤销' },
  { key: 'redo', icon: 'i-mdi:redo', label: '重做' },
  { key: 'save', icon: 'i-mdi:content-save', label: '保存' }
]
<\/script>
`

const circleCode = `
<template>
  <div class="relative w-full h-60">
    <SpeedDial class="absolute-center" :items="speedDialItems" type="circle" />
  </div>
</template>

<script setup lang="ts">
import type { SpeedDialItem } from '@/components/ui/speed-dial/types'

const speedDialItems: SpeedDialItem[] = [
  { key: 'copy', icon: 'i-mdi:content-copy', label: '复制' },
  { key: 'cut', icon: 'i-mdi:content-cut', label: '剪切' },
  { key: 'undo', icon: 'i-mdi:undo', label: '撤销' },
  { key: 'redo', icon: 'i-mdi:redo', label: '重做' },
  { key: 'save', icon: 'i-mdi:content-save', label: '保存' }
]
<\/script>
`

const semiCircleCode = `
<template>
  <div class="relative w-full h-70">
    <SpeedDial class="absolute-x-center top-3" :items="speedDialItems" type="semi-circle" tooltip-placement="bottom" direction="down" />
    <SpeedDial class="absolute-x-center bottom-3" :items="speedDialItems" type="semi-circle" direction="up" />
    <SpeedDial class="absolute-y-center left-3" :items="speedDialItems" type="semi-circle" tooltip-placement="right" direction="right" />
    <SpeedDial class="absolute-y-center right-3" :items="speedDialItems" type="semi-circle" tooltip-placement="left" direction="left" />
  </div>
</template>

<script setup lang="ts">
import type { SpeedDialItem } from '@/components/ui/speed-dial/types'

const speedDialItems: SpeedDialItem[] = [
  { key: 'copy', icon: 'i-mdi:content-copy', label: '复制' },
  { key: 'cut', icon: 'i-mdi:content-cut', label: '剪切' },
  { key: 'undo', icon: 'i-mdi:undo', label: '撤销' },
  { key: 'redo', icon: 'i-mdi:redo', label: '重做' },
  { key: 'save', icon: 'i-mdi:content-save', label: '保存' }
]
<\/script>
`

const quarterCircleCode = `
<template>
  <div class="relative w-full h-90">
    <SpeedDial class="top-3 left-3" :items="speedDialItems" :radius="120" type="quarter-circle" tooltip-placement="right" direction="down-right" />
    <SpeedDial class="top-3 right-3" :items="speedDialItems" :radius="120" type="quarter-circle" tooltip-placement="left" direction="down-left" />
    <SpeedDial class="bottom-3 left-3" :items="speedDialItems" :radius="120" type="quarter-circle" tooltip-placement="right" direction="up-right" />
    <SpeedDial class="bottom-3 right-3" :items="speedDialItems" :radius="120" type="quarter-circle" tooltip-placement="left" direction="up-left" />
  </div>
</template>

<script setup lang="ts">
import type { SpeedDialItem } from '@/components/ui/speed-dial/types'

const speedDialItems: SpeedDialItem[] = [
  { key: 'copy', icon: 'i-mdi:content-copy', label: '复制' },
  { key: 'cut', icon: 'i-mdi:content-cut', label: '剪切' },
  { key: 'undo', icon: 'i-mdi:undo', label: '撤销' },
  { key: 'redo', icon: 'i-mdi:redo', label: '重做' },
  { key: 'save', icon: 'i-mdi:content-save', label: '保存' }
]
<\/script>
`

const slotsCode = `
<template>
  <div class="relative w-full h-70">
    <SpeedDial class="absolute-x-center bottom-3" :items="speedDialItems" direction="up">
      <template #button="{ expand, toggle }">
        <NBadge :value="9">
          <RippleButton @click="toggle">
            <template #icon>
              <div :class="expand ? 'i-mdi:close' : 'i-mdi:plus'" />
            </template>
          </RippleButton>
        </NBadge>
      </template>
      <template #item="{ item }">
        <RippleButton :type="item.key === 'redo' ? 'primary' : 'default'">
          <template #icon>
            <div :class="item.icon" />
          </template>
          <span v-if="item.key === 'redo'">{{ item.label }}</span>
        </RippleButton>
      </template>
    </SpeedDial>
  </div>
</template>

<script setup lang="ts">
import type { SpeedDialItem } from '@/components/ui/speed-dial/types'

const speedDialItems: SpeedDialItem[] = [
  { key: 'copy', icon: 'i-mdi:content-copy', label: '复制' },
  { key: 'cut', icon: 'i-mdi:content-cut', label: '剪切' },
  { key: 'undo', icon: 'i-mdi:undo', label: '撤销' },
  { key: 'redo', icon: 'i-mdi:redo', label: '重做' },
  { key: 'save', icon: 'i-mdi:content-save', label: '保存' }
]
<\/script>
`

const typeCode = `
<template>
  <div class="flex justify-center gap-2 items-end w-full h-60">
    <SpeedDial class="relative" :items="speedDialItems" tooltip-placement="right" direction="up" />
    <SpeedDial class="relative" :items="speedDialItems" tooltip-placement="right" direction="up" button-type="default" />
  </div>
</template>

<script setup lang="ts">
import type { SpeedDialItem } from '@/components/ui/speed-dial/types'

const speedDialItems: SpeedDialItem[] = [
  { key: 'copy', icon: 'i-mdi:content-copy', label: '复制' },
  { key: 'cut', icon: 'i-mdi:content-cut', label: '剪切' },
  { key: 'undo', icon: 'i-mdi:undo', label: '撤销' },
  { key: 'redo', icon: 'i-mdi:redo', label: '重做' },
  { key: 'save', icon: 'i-mdi:content-save', label: '保存' }
]
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
        <div class="relative w-full h-130">
          <SpeedDial
            class="absolute-x-center top-3" :items="speedDialItems" tooltip-placement="right"
            direction="down"
          />
          <SpeedDial
            class="absolute-x-center bottom-3" :items="speedDialItems" tooltip-placement="right"
            direction="up"
          />
          <SpeedDial class="absolute-y-center left-3" :items="speedDialItems" direction="right" />
          <SpeedDial class="absolute-y-center right-3" :items="speedDialItems" direction="left" />
        </div>
      </ComponentDemo>

      <ComponentDemo :title="t('circle')" :code="circleCode">
        <div class="relative w-full h-60">
          <SpeedDial class="absolute-center" :items="speedDialItems" type="circle" />
        </div>
      </ComponentDemo>

      <ComponentDemo :title="t('semiCircle')" :code="semiCircleCode">
        <div class="relative w-full h-70">
          <SpeedDial
            class="absolute-x-center top-3" :items="speedDialItems" type="semi-circle"
            tooltip-placement="bottom" direction="down"
          />
          <SpeedDial class="absolute-x-center bottom-3" :items="speedDialItems" type="semi-circle" direction="up" />
          <SpeedDial
            class="absolute-y-center left-3" :items="speedDialItems" type="semi-circle"
            tooltip-placement="right" direction="right"
          />
          <SpeedDial
            class="absolute-y-center right-3" :items="speedDialItems" type="semi-circle"
            tooltip-placement="left" direction="left"
          />
        </div>
      </ComponentDemo>

      <ComponentDemo :title="t('quarterCircle')" :code="quarterCircleCode">
        <div class="relative w-full h-90">
          <SpeedDial
            class="top-3 left-3" :items="speedDialItems" :radius="120" type="quarter-circle"
            tooltip-placement="right" direction="down-right"
          />
          <SpeedDial
            class="top-3 right-3" :items="speedDialItems" :radius="120" type="quarter-circle"
            tooltip-placement="left" direction="down-left"
          />
          <SpeedDial
            class="bottom-3 left-3" :items="speedDialItems" :radius="120" type="quarter-circle"
            tooltip-placement="right" direction="up-right"
          />
          <SpeedDial
            class="bottom-3 right-3" :items="speedDialItems" :radius="120" type="quarter-circle"
            tooltip-placement="left" direction="up-left"
          />
        </div>
      </ComponentDemo>

      <ComponentDemo :title="t('slots')" :code="slotsCode">
        <div class="relative w-full h-70">
          <SpeedDial class="absolute-x-center bottom-3" :items="speedDialItems" direction="up">
            <template #button="{ expand, toggle }">
              <NBadge :value="9">
                <RippleButton @click="toggle">
                  <template #icon>
                    <div :class="expand ? 'i-mdi:close' : 'i-mdi:plus'" />
                  </template>
                </RippleButton>
              </NBadge>
            </template>
            <template #item="{ item }">
              <RippleButton :type="item.key === 'redo' ? 'primary' : 'default'">
                <template #icon>
                  <div :class="item.icon" />
                </template>
                <span v-if="item.key === 'redo'">{{ item.label }}</span>
              </RippleButton>
            </template>
          </SpeedDial>
        </div>
      </ComponentDemo>

      <ComponentDemo :title="t('type')" :code="typeCode">
        <div class="flex justify-center gap-2 items-end w-full h-60">
          <SpeedDial class="relative" :items="speedDialItems" tooltip-placement="right" direction="up" />
          <SpeedDial
            class="relative" :items="speedDialItems" tooltip-placement="right" direction="up"
            button-type="default"
          />
        </div>
      </ComponentDemo>
    </ComponentDemos>
  </CommonPage>
</template>

<i18n lang="json">
{
  "zh": {
    "description": "一个不同审美的 FloatButton ？",
    "basic": "基础",
    "circle": "圆形",
    "semiCircle": "半圆形",
    "quarterCircle": "四分之一圆",
    "slots": "插槽",
    "type": "类型"
  },
  "en": {
    "description": "A FloatButton with different aesthetics?",
    "basic": "Basic",
    "circle": "Circle",
    "semiCircle": "Semi-Circle",
    "quarterCircle": "Quarter-Circle",
    "slots": "Slots",
    "type": "Type"
  }
}
</i18n>
