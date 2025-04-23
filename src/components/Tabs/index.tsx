import { defineComponent } from 'vue';
import { Tab } from './Tab';
import styles from './index.module.scss';

export const Tabs = defineComponent({
  props: {
    selected: {
      type: String,
      required: false,
    },
    classPrefix: {
      type: String,
    },
  },
  emits: ['update:selected'],
  setup: (props, context) => {
    const cp = props.classPrefix;
    return () => {
      const childrenArray = context.slots.default?.();
      if (!childrenArray) return () => null;
      childrenArray.forEach((v) => {
        if (typeof v.type === 'symbol') return
        if (v.type !== Tab) {
          throw new Error('<Tabs> only accepts <Tab> as children');
        }
      });

      return (
        <div class={[styles.tabs, cp + '_tabs']}>
          <ol class={[styles.tabs_nav]}>
            {childrenArray.filter(v => v.type === Tab).map((item) => (
              <li
                class={[
                  item.props?.id === props.selected ? [styles.selected, cp + '_selected'] : '',
                  cp + '_tabs_nav_item',
                ]}
                onClick={() => {
                  context.emit('update:selected', item.props?.id);
                }}
              >
                {item.props?.name || item.props?.id}
              </li>
            ))}
          </ol>
          <div class={styles.tab_content}>
            {childrenArray.find((content) => content.props?.id === props.selected)}
          </div>
        </div>
      );
    };
  },
});
