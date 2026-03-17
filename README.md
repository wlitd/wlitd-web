# wlitd-web

A Vue 3 application using Vite, TypeScript, and various modern frontend tools.

**Preview:** https://wlitd.com/web/

## Dependency Management

This project uses [taze](https://github.com/antfu-collective/taze#readme) to manage and update dependencies.

Taze can be run without installation using npx:

```bash
# Check for dependency updates
npx taze

# Update dependencies (writes to package.json and auto installs after confirmation)
npx taze -w -i

# Check for major version updates (includes breaking changes)
npx taze major

# Check for minor version updates
npx taze minor

# Check for patch version updates
npx taze patch

# Get help
npx taze --help
```

## Routing and Layout System

This project uses manual routing with Vue Router and a custom layout system. Routes are defined in `src/router/routes.ts` and converted to navigation menus using the `useMenuOpts` composable.

### Route Definition

Routes are manually configured in `src/router/routes.ts`. Each route can define metadata including translation keys, icons, and additional options:

```ts
const routes = {
  name: 'User',
  path: 'user',
  component: () => import('@/pages/system/user.vue'),
  meta: {
    titleKey: 'user',
    icon: 'i-icon-park-outline:user',
    i18n: {
      zh: '用户管理',
      en: 'User Management'
    },
    inMenu: true, // Whether to show in menu (defaults to true)
    keepAlive: false, // Whether to cache the route (defaults to false)
    inTab: true, // Whether to show in tabs (defaults to true)
    requiresAuth: false, // Whether authorization is required (defaults to false)
    group: false, // Whether this is a menu group (defaults to false)
    divider: undefined // Divider position: 'prefix' | 'suffix' | 'all'
  }
}
```

The RouteMeta interface includes these properties:
- `titleKey`: Key for i18n translation
- `icon`: CSS class for the menu icon
- `i18n`: Translation data for different languages
- `inMenu`: Whether the route appears in the menu (defaults to true)
- `keepAlive`: Whether to cache the route component (defaults to false)
- `inTab`: Whether to show the route in tabs (defaults to true)
- `requiresAuth`: Whether authentication is required (defaults to false)
- `group`: Whether this route acts as a menu group (defaults to false)
- `divider`: Position of dividers around menu items ('prefix' | 'suffix' | 'all')

### Layout Configuration

Layouts are implemented by defining layout components in `src/layouts/` and specifying them as route components. The default layout includes header, sidebar, and footer sections.

Layout routes can be defined with the `inMenu: false` meta property to indicate they are structural and should not appear as menu items:

```ts
const routes = {
  path: '/',
  component: () => import('@/layouts/default.vue'),
  meta: { inMenu: false },
  children: [
    // Child routes
  ]
}
```

Routes with `inMenu: false` will not appear in the navigation menu but their children may still be accessible.

### Menu Generation

The `useMenuOpts` composable in `src/composables/useMenuOpts.ts` automatically converts routes to menu options for the Naive UI menu component. It processes route metadata to generate menu labels, icons, and hierarchical structure. The composable handles:

- Recursive processing of nested routes
- Filtering of routes based on the `inMenu` property
- Promotion of child routes when parent has `inMenu: false`
- Adding dividers based on the `divider` property
- Creating grouped menu sections using the `group` property
- Handling route icons and internationalized labels

### Internationalization (i18n)

Translation data is stored in route metadata and automatically registered with vue-i18n through the plugin in `src/plugins/locale.ts`. Translation keys are defined in route meta with the `titleKey` property and localized texts in the `i18n` object. The locale store in `src/stores/locale.ts` manages the current language setting.

### Theme System

The application supports custom themes with dynamic primary colors and dark mode. The theme store (`src/stores/theme.ts`) manages theme state including:
- Dark/light mode toggle using `useDark()` from VueUse
- Dynamic primary color selection from preset colors
- Automatic generation of theme color variants (hover, pressed, suppl)
- Persistence of theme preferences to localStorage

Theme colors are applied through Naive UI's theme override system.

## Custom UI Components

This project includes a collection of custom UI components built on top of Naive UI.

### RippleButton

A button component with ripple effect on click. Extends Naive UI's NButton with water ripple animation.

**Features:**
- Full support for Naive UI button types (default, primary, info, success, warning, error, etc.)
- Multiple variants: strong, secondary, tertiary, quaternary
- Size options: tiny, small, medium, large
- Special types: dashed, text, link
- Ghost button style
- Loading and disabled states
- Circle and round shapes
- Icon support with slots
- Form integration (inherits size and disabled state from NFormItem)

**Usage:**
```vue
<template>
  <RippleButton type="primary" @click="handleClick">
    Click Me
  </RippleButton>

  <RippleButton circle>
    <template #icon>
      <div class="i-mdi:reload" />
    </template>
  </RippleButton>
</template>
```

**Directive:** `v-ripple` - Adds ripple effect to any element

### Segmented

A segmented control component with smooth sliding thumb animation.

**Features:**
- Sliding thumb indicator with smooth transitions
- Multiple sizes: small, medium, large
- Block mode for full-width layout
- Disabled state (global and per-item)
- Custom label rendering via slots
- Form integration
- Responsive to container resize
- Works reliably in dynamic containers like modals

**Usage:**
```vue
<script setup lang="ts">
const options = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' }
]
const value = ref('daily')
</script>

<template>
  <Segmented v-model:value="value" :options="options" @change="handleChange" />
</template>
```

### FloatInput

An input component with floating label animation.

**Features:**
- Floating label that animates when focused or has value
- Support for text and textarea types
- Form integration (inherits size, disabled, and validation status)
- Prefix and suffix slots
- Clear icon slot
- Password visibility toggle slots
- Character count slot
- Validation status display (warning, error)
- Multiple sizes

**Usage:**
```vue
<template>
  <FloatInput
    v-model:value="text"
    placeholder="Enter something"
    type="textarea"
  >
    <template #prefix>
      <div class="i-mdi:search" />
    </template>
  </FloatInput>
</template>
```

### Fieldset

A fieldset component with optional collapsible functionality.

**Features:**
- Legend title with optional toggle button
- Collapsible content with smooth animations
- Multiple sizes
- Form integration
- Controlled expand/collapse state

**Usage:**
```vue
<template>
  <Fieldset legend="Basic Information" toggleable>
    <p>Content goes here...</p>
  </Fieldset>
</template>
```

### SpeedDial

A floating action button with expandable menu items.

**Features:**
- Multiple layout types: linear, circle, semi-circle, quarter-circle
- Configurable directions (up, down, left, right, and combinations)
- Multiple sizes
- Tooltip support for items
- Staggered animation delays
- Custom button and item rendering via slots
- Disabled state

**Usage:**
```vue
<template>
  <SpeedDial
    :items="items"
    direction="up"
    type="linear"
    @click="handleItemClick"
  />
</template>
```

### Conversations

A conversation list component with grouping support.

**Features:**
- Grouped or flat list display
- Active state management
- Loading state per item
- Disabled state per item
- Custom icon and label rendering via slots
- Menu dropdown support for each item
- Ripple effect on hover

**Usage:**
```vue
<script setup lang="ts">
const conversations = [
  {
    key: '1',
    label: 'Conversation 1',
    icon: 'i-mdi:message',
    group: 'Recent'
  },
  {
    key: '2',
    label: 'Conversation 2',
    icon: 'i-mdi:message',
    disabled: true
  }
]
</script>

<template>
  <Conversations
    v-model:active-key="activeKey"
    :items="conversations"
    groupable
    @change="handleConversationChange"
  >
    <template #icon="{ conv }">
      <Component :is="conv.icon" />
    </template>
  </Conversations>
</template>
```

### OrgChart

An organization chart component for displaying hierarchical data.

**Features:**
- Tree structure visualization
- Custom node rendering
- Expand/collapse nodes
- Horizontal and vertical layouts

## Component Demo System

The project includes a demo system for showcasing components:

- **ComponentDemo**: Individual demo wrapper with code display
- **ComponentDemos**: Grid layout container for multiple demos (supports 1 or 2 columns)

## Project Structure

```
src/
├── assets/              # Static assets
├── components/          # Reusable components
│   ├── icons/          # Icon components
│   ├── layouts/        # Layout components
│   └── ui/             # UI components
│       ├── component-demo/
│       ├── conversations/
│       ├── fieldset/
│       ├── float-input/
│       ├── org-chart/
│       ├── ripple-button/
│       ├── segmented/
│       └── speed-dial/
├── composables/         # Composable functions
│   ├── directives/     # Custom directives
│   ├── useMenuOpts.ts  # Menu generation logic
│   └── useNaiveSize.ts # Size utilities for Naive UI
├── layouts/            # Layout components
├── pages/              # Page components
│   ├── components/     # Component demo pages
│   ├── system/         # System pages
│   └── index.vue       # Home page
├── plugins/            # Vue plugins
│   ├── index.ts        # Plugin registration
│   ├── locale.ts       # i18n plugin
│   └── naiveDiscrete.ts # Naive UI discrete APIs
├── router/             # Vue Router configuration
│   ├── guards/         # Route guards
│   │   ├── index.ts
│   │   ├── loadingGuard.ts
│   │   └── tabGuard.ts
│   ├── index.ts
│   └── routes.ts       # Route definitions
├── stores/             # Pinia stores
│   ├── global.ts
│   ├── index.ts
│   ├── locale.ts
│   ├── tab.ts
│   └── theme.ts
├── styles/             # Global styles
│   ├── index.css
│   └── variables.css
├── types/              # TypeScript types
├── utils/              # Utility functions
├── App.vue
├── main.ts
└── auto-imports.d.ts   # Auto-imported declarations
```

## Development

### Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Tools and Libraries

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next generation frontend tooling
- **TypeScript** - Typed JavaScript
- **Vue Router** - Official router for Vue.js
- **Pinia** - Vue store with persistent state
- **Vue I18n** - Internationalization plugin
- **Naive UI** - Vue 3 component library
- **UnoCSS** - Instant on-demand atomic CSS engine
- **VueUse** - Collection of essential Vue Composition API utilities
- **Motion-V** - Animation library for Vue
- **ECharts** - Visualization library for charts
- **Highlight.js** - Syntax highlighting library

### Code Quality

- **ESLint** - Code linting with [@antfu/eslint-config](https://github.com/antfu/eslint-config)
- **Auto Imports** - Unplugin-auto-import for automatic API imports
- **Component Auto Registration** - Unplugin-vue-components for automatic component imports

## Key Features

### Automatic Imports

The project uses `unplugin-auto-import` to automatically import:
- Vue APIs (ref, computed, watch, etc.)
- VueUse composables
- Pinia utilities
- Vue Router APIs
- Naive UI discrete APIs (useDialog, useMessage, useNotification, useLoadingBar)
- All files from `src/composables`, `src/plugins`, `src/router`, `src/stores`, `src/utils`

### Component Auto Registration

Components are automatically registered using `unplugin-vue-components` with:
- Naive UI resolver for on-demand component imports
- Support for `.vue` and `.tsx` files

### State Management

Pinia stores with persistence:
- **theme**: Theme settings (dark mode, primary color)
- **locale**: Current language preference
- **tab**: Tab management state
- **global**: Global application state

### Routing Features

- Manual route configuration with metadata
- Automatic menu generation from routes
- Route guards for loading and tab management
- Keep-alive routing for component caching
- Authentication hooks (requiresAuth)
- Menu grouping and dividers

### Styling

- **UnoCSS** with preset-wind3 and preset-icons
- **Icon Collections**: flag, line-md, mdi, icon-park-outline, lucide
- **Custom CSS Variables**: Theme colors, surface backgrounds, mask effects
- **Shortcuts**: flex-center, absolute-y-center, absolute-x-center, etc.
- **Dark Mode Support**: View transition API for smooth theme switching

## Browser Support

Modern browsers with support for:
- CSS Grid
- CSS Custom Properties
- View Transition API (optional, for theme switching)

## License

MIT
