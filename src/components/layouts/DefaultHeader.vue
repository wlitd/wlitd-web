<template>
  <NLayoutHeader class="flex gap-2 items-center justify-between w-full h-16 px-6 py-4 w-full">
    <CollapseIcon />
    <div class="flex-1 overflow-hidden">
      <Tabs />
    </div>
    <div class="flex justify-end items-center">
      <NDivider vertical />
      <div class="flex gap-4 items-center">
        <GitHubIcon />
        <ThemeIcon />
        <ColorPicker />
        <LocalePicker />
      </div>
    </div>
  </NLayoutHeader>
</template>
