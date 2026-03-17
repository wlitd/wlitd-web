import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

declare module 'vue-router' {
  interface RouteMeta {
    titleKey?: string // 用于 i18n 翻译键
    group?: boolean // 是否为菜单分组
    divider?: 'prefix' | 'suffix' | 'all' // 前后是否存在分隔线
    icon?: string // 图标
    i18n?: Record<string, string> // i18n 翻译数据
    inMenu?: boolean // 是否显示在菜单中（默认为 true）。这里初步设计允许父级路由为false，子路由为true的情况（将会把子路由层级提升）
    keepAlive?: boolean // 是否缓存该路由（默认为 false）
    inTab?: boolean // 是否显示在标签页中（默认为 true）
    requiresAuth?: boolean // 是否需要授权（默认为 false）
  }
}

const router = createRouter({
  // 配置 Nginx 代理的基础路径
  history: createWebHistory('/web/'),
  routes
})

export default router
