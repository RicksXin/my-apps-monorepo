import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FloatButton, Button } from '@/Components/index';
import { getBalance } from '@/api/item';
import { onError } from '@/utils/onError';
import DateTime from '@/pages/Components/Datetime';
import { Time } from '@/utils/time';
import useItemStore from '@/stores/useItemStore';
import styles from './index.module.scss';

interface ItemSummaryProps {
  startDate: string;
  endDate: string;
  custom?: boolean;
}

export const ItemSummary: FC<ItemSummaryProps> = (props) => {
  // const itemStore = useItemStore(`items-${props.startDate}-${props.endDate}`);
  const { itemList, hasMore, fetchItems, fetchNextPage, reset } = useItemStore();
  const [itemBalance, setItemBalance] = useState({
    expenses: 0,
    income: 0,
    balance: 0,
  });

  const fetchBalance = async () => {
    const res = await getBalance({
      happen_after: props.startDate,
      happen_before: props.endDate,
    }).catch(onError);
    setItemBalance(() => res.data);
  };
  useEffect(() => {
    fetchItems(props.startDate, props.endDate);
    fetchBalance();
  }, []);
  useEffect(() => {
    // setItemBalance(() => ({
    //   expenses: 0,
    //   income: 0,
    //   balance: 0,
    // }));
    // reset();
    // fetchItems(props.startDate, props.endDate);
    // fetchBalance();
  }, [props.startDate, props.endDate]);

  return (
    <>
      <div className={styles.wrapper}>
        <ul className={styles.total}>
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
        {itemList.length ? (
          <>
            <ol className={styles.list}>
              {itemList.map((item) => (
                <li>
                  <div className={styles.sign}>
                    <span>{item.tags?.sign}</span>
                  </div>
                  <div className={styles.text}>
                    <div className={styles.tagAndAmount}>
                      <span className={styles.tag}>{item.tags.name}</span>
                      <span className={styles.amount}>
                        ￥<>{item.amount}</>
                      </span>
                    </div>
                    <div className={styles.time}>
                      <DateTime value={item.happen_at} />
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <div className={styles.more}>
              {hasMore ? (
                <Button onClick={() => fetchNextPage(props.startDate, props.endDate)}>
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
        <Link to="/items/create">
          <FloatButton name="add" />
        </Link>
      </div>
    </>
  );
};

ItemSummary.defaultProps = {
  startDate: new Time().firstDayOfMonth().format(),
  endDate: new Time().lastDayOfMonth().format(),
  custom: false,
};

export default ItemSummary;
