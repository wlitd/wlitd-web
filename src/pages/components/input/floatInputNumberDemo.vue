<script setup lang="ts">
import type { FormInst, FormRules, FormSize } from 'naive-ui'
import type { FloatInputNumberInst } from '@/components/ui/float-input-number/types'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const value = ref<number>(0)

const basicCode = `
<template>
  <FloatInputNumber v-model:value="value" placeholder="Please Input Number" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<number>(0)
<\/script>
`

const sizeCode = `
<template>
  <NFlex vertical>
    <FloatInputNumber size="tiny" placeholder="Tiny Input" />
    <FloatInputNumber size="small" placeholder="Small Input" />
    <FloatInputNumber placeholder="Medium Input" />
    <FloatInputNumber size="large" placeholder="Large Input" />
  </NFlex>
</template>
`

const slotsCode = `
<template>
  <NFlex vertical>
    <FloatInputNumber placeholder="Prefix">
      <template #prefix>
        <span>￥</span>
      </template>
    </FloatInputNumber>
    <FloatInputNumber placeholder="Suffix">
      <template #suffix>
        <span>%</span>
      </template>
    </FloatInputNumber>
    <FloatInputNumber placeholder="Custom Buttons with Prefix" button-placement="both">
      <template #prefix>
        <span>￥</span>
      </template>
      <template #minus-icon>
        <div class="i-mdi:arrow-down-bold" />
      </template>
      <template #add-icon>
        <div class="i-mdi:arrow-up-bold" />
      </template>
    </FloatInputNumber>
  </NFlex>
</template>
`

const statusCode = `
<template>
  <FloatInputNumber loading placeholder="Loading" />
  <FloatInputNumber disabled placeholder="Disabled" />
  <FloatInputNumber placeholder="Warning" status="warning" />
  <FloatInputNumber placeholder="Error" status="error" />
</template>
`

const methodValue = ref<number | null>(null)
const floatInputNumberRef = ref<FloatInputNumberInst>()
const methodCode = `
<template>
  <NFlex>
    <RippleButton @click="() => { floatInputNumberRef?.focus() }">
      Focus
    </RippleButton>
    <RippleButton @click="() => { floatInputNumberRef?.blur() }">
      Blur
    </RippleButton>
  </NFlex>
  <FloatInputNumber ref="floatInputNumberRef" v-model:value="methodValue" placeholder="Method" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FloatInputNumberInst } from '@/components/ui/float-input-number/types'

const methodValue = ref<number | null>(null)
const floatInputNumberRef = ref<FloatInputNumberInst>()
<\/script>
`

const eventCode = `
<template>
  <FloatInputNumber
    placeholder="Event"
    @focus="() => { message.info('Focus') }"
    @blur="() => { message.info('Blur') }"
  />
</template>
`

// 自定义解析函数（用于千位分隔符演示）
function parseThousand(input: string): number | null {
  const nums = input.replace(/,/g, '').trim()
  if (/^\d+(?:\.\d+)?$/.test(nums)) {
    return Number(nums)
  }
  return nums === '' ? null : Number.NaN
}

function formatThousand(value: number | null): string {
  if (value === null) {
    return ''
  }
  return value.toLocaleString('en-US')
}
const otherCode = `
<template>
  <FloatInputNumber :show-button="false" placeholder="Hide Buttons" />
  <FloatInputNumber :min="0" :max="100" :step="5" placeholder="With Range" />
  <FloatInputNumber :precision="2" placeholder="2 Decimal Places" />
  <FloatInputNumber
    placeholder="Thousand Separator"
    :default-value="1075"
    :parse="parseThousand"
    :format="formatThousand"
  />
</template>

<script setup lang="ts">
// 自定义解析函数（用于千位分隔符）
function parseThousand(input: string): number | null {
  const nums = input.replace(/,/g, '').trim()
  if (/^\d+(?:\.\d+)?$/.test(nums)) {
    return Number(nums)
  }
  return nums === '' ? null : Number.NaN
}

function formatThousand(value: number | null): string {
  if (value === null) {
    return ''
  }
  return value.toLocaleString('en-US')
}
<\/script>
`

const size = ref<FormSize>('medium')
const disabled = ref<boolean>(false)
const formRef = ref<FormInst>()
const formData: { amount: number | null } = reactive({
  amount: null
})
const formRules: FormRules = {
  amount: [
    { required: true, type: 'number', message: 'Please enter amount', trigger: 'blur' }
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
    <NFormItem path="amount">
      <FloatInputNumber v-model:value="formData.amount" clearable placeholder="Amount(Required)">
        <template #prefix>
          <span>￥</span>
        </template>
      </FloatInputNumber>
    </NFormItem>
    <NFormItem>
      <RippleButton @click="handleSubmit">
        Submit
      </RippleButton>
    </NFormItem>
  </NForm>
</template>

<script setup lang="ts">
import type { FormInst, FormRules } from 'naive-ui'
import { ref, reactive } from 'vue'

const size = ref<FormSize>('medium')
const disabled = ref<boolean>(false)
const formRef = ref<FormInst>()
const formData: { amount: number | null } = reactive({
  amount: null
})
const formRules: FormRules = {
  amount: [
    { required: true, type: 'number', message: 'Please enter amount', trigger: 'blur' }
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
        <FloatInputNumber v-model:value="value" placeholder="Please Input Number" />
      </ComponentDemo>

      <ComponentDemo :title="t('size')" :code="sizeCode">
        <NFlex vertical>
          <FloatInputNumber size="tiny" placeholder="Tiny Input" />
          <FloatInputNumber size="small" placeholder="Small Input" />
          <FloatInputNumber placeholder="Medium Input" />
          <FloatInputNumber size="large" placeholder="Large Input" />
        </NFlex>
      </ComponentDemo>

      <ComponentDemo :title="t('slots')" :code="slotsCode">
        <NFlex vertical>
          <FloatInputNumber placeholder="Prefix">
            <template #prefix>
              <span>￥</span>
            </template>
          </FloatInputNumber>
          <FloatInputNumber placeholder="Suffix">
            <template #suffix>
              <span>%</span>
            </template>
          </FloatInputNumber>
          <FloatInputNumber placeholder="Custom Buttons with Prefix" button-placement="both">
            <template #prefix>
              <span>￥</span>
            </template>
            <template #minus-icon>
              <div class="i-mdi:arrow-down-bold" />
            </template>
            <template #add-icon>
              <div class="i-mdi:arrow-up-bold" />
            </template>
          </FloatInputNumber>
        </NFlex>
      </ComponentDemo>

      <ComponentDemo :title="t('status')" :code="statusCode">
        <FloatInputNumber loading placeholder="Loading" />
        <FloatInputNumber disabled placeholder="Disabled" />
        <FloatInputNumber placeholder="Warning" status="warning" />
        <FloatInputNumber placeholder="Error" status="error" />
      </ComponentDemo>

      <ComponentDemo :title="t('method')" :code="methodCode">
        <NFlex>
          <RippleButton @click="() => { floatInputNumberRef?.focus() }">
            Focus
          </RippleButton>
          <RippleButton @click="() => { floatInputNumberRef?.blur() }">
            Blur
          </RippleButton>
        </NFlex>
        <FloatInputNumber ref="floatInputNumberRef" v-model:value="methodValue" placeholder="Method" />
      </ComponentDemo>

      <ComponentDemo :title="t('event')" :code="eventCode">
        <FloatInputNumber
          placeholder="Event" @focus="() => { message.info('Focus') }"
          @blur="() => { message.info('Blur') }"
        />
      </ComponentDemo>

      <ComponentDemo :title="t('other')" :code="otherCode">
        <FloatInputNumber :show-button="false" placeholder="Hide Buttons" />
        <FloatInputNumber :min="0" :max="100" :step="5" placeholder="With Range (0-100, step 5)" />
        <FloatInputNumber :precision="2" placeholder="2 Decimal Places" />
        <FloatInputNumber
          placeholder="Thousand Separator" :default-value="1075" :parse="parseThousand"
          :format="formatThousand"
        />
      </ComponentDemo>

      <ComponentDemo :title="t('form')" :code="formCode">
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
          <NFormItem path="amount">
            <FloatInputNumber v-model:value="formData.amount" clearable placeholder="Amount(Required)">
              <template #prefix>
                <span>￥</span>
              </template>
            </FloatInputNumber>
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
    "description": "带浮动标签效果的数字输入框组件",
    "basic": "基础",
    "size": "尺寸",
    "slots": "插槽",
    "status": "状态",
    "method": "方法",
    "event": "事件",
    "other": "其他",
    "form": "表单"
  },
  "en": {
    "description": "Input number component with floating label effect",
    "basic": "Basic",
    "size": "Size",
    "slots": "Slots",
    "status": "Status",
    "method": "Method",
    "event": "Event",
    "other": "Other",
    "form": "Form"
  }
}
</i18n>
