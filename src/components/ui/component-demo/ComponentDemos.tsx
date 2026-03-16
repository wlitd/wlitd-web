import type { ComponentOptionsMixin } from 'vue'

export const componentDemos = {
  span: { type: Number, default: 2 }
} as const

export type ComponentDemosProps = ExtractPublicPropTypes<typeof componentDemos> & ComponentOptionsMixin

export default defineComponent({
  name: 'ComponentDemos',
  props: componentDemos,
  setup(props: ComponentDemosProps, { slots }) {
    return () => {
      // 排除掉非 Component 节点
      const children = (slots.default?.() ?? []).filter((child) => {
        return !(typeof child.type === 'symbol' || typeof child.type === 'string')
      })

      const cols = props.span

      return (
        <div class="grid items-start gap-4" style={{ gridTemplateColumns: cols === 1 ? '100%' : 'minmax(0, 1fr) minmax(0, 1fr)' }}>
          { cols === 1
            ? (children)
            : (
                <>
                  <div class="grid gap-4" style={{ gridTemplateColumns: '100%' }}>
                    { children.filter((_, index) => index % 2 === 0)}
                  </div>
                  <div class="grid gap-4" style={{ gridTemplateColumns: '100%' }}>
                    { children.filter((_, index) => index % 2 === 1)}
                  </div>
                </>
              )}
        </div>
      )
    }
  }
})
