<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent
} from 'echarts/components'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { useThemeVars } from 'naive-ui'
import VChart from 'vue-echarts'
import { useI18n } from 'vue-i18n'

// 注册 ECharts 组件
use([
  CanvasRenderer,
  LineChart,
  PieChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
])

const { t } = useI18n()
const themeVars = useThemeVars()
const { isDark } = useThemeStore()

// 图表周期选择
const chartPeriod = ref<string>('week')

// 统计卡片数据
const statsCards = computed(() => [
  {
    title: t('totalUsers'),
    value: '12,846',
    change: '+12.5%',
    trend: 'up',
    icon: 'i-mdi:account-group',
    color: '#FF6699'
  },
  {
    title: t('activeSessions'),
    value: '3,428',
    change: '+8.2%',
    trend: 'up',
    icon: 'i-mdi:chart-line',
    color: '#14C9C9'
  },
  {
    title: t('systemMessages'),
    value: '1,294',
    change: '-2.4%',
    trend: 'down',
    icon: 'i-mdi:message-text',
    color: '#fa8c16'
  },
  {
    title: t('storageUsage'),
    value: '68.5%',
    change: '+5.1%',
    trend: 'up',
    icon: 'i-mdi:database',
    color: '#722ed1'
  }
])

// 最近活动
const recentActivities = computed(() => [
  { user: t('user1'), action: t('loginSystem'), time: t('minutesAgo', { n: 2 }), avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1' },
  { user: t('user2'), action: t('updatedConfig'), time: t('minutesAgo', { n: 15 }), avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2' },
  { user: t('user3'), action: t('createdProject'), time: t('hoursAgo', { n: 1 }), avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3' },
  { user: t('user4'), action: t('exportedReport'), time: t('hoursAgo', { n: 3 }), avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4' },
  { user: t('user5'), action: t('modifiedPermissions'), time: t('hoursAgo', { n: 5 }), avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5' }
])

// 快捷操作
const quickActions = computed(() => [
  { label: t('newProject'), icon: 'i-mdi:folder-plus', color: '#FF6699' },
  { label: t('uploadFile'), icon: 'i-mdi:cloud-upload', color: '#14C9C9' },
  { label: t('exportData'), icon: 'i-mdi:download', color: '#fa8c16' },
  { label: t('systemSettings'), icon: 'i-mdi:cog', color: '#722ed1' }
])

// 折线图配置
const lineChartOption = computed(() => ({
  tooltip: {
    trigger: 'axis',
    backgroundColor: isDark ? '#333' : '#fff',
    borderColor: isDark ? '#444' : '#ddd',
    textStyle: { color: isDark ? '#fff' : '#333' }
  },
  grid: {
    left: '5%',
    right: '5%',
    bottom: '5%',
    top: '5%'
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [t('mon'), t('tue'), t('wed'), t('thu'), t('fri'), t('sat'), t('sun')],
    axisLine: { lineStyle: { color: isDark ? '#555' : '#ddd' } },
    axisLabel: { color: isDark ? '#aaa' : '#666' }
  },
  yAxis: {
    type: 'value',
    axisLine: { lineStyle: { color: isDark ? '#555' : '#ddd' } },
    axisLabel: { color: isDark ? '#aaa' : '#666' },
    splitLine: { lineStyle: { color: isDark ? '#333' : '#eee' } }
  },
  series: [
    {
      name: t('visits'),
      type: 'line',
      smooth: true,
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(255, 102, 153, 0.3)' },
            { offset: 1, color: 'rgba(255, 102, 153, 0.05)' }
          ]
        }
      },
      lineStyle: { color: '#FF6699', width: 3 },
      itemStyle: { color: '#FF6699' }
    },
    {
      name: t('users'),
      type: 'line',
      smooth: true,
      data: [620, 732, 701, 734, 1090, 1130, 1120],
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(20, 201, 201, 0.3)' },
            { offset: 1, color: 'rgba(20, 201, 201, 0.05)' }
          ]
        }
      },
      lineStyle: { color: '#14C9C9', width: 3 },
      itemStyle: { color: '#14C9C9' }
    }
  ]
}))

// 饼图配置
const pieChartOption = computed(() => ({
  tooltip: {
    trigger: 'item',
    backgroundColor: isDark ? '#333' : '#fff',
    borderColor: isDark ? '#444' : '#ddd',
    textStyle: { color: isDark ? '#fff' : '#333' }
  },
  legend: {
    orient: 'vertical',
    right: '5%',
    top: 'center',
    textStyle: { color: isDark ? '#aaa' : '#666' }
  },
  series: [
    {
      name: t('visitSource'),
      type: 'pie',
      radius: ['45%', '70%'],
      center: ['35%', '50%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: isDark ? '#222' : '#fff',
        borderWidth: 2
      },
      label: { show: false },
      emphasis: {
        label: {
          show: true,
          fontSize: 14,
          fontWeight: 'bold'
        }
      },
      labelLine: { show: false },
      data: [
        { value: 1048, name: t('searchEngine'), itemStyle: { color: '#FF6699' } },
        { value: 735, name: t('directAccess'), itemStyle: { color: '#14C9C9' } },
        { value: 580, name: t('emailMarketing'), itemStyle: { color: '#fa8c16' } },
        { value: 484, name: t('affiliateAds'), itemStyle: { color: '#722ed1' } },
        { value: 300, name: t('videoAds'), itemStyle: { color: '#9FDB1D' } }
      ]
    }
  ]
}))

// 柱状图配置
const barChartOption = computed(() => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    backgroundColor: isDark ? '#333' : '#fff',
    borderColor: isDark ? '#444' : '#ddd',
    textStyle: { color: isDark ? '#fff' : '#333' }
  },
  grid: {
    left: '5%',
    right: '5%',
    bottom: '5%',
    top: '5%'
  },
  xAxis: {
    type: 'category',
    data: [t('jan'), t('feb'), t('mar'), t('apr'), t('may'), t('jun')],
    axisLine: { lineStyle: { color: isDark ? '#555' : '#ddd' } },
    axisLabel: { color: isDark ? '#aaa' : '#666' }
  },
  yAxis: {
    type: 'value',
    axisLine: { lineStyle: { color: isDark ? '#555' : '#ddd' } },
    axisLabel: { color: isDark ? '#aaa' : '#666' },
    splitLine: { lineStyle: { color: isDark ? '#333' : '#eee' } }
  },
  series: [
    {
      name: t('revenue'),
      type: 'bar',
      barWidth: '35%',
      data: [320, 450, 380, 520, 480, 620],
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: '#FF6699' },
            { offset: 1, color: '#fa8c16' }
          ]
        },
        borderRadius: [6, 6, 0, 0]
      }
    }
  ]
}))

// 卡片样式
const cardStyle = computed<CSSProperties>(() => ({
  backgroundColor: themeVars.value.cardColor,
  borderRadius: themeVars.value.borderRadius,
  border: `1px solid ${themeVars.value.borderColor}`,
  transition: 'all 0.3s ease'
}))
</script>

<template>
  <CommonPage>
    <div class="flex flex-col gap-4">
      <!-- 统计卡片 -->
      <div class="grid grid-cols-4 gap-4">
        <div
          v-for="card in statsCards" :key="card.title"
          class="p-4 flex items-center gap-4 cursor-pointer hover:shadow-lg hover:border-[var(--n-primary-color)]"
          :style="cardStyle"
        >
          <div class="size-12 rounded-xl flex-center" :style="{ backgroundColor: `${card.color}20` }">
            <div :class="card.icon" class="size-6" :style="{ color: card.color }" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-opacity text-sm">{{ card.title }}</div>
            <div class="flex items-end gap-2 mt-1">
              <span class="title">{{ card.value }}</span>
              <span class="text-sm mb-1" :class="card.trend === 'up' ? 'text-green-500' : 'text-red-500'">
                {{ card.change }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 快捷操作 -->
      <div class="flex gap-3">
        <NCard
          v-for="action in quickActions" :key="action.label" size="small" hoverable class="flex-1 cursor-pointer"
          content-style="padding: 12px;"
        >
          <div class="flex items-center gap-2">
            <div :class="action.icon" class="size-5" :style="{ color: action.color }" />
            <span class="text-base">{{ action.label }}</span>
          </div>
        </NCard>
      </div>

      <!-- 图表区域 -->
      <div class="grid grid-cols-3 gap-4">
        <!-- 折线图 -->
        <NCard class="col-span-2" :bordered="true" hoverable>
          <template #header>
            <div class="flex justify-between items-center w-full">
              <span class="title">{{ t('visitTrend') }}</span>
              <Segmented
                v-model:value="chartPeriod" :options="[
                  { label: t('week'), value: 'week' },
                  { label: t('month'), value: 'month' },
                  { label: t('year'), value: 'year' },
                ]" size="small"
              />
            </div>
          </template>
          <VChart :option="lineChartOption" autoresize class="h-80" />
        </NCard>

        <!-- 饼图 -->
        <NCard :bordered="true" hoverable>
          <template #header>
            <span class="title">{{ t('visitSource') }}</span>
          </template>
          <VChart :option="pieChartOption" autoresize class="h-80" />
        </NCard>
      </div>

      <!-- 下方区域 -->
      <div class="grid grid-cols-3 gap-4">
        <!-- 柱状图 -->
        <NCard class="col-span-2" :bordered="true" hoverable>
          <template #header>
            <span class="title">{{ t('monthlyRevenue') }}</span>
          </template>
          <VChart :option="barChartOption" autoresize class="h-64" />
        </NCard>

        <!-- 最近活动 -->
        <NCard :bordered="true" hoverable>
          <template #header>
            <span class="title">{{ t('recentActivity') }}</span>
          </template>
          <div class="flex flex-col gap-2">
            <div
              v-for="activity in recentActivities" :key="activity.time"
              class="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--n-hover-color)] transition-colors cursor-pointer"
            >
              <NAvatar :src="activity.avatar" :size="36" round />
              <div class="flex-1 min-w-0">
                <div class="text-base">{{ activity.user }}</div>
                <div class="text-opacity">{{ activity.action }}</div>
              </div>
              <div class="text-opacity text-sm whitespace-nowrap">
                {{ activity.time }}
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
    "totalUsers": "总用户数",
    "activeSessions": "活跃会话",
    "systemMessages": "系统消息",
    "storageUsage": "存储使用",
    "newProject": "新建项目",
    "uploadFile": "上传文件",
    "exportData": "导出数据",
    "systemSettings": "系统设置",
    "visitTrend": "访问趋势",
    "visitSource": "访问来源",
    "monthlyRevenue": "月度收入",
    "recentActivity": "最近活动",
    "week": "周",
    "month": "月",
    "year": "年",
    "mon": "周一",
    "tue": "周二",
    "wed": "周三",
    "thu": "周四",
    "fri": "周五",
    "sat": "周六",
    "sun": "周日",
    "visits": "访问量",
    "users": "用户数",
    "searchEngine": "搜索引擎",
    "directAccess": "直接访问",
    "emailMarketing": "邮件营销",
    "affiliateAds": "联盟广告",
    "videoAds": "视频广告",
    "jan": "1月",
    "feb": "2月",
    "mar": "3月",
    "apr": "4月",
    "may": "5月",
    "jun": "6月",
    "revenue": "收入",
    "user1": "张三",
    "user2": "李四",
    "user3": "王五",
    "user4": "赵六",
    "user5": "钱七",
    "loginSystem": "登录系统",
    "updatedConfig": "更新了配置",
    "createdProject": "创建了新项目",
    "exportedReport": "导出了报告",
    "modifiedPermissions": "修改了权限",
    "minutesAgo": "{n}分钟前",
    "hoursAgo": "{n}小时前"
  },
  "en": {
    "totalUsers": "Total Users",
    "activeSessions": "Active Sessions",
    "systemMessages": "System Messages",
    "storageUsage": "Storage Usage",
    "newProject": "New Project",
    "uploadFile": "Upload File",
    "exportData": "Export Data",
    "systemSettings": "System Settings",
    "visitTrend": "Visit Trend",
    "visitSource": "Visit Source",
    "monthlyRevenue": "Monthly Revenue",
    "recentActivity": "Recent Activity",
    "week": "Week",
    "month": "Month",
    "year": "Year",
    "mon": "Mon",
    "tue": "Tue",
    "wed": "Wed",
    "thu": "Thu",
    "fri": "Fri",
    "sat": "Sat",
    "sun": "Sun",
    "visits": "Visits",
    "users": "Users",
    "searchEngine": "Search Engine",
    "directAccess": "Direct Access",
    "emailMarketing": "Email Marketing",
    "affiliateAds": "Affiliate Ads",
    "videoAds": "Video Ads",
    "jan": "Jan",
    "feb": "Feb",
    "mar": "Mar",
    "apr": "Apr",
    "may": "May",
    "jun": "Jun",
    "revenue": "Revenue",
    "user1": "User 1",
    "user2": "User 2",
    "user3": "User 3",
    "user4": "User 4",
    "user5": "User 5",
    "loginSystem": "Logged in",
    "updatedConfig": "Updated config",
    "createdProject": "Created project",
    "exportedReport": "Exported report",
    "modifiedPermissions": "Modified permissions",
    "minutesAgo": "{n} min ago",
    "hoursAgo": "{n} hr ago"
  }
}
</i18n>
