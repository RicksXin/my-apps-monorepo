import { defineComponent, PropType } from 'vue';
import { Icon, IconName } from '../Icon';
import styles from './index.module.scss';

export const FloatButton = defineComponent({
  props: {
    name: {
      type: String as PropType<IconName>,
      required: true,
    },
  },
  setup: (props, context) => {
    return () => (
      <div class={styles.float_button}>
        <Icon name={props.name} class={styles.icon} />
      </div>
    );
  },
});
