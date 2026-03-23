<script setup lang="ts">
defineOptions({
  name: 'KeepAlive'
})

const value = ref<number>(0)
</script>

<template>
  <CommonPage>
    <NInputNumber v-model:value="value" clearable />
  </CommonPage>
</template>
