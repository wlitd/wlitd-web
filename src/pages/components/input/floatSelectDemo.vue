<script setup lang="ts">
import type { FormInst, FormRules, FormSize, SelectOption, SelectRenderLabel, SelectRenderTag } from 'naive-ui'
import type { Value } from 'naive-ui/es/select/src/interface'
import type { FloatSelectInst } from '@/components/ui/float-select/types'
import { NAvatar, NTag, NText } from 'naive-ui'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const opts: SelectOption[] = [
  {
    label: 'Everybody\'s Got Something to Hide Except Me and My Monkey',
    value: 'song0',
    disabled: true
  },
  {
    label: 'Drive My Car',
    value: 'song1'
  },
  {
    label: 'Norwegian Wood',
    value: 'song2'
  }
]

const basicVal = ref<string>('')
const basicCode = `
<template>
  <FloatSelect v-model:value="basicVal" :options="opts" placeholder="Please Select" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const basicVal = ref<string>('')

const opts: SelectOption[] = [
  {
    label: 'Everybody\'s Got Something to Hide Except Me and My Monkey',
    value: 'song0',
    disabled: true
  },
  {
    label: 'Drive My Car',
    value: 'song1'
  },
  {
    label: 'Norwegian Wood',
    value: 'song2'
  }
]
<\/script>
`

const sizeCode = `
<template>
  <NFlex vertical>
    <FloatSelect :options="opts" size="tiny" placeholder="Tiny Select" />
    <FloatSelect :options="opts" size="small" placeholder="Small Select" />
    <FloatSelect :options="opts" placeholder="Medium Select" />
    <FloatSelect :options="opts" size="large" placeholder="Large Select" />
  </NFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const opts: SelectOption[] = [
  {
    label: 'Everybody\'s Got Something to Hide Except Me and My Monkey',
    value: 'song0',
    disabled: true
  },
  {
    label: 'Drive My Car',
    value: 'song1'
  },
  {
    label: 'Norwegian Wood',
    value: 'song2'
  }
]
<\/script>
`

const statusCode = `
<template>
  <NFlex vertical>
    <FloatSelect :options="opts" loading placeholder="Loading" />
    <FloatSelect :options="opts" disabled placeholder="Disabled" />
    <FloatSelect :options="opts" status="warning" placeholder="Warning" />
    <FloatSelect :options="opts" status="error" placeholder="Error" />
  </NFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const opts: SelectOption[] = [
  {
    label: 'Everybody\'s Got Something to Hide Except Me and My Monkey',
    value: 'song0',
    disabled: true
  },
  {
    label: 'Drive My Car',
    value: 'song1'
  },
  {
    label: 'Norwegian Wood',
    value: 'song2'
  }
]
<\/script>
`

const show = ref<boolean>(false)
const emptyOpts: SelectOption[] = []

const slotsCode = `
<template>
  <FloatSelect v-model:show="show" :options="emptyOpts" placeholder="Please Select">
    <template #header>
      <NText strong>Header</NText>
    </template>
    <template #action>
      <div class="flex justify-end">
        <NButton>Action</NButton>
      </div>
    </template>
    <template #empty>
      <NText>Empty</NText>
    </template>
    <template v-if="show" #arrow>
      <div class="i-lucide:lasso-select"></div>
    </template>
  </FloatSelect>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref<boolean>(false)
const emptyOpts: SelectOption[] = []
<\/script>
`

const eventVal = ref(null)
const eventCode = `
<template>
  <FloatSelect
    v-model:value="eventVal" placeholder="Please Select" @focus="() => message.info('Focus')"
    @blur="() => message.info('Blur')"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const eventVal = ref(null)
<\/script>
`

const selectRef = ref<FloatSelectInst>()
const methodCode = `
<template>
  <NFlex>
    <NButton @click="selectRef?.focus()">Focus</NButton>
    <NButton @click="selectRef?.focusInput()">Focus Input</NButton>
    <NButton @click="selectRef?.blur()">Blur</NButton>
    <NButton @click="selectRef?.blurInput()">Blur Input</NButton>
  </NFlex>
  <FloatSelect ref="selectRef" tag multiple :show="false" filterable placeholder="Please Select" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectRef = ref<FloatSelectInst>()
<\/script>
`

const size = ref<FormSize>('medium')
const disabled = ref<boolean>(false)
const formRef = ref<FormInst>()
const formData: { val: Value | null } = reactive({
  val: null
})
const formRules: FormRules = {
  val: [
    { required: true, message: 'Please select val', trigger: 'blur' }
  ]
}
function handleSubmit(): void {
  formRef.value?.validate((errors) => {
    if (!errors) {
      message.success('Submit successfully')
    } else {
      message.error('Submit failed')
    }
  })
}

const formCode = `
<template>
  <NFlex align="center">
    <span>Size:</span>
    <NRadioGroup v-model:value="size">
      <NRadioButton value="small">Small</NRadioButton>
      <NRadioButton value="medium">Medium</NRadioButton>
      <NRadioButton value="large">Large</NRadioButton>
    </NRadioGroup>
  </NFlex>
  <NFlex align="center">
    <span>Disabled:</span>
    <NSwitch v-model:value="disabled" />
  </NFlex>
  <NForm ref="formRef" inline :size="size" :disabled="disabled" :model="formData" :rules="formRules">
    <NFormItem path="val">
      <FloatSelect v-model:value="formData.val" clearable class="w-60" :options="opts" :size="size" :disabled="disabled" placeholder="Please Select" />
    </NFormItem>
    <NFormItem>
      <RippleButton @click="handleSubmit">
        Submit
      </RippleButton>
    </NFormItem>
  </NForm>
</template>

<script setup lang="ts">
import type { FormInst, FormItemRule, FormRules } from 'naive-ui'
import type { Size } from 'naive-ui/es/form/src/interface'
import { ref, reactive } from 'vue'

const size = ref<Size>('medium')
const disabled = ref<boolean>(false)
const formRef = ref<FormInst>()
const formData: { val: Value | null, endDate: number | null } = reactive({
  val: null
})
const formRules: FormRules = {
  val: [
    { required: true, message: 'Please select val', trigger: 'blur' }
  ]
}

const opts: SelectOption[] = [
  {
    label: 'Everybody\'s Got Something to Hide Except Me and My Monkey',
    value: 'song0',
    disabled: true
  },
  {
    label: 'Drive My Car',
    value: 'song1'
  },
  {
    label: 'Norwegian Wood',
    value: 'song2'
  }
]

function handleSubmit(): void {
  formRef.value?.validate((errors) => {
    if (!errors) {
      message.success('Submit successfully')
    } else {
      message.error('Submit failed')
    }
  })
}
<\/script>
`

const renderLabel: SelectRenderLabel = (option) => {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        alignItems: 'center'
      }
    },
    [
      h(NAvatar, {
        round: true,
        size: 'small'
      }, { default: () => 'Tag' }),
      h(
        'div',
        {
          style: {
            marginLeft: '12px',
            padding: '4px 0'
          }
        },
        [
          h('div', null, [option.label as string]),
          h(
            NText,
            { depth: 3, tag: 'div' },
            {
              default: () => 'description'
            }
          )
        ]
      )
    ]
  )
}

const renderMultipleSelectTag: SelectRenderTag = ({ option, handleClose }) => {
  return h(
    NTag,
    {
      style: {
        padding: '0 6px 0 4px'
      },
      round: true,
      closable: true,
      onClose: (e) => {
        e.stopPropagation()
        handleClose()
      }
    },
    {
      default: () =>
        h(
          'div',
          {
            style: {
              display: 'flex',
              alignItems: 'center'
            }
          },
          [
            h(NAvatar, {
              round: true,
              style: {
                marginRight: '4px'
              }
            }, { default: () => 'Tag' }),
            option.label as string
          ]
        )
    }
  )
}

const options = [
  {
    label: 'Tag1',
    value: 'tag1'
  },
  {
    label: 'Tag2',
    value: 'tag2'
  },
  {
    label: 'Tag3',
    value: 'tag3'
  }
]

const otherCode = `
<template>
  <FloatSelect
    multiple
    :options="options"
    :render-label="renderLabel"
    :render-tag="renderMultipleSelectTag"
    filterable
    placeholder="Please Select"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const renderLabel: SelectRenderLabel = (option) => {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        alignItems: 'center'
      }
    },
    [
      h(NAvatar, {
        round: true,
        size: 'small'
      }, { default: () => 'Tag' }),
      h(
        'div',
        {
          style: {
            marginLeft: '12px',
            padding: '4px 0'
          }
        },
        [
          h('div', null, [option.label as string]),
          h(
            NText,
            { depth: 3, tag: 'div' },
            {
              default: () => 'description'
            }
          )
        ]
      )
    ]
  )
}

const renderMultipleSelectTag: SelectRenderTag = ({ option, handleClose }) => {
  return h(
    NTag,
    {
      style: {
        padding: '0 6px 0 4px'
      },
      round: true,
      closable: true,
      onClose: (e) => {
        e.stopPropagation()
        handleClose()
      }
    },
    {
      default: () =>
        h(
          'div',
          {
            style: {
              display: 'flex',
              alignItems: 'center'
            }
          },
          [
            h(NAvatar, {
              round: true,
              style: {
                marginRight: '4px'
              }
            }, { default: () => 'Tag' }),
            option.label as string
          ]
        )
    }
  )
}

const options = [
  {
    label: 'Tag1',
    value: 'tag1'
  },
  {
    label: 'Tag2',
    value: 'tag2'
  },
  {
    label: 'Tag3',
    value: 'tag3'
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
      <ComponentDemo title="Basic" :code="basicCode">
        <FloatSelect v-model:value="basicVal" :options="opts" placeholder="Please Select" />
      </ComponentDemo>

      <ComponentDemo title="Size" :code="sizeCode">
        <NFlex vertical>
          <FloatSelect :options="opts" size="tiny" placeholder="Tiny Select" />
          <FloatSelect :options="opts" size="small" placeholder="Small Select" />
          <FloatSelect :options="opts" placeholder="Medium Select" />
          <FloatSelect :options="opts" size="large" placeholder="Large Select" />
        </NFlex>
      </ComponentDemo>

      <ComponentDemo title="Status" :code="statusCode">
        <NFlex vertical>
          <FloatSelect :options="opts" loading placeholder="Loading" />
          <FloatSelect :options="opts" disabled placeholder="Disabled" />
          <FloatSelect :options="opts" status="warning" placeholder="Warning" />
          <FloatSelect :options="opts" status="error" placeholder="Error" />
        </NFlex>
      </ComponentDemo>

      <ComponentDemo title="Slots" :code="slotsCode">
        <FloatSelect v-model:show="show" :options="emptyOpts" placeholder="Please Select">
          <template #header>
            <NText strong>Header</NText>
          </template>
          <template #action>
            <div class="flex justify-end">
              <NButton>Action</NButton>
            </div>
          </template>
          <template #empty>
            <NText>Empty</NText>
          </template>
          <template v-if="show" #arrow>
            <div class="i-lucide:lasso-select" />
          </template>
        </FloatSelect>
      </ComponentDemo>

      <ComponentDemo title="Event" :code="eventCode">
        <FloatSelect
          v-model:value="eventVal" placeholder="Please Select" @focus="() => message.info('Focus')"
          @blur="() => message.info('Blur')"
        />
      </ComponentDemo>

      <ComponentDemo title="Method" :code="methodCode">
        <NFlex>
          <NButton @click="selectRef?.focus()">Focus</NButton>
          <NButton @click="selectRef?.focusInput()">Focus Input</NButton>
          <NButton @click="selectRef?.blur()">Blur</NButton>
          <NButton @click="selectRef?.blurInput()">Blur Input</NButton>
        </NFlex>
        <FloatSelect ref="selectRef" tag multiple :show="false" filterable placeholder="Please Select" />
      </ComponentDemo>

      <ComponentDemo title="Other" :code="otherCode">
        <FloatSelect
          multiple :options="options" :render-label="renderLabel"
          :render-tag="renderMultipleSelectTag" filterable placeholder="Please Select"
        />
      </ComponentDemo>

      <ComponentDemo title="Form" :code="formCode">
        <NFlex align="center">
          <span>Size:</span>
          <NRadioGroup v-model:value="size">
            <NRadioButton value="small">Small</NRadioButton>
            <NRadioButton value="medium">Medium</NRadioButton>
            <NRadioButton value="large">Large</NRadioButton>
          </NRadioGroup>
        </NFlex>
        <NFlex align="center">
          <span>Disabled:</span>
          <NSwitch v-model:value="disabled" />
        </NFlex>
        <NForm ref="formRef" inline :size="size" :disabled="disabled" :model="formData" :rules="formRules">
          <NFormItem>
            <FloatSelect
              v-model:value="formData.val" clearable class="w-60" :options="opts"
              placeholder="Please Select"
            />
          </NFormItem>
          <NFormItem>
            <RippleButton @click="handleSubmit">
              Submit
            </RippleButton>
          </NFormItem>
        </NForm>
      </ComponentDemo>
    </ComponentDemos>
  </CommonPage>
</template>

<i18n lang="json">
{
    "zh": {
        "description": "带浮动标签效果的选择器组件",
        "basic": "基础",
        "size": "尺寸",
        "status": "状态",
        "slots": "插槽",
        "event": "事件",
        "method": "方法",
        "form": "表单"
    },
    "en": {
        "description": "Selector component with floating label effect",
        "basic": "Basic",
        "size": "Size",
        "status": "Status",
        "slots": "Slots",
        "event": "Event",
        "method": "Method",
        "form": "Form"
    }
}
</i18n>
