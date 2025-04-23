import { defineComponent, PropType } from 'vue';
import styles from './index.module.scss';

export type IconName =
  | 'add'
  | 'logo'
  | 'chart'
  | 'clock'
  | 'cloud'
  | 'mangosteen'
  | 'pig'
  | 'menu'
  | 'back'
  | 'export'
  | 'charts'
  | 'notify'
  | 'back'
  | 'date'
  | 'none';

export const Icon = defineComponent({
  props: {
    name: {
      type: String as PropType<IconName>,
      required: true,
    },
    onClick: {
      type: Function as PropType<(e: MouseEvent) => void>,
    },
  },
  setup: (props, context) => {
    return () => (
      <svg class={styles.icon} onClick={props.onClick}>
        {
          props.name === 'none' ? null : <use xlinkHref={'#' + props.name}></use>
        }
      </svg>
    );
  },
});
