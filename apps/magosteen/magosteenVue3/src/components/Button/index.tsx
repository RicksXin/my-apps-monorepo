import { computed, defineComponent, PropType, ref } from 'vue';
import styles from './index.module.scss';

export const Button = defineComponent({
  props: {
    level: {
      type: String as PropType<'important' | 'normal' | 'danger'>,
      default: 'normal'
    },
    type: {
      type: String as PropType<'submit' | 'button'>,
      default: 'button'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    autoSelfDisabled: {
      type: Boolean,
      default: false
    },
    onClick: {
      type: Function as PropType<(e: MouseEvent) => void>,
    },
  },
  setup: (props, context) => {
    const selfDisabled = ref<boolean>(false)
    const _disabled = computed(() => {
      if (!props.autoSelfDisabled) return props.disabled
      return selfDisabled.value || props.disabled
    })
    const onClick = (e: MouseEvent) => {
      props.onClick?.(e)
      selfDisabled.value = true
      setTimeout(() => {
        selfDisabled.value = false
      }, 500)
    }
    return () => (
      <button class={[
        styles.btn,
        props.disabled || _disabled.value ? styles.disabled : '',
        styles[props.level || 'normal']
      ]}
        type={props.type}
        disabled={_disabled.value}
        onClick={onClick}
      >
        {context.slots.default?.()}
      </button>
    );
  },
});
