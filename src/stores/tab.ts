import type { RouteLocationNormalized, Router } from 'vue-router'

/**
 * 标签页项类型
 */
export interface TabItem {
  /** 路由名称 */
  routeName: string
  /** 路由完整路径 */
  fullPath: string
  /** 国际化标题键名 */
  titleKey: string
}

/**
 * 标签页状态管理 Store
 * 用于管理浏览器标签页的打开、关闭等操作
 */
export const useTabStore = defineStore('tab', () => {
  /** 标签页列表 */
  const tabList = ref<TabItem[]>([])

  /** 缓存的视图集合 */
  const cachedViews = ref<Set<string>>(new Set())
  /** 需要保持活跃的组件名称列表 */
  const keepAliveNames = computed<string[]>(() => Array.from(cachedViews.value))

  /**
   * 添加标签页
   * @param route 路由对象
   */
  function addTab(route: RouteLocationNormalized): void {
    if (route.meta.inTab === false) {
      return
    }

    const existing = tabList.value.some(item => item.fullPath === route.fullPath)
    if (!existing) {
      tabList.value.push({
        routeName: String(route.name || ''),
        fullPath: route.fullPath,
        titleKey: route.meta?.titleKey || ''
      })
    }
  }

  /**
   * 添加缓存视图
   * @param route 路由对象
   */
  function addCachedView(route: RouteLocationNormalized): void {
    cachedViews.value.add(route.name as string)
  }

  /**
   * 移除缓存视图
   * @param tab 标签页对象
   */
  function removeCachedView(tab: TabItem): void {
    cachedViews.value.delete(tab.routeName)
  }

  /**
   * 关闭标签页
   * @param tab 要关闭的标签页
   * @param router Vue Router 实例
   */
  function closeTab(tab: TabItem, router: Router): void {
    if (tabList.value.length === 1 && tab.fullPath === '/') {
      return
    }

    const tabIndex = tabList.value.findIndex(item => item.fullPath === tab.fullPath)

    if (tabIndex === -1) {
      return
    }

    // 删除tab时同时删除缓存
    removeCachedView(tab)

    tabList.value.splice(tabIndex, 1)

    if (tab.fullPath === router.currentRoute.value.fullPath) {
      if (tabList.value.length === 0) {
        router.push('/')
      } else {
        // 如果关闭的是最右边的tab（即最后一个），则往前跳
        // 否则默认往后跳（由于已删除一个元素，原来的下一个会变成当前索引）
        const targetTabIndex = Math.min(tabIndex, tabList.value.length - 1)

        const targetTab = tabList.value[targetTabIndex]
        if (targetTab) {
          router.push(targetTab.fullPath)
        }
      }
    }
  }

  /**
   * 关闭左侧标签页
   * @param tab 当前标签页
   * @param router Vue Router 实例
   */
  function closeLeftTabs(tab: TabItem, router: Router): void {
    const tabIndex = tabList.value.findIndex(item => item.fullPath === tab.fullPath)
    if (tabIndex === -1) {
      return
    }

    // 删除左侧tab时同时删除缓存
    for (let i = 0; i < tabIndex; i++) {
      const tabToRemove = tabList.value[i]
      if (tabToRemove) {
        removeCachedView(tabToRemove)
      }
    }

    tabList.value = tabList.value.slice(tabIndex)

    if (!tabList.value.some(item => item.fullPath === router.currentRoute.value.fullPath)) {
      router.push(tab.fullPath)
    }
  }

  /**
   * 关闭右侧标签页
   * @param tab 当前标签页
   * @param router Vue Router 实例
   */
  function closeRightTabs(tab: TabItem, router: Router): void {
    const tabIndex = tabList.value.findIndex(item => item.fullPath === tab.fullPath)
    if (tabIndex === -1) {
      return
    }

    // 删除右侧tab时同时删除缓存
    for (let i = tabIndex + 1; i < tabList.value.length; i++) {
      const tabToRemove = tabList.value[i]
      if (tabToRemove) {
        removeCachedView(tabToRemove)
      }
    }

    tabList.value = tabList.value.slice(0, tabIndex + 1)

    if (!tabList.value.some(item => item.fullPath === router.currentRoute.value.fullPath)) {
      router.push(tab.fullPath)
    }
  }

  /**
   * 关闭其他标签页
   * @param tab 当前标签页
   * @param router Vue Router 实例
   */
  function closeOtherTabs(tab: TabItem, router: Router): void {
    // 删除其他tab时同时删除缓存
    tabList.value.forEach((tabItem) => {
      if (tabItem.fullPath !== tab.fullPath) {
        removeCachedView(tabItem)
      }
    })

    tabList.value = tabList.value.filter(t => t.fullPath === tab.fullPath)

    if (router.currentRoute.value.fullPath !== tab.fullPath) {
      router.push(tab.fullPath)
    }
  }

  /**
   * 关闭所有标签页
   * @param router Vue Router 实例
   */
  function closeAllTabs(router: Router): void {
    // 关闭所有tab时同时删除缓存
    tabList.value.forEach((tabItem) => {
      removeCachedView(tabItem)
    })

    tabList.value = tabList.value.filter(tab => tab.fullPath === '/')

    if (router.currentRoute.value.fullPath !== '/') {
      router.push('/')
    }
  }

  return { tabList, keepAliveNames, addTab, addCachedView, closeTab, closeLeftTabs, closeRightTabs, closeOtherTabs, closeAllTabs }
}, {
  /** 持久化配置 */
  persist: {
    /** 持久化存储的键名 */
    key: 'tab',
    /** 使用 localStorage 进行持久化存储 */
    storage: localStorage,
    /** 需要持久化的状态字段 */
    pick: ['tabList']
  }
})
