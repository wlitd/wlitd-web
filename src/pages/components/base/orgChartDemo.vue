<script setup lang="ts">
import type { OrgChartNode } from '@/components/ui/org-chart/types'
import { useThemeVars } from 'naive-ui'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Basic tree data
const basicData: OrgChartNode[] = [
  {
    key: '0',
    label: 'Argentina',
    children: [
      {
        key: '0-0',
        label: 'Argentina',
        children: [
          { key: '0-0-0', label: 'Argentina' },
          { key: '0-0-1', label: 'Croatia' }
        ]
      },
      {
        key: '0-1',
        label: 'France',
        children: [
          { key: '0-1-0', label: 'Morocco' }
        ]
      }
    ]
  }
]

const basicCode = `
<template>
  <div class="h-100">
    <OrgChart :value="basicData">
      <template #node="{ node }">
        <div class="flex justify-center items-center">{{ node.label }}</div>
      </template>
    </OrgChart>
  </div>
</template>

<script setup lang="ts">
import type { OrgChartNode } from '@/components/ui/org-chart/types'

const basicData: OrgChartNode[] = [
  {
    key: '0',
    label: 'Argentina',
    children: [
      {
        key: '0-0',
        label: 'Argentina',
        children: [
          { key: '0-0-0', label: 'Argentina' },
          { key: '0-0-1', label: 'Croatia' }
        ]
      },
      {
        key: '0-1',
        label: 'France',
        children: [
          { key: '0-1-0', label: 'Morocco' }
        ]
      }
    ]
  }
]
<\/script>
`

const themeVars = useThemeVars()
const selectableData: OrgChartNode[] = [
  {
    key: '0',
    label: 'Argentina',
    children: [
      {
        key: '0-0',
        label: 'Argentina',
        children: [
          { key: '0-0-0', label: 'Argentina', selectable: false },
          { key: '0-0-1', label: 'Croatia' }
        ]
      },
      {
        key: '0-1',
        label: 'France',
        children: [
          { key: '0-1-0', label: 'Morocco' }
        ]
      }
    ]
  }
]

const selectableCode = `
<template>
  <NFlex vertical>
    <div class="h-100">
      <span>Single:</span>
      <OrgChart :value="selectableData" selection-mode="single">
        <template #node="{ node }">
          <div
            class="flex justify-center items-center" :style="{
              color: node.selectable === false ? themeVars.textColorDisabled : themeVars.textColorBase,
            }"
          >
            {{ node.label }}
          </div>
        </template>
      </OrgChart>
    </div>
    <div class="h-100">
      <span>Multiple:</span>
      <OrgChart :value="selectableData" selection-mode="multiple">
        <template #node="{ node }">
          <div
            class="flex justify-center items-center" :style="{
              color: node.selectable === false ? themeVars.textColorDisabled : themeVars.textColorBase,
            }"
          >
            {{ node.label }}
          </div>
        </template>
      </OrgChart>
    </div>
  </NFlex>
</template>

<script setup lang="ts">
import type { OrgChartNode } from '@/components/ui/org-chart/types'
import { useThemeVars } from 'naive-ui'

const themeVars = useThemeVars()
const selectableData: OrgChartNode[] = [
  {
    key: '0',
    label: 'Argentina',
    children: [
      {
        key: '0-0',
        label: 'Argentina',
        children: [
          { key: '0-0-0', label: 'Argentina', selectable: false },
          { key: '0-0-1', label: 'Croatia' }
        ]
      },
      {
        key: '0-1',
        label: 'France',
        children: [
          { key: '0-1-0', label: 'Morocco' }
        ]
      }
    ]
  }
]
<\/script>
`

const collapsibleData: OrgChartNode[] = [
  {
    key: '0',
    label: 'Argentina',
    children: [
      {
        key: '0-0',
        label: 'Argentina',
        children: [
          { key: '0-0-0', label: 'Argentina' },
          { key: '0-0-1', label: 'Croatia' }
        ]
      },
      {
        key: '0-1',
        label: 'France',
        collapsible: false,
        children: [
          { key: '0-1-0', label: 'Morocco' }
        ]
      }
    ]
  }
]

const collapsibleCode = `
<template>
  <div class="h-100">
    <OrgChart :value="collapsibleData" :default-collapsed="true">
      <template #node="{ node }">
        <div class="flex justify-center items-center">{{ node.label }}</div>
      </template>
    </OrgChart>
  </div>
</template>
<script setup lang="ts">
import type { OrgChartNode } from '@/components/ui/org-chart/types'

const collapsibleData: OrgChartNode[] = [
  {
    key: '0',
    label: 'Argentina',
    children: [
      {
        key: '0-0',
        label: 'Argentina',
        children: [
          { key: '0-0-0', label: 'Argentina' },
          { key: '0-0-1', label: 'Croatia' }
        ]
      },
      {
        key: '0-1',
        label: 'France',
        collapsible: false,
        children: [
          { key: '0-1-0', label: 'Morocco' }
        ]
      }
    ]
  }
]
<\/script>
`

const slotsData: OrgChartNode[] = [
  {
    key: '0',
    label: 'Dong Ming Rui',
    icon: 'i-flag:cn-4x3',
    description: 'CEO',
    children: [
      {
        key: '0-0',
        label: 'Argentina',
        icon: 'i-flag:ar-4x3',
        description: 'CMO',
        children: [
          { key: '0-0-0', label: 'Jack', icon: 'i-flag:ar-4x3' },
          { key: '0-0-1', label: 'Mike', icon: 'i-flag:hr-4x3' }
        ]
      },
      {
        key: '0-1',
        label: 'France',
        icon: 'i-flag:fr-4x3',
        description: 'CTO',
        children: [
          { key: '0-1-0', label: 'Lucy', icon: 'i-flag:ma-4x3' },
          { key: '0-1-1', label: 'Mike', icon: 'i-flag:fr-4x3' }
        ]
      }
    ]
  }
]

const slotsCode = `
<template>
  <div class="h-100">
    <OrgChart :value="slotsData" selection-mode="single">
      <template #node="{ node }">
        <div class="flex flex-col items-center justify-center">
          <div :class="node.icon" />
          <div>{{ node.label }}</div>
          <div>{{ node.description }}</div>
        </div>
      </template>
    </OrgChart>
  </div>
</template>

<script setup lang="ts">
import { OrgChart } from '@/components/ui/org-chart'

const slotsData: OrgChartNode[] = [
  {
    key: '0',
    label: 'Dong Ming Rui',
    icon: 'i-flag:cn-4x3',
    description: 'CEO',
    children: [
      {
        key: '0-0',
        label: 'Argentina',
        icon: 'i-flag:ar-4x3',
        description: 'CMO',
        children: [
          { key: '0-0-0', label: 'Jack', icon: 'i-flag:ar-4x3' },
          { key: '0-0-1', label: 'Mike', icon: 'i-flag:hr-4x3' }
        ]
      },
      {
        key: '0-1',
        label: 'France',
        icon: 'i-flag:fr-4x3',
        description: 'CTO',
        children: [
          { key: '0-1-0', label: 'Lucy', icon: 'i-flag:ma-4x3' },
          { key: '0-1-1', label: 'Mike', icon: 'i-flag:fr-4x3' }
        ]
      }
    ]
  }
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
        <div class="h-100">
          <OrgChart :value="basicData">
            <template #node="{ node }">
              <div class="flex justify-center items-center">{{ node.label }}</div>
            </template>
          </OrgChart>
        </div>
      </ComponentDemo>

      <ComponentDemo :title="t('selectable')" :code="selectableCode">
        <NFlex vertical>
          <div class="h-100">
            <span>Single:</span>
            <OrgChart :value="selectableData" selection-mode="single">
              <template #node="{ node }">
                <div
                  class="flex justify-center items-center" :style="{
                    color: node.selectable === false ? themeVars.textColorDisabled : themeVars.textColorBase,
                  }"
                >
                  {{ node.label }}
                </div>
              </template>
            </OrgChart>
          </div>
          <div class="h-100">
            <span>Multiple:</span>
            <OrgChart :value="selectableData" selection-mode="multiple">
              <template #node="{ node }">
                <div
                  class="flex justify-center items-center" :style="{
                    color: node.selectable === false ? themeVars.textColorDisabled : themeVars.textColorBase,
                  }"
                >
                  {{ node.label }}
                </div>
              </template>
            </OrgChart>
          </div>
        </NFlex>
      </ComponentDemo>

      <ComponentDemo :title="t('collapsible')" :code="collapsibleCode">
        <div class="h-100">
          <OrgChart :value="collapsibleData" :default-collapsed="true">
            <template #node="{ node }">
              <div class="flex justify-center items-center">{{ node.label }}</div>
            </template>
          </OrgChart>
        </div>
      </ComponentDemo>

      <ComponentDemo :title="t('slots')" :code="slotsCode">
        <div class="h-100">
          <OrgChart :value="slotsData" selection-mode="single">
            <template #node="{ node }">
              <div class="flex flex-col items-center justify-center">
                <div :class="node.icon" />
                <div>{{ node.label }}</div>
                <div>{{ node.description }}</div>
              </div>
            </template>
          </OrgChart>
        </div>
      </ComponentDemo>
    </ComponentDemos>
  </CommonPage>
</template>

<i18n lang="json">
{
  "zh": {
    "description": "组织架构图，用于展示层级数据结构",
    "basic": "基础",
    "selectable": "可选",
    "collapsible": "折叠",
    "slots": "插槽"
  },
  "en": {
    "description": "Organization chart for displaying hierarchical data",
    "basic": "Basic",
    "selectable": "Selectable",
    "collapsible": "Collapsible",
    "slots": "Slots"
  }
}
</i18n>
