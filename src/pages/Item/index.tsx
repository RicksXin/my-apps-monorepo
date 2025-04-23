import TimeTabsLayout from '@/pages/Components/TimeTabsLayout';
import { ItemSummary } from './Summary';
import { FC } from 'react';

const ItemList: FC = () => {
  console.log('ItemList');

  return <TimeTabsLayout component={ItemSummary} />
};

export default ItemList;
