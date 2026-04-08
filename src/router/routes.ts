import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    meta: { inMenu: false },
    children: [
      {
        name: 'Home',
        path: '',
        component: () => import('@/pages/index.vue'),
        meta: {
          titleKey: 'home',
          icon: 'i-icon-park-outline:home',
          i18n: {
            zh: '首页',
            en: 'Home'
          }
        }
      },
      {
        name: 'Profile',
        path: 'profile',
        component: () => import('@/pages/profile.vue'),
        meta: {
          titleKey: 'profile',
          inMenu: false,
          i18n: {
            zh: '个人资料',
            en: 'Profile'
          }
        }
      },
      {
        path: 'components',
        meta: {
          titleKey: 'components',
          icon: 'i-icon-park-outline:components',
          i18n: {
            zh: '组件',
            en: 'Components'
          }
        },
        children: [
          {
            path: 'base',
            meta: {
              titleKey: 'base',
              group: true,
              i18n: {
                zh: '基础组件',
                en: 'Base Component'
              }
            },
            children: [
              {
                name: 'Button',
                path: 'button',
                component: () => import('@/pages/components/base/rippleButtonDemo.vue'),
                meta: {
                  titleKey: 'button',
                  i18n: {
                    zh: '水波纹按钮',
                    en: 'Ripple Button'
                  }
                }
              },
              {
                name: 'Segmented',
                path: 'segmented',
                component: () => import('@/pages/components/base/segmentedDemo.vue'),
                meta: {
                  titleKey: 'segmented',
                  i18n: {
                    zh: '分段控制器',
                    en: 'Segmented'
                  }
                }
              },
              {
                name: 'Fieldset',
                path: 'fieldset',
                component: () => import('@/pages/components/base/fieldsetDemo.vue'),
                meta: {
                  titleKey: 'fieldset',
                  i18n: {
                    zh: 'Fieldset',
                    en: 'Fieldset'
                  }
                }
              },
              {
                name: 'SpeedDial',
                path: 'speed-dial',
                component: () => import('@/pages/components/base/speedDialDemo.vue'),
                meta: {
                  titleKey: 'speedDial',
                  i18n: {
                    zh: '速拨按钮',
                    en: 'Speed Dial'
                  }
                }
              },
              {
                name: 'orgChart',
                path: 'org-chart',
                component: () => import('@/pages/components/base/orgChartDemo.vue'),
                meta: {
                  titleKey: 'orgChart',
                  i18n: {
                    zh: '组织架构图',
                    en: 'Org Chart'
                  }
                }
              },
              {
                name: 'Conversations',
                path: 'conversations',
                component: () => import('@/pages/components/base/conversationsDemo.vue'),
                meta: {
                  titleKey: 'conversations',
                  i18n: {
                    zh: '对话列表',
                    en: 'Conversations'
                  }
                }
              },
              {
                name: 'Dock',
                path: 'dock',
                component: () => import('@/pages/components/base/dockDemo.vue'),
                meta: {
                  titleKey: 'dock',
                  i18n: {
                    zh: 'Dock 导航栏',
                    en: 'Dock'
                  }
                }
              }
            ]
          },
          {
            path: 'input',
            meta: {
              titleKey: 'input',
              group: true,
              i18n: {
                zh: '输入组件',
                en: 'Input Component'
              }
            },
            children: [
              {
                name: 'FloatInput',
                path: 'floatInput',
                component: () => import('@/pages/components/input/floatInputDemo.vue'),
                meta: {
                  titleKey: 'floatInput',
                  i18n: {
                    zh: '浮标输入框',
                    en: 'Float Input'
                  }
                }
              }
            ]
          }
        ]
      },
      {
        path: 'system',
        meta: {
          titleKey: 'system',
          icon: 'i-icon-park-outline:system',
          i18n: {
            zh: '系统管理',
            en: 'System Management'
          }
        },
        children: [
          {
            name: 'User',
            path: 'user',
            component: () => import('@/pages/system/user.vue'),
            meta: {
              titleKey: 'user',
              icon: 'i-icon-park-outline:user',
              i18n: {
                zh: '用户管理',
                en: 'User Management'
              }
            }
          }
        ]
      },
      {
        path: 'base',
        meta: {
          titleKey: 'base',
          icon: 'i-mdi:cube-outline',
          i18n: {
            zh: '基础功能',
            en: 'Base Function'
          }
        },
        children: [
          {
            name: 'KeepAlive',
            path: 'keepAlive',
            component: () => import('@/pages/base/keepAlive.vue'),
            meta: {
              titleKey: 'keepAlive',
              keepAlive: true,
              i18n: {
                zh: 'KeepAlive',
                en: 'KeepAlive'
              }
            }
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/pages/login.vue'),
    meta: { inMenu: false, inTab: false }
  }
]
