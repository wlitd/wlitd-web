import { defineConfig, presetIcons, presetWind3 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind3({}),
    presetIcons({
      collections: {
        flag: () => import('@iconify-json/flag/icons.json').then(i => i.default),
        'line-md': () => import('@iconify-json/line-md/icons.json').then(i => i.default),
        mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
        'icon-park-outline': () => import('@iconify-json/icon-park-outline/icons.json').then(i => i.default),
        lucide: () => import('@iconify-json/lucide/icons.json').then(i => i.default)
      }
    })
  ],
  // 当动态导入icon时，使用动态class会导致图标显示异常。解决方案是直接将icon添加至safelist中
  safelist: [
    'i-flag:cn-4x3',
    'i-flag:us-4x3',
    'i-icon-park-outline:home',
    'i-icon-park-outline:components',
    'i-icon-park-outline:system',
    'i-icon-park-outline:user'
  ],

  rules: [
    [/^size-(\d+)$/, ([, d]) => ({ height: `${Number(d) / 4}rem`, width: `${Number(d) / 4}rem` })],
    // 滚动遮罩：顶部 + 底部
    [
      /^mask$/,
      () => `
      .mask {
        position: relative;
      }
      .mask::before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: 1;
        pointer-events: none;
        background: linear-gradient(
          to bottom,
          var(--wlitd-mask-color),
          transparent 25px,
          transparent calc(100% - 25px),
          var(--wlitd-mask-color)
        );
      }
    `
    ]
  ],

  shortcuts: [
    ['flex-center', 'flex justify-center items-center'],
    ['absolute-y-center', 'absolute top-1/2 transform -translate-y-1/2'],
    ['absolute-x-center', 'absolute left-1/2 transform -translate-x-1/2'],
    ['absolute-center', 'absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2'],
    ['p-base', 'px-2 py-3'],
    ['title', 'text-[18px] font-medium'],
    ['text-base', 'text-[14px]'],
    ['text-opacity', 'text-[12px] opacity-70'],
    ['bg-surface', 'bg-[var(--wlitd-surface-bg)]'],
    ['bg-primary', '[background:var(--wlitd-primary-bg)]']
  ]
})
