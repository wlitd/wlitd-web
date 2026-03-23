<script setup lang="ts">
import type { FormInst, FormRules } from 'naive-ui'
import { useI18n } from 'vue-i18n'

/**
 * Login page component with animated cartoon characters
 * Ported from React version with Vue composition API
 */

// #region Types & Interfaces
interface LoginFormData {
  email: string
  password: string
  remember: boolean
}

interface Position {
  faceX: number
  faceY: number
  bodySkew: number
}

interface PupilPosition {
  x: number
  y: number
}

interface EyeBallConfig {
  size: number
  pupilSize: number
  maxDistance: number
  eyeColor: string
  pupilColor: string
}

interface PupilConfig {
  size: number
  maxDistance: number
  pupilColor: string
}
// #endregion

// #region Composables
const { t } = useI18n()
const router = useRouter()
// #endregion

// #region Reactive State
const loading = ref<boolean>(false)
const formRef = ref<FormInst | null>(null)
const appTitle = getEnv('VITE_APP_TITLE')

const formData: LoginFormData = reactive({
  email: 'wlitd.web@example.com',
  password: '123456',
  remember: false
})

// Mouse tracking
const mouseX = ref<number>(0)
const mouseY = ref<number>(0)

// Animation states
const isPurpleBlinking = ref<boolean>(false)
const isBlackBlinking = ref<boolean>(false)
const isTyping = ref<boolean>(false)
const isLookingAtEachOther = ref<boolean>(false)
const isPurplePeeking = ref<boolean>(false)
const showPassword = ref<boolean>(false)

// Character refs
const purpleRef = ref<HTMLDivElement | null>(null)
const blackRef = ref<HTMLDivElement | null>(null)
const yellowRef = ref<HTMLDivElement | null>(null)
const orangeRef = ref<HTMLDivElement | null>(null)

// Eye refs - Purple
const purpleEyeLeftRef = ref<HTMLDivElement | null>(null)
const purpleEyeRightRef = ref<HTMLDivElement | null>(null)
// Eye refs - Black
const blackEyeLeftRef = ref<HTMLDivElement | null>(null)
const blackEyeRightRef = ref<HTMLDivElement | null>(null)
// Eye refs - Orange
const orangePupilLeftRef = ref<HTMLDivElement | null>(null)
const orangePupilRightRef = ref<HTMLDivElement | null>(null)
// Eye refs - Yellow
const yellowPupilLeftRef = ref<HTMLDivElement | null>(null)
const yellowPupilRightRef = ref<HTMLDivElement | null>(null)
// #endregion

// #region Constants
const EYE_CONFIG = {
  purple: { size: 18, pupilSize: 7, maxDistance: 5, eyeColor: 'white', pupilColor: '#2D2D2D' } satisfies EyeBallConfig,
  black: { size: 16, pupilSize: 6, maxDistance: 4, eyeColor: 'white', pupilColor: '#2D2D2D' } satisfies EyeBallConfig,
  orange: { size: 12, maxDistance: 5, pupilColor: '#2D2D2D' } satisfies PupilConfig,
  yellow: { size: 12, maxDistance: 5, pupilColor: '#2D2D2D' } satisfies PupilConfig
} as const

const BLINK_INTERVAL = { min: 3000, max: 7000 }
const BLINK_DURATION = 150
const PEEK_INTERVAL = { min: 2000, max: 5000 }
const PEEK_DURATION = 800
const LOOK_DURATION = 800
// #endregion

// #region Mouse Tracking
useEventListener(window, 'mousemove', (e: MouseEvent) => {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
})
// #endregion

// #region Blinking Effects
function useBlinkingEffect(isBlinking: Ref<boolean>) {
  let timeout: ReturnType<typeof setTimeout> | null = null

  const scheduleBlink = () => {
    const interval = Math.random() * (BLINK_INTERVAL.max - BLINK_INTERVAL.min) + BLINK_INTERVAL.min
    timeout = setTimeout(() => {
      isBlinking.value = true
      setTimeout(() => {
        isBlinking.value = false
        scheduleBlink()
      }, BLINK_DURATION)
    }, interval)
  }

  onMounted(scheduleBlink)
  onUnmounted(() => {
    if (timeout) {
      clearTimeout(timeout)
    }
  })
}

useBlinkingEffect(isPurpleBlinking)
useBlinkingEffect(isBlackBlinking)
// #endregion

// #region Looking at Each Other Animation
watch(isTyping, (typing) => {
  if (typing) {
    isLookingAtEachOther.value = true
    setTimeout(() => {
      isLookingAtEachOther.value = false
    }, LOOK_DURATION)
  } else {
    isLookingAtEachOther.value = false
  }
})
// #endregion

// #region Purple Peeking Animation
function usePeekingEffect() {
  let peekTimeout: ReturnType<typeof setTimeout> | null = null
  let isScheduled = false

  const schedulePeek = () => {
    if (isScheduled) {
      return
    }
    isScheduled = true

    const interval = Math.random() * (PEEK_INTERVAL.max - PEEK_INTERVAL.min) + PEEK_INTERVAL.min
    peekTimeout = setTimeout(() => {
      isPurplePeeking.value = true
      setTimeout(() => {
        isPurplePeeking.value = false
        isScheduled = false
        // Continue peeking if conditions still met
        if (formData.password.length > 0 && showPassword.value) {
          schedulePeek()
        }
      }, PEEK_DURATION)
    }, interval)
  }

  const stopPeeking = () => {
    isScheduled = false
    isPurplePeeking.value = false
    if (peekTimeout) {
      clearTimeout(peekTimeout)
      peekTimeout = null
    }
  }

  watch([() => formData.password, showPassword], ([password, show]) => {
    if (password.length > 0 && show) {
      schedulePeek()
    } else {
      stopPeeking()
    }
  })

  onUnmounted(stopPeeking)
}

usePeekingEffect()
// #endregion

// #region Position Calculations
function calculatePosition(ref: Ref<HTMLDivElement | null>): Position {
  if (!ref.value) {
    return { faceX: 0, faceY: 0, bodySkew: 0 }
  }

  const rect = ref.value.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 3

  const deltaX = mouseX.value - centerX
  const deltaY = mouseY.value - centerY

  const faceX = Math.max(-15, Math.min(15, deltaX / 20))
  const faceY = Math.max(-10, Math.min(10, deltaY / 30))
  const bodySkew = Math.max(-6, Math.min(6, -deltaX / 120))

  return { faceX, faceY, bodySkew }
}

const purplePos = computed(() => calculatePosition(purpleRef))
const blackPos = computed(() => calculatePosition(blackRef))
const yellowPos = computed(() => calculatePosition(yellowRef))
const orangePos = computed(() => calculatePosition(orangeRef))
// #endregion

// #region Eye Tracking Composable
function useEyeTracking(
  eyeRef: Ref<HTMLDivElement | null>,
  maxDistance: number,
  forceLookX?: Ref<number | undefined>,
  forceLookY?: Ref<number | undefined>
): Ref<PupilPosition> {
  const position = ref<PupilPosition>({ x: 0, y: 0 })

  const updatePosition = () => {
    if (!eyeRef.value) {
      position.value = { x: 0, y: 0 }
      return
    }

    if (forceLookX?.value !== undefined && forceLookY?.value !== undefined) {
      position.value = { x: forceLookX.value, y: forceLookY.value }
      return
    }

    const rect = eyeRef.value.getBoundingClientRect()
    const eyeCenterX = rect.left + rect.width / 2
    const eyeCenterY = rect.top + rect.height / 2

    const deltaX = mouseX.value - eyeCenterX
    const deltaY = mouseY.value - eyeCenterY
    const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance)

    const angle = Math.atan2(deltaY, deltaX)
    position.value = {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance
    }
  }

  watch([mouseX, mouseY, () => forceLookX?.value, () => forceLookY?.value], updatePosition, { immediate: true })

  return position
}
// #endregion

// #region Pupil Positions
const purpleEyeLeftPos = useEyeTracking(purpleEyeLeftRef, EYE_CONFIG.purple.maxDistance)
const purpleEyeRightPos = useEyeTracking(purpleEyeRightRef, EYE_CONFIG.purple.maxDistance)
const blackEyeLeftPos = useEyeTracking(blackEyeLeftRef, EYE_CONFIG.black.maxDistance)
const blackEyeRightPos = useEyeTracking(blackEyeRightRef, EYE_CONFIG.black.maxDistance)
const orangePupilLeftPos = useEyeTracking(orangePupilLeftRef, EYE_CONFIG.orange.maxDistance)
const orangePupilRightPos = useEyeTracking(orangePupilRightRef, EYE_CONFIG.orange.maxDistance)
const yellowPupilLeftPos = useEyeTracking(yellowPupilLeftRef, EYE_CONFIG.yellow.maxDistance)
const yellowPupilRightPos = useEyeTracking(yellowPupilRightRef, EYE_CONFIG.yellow.maxDistance)
// #endregion

// #region Computed States
const isPasswordVisible = computed(() => formData.password.length > 0 && showPassword.value)
const isPasswordHidden = computed(() => formData.password.length > 0 && !showPassword.value)
const isTypingOrHidden = computed(() => isTyping.value || isPasswordHidden.value)
// #endregion

// #region Form Validation
/** Form validation rules */
const rules: FormRules = {
  email: [
    { required: true, message: () => t('login.emailRequired'), trigger: 'blur' },
    { type: 'email', message: () => t('login.emailInvalid'), trigger: 'blur' }
  ],
  password: [
    { required: true, message: () => t('login.passwordRequired'), trigger: 'blur' }
  ]
}
// #endregion

// #region Event Handlers
/**
 * Handle login form submission
 * Validates form, simulates API call, and redirects on success
 */
async function handleLogin(): Promise<void> {
  try {
    // Validate form before submission
    await formRef.value?.validate()
    loading.value = true

    // Simulate login API call
    await new Promise(resolve => setTimeout(resolve, 300))

    // Mock authentication - validate against dummy credentials
    router.push('/')
  } catch (e) {
    // Log validation or API errors
    if (e instanceof Error) {
      console.error('Login error:', e)
    }
  } finally {
    // Reset loading state regardless of outcome
    loading.value = false
  }
}

function handleEmailFocus(): void {
  isTyping.value = true
}

function handleEmailBlur(): void {
  isTyping.value = false
}
// #endregion
</script>

<template>
  <div class="min-h-screen grid lg:grid-cols-2">
    <!-- Left Content Section -->
    <div
      class="relative hidden lg:flex flex-col justify-between p-12 color-[oklch(92.2%_0_0)] dark:color-[oklch(20.5%_0_0)] bg-[oklch(20.5%_0_0)] dark:bg-[oklch(92.2%_0_0)]"
    >
      <div class="relative z-20">
        <div class="flex items-center gap-2 text-lg font-semibold">
          <div
            class="size-8 rounded-lg backdrop-blur-sm flex items-center justify-center bg-[color-mix(in_oklab,oklch(92.2%_0_0)_10%,transparent)] dark:bg-[color-mix(in_oklab,oklch(20.5%_0_0)_10%,transparent)]"
          >
            <div class="i-lucide:sparkles size-4" />
          </div>
          <span>{{ appTitle }}</span>
        </div>
      </div>

      <div class="relative z-20 flex items-end justify-center h-[500px]">
        <!-- Cartoon Characters -->
        <div class="relative" style="width: 550px; height: 400px;">
          <!-- Purple tall rectangle character - Back layer -->
          <div
            ref="purpleRef" class="absolute bottom-0 transition-all duration-700 ease-in-out" :style="{
              left: '70px',
              width: '180px',
              height: isTypingOrHidden ? '440px' : '400px',
              backgroundColor: '#6C3FF5',
              borderRadius: '10px 10px 0 0',
              zIndex: 1,
              transform: isPasswordVisible
                ? 'skewX(0deg)'
                : isTypingOrHidden
                  ? `skewX(${(purplePos.bodySkew || 0) - 12}deg) translateX(40px)`
                  : `skewX(${purplePos.bodySkew || 0}deg)`,
              transformOrigin: 'bottom center',
            }"
          >
            <!-- Eyes - Fixed position container with slow transition, pupils track mouse -->
            <div
              class="absolute flex gap-8 transition-all duration-700 ease-in-out" :style="{
                left: isPasswordVisible ? '20px' : isLookingAtEachOther ? '55px' : `${45 + purplePos.faceX}px`,
                top: isPasswordVisible ? '35px' : isLookingAtEachOther ? '65px' : `${40 + purplePos.faceY}px`,
              }"
            >
              <!-- EyeBall Component - Left -->
              <div
                ref="purpleEyeLeftRef"
                class="rounded-full flex items-center justify-center transition-all duration-150" :style="{
                  width: `${EYE_CONFIG.purple.size}px`,
                  height: isPurpleBlinking ? '2px' : `${EYE_CONFIG.purple.size}px`,
                  backgroundColor: EYE_CONFIG.purple.eyeColor,
                  overflow: 'hidden',
                }"
              >
                <div
                  v-if="!isPurpleBlinking" class="rounded-full" :style="{
                    width: `${EYE_CONFIG.purple.pupilSize}px`,
                    height: `${EYE_CONFIG.purple.pupilSize}px`,
                    backgroundColor: EYE_CONFIG.purple.pupilColor,
                    transform: `translate(${isPasswordVisible
                      ? (isPurplePeeking ? 4 : -4)
                      : isLookingAtEachOther ? 3 : purpleEyeLeftPos.x
                    }px, ${isPasswordVisible
                      ? (isPurplePeeking ? 5 : -4)
                      : isLookingAtEachOther ? 4 : purpleEyeLeftPos.y
                    }px)`,
                    transition: isPasswordVisible || isLookingAtEachOther ? 'transform 0.1s ease-out' : 'none',
                  }"
                />
              </div>
              <!-- EyeBall Component - Right -->
              <div
                ref="purpleEyeRightRef"
                class="rounded-full flex items-center justify-center transition-all duration-150" :style="{
                  width: `${EYE_CONFIG.purple.size}px`,
                  height: isPurpleBlinking ? '2px' : `${EYE_CONFIG.purple.size}px`,
                  backgroundColor: EYE_CONFIG.purple.eyeColor,
                  overflow: 'hidden',
                }"
              >
                <div
                  v-if="!isPurpleBlinking" class="rounded-full" :style="{
                    width: `${EYE_CONFIG.purple.pupilSize}px`,
                    height: `${EYE_CONFIG.purple.pupilSize}px`,
                    backgroundColor: EYE_CONFIG.purple.pupilColor,
                    transform: `translate(${isPasswordVisible
                      ? (isPurplePeeking ? 4 : -4)
                      : isLookingAtEachOther ? 3 : purpleEyeRightPos.x
                    }px, ${isPasswordVisible
                      ? (isPurplePeeking ? 5 : -4)
                      : isLookingAtEachOther ? 4 : purpleEyeRightPos.y
                    }px)`,
                    transition: isPasswordVisible || isLookingAtEachOther ? 'transform 0.1s ease-out' : 'none',
                  }"
                />
              </div>
            </div>
          </div>

          <!-- Black tall rectangle character - Middle layer -->
          <div
            ref="blackRef" class="absolute bottom-0 transition-all duration-700 ease-in-out" :style="{
              left: '240px',
              width: '120px',
              height: '310px',
              backgroundColor: '#2D2D2D',
              borderRadius: '8px 8px 0 0',
              zIndex: 2,
              transform: isPasswordVisible
                ? 'skewX(0deg)'
                : isLookingAtEachOther
                  ? `skewX(${(blackPos.bodySkew || 0) * 1.5 + 10}deg) translateX(20px)`
                  : isTypingOrHidden
                    ? `skewX(${(blackPos.bodySkew || 0) * 1.5}deg)`
                    : `skewX(${blackPos.bodySkew || 0}deg)`,
              transformOrigin: 'bottom center',
            }"
          >
            <!-- Eyes - Fixed position container with slow transition, pupils track mouse -->
            <div
              class="absolute flex gap-6 transition-all duration-700 ease-in-out" :style="{
                left: isPasswordVisible ? '10px' : isLookingAtEachOther ? '32px' : `${26 + blackPos.faceX}px`,
                top: isPasswordVisible ? '28px' : isLookingAtEachOther ? '12px' : `${32 + blackPos.faceY}px`,
              }"
            >
              <!-- EyeBall Component - Left -->
              <div
                ref="blackEyeLeftRef"
                class="rounded-full flex items-center justify-center transition-all duration-150" :style="{
                  width: `${EYE_CONFIG.black.size}px`,
                  height: isBlackBlinking ? '2px' : `${EYE_CONFIG.black.size}px`,
                  backgroundColor: EYE_CONFIG.black.eyeColor,
                  overflow: 'hidden',
                }"
              >
                <div
                  v-if="!isBlackBlinking" class="rounded-full" :style="{
                    width: `${EYE_CONFIG.black.pupilSize}px`,
                    height: `${EYE_CONFIG.black.pupilSize}px`,
                    backgroundColor: EYE_CONFIG.black.pupilColor,
                    transform: `translate(${isPasswordVisible ? -4 : isLookingAtEachOther ? 0 : blackEyeLeftPos.x
                    }px, ${isPasswordVisible ? -4 : isLookingAtEachOther ? -4 : blackEyeLeftPos.y
                    }px)`,
                    transition: isPasswordVisible || isLookingAtEachOther ? 'transform 0.1s ease-out' : 'none',
                  }"
                />
              </div>
              <!-- EyeBall Component - Right -->
              <div
                ref="blackEyeRightRef"
                class="rounded-full flex items-center justify-center transition-all duration-150" :style="{
                  width: `${EYE_CONFIG.black.size}px`,
                  height: isBlackBlinking ? '2px' : `${EYE_CONFIG.black.size}px`,
                  backgroundColor: EYE_CONFIG.black.eyeColor,
                  overflow: 'hidden',
                }"
              >
                <div
                  v-if="!isBlackBlinking" class="rounded-full" :style="{
                    width: `${EYE_CONFIG.black.pupilSize}px`,
                    height: `${EYE_CONFIG.black.pupilSize}px`,
                    backgroundColor: EYE_CONFIG.black.pupilColor,
                    transform: `translate(${isPasswordVisible ? -4 : isLookingAtEachOther ? 0 : blackEyeRightPos.x
                    }px, ${isPasswordVisible ? -4 : isLookingAtEachOther ? -4 : blackEyeRightPos.y
                    }px)`,
                    transition: isPasswordVisible || isLookingAtEachOther ? 'transform 0.1s ease-out' : 'none',
                  }"
                />
              </div>
            </div>
          </div>

          <!-- Orange semi-circle character - Front left -->
          <div
            ref="orangeRef" class="absolute bottom-0 transition-all duration-700 ease-in-out" :style="{
              left: '0px',
              width: '240px',
              height: '200px',
              zIndex: 3,
              backgroundColor: '#FF9B6B',
              borderRadius: '120px 120px 0 0',
              transform: isPasswordVisible ? 'skewX(0deg)' : `skewX(${orangePos.bodySkew || 0}deg)`,
              transformOrigin: 'bottom center',
            }"
          >
            <!-- Eyes - just pupils, no white, container with slow transition, pupils track mouse -->
            <div
              class="absolute flex gap-8 transition-all duration-700 ease-in-out" :style="{
                left: isPasswordVisible ? '50px' : `${82 + (orangePos.faceX || 0)}px`,
                top: isPasswordVisible ? '85px' : `${90 + (orangePos.faceY || 0)}px`,
              }"
            >
              <div
                ref="orangePupilLeftRef" class="rounded-full" :style="{
                  width: `${EYE_CONFIG.orange.size}px`,
                  height: `${EYE_CONFIG.orange.size}px`,
                  backgroundColor: EYE_CONFIG.orange.pupilColor,
                  transform: `translate(${isPasswordVisible ? -5 : orangePupilLeftPos.x}px, ${isPasswordVisible ? -4 : orangePupilLeftPos.y}px)`,
                  transition: isPasswordVisible ? 'transform 0.1s ease-out' : 'none',
                }"
              />
              <div
                ref="orangePupilRightRef" class="rounded-full" :style="{
                  width: `${EYE_CONFIG.orange.size}px`,
                  height: `${EYE_CONFIG.orange.size}px`,
                  backgroundColor: EYE_CONFIG.orange.pupilColor,
                  transform: `translate(${isPasswordVisible ? -5 : orangePupilRightPos.x}px, ${isPasswordVisible ? -4 : orangePupilRightPos.y}px)`,
                  transition: isPasswordVisible ? 'transform 0.1s ease-out' : 'none',
                }"
              />
            </div>
          </div>

          <!-- Yellow tall rectangle character - Front right -->
          <div
            ref="yellowRef" class="absolute bottom-0 transition-all duration-700 ease-in-out" :style="{
              left: '310px',
              width: '140px',
              height: '230px',
              backgroundColor: '#E8D754',
              borderRadius: '70px 70px 0 0',
              zIndex: 4,
              transform: isPasswordVisible ? 'skewX(0deg)' : `skewX(${yellowPos.bodySkew || 0}deg)`,
              transformOrigin: 'bottom center',
            }"
          >
            <!-- Eyes - just pupils, no white -->
            <div
              class="absolute flex gap-6 transition-all duration-200 ease-out" :style="{
                left: isPasswordVisible ? '20px' : `${52 + (yellowPos.faceX || 0)}px`,
                top: isPasswordVisible ? '35px' : `${40 + (yellowPos.faceY || 0)}px`,
              }"
            >
              <div
                ref="yellowPupilLeftRef" class="rounded-full" :style="{
                  width: `${EYE_CONFIG.yellow.size}px`,
                  height: `${EYE_CONFIG.yellow.size}px`,
                  backgroundColor: EYE_CONFIG.yellow.pupilColor,
                  transform: `translate(${isPasswordVisible ? -5 : yellowPupilLeftPos.x}px, ${isPasswordVisible ? -4 : yellowPupilLeftPos.y}px)`,
                  transition: isPasswordVisible ? 'transform 0.1s ease-out' : 'none',
                }"
              />
              <div
                ref="yellowPupilRightRef" class="rounded-full" :style="{
                  width: `${EYE_CONFIG.yellow.size}px`,
                  height: `${EYE_CONFIG.yellow.size}px`,
                  backgroundColor: EYE_CONFIG.yellow.pupilColor,
                  transform: `translate(${isPasswordVisible ? -5 : yellowPupilRightPos.x}px, ${isPasswordVisible ? -4 : yellowPupilRightPos.y}px)`,
                  transition: isPasswordVisible ? 'transform 0.1s ease-out' : 'none',
                }"
              />
            </div>
            <!-- Horizontal line for mouth -->
            <div
              class="absolute w-20 h-[4px] bg-[#2D2D2D] rounded-full transition-all duration-200 ease-out" :style="{
                left: isPasswordVisible ? '10px' : `${40 + (yellowPos.faceX || 0)}px`,
                top: isPasswordVisible ? '88px' : `${88 + (yellowPos.faceY || 0)}px`,
              }"
            />
          </div>
        </div>
      </div>

      <!-- Decorative elements -->
      <div
        class="absolute inset-0 opacity-5"
        :style="{ backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', backgroundSize: '20px 20px' }"
      />
      <div class="absolute top-1/4 right-1/4 size-64 bg-current opacity-10 rounded-full blur-3xl" />
      <div class="absolute bottom-1/4 left-1/4 size-96 bg-current opacity-5 rounded-full blur-3xl" />
    </div>

    <!-- Right Login Section -->
    <div class="flex items-center justify-center p-8 bg-white dark:bg-[#0a0a0a] relative">
      <!-- Header Controls -->
      <div class="absolute top-4 right-4 flex items-center gap-2">
        <LocalePicker />
        <ThemeIcon />
      </div>

      <div class="w-full max-w-[420px] color-[oklch(20.5%_0_0)] dark:color-[oklch(92.2%_0_0)]">
        <!-- Mobile Logo -->
        <div class="lg:hidden flex items-center justify-center gap-2 text-lg font-semibold mb-12">
          <div
            class="size-8 rounded-lg flex items-center justify-center bg-[color-mix(in_oklab,oklch(92.2%_0_0)_10%,transparent)] dark:bg-[color-mix(in_oklab,oklch(20.5%_0_0)_10%,transparent)]"
          >
            <div class="i-lucide:sparkles size-4" />
          </div>
          <span>{{ appTitle }}</span>
        </div>

        <!-- Header -->
        <div class="text-center mb-10">
          <h1 class="text-3xl font-bold tracking-tight mb-2">
            {{ t('login.welcomeBack') }}
          </h1>
          <p class="text-gray-500 dark:text-gray-400 text-sm">{{ t('login.subtitle') }}</p>
        </div>

        <!-- Login Form -->
        <NForm ref="formRef" :model="formData" :rules="rules">
          <NFormItem path="email">
            <FloatInput
              v-model:value="formData.email" :placeholder="t('login.emailPlaceholder')"
              @focus="handleEmailFocus" @blur="handleEmailBlur"
            >
              <template #prefix>
                <div class="i-lucide:mail" />
              </template>
            </FloatInput>
          </NFormItem>

          <NFormItem path="password">
            <FloatInput
              v-model:value="formData.password" :placeholder="t('login.passwordPlaceholder')" type="password"
              show-password-on="click" @keydown.enter="handleLogin"
            >
              <template #prefix>
                <div class="i-lucide:lock" />
              </template>
              <template #passwordVisibleIcon>
                <div class="i-lucide:eye" @click="showPassword = false" />
              </template>
              <template #passwordInvisibleIcon>
                <div class="i-lucide:eye-off" @click="showPassword = true" />
              </template>
            </FloatInput>
          </NFormItem>

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <NCheckbox v-model:checked="formData.remember">
                {{ t('login.rememberMe') }}
              </NCheckbox>
            </div>
            <RippleButton text type="primary" size="small">
              {{ t('login.forgotPassword') }}
            </RippleButton>
          </div>

          <RippleButton class="mt-3" type="primary" block :loading="loading" @click="handleLogin">
            {{ loading ? t('login.signingIn') : t('login.loginButton') }}
          </RippleButton>
        </NForm>

        <!-- Social Login -->
        <div class="mt-3">
          <RippleButton block>
            <div class="i-mdi:google mr-2 size-5" />
            {{ t('login.loginWithGoogle') }}
          </RippleButton>
        </div>

        <!-- Sign Up Link -->
        <div class="text-center text-sm mt-6">
          {{ t('login.noAccount') }}
          <RippleButton text type="primary" size="small" class="ml-1">
            {{ t('login.register') }}
          </RippleButton>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "zh": {
    "login": {
      "welcomeBack": "欢迎回来！",
      "subtitle": "请输入您的详细信息",
      "emailPlaceholder": "邮箱",
      "passwordPlaceholder": "密码",
      "emailRequired": "请输入邮箱",
      "emailInvalid": "请输入有效的邮箱地址",
      "passwordRequired": "请输入密码",
      "rememberMe": "记住我",
      "forgotPassword": "忘记密码？",
      "loginButton": "登录",
      "signingIn": "登录中...",
      "loginSuccess": "登录成功",
      "loginWithGoogle": "使用 Google 登录",
      "noAccount": "还没有账号？",
      "register": "立即注册"
    }
  },
  "en": {
    "login": {
      "welcomeBack": "Welcome back!",
      "subtitle": "Please enter your details",
      "emailPlaceholder": "Email",
      "passwordPlaceholder": "Password",
      "emailRequired": "Please enter email",
      "emailInvalid": "Please enter a valid email address",
      "passwordRequired": "Please enter password",
      "rememberMe": "Remember me",
      "forgotPassword": "Forgot password?",
      "loginButton": "Log in",
      "signingIn": "Signing in...",
      "loginSuccess": "Login successful",
      "loginWithGoogle": "Log in with Google",
      "noAccount": "Don't have an account?",
      "register": "Sign Up"
    }
  }
}
</i18n>
