<script setup lang="ts">
import type { FormInst, FormRules, FormSize } from 'naive-ui'
import type { FloatTimePickerInst } from '@/components/ui/float-time-picker/types'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const dateValue = ref<number | null>(1183135260000)
const basicCode = `
<template>
  <FloatTimePicker v-model:value="dateValue" placeholder="Please Select Time" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dateValue = ref<number | null>(1780329600000)
<\/script>
`

const sizeCode = `
<template>
  <NFlex vertical>
    <FloatTimePicker size="small" placeholder="Small Time Picker" />
    <FloatTimePicker placeholder="Medium Time Picker" />
    <FloatTimePicker size="large" placeholder="Large Time Picker" />
  </NFlex>
</template>
`

const statusCode = `
<template>
  <NFlex vertical>
    <FloatTimePicker disabled placeholder="Disabled" />
    <FloatTimePicker status="warning" placeholder="Warning" />
    <FloatTimePicker status="error" placeholder="Error" />
  </NFlex>
</template>
`

const slotsCode = `
<template>
  <FloatTimePicker placeholder="Custom Icon">
    <template #icon>
      <div class="i-mdi-clock" />
    </template>
  </FloatTimePicker>
</template>
`

const eventValue = ref<number | null>(861333934000)

const eventCode = `
<template>
  <FloatTimePicker v-model:value="eventValue" placeholder="Event Demo" clearable
    @focus="() => { message.info('Focus') }" @blur="() => { message.info('Blur') }"
    @clear="() => { message.info('Clear') }" @confirm="(val, formatVal) => { message.info('Confirm') }"
  />
</template>
`

const timePickerRef = ref<FloatTimePickerInst>()

const methodCode = `
<template>
  <NFlex>
    <NButton @click="timePickerRef?.focus()">Focus</NButton>
    <NButton @click="timePickerRef?.blur()">Blur</NButton>
  </NFlex>
  <FloatTimePicker ref="timePickerRef" placeholder="Method Demo" />
</template>
`

const size = ref<FormSize>('medium')
const disabled = ref<boolean>(false)
const formRef = ref<FormInst>()
const formData: { time: number | null } = reactive({
  time: null
})
const formRules: FormRules = {
  time: [
    { required: true, message: 'Please select time', trigger: 'blur' }
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
  <NForm ref="formRef" inline :size="size" :disabled="disabled" :model="formData" :rules="formRules">
    <NFormItem path="time">
      <FloatTimePicker v-model:value="formData.time" placeholder="Time(Required)">
        <template #date-icon>
          <div class="i-mdi-clock" />
        </template>
      </FloatTimePicker>
    </NFormItem>
    <NFormItem>
      <RippleButton @click="handleSubmit">
        Submit
      </RippleButton>
    </NFormItem>
  </NForm>
</template>
`
</script>

<template>
  <CommonPage>
    <template #header-extra>
      <NText italic>{{ t('description') }}</NText>
    </template>

    <ComponentDemos>
      <ComponentDemo title="Basic" :code="basicCode">
        <FloatTimePicker v-model:value="dateValue" placeholder="Please Select Time" />
      </ComponentDemo>

      <ComponentDemo title="Size" :code="sizeCode">
        <NFlex vertical>
          <FloatTimePicker size="small" placeholder="Small Time Picker" />
          <FloatTimePicker placeholder="Medium Time Picker" />
          <FloatTimePicker size="large" placeholder="Large Time Picker" />
        </NFlex>
      </ComponentDemo>

      <ComponentDemo title="Status" :code="statusCode">
        <NFlex vertical>
          <FloatTimePicker disabled placeholder="Disabled" />
          <FloatTimePicker status="warning" placeholder="Warning" />
          <FloatTimePicker status="error" placeholder="Error" />
        </NFlex>
      </ComponentDemo>

      <ComponentDemo title="Slots" :code="slotsCode">
        <NFlex vertical>
          <FloatTimePicker placeholder="Custom Icon">
            <template #icon>
              <div class="i-mdi-clock" />
            </template>
          </FloatTimePicker>
        </NFlex>
      </ComponentDemo>

      <ComponentDemo title="Event" :code="eventCode">
        <FloatTimePicker
          v-model:value="eventValue" placeholder="Event Demo" clearable
          @focus="() => { message.info('Focus') }" @blur="() => { message.info('Blur') }"
          @clear="() => { message.info('Clear') }"
          @confirm="(val, formatVal) => { message.info(`val: ${val}, formatVal: ${formatVal}`) }"
        />
      </ComponentDemo>

      <ComponentDemo title="Method" :code="methodCode">
        <NFlex>
          <NButton @click="timePickerRef?.focus()">Focus</NButton>
          <NButton @click="timePickerRef?.blur()">Blur</NButton>
        </NFlex>
        <FloatTimePicker ref="timePickerRef" placeholder="Method Demo" />
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
          <NFormItem path="time">
            <FloatTimePicker v-model:value="formData.time" placeholder="Time(Required)">
              <template #icon>
                <div class="i-mdi-clock" />
              </template>
            </FloatTimePicker>
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
    "description": "带浮动标签效果的时间选择器组件",
    "basic": "基础",
    "size": "尺寸",
    "status": "状态",
    "slots": "插槽",
    "event": "事件",
    "method": "方法",
    "form": "表单"
  },
  "en": {
    "description": "Time picker component with floating label effect",
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
