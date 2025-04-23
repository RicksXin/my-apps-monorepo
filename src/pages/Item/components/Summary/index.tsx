import { defineComponent, onMounted, PropType, reactive, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { FloatButton } from '@/components/FloatButton';
import { getBalance } from '@/api/item';
import { onError } from '@/utils/onError';
import { Button } from '@/components/Button';
import { DateTime } from '@/pages/Components/Datetime';
import { Time } from '@/utils/time';
import { useItemStore } from '@/stores/useItemStore';
import styles from './index.module.scss';


export const ItemSummary = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      default: new Time().firstDayOfMonth().format(),
      required: true,
    },
    endDate: {
      type: String as PropType<string>,
      default: new Time().lastDayOfMonth().format(),
      required: true,
    },
    custom: {
      type: Boolean,
      default: false
    }
  },
  setup: (props) => {
    const itemStore = useItemStore(`items-${props.startDate}-${props.endDate}`)
    const itemBalance = reactive({
      expenses: 0,
      income: 0,
      balance: 0,
    });
    const fetchBalance = async () => {
      const res = await getBalance({
        happen_after: props.startDate,
        happen_before: props.endDate,
      }).catch(onError);
      Object.assign(itemBalance, res.data);
    };

    onMounted(() => itemStore.fetchItems(props.startDate, props.endDate));
    onMounted(fetchBalance);
    watch(
      () => [props.startDate, props.endDate],
      () => {
        Object.assign(itemBalance, {
          expenses: 0,
          income: 0,
          balance: 0,
        });
        itemStore.$reset()
        itemStore.fetchItems(props.startDate, props.endDate);
        fetchBalance();
      }
    );

    return () => (
      <div class={styles.wrapper}>
        <ul class={styles.total}>
          <li>
            <span>收入</span>
            <span>{itemBalance.income}</span>
          </li>
          <li>
            <span>支出</span>
            <span>{itemBalance.expenses}</span>
          </li>
          <li>
            <span>净收入</span>
            <span>{itemBalance.balance}</span>
          </li>
        </ul>
        {itemStore.itemList.length ? (
          <>
            <ol class={styles.list}>
              {itemStore.itemList.map((item) => (
                <li>
                  <div class={styles.sign}>
                    <span>{item.tags?.sign}</span>
                  </div>
                  <div class={styles.text}>
                    <div class={styles.tagAndAmount}>
                      <span class={styles.tag}>{item.tags.name}</span>
                      <span class={styles.amount}>
                        ￥<>{item.amount}</>
                      </span>
                    </div>
                    <div class={styles.time}>
                      <DateTime value={item.happen_at} />
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <div class={styles.more}>
              {itemStore.hasMore ? (
                <Button onClick={() =>
                  itemStore.fetchNextPage(props.startDate, props.endDate)}
                >
                  向下滑动加载更多
                </Button>
              ) : (
                <span>没有更多了</span>
              )}
            </div>
          </>
        ) : (
          <div>记录为空</div>
        )}
        <RouterLink to="/items/create">
          <FloatButton name="add" />
        </RouterLink>
      </div>
    );
  },
});
