<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { useThemeVars } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import Avatar from '/src/assets/images/avatar.jpg'

const { t } = useI18n()
const themeVars = useThemeVars()
const { isDark } = useThemeStore()

// 用户信息
const userInfo = computed(() => ({
  name: 'Wlitd',
  email: 'wlitd.web@example.com',
  role: t('role'),
  bio: t('bio'),
  website: 'https://www.wlitd.com',
  joinDate: '2026-03-16'
}))

// 统计数据
const stats = computed(() => [
  { label: t('stats.projects'), value: '7', icon: 'i-mdi:folder-multiple', color: '#FF6699' },
  { label: t('stats.contributions'), value: '438', icon: 'i-mdi:source-commit', color: '#14C9C9' },
  { label: t('stats.followers'), value: '892', icon: 'i-mdi:account-group', color: '#fa8c16' },
  { label: t('stats.stars'), value: '3,456', icon: 'i-mdi:star', color: '#722ed1' }
])

// 技能标签
const skills = computed(() => [
  { name: 'Vue.js', level: 95 },
  { name: 'TypeScript', level: 90 },
  { name: 'Go', level: 85 },
  { name: 'Java', level: 80 },
  { name: 'Python', level: 75 },
  { name: 'Linux', level: 70 }
])

// 社交链接
const socialLinks = computed(() => [
  { name: 'GitHub', icon: 'i-line-md:github-loop', url: 'https://github.com/wlitd', color: isDark ? '#e5e5e5' : '#333' },
  { name: 'Bilibili', icon: 'i-streamline-ultimate:bilibili-logo', url: 'https://space.bilibili.com/412948929?spm_id_from=333.1007.0.0', color: '#00A1D6' },
  { name: 'Email', icon: 'i-mdi:email', url: 'mailto:wlitd.web@example.com', color: '#EA4335' }
])

// 最近活动
const recentActivities = computed(() => [
  { action: t('activity.createdProject'), project: 'wlitd-web', time: '2h ago', icon: 'i-mdi:folder-plus', color: '#14C9C9' },
  { action: t('activity.committed'), project: 'wlitd-web', time: '5h ago', icon: 'i-mdi:source-commit', color: '#FF6699' },
  { action: t('activity.openedIssue'), project: 'wlitd-web', time: '1d ago', icon: 'i-mdi:alert-circle', color: '#fa8c16' },
  { action: t('activity.starred'), project: 'md-editor-v3', time: '2d ago', icon: 'i-mdi:star', color: '#722ed1' }
])

// 卡片样式
const cardStyle = computed<CSSProperties>(() => ({
  backgroundColor: themeVars.value.cardColor,
  borderRadius: themeVars.value.borderRadius,
  border: `1px solid ${themeVars.value.borderColor}`,
  transition: 'all 0.3s ease'
}))

// 头像边框渐变色 - 优雅蓝紫渐变
const avatarBorderGradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'

// 打开链接
function openLink(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <CommonPage>
    <div class="flex flex-col gap-4">
      <!-- 顶部个人信息区 -->
      <div class="flex gap-4 p-6" :style="cardStyle">
        <!-- 左侧头像区 -->
        <div class="flex flex-col items-center gap-4">
          <div class="relative group">
            <!-- 外层光环 -->
            <div
              class="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              :style="{ background: avatarBorderGradient, filter: 'blur(8px)' }"
            />
            <!-- 边框渐变 -->
            <div
              class="absolute -inset-1 rounded-full transition-all duration-300"
              :style="{ background: avatarBorderGradient }"
            />
            <NAvatar :src="Avatar" :size="140" round class="relative z-10 border-4 border-white dark:border-gray-900" />
            <div
              class="absolute bottom-2 right-2 z-20 size-5 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"
            />
          </div>
          <div class="flex gap-2">
            <NButton
              v-for="social in socialLinks" :key="social.name" quaternary circle size="small"
              :style="{ color: social.color }" @click="openLink(social.url)"
            >
              <template #icon>
                <div :class="social.icon" class="size-5" />
              </template>
            </NButton>
          </div>
        </div>

        <!-- 右侧信息区 -->
        <div class="flex-1 flex flex-col gap-4">
          <!-- 用户名和角色 -->
          <div class="flex items-start justify-between">
            <div>
              <div class="flex items-center gap-3">
                <h2 class="text-2xl font-bold">
                  {{ userInfo.name }}
                </h2>
                <NTag type="primary" size="small" round>
                  {{ userInfo.role }}
                </NTag>
              </div>
              <p class="text-gray-500 dark:text-gray-400 mt-1">
                {{ userInfo.bio }}
              </p>
            </div>
            <NButton type="primary" ghost>
              <template #icon>
                <div class="i-mdi:pencil" />
              </template>
              {{ t('editProfile') }}
            </NButton>
          </div>

          <!-- 详细信息 -->
          <div class="grid grid-cols-2 gap-3">
            <div class="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <div class="i-mdi:email-outline size-5" :style="{ color: themeVars.primaryColor }" />
              <span class="text-sm">{{ userInfo.email }}</span>
            </div>
            <div class="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <div class="i-mdi:map-marker-outline size-5" :style="{ color: themeVars.primaryColor }" />
              <div class="i-flag:cn-4x3 size-4 rounded-sm" />
            </div>
            <div class="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <div class="i-mdi:web size-5" :style="{ color: themeVars.primaryColor }" />
              <a :href="userInfo.website" target="_blank" class="text-sm hover:underline">{{
                userInfo.website }}</a>
            </div>
            <div class="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <div class="i-mdi:calendar-outline size-5" :style="{ color: themeVars.primaryColor }" />
              <span class="text-sm">{{ t('joined') }} {{ userInfo.joinDate }}</span>
            </div>
          </div>

          <!-- 统计数据 -->
          <div class="grid grid-cols-4 gap-3 mt-2">
            <div
              v-for="stat in stats" :key="stat.label"
              class="flex flex-col items-center p-3 rounded-xl hover:shadow-md transition-all cursor-pointer"
              :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }"
            >
              <div class="size-10 rounded-xl flex-center mb-2" :style="{ backgroundColor: `${stat.color}20` }">
                <div :class="stat.icon" class="size-5" :style="{ color: stat.color }" />
              </div>
              <span class="text-xl font-bold">{{ stat.value }}</span>
              <span class="text-xs text-gray-500 dark:text-gray-400">{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 下方区域 -->
      <div class="grid grid-cols-3 gap-4">
        <!-- 技能标签 -->
        <NCard :bordered="true" hoverable>
          <template #header>
            <div class="flex items-center gap-2">
              <div class="i-mdi:code-tags size-5" :style="{ color: themeVars.primaryColor }" />
              <span class="font-semibold">{{ t('skills') }}</span>
            </div>
          </template>
          <div class="flex flex-col gap-3">
            <div v-for="skill in skills" :key="skill.name" class="flex flex-col gap-1">
              <div class="flex justify-between text-sm">
                <span>{{ skill.name }}</span>
                <span class="text-gray-500">{{ skill.level }}%</span>
              </div>
              <NProgress
                type="line" :percentage="skill.level" :show-indicator="false" :height="6" :border-radius="3"
                :color="themeVars.primaryColor" :rail-color="isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'"
              />
            </div>
          </div>
        </NCard>

        <!-- 最近活动 -->
        <NCard class="col-span-2" :bordered="true" hoverable>
          <template #header>
            <div class="flex items-center gap-2">
              <div class="i-mdi:history size-5" :style="{ color: themeVars.primaryColor }" />
              <span class="font-semibold">{{ t('recentActivity') }}</span>
            </div>
          </template>
          <div class="grid grid-cols-2 gap-3">
            <div
              v-for="activity in recentActivities" :key="activity.time"
              class="flex items-center gap-3 p-3 rounded-xl transition-colors cursor-pointer hover:bg-[var(--n-hover-color)]"
              :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }"
            >
              <div class="size-10 rounded-xl flex-center shrink-0" :style="{ backgroundColor: `${activity.color}20` }">
                <div :class="activity.icon" class="size-5" :style="{ color: activity.color }" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-sm">
                  {{ activity.action }}
                  <span class="font-medium" :style="{ color: themeVars.primaryColor }">{{
                    activity.project
                  }}</span>
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  {{ activity.time }}
                </div>
              </div>
            </div>
          </div>
        </NCard>
      </div>
    </div>
  </CommonPage>
</template>

<i18n lang="json">
{
  "zh": {
    "bio": "何必低到尘埃里！",
    "role": "超级管理员",
    "editProfile": "编辑资料",
    "joined": "加入于",
    "skills": "技能",
    "recentActivity": "最近活动",
    "stats": {
      "projects": "项目",
      "contributions": "贡献",
      "followers": "关注者",
      "stars": "获赞"
    },
    "activity": {
      "createdProject": "创建了项目",
      "committed": "提交代码到",
      "openedIssue": "在",
      "starred": "收藏了项目"
    }
  },
  "en": {
    "bio": "Why low in the dust!",
    "role": "Super Administrator",
    "editProfile": "Edit Profile",
    "joined": "Joined",
    "skills": "Skills",
    "recentActivity": "Recent Activity",
    "stats": {
      "projects": "Projects",
      "contributions": "Contributions",
      "followers": "Followers",
      "stars": "Stars"
    },
    "activity": {
      "createdProject": "Created project",
      "committed": "Committed to",
      "openedIssue": "Opened issue in",
      "starred": "Starred"
    }
  }
}
</i18n>
