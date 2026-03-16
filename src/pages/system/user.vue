<script setup lang="tsx">
import type { DataTableColumns, DropdownOption, FormInst, FormRules } from 'naive-ui'
import type { SegmentedOption } from '@/components/ui/segmented/types'
import { NProgress, NTag, useThemeVars } from 'naive-ui'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const themeVars = useThemeVars()

interface UserInfo {
  id: string
  name: string
  country: string
  email: string
  date: string | null
  balance: string
  activity: number
  status: 'online' | 'offline'
  countryIcon: string
}

// ==================== 数据定义 ====================

// 用户数据
const userData = ref<UserInfo[]>([
  {
    id: '1',
    name: 'Zhou Ming Rui',
    status: 'online',
    country: 'China',
    countryIcon: 'i-flag:cn-4x3',
    email: 'zhoumingrui@example.com',
    date: '2023-04-01',
    balance: '$82,429.00',
    activity: 80
  },
  {
    id: '2',
    name: 'Jim Green',
    status: 'offline',
    country: 'United States',
    countryIcon: 'i-flag:us-4x3',
    email: 'jimgreen@example.com',
    date: '2023-04-01',
    balance: '$70,663.00',
    activity: 30
  },
  {
    id: '3',
    name: 'Li Wei',
    status: 'online',
    country: 'China',
    countryIcon: 'i-flag:cn-4x3',
    email: 'liwei@example.com',
    date: '2023-05-15',
    balance: '$95,230.50',
    activity: 95
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    status: 'offline',
    country: 'United States',
    countryIcon: 'i-flag:us-4x3',
    email: 'sarahjohnson@example.com',
    date: '2023-03-20',
    balance: '$63,845.00',
    activity: 45
  },
  {
    id: '5',
    name: 'Wang Fang',
    status: 'online',
    country: 'China',
    countryIcon: 'i-flag:cn-4x3',
    email: 'wangfang@example.com',
    date: '2023-06-10',
    balance: '$78,920.00',
    activity: 72
  },
  {
    id: '6',
    name: 'Michael Brown',
    status: 'offline',
    country: 'United States',
    countryIcon: 'i-flag:us-4x3',
    email: 'michaelbrown@example.com',
    date: '2023-02-28',
    balance: '$54,320.00',
    activity: 38
  },
  {
    id: '7',
    name: 'Zhang Jing',
    status: 'online',
    country: 'China',
    countryIcon: 'i-flag:cn-4x3',
    email: 'zhangjing@example.com',
    date: '2023-07-05',
    balance: '$88,750.00',
    activity: 88
  },
  {
    id: '8',
    name: 'Emily Davis',
    status: 'offline',
    country: 'United States',
    countryIcon: 'i-flag:us-4x3',
    email: 'emilydavis@example.com',
    date: '2023-01-18',
    balance: '$67,890.00',
    activity: 52
  },
  {
    id: '9',
    name: 'Liu Qiang',
    status: 'online',
    country: 'China',
    countryIcon: 'i-flag:cn-4x3',
    email: 'liuqiang@example.com',
    date: '2023-08-22',
    balance: '$91,200.00',
    activity: 90
  },
  {
    id: '10',
    name: 'David Wilson',
    status: 'offline',
    country: 'United States',
    countryIcon: 'i-flag:us-4x3',
    email: 'davidwilson@example.com',
    date: '2023-04-12',
    balance: '$72,450.00',
    activity: 65
  }
])

// ==================== 搜索与过滤 ====================

// 搜索条件
const searchName = ref<string>('')

// 加载状态
const loading = ref<boolean>(false)

// 过滤后的数据
const filteredData = computed<UserInfo[]>(() => {
  if (!searchName.value) {
    return userData.value
  }
  return userData.value.filter((item) => {
    return item.name.toLowerCase().includes(searchName.value.toLowerCase())
  })
})

// ==================== 表格配置 ====================

// 根据活跃度返回颜色
function getActivityColor(activity: number): string {
  if (activity >= 80) {
    return '#18a058'
  }
  if (activity >= 50) {
    return '#f0a020'
  }
  return '#d03050'
}

// 表格列配置
const columns = computed<DataTableColumns<UserInfo>>(() => ([
  {
    type: 'selection',
    fixed: 'left',
    width: 40
  },
  {
    title: t('header.name'),
    key: 'name',
    fixed: 'left',
    width: 160,
    render(row) {
      return (
        <NFlex align="center">
          <NBadge dot type={row.status === 'online' ? 'success' : 'error'}>
            <NAvatar size="small">{row.name.charAt(0).toUpperCase()}</NAvatar>
          </NBadge>
          <span>{row.name}</span>
        </NFlex>
      )
    }
  },
  {
    title: t('header.country'),
    key: 'country',
    width: 150,
    render(row) {
      return (
        <NFlex align="center">
          <div class={`${row.countryIcon} text-lg`} />
          <span>{row.country}</span>
        </NFlex>
      )
    }
  },
  {
    title: t('header.email'),
    key: 'email',
    width: 200
  },
  {
    title: t('header.date'),
    key: 'date',
    width: 100
  },
  {
    title: t('header.balance'),
    key: 'balance',
    width: 120,
    align: 'right'
  },
  {
    title: t('header.status'),
    key: 'status',
    width: 80,
    render(row) {
      return (
        <NTag
          type={row.status === 'online' ? 'success' : 'default'}
          size="small"
          bordered={false}
        >
          {row.status === 'online' ? t('status.online') : t('status.offline')}
        </NTag>
      )
    }
  },
  {
    title: t('header.activity'),
    key: 'activity',
    width: 160,
    render(row) {
      return (
        <NProgress
          type="line"
          percentage={row.activity}
          show-indicator={false}
          color={getActivityColor(row.activity)}
        />
      )
    }
  }
]))

// ==================== 表单相关 ====================

// 国家选项
const countryOpts: SegmentedOption[] = [
  {
    label: 'China',
    value: 'China',
    icon: 'i-flag:cn-4x3'
  },
  {
    label: 'United States',
    value: 'United States',
    icon: 'i-flag:us-4x3'
  }
]

const userFormRef = ref<FormInst | null>(null)

// 表单验证规则
const userRules: FormRules = {
  name: [{ required: true, message: t('placeholder.name'), trigger: 'blur' }],
  country: [{ required: true, message: t('placeholder.country'), trigger: 'change' }],
  email: [
    { required: true, message: t('placeholder.email'), trigger: 'blur' },
    { type: 'email', message: t('placeholder.emailInvalid'), trigger: 'blur' }
  ],
  date: [{ required: true, message: t('placeholder.date'), trigger: 'change' }],
  balance: [{ required: true, message: t('placeholder.balance'), trigger: 'blur' }],
  activity: [{ required: true, type: 'number', message: t('placeholder.activity'), trigger: 'blur' }]
}

// 弹窗控制
const showModal = ref<boolean>(false)
const isEditMode = ref<boolean>(false)

// 表单数据
const userFormVal = ref<UserInfo>({
  id: '',
  name: '',
  country: 'China',
  email: '',
  date: null,
  balance: '',
  activity: 0,
  status: 'offline',
  countryIcon: 'i-flag:cn-4x3'
})

// 重置表单
function resetUserForm(): void {
  userFormVal.value = {
    id: '',
    name: '',
    country: 'China',
    email: '',
    date: null,
    balance: '',
    activity: 0,
    status: 'offline',
    countryIcon: 'i-flag:cn-4x3'
  }
}

// ==================== 右键菜单 ====================

// 右键菜单控制
const showDropdown = ref<boolean>(false)
const x = ref<number>(0)
const y = ref<number>(0)
const selectedUserId = ref<string | null>(null)

// 当前选中的用户
const getSelectedUser = computed<UserInfo | undefined>(() => {
  return userData.value.find(item => item.id === selectedUserId.value)
})

// 下拉菜单选项
const dropdownOpts = computed<DropdownOption[]>(() => ([
  {
    label: t('operation.edit'),
    key: 'edit',
    icon: () => h('div', { class: 'i-mdi:account-box-edit-outline' })
  },
  {
    label: () => h('span', { style: { color: themeVars.value.errorColor } }, t('operation.del')),
    key: 'del',
    icon: () => h('div', { class: 'i-mdi:delete-outline', style: { color: themeVars.value.errorColor } })
  }
]))

// ==================== 事件处理 ====================

// 处理行右键菜单
function handleRowContextmenu(e: MouseEvent, row: UserInfo) {
  e.preventDefault()
  selectedUserId.value = row.id

  showDropdown.value = false

  nextTick().then(() => {
    showDropdown.value = true
    x.value = e.clientX
    y.value = e.clientY
  })
}

// 新增用户
function handleAddUser() {
  isEditMode.value = false
  showModal.value = true
}

// 打开编辑弹窗
function openEditModal(user: UserInfo) {
  isEditMode.value = true
  userFormVal.value = useCloned(user).cloned.value
  showModal.value = true
}

// 删除用户
function handleDeleteUser() {
  const user = getSelectedUser.value
  if (!user) {
    return
  }

  dialog.warning({
    title: t('dialog.warning'),
    content: t('dialog.content', { name: user.name }),
    positiveText: t('dialog.confirm'),
    negativeText: t('dialog.cancel'),
    onPositiveClick: () => {
      const index = userData.value.findIndex(item => item.id === user.id)
      if (index !== -1) {
        userData.value.splice(index, 1)
        message.success(t('message.deleteSuccess'))
      }
    }
  })
}

// 保存用户（新增或编辑）
async function handleSaveUser() {
  try {
    await userFormRef.value?.validate()

    if (isEditMode.value) {
      // 编辑模式：更新现有用户
      const index = userData.value.findIndex(item => item.id === userFormVal.value.id)
      if (index !== -1) {
        userData.value[index] = {
          ...userFormVal.value,
          status: userData.value[index].status,
          countryIcon: userFormVal.value.country === 'China' ? 'i-flag:cn-4x3' : 'i-flag:us-4x3'
        }
        message.success(t('message.updateSuccess'))
      }
    } else {
      // 新增模式：添加新用户
      const newUser: UserInfo = {
        ...userFormVal.value,
        id: Date.now().toString(),
        status: 'offline',
        countryIcon: userFormVal.value.country === 'China' ? 'i-flag:cn-4x3' : 'i-flag:us-4x3'
      }
      userData.value.push(newUser)
      message.success(t('message.addSuccess'))
    }

    showModal.value = false
  } catch (error) {
    console.error('表单验证失败:', error)
  }
}

// 下拉菜单选择处理
function handleDropdownSelect(key: string): void {
  showDropdown.value = false
  if (key === 'edit') {
    const user = getSelectedUser.value
    if (user) {
      openEditModal(user)
    }
  } else if (key === 'del') {
    handleDeleteUser()
  }
}

// 刷新数据
function handleRefresh(): void {
  loading.value = true
  // 模拟异步操作
  setTimeout(() => {
    loading.value = false
    message.success(t('message.refreshSuccess'))
  }, 500)
}
</script>

<template>
  <CommonPage>
    <NFlex vertical class="h-full">
      <NFlex justify="space-between" align="center" class="gap-2">
        <FloatInput v-model:value="searchName" size="small" :placeholder="t('header.name')" class="w-60!" clearable>
          <template #prefix>
            <div class="i-mdi:magnify" />
          </template>
        </FloatInput>
        <NFlex align="center" class="gap-2">
          <RippleButton size="small" type="primary" @click="handleAddUser">
            <template #icon>
              <div class="i-mdi:plus" />
            </template>
            {{ t('operation.add') }}
          </RippleButton>
          <RippleButton size="small" @click="handleRefresh">
            <template #icon>
              <div class="i-mdi:refresh" :class="{ 'animate-spin': loading }" />
            </template>
          </RippleButton>
        </NFlex>
      </NFlex>
      <div class="flex-1">
        <NDataTable
          class="h-full" max-height="100%" flex-height :bordered="false" size="small" :columns="columns"
          :data="filteredData" :pagination="{ pageSize: 10 }" :row-key="(row) => row.id"
          :row-props="(row) => ({ onContextmenu: (e: MouseEvent) => handleRowContextmenu(e, row) })" :scroll-x="1200"
          :loading="loading"
        />
        <NDropdown
          placement="bottom-start" trigger="manual" :x="x" :y="y" :options="dropdownOpts" :show="showDropdown"
          :on-clickoutside="() => showDropdown = false" @select="handleDropdownSelect"
        />
      </div>
    </NFlex>

    <NModal
      v-model:show="showModal" :style="{ width: '450px' }" draggable preset="card"
      :title="isEditMode ? t('modal.editTitle') : t('modal.addTitle')" :bordered="false" :auto-focus="false"
      @after-leave="resetUserForm"
    >
      <NForm
        ref="userFormRef" size="small" label-placement="left" :model="userFormVal" :rules="userRules"
        :show-require-mark="false"
      >
        <NFormItem path="name">
          <FloatInput v-model:value="userFormVal.name" :placeholder="t('header.name')" clearable />
        </NFormItem>
        <NFormItem path="email">
          <FloatInput v-model:value="userFormVal.email" :placeholder="t('header.email')" clearable />
        </NFormItem>
        <NFormItem path="country">
          <Segmented v-model:value="userFormVal.country" :options="countryOpts">
            <template #label="{ option }">
              <NFlex align="center" class="h-full">
                <div :class="option.icon" />
                <span>{{ option.label }}</span>
              </NFlex>
            </template>
          </Segmented>
        </NFormItem>
        <NFormItem path="date">
          <NDatePicker
            v-model:formatted-value="userFormVal.date" value-format="yyyy-MM-dd" type="date"
            style="width: 100%"
          />
        </NFormItem>
        <NFormItem path="balance">
          <FloatInput v-model:value="userFormVal.balance" :placeholder="t('header.balance')" clearable />
        </NFormItem>
        <NFormItem path="activity">
          <NSlider
            v-model:value="userFormVal.activity" :min="0" :max="100" :step="1"
            :marks="{ 0: '0', 50: '50', 100: '100' }"
          />
        </NFormItem>
        <NFlex justify="end" align="center">
          <RippleButton size="small" @click="showModal = false">{{ t('modal.cancel') }}</RippleButton>
          <RippleButton size="small" type="primary" @click="handleSaveUser">{{ t('modal.save') }}</RippleButton>
        </NFlex>
      </NForm>
    </NModal>
  </CommonPage>
</template>

<style lang="css" scoped>
:deep(.n-scrollbar-content) {
  height: 100%;
}

:deep(.n-data-table-empty) {
  height: 100%;
}
</style>

<i18n lang="json">
{
  "zh": {
    "header": {
      "name": "姓名",
      "country": "国家",
      "email": "邮箱",
      "status": "状态",
      "date": "日期",
      "balance": "余额",
      "activity": "活跃度",
      "operations": "操作"
    },
    "status": {
      "online": "在线",
      "offline": "离线"
    },
    "operation": {
      "add": "新增",
      "edit": "编辑",
      "del": "删除"
    },
    "placeholder": {
      "name": "请输入姓名",
      "country": "请选择国家",
      "email": "请输入邮箱",
      "emailInvalid": "邮箱格式不正确",
      "date": "请选择日期",
      "balance": "请输入余额",
      "activity": "请输入活跃度"
    },
    "dialog": {
      "warning": "警告",
      "content": "确定删除姓名为【{name}】的用户吗？",
      "confirm": "确定",
      "cancel": "取消"
    },
    "modal": {
      "title": "编辑用户信息",
      "addTitle": "新增用户",
      "editTitle": "编辑用户",
      "cancel": "取消",
      "save": "保存"
    },
    "message": {
      "addSuccess": "新增成功！",
      "updateSuccess": "更新成功！",
      "deleteSuccess": "删除成功！",
      "refreshSuccess": "刷新成功！"
    }
  },
  "en": {
    "header": {
      "name": "Name",
      "country": "Country",
      "email": "Email",
      "status": "Status",
      "date": "Date",
      "balance": "Balance",
      "activity": "Activity",
      "operations": "Operations"
    },
    "status": {
      "online": "Online",
      "offline": "Offline"
    },
    "operation": {
      "add": "Add",
      "edit": "Edit",
      "del": "Delete"
    },
    "placeholder": {
      "name": "Please enter name",
      "country": "Please select country",
      "email": "Please enter email",
      "emailInvalid": "Invalid email format",
      "date": "Please select date",
      "balance": "Please enter balance",
      "activity": "Please enter activity"
    },
    "dialog": {
      "warning": "Warning",
      "content": "Are you sure you want to delete the user with name 【{name}】?",
      "confirm": "Confirm",
      "cancel": "Cancel"
    },
    "modal": {
      "title": "Edit User Information",
      "addTitle": "Add User",
      "editTitle": "Edit User",
      "cancel": "Cancel",
      "save": "Save"
    },
    "message": {
      "addSuccess": "Added successfully!",
      "updateSuccess": "Updated successfully!",
      "deleteSuccess": "Deleted successfully!",
      "refreshSuccess": "Refreshed successfully!"
    }
  }
}
</i18n>
