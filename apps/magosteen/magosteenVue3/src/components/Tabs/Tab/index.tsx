import { defineComponent } from 'vue';

export const Tab = defineComponent({
  props: {
    id: String,
    name: {
      type: String,
    },
    onClick: {
      type: Function,
    },
  },
  setup: (props, context) => {
    return () => <div onClick={props?.onClick?.()}>{context.slots.default?.()}</div>;
  },
});
