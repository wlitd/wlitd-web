<script setup lang="ts">
const handleClick = () => {
  window.open('https://github.com/wlitd/wlitd-web', '_blank')
}
</script>

<template>
  <div
    class="i-line-md:github-loop size-5 cursor-pointer"
    @click="handleClick"
  />
</template>
