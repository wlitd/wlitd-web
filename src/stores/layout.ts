export type LayoutName = 'Default' | 'Simple' | 'Blank'

export const useLayoutStore = defineStore('layout', () => {
  // 默认布局名称，对应组件名
  const currentLayout = ref<LayoutName>('Simple')

  function setLayout(name: LayoutName): void {
    currentLayout.value = name
  }

  return { currentLayout, setLayout }
}, {
  /** 持久化配置 */
  persist: {
    /** 持久化存储的键名 */
    key: 'layout',
    /** 使用 localStorage 进行持久化存储 */
    storage: localStorage,
    /** 需要持久化的状态字段 */
    pick: ['currentLayout']
  }
})
