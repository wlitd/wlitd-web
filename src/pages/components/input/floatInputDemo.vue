<script setup lang="ts">
import type { FormInst, FormItemRule, FormRules, FormSize } from 'naive-ui'
// import type { Size } from 'naive-ui/es/form/src/interface'
import type { FloatInputInst } from '@/components/ui/float-input/types'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const value = ref<string>('')
const text = ref<string>('')
const basicCode = `
<template>
  <FloatInput v-model:value="value" placeholder="Please Input" />
  <FloatInput v-model:value="text" type="textarea" placeholder="Please Input" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string>('')
const text = ref<string>('')
<\/script>
`

const sizeCode = `
<template>
  <NFlex vertical>
    <FloatInput size="tiny" placeholder="Tiny Input" />
    <FloatInput size="small" placeholder="Small Input" />
    <FloatInput placeholder="Medium Input" />
    <FloatInput size="large" placeholder="Large Input" />
  </NFlex>
</template>
`

const roundCode = `
<template>
  <NFlex vertical>
    <FloatInput round size="small" placeholder="Small Input" />
    <FloatInput round placeholder="Medium Input" />
    <FloatInput round size="large" placeholder="Large Input" />
  </NFlex>
</template>
`

const slotsCode = `
<template>
  <NFlex vertical>
    <FloatInput placeholder="Prefix">
      <template #prefix>
        <div class="i-mdi:email" />
      </template>
    </FloatInput>
    <FloatInput placeholder="Suffix">
      <template #suffix>
        <div class="i-mdi:magnify" />
      </template>
    </FloatInput>
    <FloatInput placeholder="ClearIcon" clearable>
      <template #clearIcon>
        <div class="i-mdi:delete" />
      </template>
    </FloatInput>
    <FloatInput placeholder="Password" type="password" show-password-on="click">
      <template #passwordVisibleIcon>
        <div class="i-mdi:eye" />
      </template>
      <template #passwordInvisibleIcon>
        <div class="i-mdi:eye-off" />
      </template>
    </FloatInput>
    <FloatInput placeholder="Count" show-count>
      <template #count="{ value: inputStr }">
        <NBadge :value="inputStr.length" />
      </template>
    </FloatInput>
  </NFlex>
</template>
`

const statusCode = `
<template>
  <FloatInput loading placeholder="Loading" />
  <FloatInput disabled placeholder="Disabled" />
  <FloatInput placeholder="Warning" status="warning" />
  <FloatInput placeholder="Error" status="error" />
</template>
`

const methodValue = ref<string>('马儿乖，马儿好，马儿光跑不吃草。'.repeat(4))
const floatInputRef = ref<FloatInputInst>()
const methodCode = `
<template>
  <NFlex>
    <RippleButton @click="() => { floatInputRef?.clear() }">
      Clear
    </RippleButton>
    <RippleButton @click="() => { floatInputRef?.focus() }">
      Focus
    </RippleButton>
    <RippleButton @click="() => { floatInputRef?.blur() }">
      Blur
    </RippleButton>
    <RippleButton @click="() => { floatInputRef?.select() }">
      Select
    </RippleButton>
    <RippleButton @click="() => { floatInputRef?.scrollToEnd({ behavior: 'smooth', left: 1000 }) }">
      ScrollToEnd
    </RippleButton>
  </NFlex>
  <FloatInput ref="floatInputRef" v-model:value="methodValue" placeholder="Method" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const methodValue = ref<string>('马儿乖，马儿好，马儿光跑不吃草。'.repeat(4))
const floatInputRef = ref<FloatInputInst>()
<\/script>
`

const eventCode = `
<template>
  <FloatInput placeholder="Event" 
    @focus="() => { message.info('Focus') }" 
    @blur="() => { message.info('Blur') }"
    @input="() => { message.info('Input') }" 
    @change="() => { message.info('Change') }"
    @keyup="() => { message.info('Keyup') }" 
  />
</template>
`

const otherCode = `
<template>
  <FloatInput autosize style="min-width: 50%" placeholder="Autosize" />
  <NInputGroup>
    <NInputGroupLabel>https://www.</NInputGroupLabel>
    <FloatInput placeholder="Group(It's so ugly)" />
    <NInputGroupLabel>.com</NInputGroupLabel>
  </NInputGroup>
  <FloatInput maxlength="30" show-count placeholder="Count" />
  <FloatInput :input-props="{ type: 'url' }" placeholder="Native attribute" />
  <FloatInput :allow-input="(value) => !value || /^\d+$/.test(value)" placeholder="Only Allow input digit" />
</template>
`

const size = ref<FormSize>('medium')
const disabled = ref<boolean>(false)
const formRef = ref<FormInst>()
const formData: { email: string, password: string } = reactive({
  email: '',
  password: ''
})
const formRules: FormRules = {
  email: [
    { required: true, message: 'Please enter email', trigger: 'blur' }
  ],
  password: [
    {
      required: true,
      validator: (__: FormItemRule, value: string) => {
        if (!value) {
          return new Error('Please enter password')
        } else if (value.length < 6) {
          return new Error('Password must be at least 6 characters')
        }
        return true
      },
      trigger: 'blur'
    }
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
    <NFormItem path="email">
      <FloatInput v-model:value="formData.email" placeholder="Email(Required)">
        <template #prefix>
          <div class="i-mdi:email" />
        </template>
      </FloatInput>
    </NFormItem>
    <NFormItem path="password">
      <FloatInput
        v-model:value="formData.password" type="password" show-password-on="click"
        placeholder="Password(Required)"
      >
        <template #prefix>
          <div class="i-mdi:lock" />
        </template>
      </FloatInput>
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
const formData: { email: string, password: string } = reactive({
  email: '',
  password: ''
})
const formRules: FormRules = {
  email: [
    { required: true, message: 'Please enter email', trigger: 'blur' }
  ],
  password: [
    {
      required: true,
      validator: (__: FormItemRule, value: string) => {
        if (!value) {
          return new Error('Please enter password')
        } else if (value.length < 6) {
          return new Error('Password must be at least 6 characters')
        }
        return true
      },
      trigger: 'blur'
    }
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
        <FloatInput v-model:value="value" placeholder="Please Input" />
        <FloatInput v-model:value="text" type="textarea" placeholder="Please Input" />
      </ComponentDemo>

      <ComponentDemo :title="t('size')" :code="sizeCode">
        <NFlex vertical>
          <FloatInput size="tiny" placeholder="Tiny Input" />
          <FloatInput size="small" placeholder="Small Input" />
          <FloatInput placeholder="Medium Input" />
          <FloatInput size="large" placeholder="Large Input" />
        </NFlex>
      </ComponentDemo>

      <ComponentDemo :title="t('round')" :code="roundCode">
        <NFlex vertical>
          <FloatInput round size="small" placeholder="Small Input" />
          <FloatInput round placeholder="Medium Input" />
          <FloatInput round size="large" placeholder="Large Input" />
        </NFlex>
      </ComponentDemo>

      <ComponentDemo :title="t('slots')" :code="slotsCode">
        <NFlex vertical>
          <FloatInput placeholder="Prefix">
            <template #prefix>
              <div class="i-mdi:email" />
            </template>
          </FloatInput>
          <FloatInput placeholder="Suffix">
            <template #suffix>
              <div class="i-mdi:magnify" />
            </template>
          </FloatInput>
          <FloatInput placeholder="ClearIcon" clearable>
            <template #clearIcon>
              <div class="i-mdi:delete" />
            </template>
          </FloatInput>
          <FloatInput type="password" placeholder="Password" show-password-on="click">
            <template #passwordVisibleIcon>
              <div class="i-mdi:eye" />
            </template>
            <template #passwordInvisibleIcon>
              <div class="i-mdi:eye-off" />
            </template>
          </FloatInput>
          <FloatInput default-value="凑字数..." placeholder="Count" show-count>
            <template #count="{ value: inputStr }">
              <NBadge :value="inputStr.length" />
            </template>
          </FloatInput>
        </NFlex>
      </ComponentDemo>

      <ComponentDemo :title="t('status')" :code="statusCode">
        <FloatInput loading placeholder="Loading" />
        <FloatInput disabled placeholder="Disabled" />
        <FloatInput placeholder="Warning" status="warning" />
        <FloatInput placeholder="Error" status="error" />
      </ComponentDemo>

      <ComponentDemo :title="t('method')" :code="methodCode">
        <NFlex>
          <RippleButton @click="() => { floatInputRef?.clear() }">
            Clear
          </RippleButton>
          <RippleButton @click="() => { floatInputRef?.focus() }">
            Focus
          </RippleButton>
          <RippleButton @click="() => { floatInputRef?.blur() }">
            Blur
          </RippleButton>
          <RippleButton @click="() => { floatInputRef?.select() }">
            Select
          </RippleButton>
          <RippleButton @click="() => { floatInputRef?.scrollToEnd({ behavior: 'smooth', left: 1000 }) }">
            ScrollToEnd
          </RippleButton>
        </NFlex>
        <FloatInput ref="floatInputRef" v-model:value="methodValue" placeholder="Method" />
      </ComponentDemo>

      <ComponentDemo :title="t('event')" :code="eventCode">
        <FloatInput
          placeholder="Event" @focus="() => { message.info('Focus') }" @blur="() => { message.info('Blur') }"
          @input="() => { message.info('Input') }" @change="() => { message.info('Change') }"
          @keyup="() => { message.info('Keyup') }"
        />
      </ComponentDemo>

      <ComponentDemo :title="t('other')" :code="otherCode">
        <FloatInput autosize style="min-width: 50%" placeholder="Autosize" />
        <NInputGroup>
          <NInputGroupLabel>https://www.</NInputGroupLabel>
          <FloatInput placeholder="Group(It's so ugly)" />
          <NInputGroupLabel>.com</NInputGroupLabel>
        </NInputGroup>
        <FloatInput maxlength="30" show-count placeholder="Count" />
        <FloatInput :input-props="{ type: 'url' }" placeholder="Native attribute" />
        <FloatInput :allow-input="(value) => !value || /^\d+$/.test(value)" placeholder="Only Allow input digit" />
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
          <NFormItem path="email">
            <FloatInput v-model:value="formData.email" placeholder="Email(Required)">
              <template #prefix>
                <div class="i-mdi:email" />
              </template>
            </FloatInput>
          </NFormItem>
          <NFormItem path="password">
            <FloatInput
              v-model:value="formData.password" type="password" show-password-on="click"
              placeholder="Password(Required)"
            >
              <template #prefix>
                <div class="i-mdi:lock" />
              </template>
            </FloatInput>
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
    "description": "带浮动标签效果的输入框组件",
    "basic": "基础",
    "size": "尺寸",
    "round": "圆角",
    "slots": "插槽",
    "status": "状态",
    "method": "方法",
    "event": "事件",
    "other": "其他",
    "form": "表单"
  },
  "en": {
    "description": "Input component with floating label effect",
    "basic": "Basic",
    "size": "Size",
    "round": "Round",
    "slots": "Slots",
    "method": "Method",
    "status": "Status",
    "event": "Event",
    "other": "Other",
    "form": "Form"
  }
}
</i18n>
