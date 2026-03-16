/**
 * 全局状态管理 Store
 * 用于管理全局应用状态，如菜单折叠状态等
 */
export const useGlobalStore = defineStore('global', () => {
  /** 菜单折叠状态 */
  const menuCollapsed = ref<boolean>(false)

  /**
   * 切换菜单折叠状态
   */
  function toggleMenuCollapsed(): void {
    useToggle(menuCollapsed)()
  }

  return { menuCollapsed, toggleMenuCollapsed }
}, {
  /** 持久化配置 */
  persist: {
    /** 持久化存储的键名 */
    key: 'global',
    /** 使用 localStorage 进行持久化存储 */
    storage: localStorage,
    /** 需要持久化的状态字段 */
    pick: ['menuCollapsed']
  }
})
