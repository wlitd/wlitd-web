<script setup lang="ts">
const route = useRoute()

const { keepAliveNames } = storeToRefs(useTabStore())
const { addCachedView } = useTabStore()

const currentComponent = computed<Component | undefined>(() => {
  const component = route.matched.at(-1)?.components?.default
  if (!component || !route.meta.keepAlive) {
    return component
  }

  const cacheName = `${String(route.name)}-${route.fullPath}`

  addCachedView(route)

  return {
    name: cacheName,
    render() {
      return h(markRaw(component), {
        key: route.fullPath
      })
    }
  }
})
</script>

<template>
  <KeepAlive :include="keepAliveNames">
    <component :is="currentComponent" />
  </KeepAlive>
</template>
