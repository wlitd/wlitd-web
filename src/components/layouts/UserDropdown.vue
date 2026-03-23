<script setup lang="tsx">
import type { DropdownOption, PopoverPlacement } from 'naive-ui'
import { useThemeVars } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import Avatar from '/src/assets/images/avatar.jpg'

const { t } = useI18n()

const themeVars = useThemeVars()

const { menuCollapsed } = storeToRefs(useGlobalStore())

const placement = computed<PopoverPlacement>(() => (menuCollapsed.value ? 'right-end' : 'top'))

const opts = computed<DropdownOption[]>(() => ([
  {
    key: 'header',
    type: 'render',
    render: () => (
      <div class="flex items-center gap-2 px-2">
        <img src={Avatar} class="h-9 w-9 rounded-xl" alt="" />
        <div class="flex flex-col shrink-0" style={{ color: themeVars.value.textColorBase }}>
          <span class="text-sm">Wlitd</span>
          <span class="text-xs">{t('aphorism')}</span>
        </div>
      </div>
    )
  },
  {
    key: 'header-divider',
    type: 'divider'
  },
  {
    label: t('profile'),
    key: 'profile',
    icon: () => h('div', { class: 'i-lucide:circle-user' })
  },
  {
    label: () => h('span', { style: { color: themeVars.value.errorColor } }, t('logout')),
    key: 'logout',
    icon: () => h('div', { class: 'i-lucide:log-out', style: { color: themeVars.value.errorColor } })
  }
]))

const router = useRouter()
function handleSelect(key: string) {
  if (key === 'logout') {
    const d = dialog.warning({
      title: t('dialog.title'),
      content: t('dialog.content'),
      positiveText: t('dialog.positiveText'),
      negativeText: t('dialog.negativeText'),
      onPositiveClick: async () => {
        d.loading = true

        await new Promise(resolve => setTimeout(resolve, 1000))

        d.destroy()
        router.replace('/login')
      }
    })
  } else if (key === 'profile') {
    router.push('/profile')
  }
}
</script>

<template>
  <div class="flex-center w-full px-2 box-border">
    <NDropdown
      :placement="placement" :show-arrow="false" :options="opts"
      :style="menuCollapsed ? {} : { width: '230px' }" @select="handleSelect"
    >
      <ProTransitionGroup class="flex w-full justify-center items-center gap-2 overflow-x-hidden cursor-pointer">
        <img :src="Avatar" class="h-9 w-9 rounded-xl" alt="">
        <div v-if="!menuCollapsed" class="flex flex-col shrink-0">
          <span class="text-sm">Wlitd</span>
          <span class="text-xs">{{ `[${t('role')}]` }}</span>
        </div>
      </ProTransitionGroup>
    </NDropdown>
  </div>
</template>

<i18n lang="json">
{
  "zh": {
    "profile": "个人资料",
    "logout": "退出登录",
    "aphorism": "何必低到尘埃里！",
    "role": "超级管理员",
    "dialog": {
      "title": "警告",
      "content": "确定要退出登录吗？",
      "positiveText": "确定",
      "negativeText": "取消"
    }
  },
  "en": {
    "profile": "Profile",
    "logout": "Logout",
    "aphorism": "Why low in the dust!",
    "role": "Super Administrator",
    "dialog": {
      "title": "Warning",
      "content": "Are you sure you want to logout?",
      "positiveText": "Confirm",
      "negativeText": "Cancel"
    }
  }
}
</i18n>
