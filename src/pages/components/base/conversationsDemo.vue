<script setup lang="ts">
import type { Conversation, MenuConfig } from '@/components/ui/conversations/types'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const baseItems: Conversation[] = [
  { key: '1', label: 'Conversation Item 1' },
  { key: '2', label: 'Conversation Item 2' },
  { key: '3', label: 'Conversation Item 3' }
]

const baseActiveKey = ref<string>('1')

const basicCode = `
<template>
  <Conversations v-model:active-key="baseActiveKey" :items="baseItems" />
</template>

<script setup lang="ts">
import { Conversation } from '@/components/ui/conversations/types'

const baseItems: Conversation[] = [
  { key: '1', label: 'Conversation Item 1' },
  { key: '2', label: 'Conversation Item 2' },
  { key: '3', label: 'Conversation Item 3' }
]

const baseActiveKey = ref<string>('1')
<\/script>
`

const operationActiveKey = ref<string>('1')
function getMenuConfig(): MenuConfig {
  return {
    options: [
      { key: 'edit', label: 'Edit', icon: () => h('div', { class: 'i-lucide:pencil-line' }) },
      { key: 'delete', label: () => h('div', { class: 'color-red' }, 'Delete'), icon: () => h('div', { class: 'i-lucide:trash color-red' }) },
      { key: 'reload', label: 'Reload', icon: () => h('div', { class: 'i-lucide:refresh-ccw' }), disabled: true }
    ],
    onClick: (opt, conv) => {
      switch (opt.key) {
        case 'edit':
          console.warn('Edit', conv)
          break
        default:
          break
      }
    }
  }
}

const operationCode = `
<template>
  <Conversations v-model:active-key="operationActiveKey" :items="baseItems" :menu="getMenuConfig" />
</template>

<script setup lang="ts">
import type { Conversation, MenuConfig } from '@/components/ui/conversations/types'

const baseItems: Conversation[] = [
  { key: '1', label: 'Conversation Item 1' },
  { key: '2', label: 'Conversation Item 2' },
  { key: '3', label: 'Conversation Item 3' }
]

const operationActiveKey = ref<string>('1')

function getMenuConfig(): MenuConfig {
  return {
    options: [
      { key: 'edit', label: 'Edit', icon: () => h('div', { class: 'i-lucide:pencil-line' }) },
      { key: 'delete', label: () => h('div', { class: 'color-red' }, 'Delete'), icon: () => h('div', { class: 'i-lucide:trash color-red' }) },
      { key: 'reload', label: 'Reload', icon: () => h('div', { class: 'i-lucide:refresh-ccw' }), disabled: true }
    ],
    onClick: (opt, conv) => {
      switch (opt.key) {
        case 'edit':
          console.warn('Edit', conv)
          break
        default:
          break
      }
    }
  }
}
<\/script>
`

const statusActiveKey = ref<string>('1')
const statusItems: Conversation[] = [
  { key: '1', label: 'Status Item 1' },
  { key: '2', label: 'Disabled', disabled: true },
  { key: '3', label: 'Loading', loading: true }
]

const statusCode = `
<template>
  <Conversations v-model:active-key="statusActiveKey" :items="statusItems" />
</template>

<script setup lang="ts">
import type { Conversation } from '@/components/ui/conversations/types'

const statusActiveKey = ref<string>('1')
const statusItems: Conversation[] = [
  { key: '1', label: 'Status Item 1' },
  { key: '2', label: 'Disabled', disabled: true },
  { key: '3', label: 'Loading', loading: true }
]
<\/script>
`

const groupActiveKey = ref<string>('1')
const groupItems: Conversation[] = [
  { key: '1', label: 'Group Item 1' },
  { key: '2', label: 'Group Item 2' },
  { key: '3', label: 'Group Item 3', group: 'Group 1' },
  { key: '4', label: 'Group Item 4', group: 'Group 2' },
  { key: '5', label: 'Group Item 5', group: 'Group 1' },
  { key: '6', label: 'Group Item 6', group: 'Group 1' }
]

const groupCode = `
<template>
  <Conversations v-model:active-key="groupActiveKey" :items="groupItems" groupable />
</template>

<script setup lang="ts">
import type { Conversation } from '@/components/ui/conversations/types'

const groupActiveKey = ref<string>('1')
const groupItems: Conversation[] = [
  { key: '1', label: 'Group Item 1' },
  { key: '2', label: 'Group Item 2' },
  { key: '3', label: 'Group Item 3', group: 'Group 1' },
  { key: '4', label: 'Group Item 4', group: 'Group 2' },
  { key: '5', label: 'Group Item 5', group: 'Group 1' },
  { key: '6', label: 'Group Item 6', group: 'Group 1' }
]
<\/script>
`

const slotsActiveKey = ref<string>('1')
const slotsItems: Conversation[] = [
  { key: '1', label: 'Slots Item 1', group: 'Group 1', icon: () => h('div', { class: 'i-lucide:message-square' }) },
  { key: '2', label: 'Slots Item 2', group: 'Group 1' },
  { key: '3', label: () => h('div', { class: 'color-red' }, 'Slots Item 3'), group: 'Group 1' },
  { key: '4', label: 'Slots Item 4', group: 'Group 2' },
  { key: '5', label: 'Slots Item 5', group: 'Group 2' }
]

const slotsCode = `
<template>
  <Conversations v-model:active-key="slotsActiveKey" :items="slotsItems" :menu="getMenuConfig" groupable>
    <template #group="{ group }">
      <div class="flex items-center gap-2 justify-between">
        <div class="flex items-center gap-2">
          <div v-if="group === 'Group 1'" class="i-lucide:messages-square" />
          <span>{{ group }}</span>
        </div>
        <RippleButton quaternary size="small">
          <template #icon>
            <div class="i-lucide:plus" />
          </template>
        </RippleButton>
      </div>
    </template>
    <template #icon="{ conv }">
      <div v-if="conv.key === '2'" class="i-lucide:dollar-sign" />
    </template>
    <template #label="{ conv }">
      <div v-if="conv.key === '4'" class="color-blue">{{ conv.label }}</div>
    </template>
    <template #menuIcon>
      <div class="i-lucide:list" />
    </template>
  </Conversations>
</template>

<script setup lang="ts">
import type { Conversation, MenuConfig } from '@/components/ui/conversations/types'

const slotsActiveKey = ref<string>('1')
const slotsItems: Conversation[] = [
  { key: '1', label: 'Slots Item 1', group: 'Group 1', icon: () => h('div', { class: 'i-lucide:message-square' }) },
  { key: '2', label: 'Slots Item 2', group: 'Group 1' },
  { key: '3', label: () => h('div', { class: 'color-red' }, 'Slots Item 3'), group: 'Group 1' },
  { key: '4', label: 'Slots Item 4', group: 'Group 2' },
  { key: '5', label: 'Slots Item 5', group: 'Group 2' }
]

function getMenuConfig(): MenuConfig {
  return {
    options: [
      { key: 'edit', label: 'Edit', icon: () => h('div', { class: 'i-lucide:pencil-line' }) },
      { key: 'delete', label: () => h('div', { class: 'color-red' }, 'Delete'), icon: () => h('div', { class: 'i-lucide:trash color-red' }) },
      { key: 'reload', label: 'Reload', icon: () => h('div', { class: 'i-lucide:refresh-ccw' }), disabled: true }
    ],
    onClick: (opt, conv) => {
      switch (opt.key) {
        case 'edit':
          console.warn('Edit', conv)
          break
        default:
          break
      }
    }
  }
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
        <div class="flex-center">
          <div class="w-50">
            <Conversations v-model:active-key="baseActiveKey" :items="baseItems" />
          </div>
        </div>
      </ComponentDemo>

      <ComponentDemo :title="t('operation')" :code="operationCode">
        <div class="flex-center">
          <div class="w-50">
            <Conversations v-model:active-key="operationActiveKey" :items="baseItems" :menu="getMenuConfig" />
          </div>
        </div>
      </ComponentDemo>

      <ComponentDemo :title="t('status')" :code="statusCode">
        <div class="flex-center">
          <div class="w-50">
            <Conversations v-model:active-key="statusActiveKey" :items="statusItems" />
          </div>
        </div>
      </ComponentDemo>

      <ComponentDemo :title="t('group')" :code="groupCode">
        <div class="flex-center">
          <div class="w-50">
            <Conversations v-model:active-key="groupActiveKey" :items="groupItems" groupable />
          </div>
        </div>
      </ComponentDemo>

      <ComponentDemo :title="t('slots')" :code="slotsCode">
        <div class="flex-center">
          <div class="w-50">
            <Conversations v-model:active-key="slotsActiveKey" :items="slotsItems" :menu="getMenuConfig" groupable>
              <template #group="{ group }">
                <div class="flex items-center gap-2 justify-between">
                  <div class="flex items-center gap-2">
                    <div v-if="group === 'Group 1'" class="i-lucide:messages-square" />
                    <span>{{ group }}</span>
                  </div>
                  <RippleButton quaternary size="small">
                    <template #icon>
                      <div class="i-lucide:plus" />
                    </template>
                  </RippleButton>
                </div>
              </template>
              <template #icon="{ conv }">
                <div v-if="conv.key === '2'" class="i-lucide:dollar-sign" />
              </template>
              <template #label="{ conv }">
                <div v-if="conv.key === '4'" class="color-blue">{{ conv.label }}</div>
              </template>
              <template #menuIcon>
                <div class="i-lucide:list" />
              </template>
            </Conversations>
          </div>
        </div>
      </ComponentDemo>
    </ComponentDemos>
  </CommonPage>
</template>

<i18n lang="json">
{
  "zh": {
    "description": "AI 时代的一个列表展示组件",
    "basic": "基础",
    "operation": "操作",
    "status": "状态",
    "group": "分组",
    "slots": "插槽"
  },
  "en": {
    "description": "AI era list display component",
    "basic": "Basic",
    "operation": "Operation",
    "status": "Status",
    "group": "Group",
    "slots": "Slots"
  }
}
</i18n>
