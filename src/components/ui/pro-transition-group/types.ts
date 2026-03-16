import type { TransitionGroupProps } from 'vue'
import type ProTransitionGroup from './ProTransitionGroup.vue'

export interface ProTransitionGroupProps extends /* @vue-ignore */ TransitionGroupProps {
  name?: string
  tag?: string
}

export type ProTransitionInst = InstanceType<typeof ProTransitionGroup>
