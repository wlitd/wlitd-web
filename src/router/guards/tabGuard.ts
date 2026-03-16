import type { Router } from 'vue-router'

export function tabGuard(router: Router): void {
  const { addTab } = useTabStore()
  router.afterEach((to, _) => {
    addTab(to)
  })
}
