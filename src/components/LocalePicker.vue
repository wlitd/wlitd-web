<script setup lang="ts">
import type { DropdownOption } from 'naive-ui'

const dropdownOpts: DropdownOption[] = localeMap.map((locale) => {
  return {
    key: locale.key,
    label: locale.name,
    icon: () => h('div', { class: locale.icon })
  }
})

const { locale } = storeToRefs(useLocaleStore())
const { setLocaleKey } = useLocaleStore()
</script>

<template>
  <NDropdown trigger="click" show-arrow :options="dropdownOpts" @select="(key: LocaleKey) => setLocaleKey(key)">
    <RippleButton>
      <template #icon>
        <div :class="locale.icon" />
      </template>
      {{ locale.name }}
    </RippleButton>
  </NDropdown>
</template>
