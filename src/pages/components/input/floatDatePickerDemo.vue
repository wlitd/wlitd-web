<script setup lang="ts">
import type { FormInst, FormRules, FormSize } from 'naive-ui'
import type { FloatDatePickerInst } from '@/components/ui/float-date-picker/types'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const dateValue = ref<number | null>(1780329600000)
const basicCode = `
<template>
  <FloatDatePicker v-model:value="dateValue" placeholder="Please Select Date" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dateValue = ref<number | null>(1780329600000)
<\/script>
`

const yearValue = ref<number | null>(1780329600000)
const yearFormatValue = ref<number | null>(1780329600000)
const quarterValue = ref<number | null>(1780329600000)
const quarterFormatValue = ref<number | null>(1780329600000)
const monthValue = ref<number | null>(1780329600000)
const monthFormatValue = ref<number | null>(1780329600000)
const weekValue = ref<number | null>(1780329600000)
const weekFormatValue = ref<number | null>(1780329600000)
const dateValue2 = ref<number | null>(1780329600000)
const dateFormatValue = ref<number | null>(1780329600000)
const datetimeValue = ref<number | null>(1780329600000)
const datetimeFormatValue = ref<number | null>(1780329600000)

const sizeCode = `
<template>
  <NFlex vertical>
    <FloatDatePicker size="small" placeholder="Small Date Picker" />
    <FloatDatePicker placeholder="Medium Date Picker" />
    <FloatDatePicker size="large" placeholder="Large Date Picker" />
  </NFlex>
</template>
`

const statusCode = `
<template>
  <NFlex vertical>
    <FloatDatePicker disabled placeholder="Disabled" />
    <FloatDatePicker status="warning" placeholder="Warning" />
    <FloatDatePicker status="error" placeholder="Error" />
  </NFlex>
</template>
`

const slotCode = `
<template>
  <NFlex vertical>
    <FloatDatePicker placeholder="Custom Date Icon & Navigation">
      <template #date-icon>
        <div class="i-mdi-calendar-clock" />
      </template>
      <template #prev-month>
        <div class="i-mdi-chevron-left" />
      </template>
      <template #next-month>
        <div class="i-mdi-chevron-right" />
      </template>
      <template #prev-year>
        <div class="i-mdi-chevron-double-left" />
      </template>
      <template #next-year>
        <div class="i-mdi-chevron-double-right" />
      </template>
    </FloatDatePicker>

    <FloatDatePicker type="month" placeholder="Custom Now Button">
      <template #now="{ onNow, text }">
        <NButton size="tiny" @click="onNow">{{ text }} 📅</NButton>
      </template>
    </FloatDatePicker>

    <FloatDatePicker type="datetime" placeholder="Custom Confirm Button">
      <template #confirm="{ onConfirm, disabled, text }">
        <NButton type="primary" size="tiny" :disabled="disabled" @click="onConfirm">
          {{ text }} ✓
        </NButton>
      </template>
    </FloatDatePicker>

    <FloatDatePicker placeholder="Custom Footer">
      <template #footer>
        <NText italic>Custom footer content</NText>
      </template>
    </FloatDatePicker>
  </NFlex>
</template>
`

const eventValue = ref<number | null>(1780329600000)

const eventCode = `
<template>
  <FloatDatePicker
    v-model:value="eventValue"
    placeholder="Event Demo"
    @focus="() => { message.info('Focus') }"
    @blur="() => { message.info('Blur') }"
    @next-month="() => { message.info('Next Month') }"
    @prev-month="() => { message.info('Prev Month') }"
    @next-year="() => { message.info('Next Year') }"
    @prev-year="() => { message.info('Prev Year') }"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const eventValue = ref<number | null>(1780329600000)
<\/script>
`

const datePickerRef = ref<FloatDatePickerInst>()

const methodCode = `
<template>
  <NFlex vertical>
    <FloatDatePicker ref="datePickerRef" placeholder="Method Demo" />
    <NFlex>
      <NButton @click="datePickerRef?.focus()">Focus</NButton>
      <NButton @click="datePickerRef?.blur()">Blur</NButton>
    </NFlex>
  </NFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const datePickerRef = ref<FloatDatePickerInst>()
<\/script>
`

const size = ref<FormSize>('medium')
const disabled = ref<boolean>(false)
const formRef = ref<FormInst>()
const formData: { startDate: number | null } = reactive({
  startDate: null
})
const formRules: FormRules = {
  startDate: [
    { required: true, message: 'Please select start date', trigger: 'blur' }
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
    <NFormItem path="startDate">
      <FloatDatePicker v-model:value="formData.startDate" placeholder="Start Date(Required)">
        <template #date-icon>
          <div class="i-mdi-calendar-clock" />
        </template>
      </FloatDatePicker>
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
const formData: { startDate: number | null } = reactive({
  startDate: null,
})
const formRules: FormRules = {
  startDate: [
    { required: true, message: 'Please select start date', trigger: 'blur' }
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

const typeCode = `
<template>
  <NFlex vertical>
    <FloatDatePicker v-model:value="yearValue" type="year" placeholder="Year Picker" />
    <FloatDatePicker
      v-model:value="yearFormatValue"
      type="year"
      format="y年"
      year-format="y年"
      placeholder="Year with Format"
    />
  </NFlex>

  <NDivider />

  <NFlex vertical>
    <FloatDatePicker v-model:value="quarterValue" type="quarter" placeholder="Quarter Picker" />
    <FloatDatePicker
      v-model:value="quarterFormatValue"
      type="quarter"
      format="y年 Q季度"
      year-format="y年"
      quarter-format="Q季度"
      placeholder="Quarter with Format"
    />
  </NFlex>

  <NDivider />

  <NFlex vertical>
    <FloatDatePicker v-model:value="monthValue" type="month" placeholder="Month Picker" />
    <FloatDatePicker
      v-model:value="monthFormatValue"
      type="month"
      format="y年 M月"
      year-format="y年"
      month-format="M月"
      placeholder="Month with Format"
    />
  </NFlex>

  <NDivider />

  <NFlex vertical>
    <FloatDatePicker v-model:value="weekValue" type="week" placeholder="Week Picker" />
    <FloatDatePicker
      v-model:value="weekFormatValue"
      type="week"
      format="y年 w周"
      placeholder="Week with Format"
    />
  </NFlex>

  <NDivider />

  <NFlex vertical>
    <FloatDatePicker v-model:value="dateValue2" type="date" placeholder="Date Picker" />
    <FloatDatePicker
      v-model:value="dateFormatValue"
      type="date"
      format="y年 M月 d日"
      placeholder="Date with Format"
    />
  </NFlex>

  <NDivider />

  <NFlex vertical>
    <FloatDatePicker v-model:value="datetimeValue" type="datetime" placeholder="DateTime Picker" />
    <FloatDatePicker
      v-model:value="datetimeFormatValue"
      type="datetime"
      format="y年 M月 d日 HH:mm:ss"
      placeholder="DateTime with Format"
    />
  </NFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const yearValue = ref<number | null>(1780329600000)
const yearFormatValue = ref<number | null>(1780329600000)
const quarterValue = ref<number | null>(1780329600000)
const quarterFormatValue = ref<number | null>(1780329600000)
const monthValue = ref<number | null>(1780329600000)
const monthFormatValue = ref<number | null>(1780329600000)
const weekValue = ref<number | null>(1780329600000)
const weekFormatValue = ref<number | null>(1780329600000)
const dateValue2 = ref<number | null>(1780329600000)
const dateFormatValue = ref<number | null>(1780329600000)
const datetimeValue = ref<number | null>(1780329600000)
const datetimeFormatValue = ref<number | null>(1780329600000)
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
        <FloatDatePicker v-model:value="dateValue" placeholder="Please Select Date" />
      </ComponentDemo>

      <ComponentDemo title="Size" :code="sizeCode">
        <NFlex vertical>
          <FloatDatePicker size="small" placeholder="Small Date Picker" />
          <FloatDatePicker placeholder="Medium Date Picker" />
          <FloatDatePicker size="large" placeholder="Large Date Picker" />
        </NFlex>
      </ComponentDemo>

      <ComponentDemo title="Status" :code="statusCode">
        <NFlex vertical>
          <FloatDatePicker disabled placeholder="Disabled" />
          <FloatDatePicker status="warning" placeholder="Warning" />
          <FloatDatePicker status="error" placeholder="Error" />
        </NFlex>
      </ComponentDemo>

      <ComponentDemo title="Slot" :code="slotCode">
        <NFlex vertical>
          <FloatDatePicker placeholder="Custom Date Icon & Navigation">
            <template #date-icon>
              <div class="i-mdi-calendar-clock" />
            </template>
            <template #prev-month>
              <div class="i-mdi-chevron-left" />
            </template>
            <template #next-month>
              <div class="i-mdi-chevron-right" />
            </template>
            <template #prev-year>
              <div class="i-mdi-chevron-double-left" />
            </template>
            <template #next-year>
              <div class="i-mdi-chevron-double-right" />
            </template>
          </FloatDatePicker>

          <FloatDatePicker type="month" placeholder="Custom Now Button">
            <template #now="{ onNow, text }">
              <NButton size="tiny" @click="onNow">{{ text }} 📅</NButton>
            </template>
          </FloatDatePicker>

          <FloatDatePicker type="datetime" placeholder="Custom Confirm Button">
            <template #confirm="{ onConfirm, disabled: _disabled, text }">
              <NButton type="primary" size="tiny" :disabled="_disabled" @click="onConfirm">
                {{ text }} ✓
              </NButton>
            </template>
          </FloatDatePicker>

          <FloatDatePicker placeholder="Custom Footer">
            <template #footer>
              <NText italic>Custom footer content</NText>
            </template>
          </FloatDatePicker>
        </NFlex>
      </ComponentDemo>

      <ComponentDemo title="Event" :code="eventCode">
        <FloatDatePicker
          v-model:value="eventValue" placeholder="Event Demo"
          @focus="() => { message.info('Focus') }" @blur="() => { message.info('Blur') }"
          @next-month="() => { message.info('Next Month') }"
          @prev-month="() => { message.info('Prev Month') }" @next-year="() => { message.info('Next Year') }"
          @prev-year="() => { message.info('Prev Year') }"
        />
      </ComponentDemo>

      <ComponentDemo title="Method" :code="methodCode">
        <NFlex>
          <NButton @click="datePickerRef?.focus()">Focus</NButton>
          <NButton @click="datePickerRef?.blur()">Blur</NButton>
        </NFlex>
        <FloatDatePicker ref="datePickerRef" placeholder="Method Demo" />
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
          <NFormItem path="startDate">
            <FloatDatePicker v-model:value="formData.startDate" placeholder="Start Date(Required)">
              <template #date-icon>
                <div class="i-mdi-calendar-clock" />
              </template>
            </FloatDatePicker>
          </NFormItem>
          <NFormItem>
            <RippleButton @click="handleSubmit">
              Submit
            </RippleButton>
          </NFormItem>
        </NForm>
      </ComponentDemo>

      <ComponentDemo title="Type" :code="typeCode">
        <NFlex vertical>
          <FloatDatePicker v-model:value="yearValue" type="year" placeholder="Year Picker" />
          <FloatDatePicker
            v-model:value="yearFormatValue" type="year" format="y年" year-format="y年"
            placeholder="Year with Format"
          />
        </NFlex>

        <NDivider />

        <NFlex vertical>
          <FloatDatePicker v-model:value="quarterValue" type="quarter" placeholder="Quarter Picker" />
          <FloatDatePicker
            v-model:value="quarterFormatValue" type="quarter" format="y年 Q季度" year-format="y年"
            quarter-format="Q季度" placeholder="Quarter with Format"
          />
        </NFlex>

        <NDivider />

        <NFlex vertical>
          <FloatDatePicker v-model:value="monthValue" type="month" placeholder="Month Picker" />
          <FloatDatePicker
            v-model:value="monthFormatValue" type="month" format="y年 M月" year-format="y年"
            month-format="M月" placeholder="Month with Format"
          />
        </NFlex>

        <NDivider />

        <NFlex vertical>
          <FloatDatePicker v-model:value="weekValue" type="week" placeholder="Week Picker" />
          <FloatDatePicker
            v-model:value="weekFormatValue" type="week" format="y年 w周"
            placeholder="Week with Format"
          />
        </NFlex>

        <NDivider />

        <NFlex vertical>
          <FloatDatePicker v-model:value="dateValue2" type="date" placeholder="Date Picker" />
          <FloatDatePicker
            v-model:value="dateFormatValue" type="date" format="y年 M月 d日"
            placeholder="Date with Format"
          />
        </NFlex>

        <NDivider />

        <NFlex vertical>
          <FloatDatePicker v-model:value="datetimeValue" type="datetime" placeholder="DateTime Picker" />
          <FloatDatePicker
            v-model:value="datetimeFormatValue" type="datetime" format="y年 M月 d日 HH:mm:ss"
            placeholder="DateTime with Format"
          />
        </NFlex>
      </ComponentDemo>
    </ComponentDemos>
  </CommonPage>
</template>

<i18n lang="json">
{
  "zh": {
    "description": "带浮动标签效果的日期选择器组件",
    "basic": "基础",
    "size": "尺寸",
    "status": "状态",
    "slot": "插槽",
    "event": "事件",
    "method": "方法",
    "type": "类型"
  },
  "en": {
    "description": "Date picker component with floating label effect",
    "basic": "Basic",
    "size": "Size",
    "status": "Status",
    "slot": "Slot",
    "event": "Event",
    "method": "Method",
    "type": "Type"
  }
}
</i18n>
