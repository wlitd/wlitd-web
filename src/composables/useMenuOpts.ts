import type { MenuOption } from 'naive-ui'
import type { RouteRecordRaw } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

export function useMenuOpts() {
  const { t } = useI18n()

  // 递归转换路由为菜单选项，并过滤隐藏的菜单项
  function convertRouteToMenuOption(route: RouteRecordRaw): MenuOption | null {
    const titleKey = route.meta?.titleKey
    const iconClass = route.meta?.icon

    const label = titleKey ? t(titleKey) : ''

    let menuOpt: MenuOption
    if (route.meta?.group) {
      menuOpt = {
        label: label,
        key: titleKey,
        type: 'group'
      }
    } else {
      menuOpt = {
        label: () => h(
          RouterLink,
          {
            to: {
              name: route.name
            }
          },
          { default: () => label }
        ),
        key: titleKey
      }

      // group 类型不支持图标
      if (iconClass) {
        menuOpt.icon = () => h('div', { class: iconClass })
      }
    }

    // 递归处理子路由
    if (route.children && Array.isArray(route.children)) {
      const children = processChildren(route.children)

      if (children.length > 0) {
        menuOpt.children = children
      }
    }

    return menuOpt
  }

  function processChildren(routes: RouteRecordRaw[]): MenuOption[] {
    const menuOpts: MenuOption[] = []

    routes.forEach((route) => {
      if (route.meta?.inMenu === false) {
        // 处理子路由列表，将 inMenu = false 路由的子项提升
        if (route.children && Array.isArray(route.children)) {
          const children = processChildren(route.children)
          menuOpts.push(...children)
          return
        }
        // 如果路由不在菜单中，跳过
        return
      }

      // 鉴权
      if (route.meta?.requiresAuth) {
        console.warn('鉴权逻辑待实现！')
      }

      // 检查是否需要在前面添加分隔线
      if (route.meta?.divider === 'prefix' || route.meta?.divider === 'all') {
        menuOpts.push({
          type: 'divider',
          key: `${route.meta?.titleKey}-prefix-divider`
        })
      }

      // 正常路由，转换为菜单项
      const menuOption = convertRouteToMenuOption(route)
      if (menuOption) {
        menuOpts.push(menuOption)
      }

      // 检查是否需要在后面添加分隔线
      if (route.meta?.divider === 'suffix' || route.meta?.divider === 'all') {
        menuOpts.push({
          type: 'divider',
          key: `${route.meta?.titleKey}-suffix-divider`
        })
      }
    })

    return menuOpts
  }

  const menuOpts = computed<MenuOption[]>(() => {
    return processChildren(routes)
  })

  return {
    menuOpts
  }
}
