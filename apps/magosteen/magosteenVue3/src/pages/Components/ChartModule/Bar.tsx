import { TagDTO } from '@/api/types/tags';
import { defineComponent, PropType } from 'vue';
import styles from './index.module.scss';

export const BarChart = defineComponent({
  props: {
    data: {
      type: Array as PropType<{
        tag: TagDTO,
        amount: number,
        percent: string
      }[]>,
      required: true
    }
  },
  setup: (props) => {
    return () => (
      <div class={styles.bar_wrapper}>
        {props.data.map(({ tag, amount, percent }) => {
          return (
            <div class={styles.topItem}>
              <div class={styles.sign}>{tag.sign}</div>
              <div class={styles.bar_wrapper}>
                <div class={styles.bar_text}>
                  <span>
                    {' '}
                    {tag.name} - {percent}{' '}
                  </span>
                  <span> ￥{amount} </span>
                </div>
                <div class={styles.bar}>
                  <div class={styles.bar_inner}></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  },
});
