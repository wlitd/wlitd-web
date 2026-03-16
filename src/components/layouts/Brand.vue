<script setup lang="ts">
const { menuCollapsed } = storeToRefs(useGlobalStore())

const appTitle = getEnv('VITE_APP_TITLE')
</script>

<template>
  <ProTransitionGroup class="flex-center gap-2 h-15 overflow-x-hidden cursor-pointer" @click="$router.push('/')">
    <logo key="1" />
    <div v-if="!menuCollapsed" key="2" class="shrink-0 title">{{ appTitle }}</div>
  </ProTransitionGroup>
</template>
