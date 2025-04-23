import { defineComponent, PropType } from 'vue';
import { IconName } from '../Icon';
import { NavBar } from '../NavBar';

export const MainLayout = defineComponent({
  props: {
    title: {
      type: String,
      default: 'back',
    },
    icon: {
      type: String as PropType<IconName>,
      default: 'back',
    },
  },
  setup: (props, context) => {
    return () => (
      <div>
        <NavBar title={props.title} icon={props.icon} />
        {context.slots?.default?.()}
      </div>
    );
  },
});
