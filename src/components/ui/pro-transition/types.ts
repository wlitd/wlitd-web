import type { TransitionProps } from 'vue'
import type ProTransition from './ProTransition.vue'

export interface ProTransitionProps extends /* @vue-ignore */ TransitionProps {
  name?: string
  mode?: 'in-out' | 'out-in' | 'default'
}

export type ProTransitionInst = InstanceType<typeof ProTransition>
