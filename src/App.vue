<script setup lang="ts">
import hljs from 'highlight.js'
import typescript from 'highlight.js/lib/languages/typescript'

hljs.registerLanguage('typescript', typescript)

const { nTheme, nThemeOverride } = storeToRefs(useThemeStore())
const { locale } = storeToRefs(useLocaleStore())
</script>

<template>
  <NConfigProvider
    class="h-full" :theme="nTheme" :theme-overrides="nThemeOverride" :locale="locale.nLocale"
    :date-locale="locale.nDateLocale" :hljs="hljs"
  >
    <RouterView />
  </NConfigProvider>
</template>
