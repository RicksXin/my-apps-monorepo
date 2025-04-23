import create from 'zustand';
import { getItems } from '@/api/item';
import { ItemDTO } from '@/api/types/items';
import { onError } from '@/utils/onError';
import { Time } from '@/utils/time';

interface Item {
  itemList: ItemDTO[];
  hasMore: boolean;
  page: number;
  fetchItems: (startDate?: string, endDate?: string) => void;
  fetchNextPage: (startDate?: string, endDate?: string) => void;
  reset: () => void;
}

const useItemStore = create<Item>((set, get) => ({
  itemList: [],
  hasMore: false,
  page: 0,
  async fetchItems(
    startDate = new Time().firstDayOfMonth().format(),
    endDate = new Time().lastDayOfMonth().format()
  ) {
    if (!startDate || !endDate) return;
    const {
      data: { itemsList: items, pager },
    } = await getItems({
      happen_after: startDate,
      happen_before: endDate,
      page: 1,
    }).catch(onError);
    set({
      itemList: items,
      hasMore: (pager.page - 1) * pager.per_page + items.length < pager.count,
      page: get().page + 1,
    });
  },
  async fetchNextPage(
    startDate = new Time().firstDayOfMonth().format(),
    endDate = new Time().lastDayOfMonth().format()
  ) {
    if (!startDate || !endDate) return;
    const {
      data: { itemsList: items, pager },
    } = await getItems({
      happen_after: startDate,
      happen_before: endDate,
      page: this.page + 1,
    }).catch(onError);
    this.page += 1;
    set({
      itemList: [...get().itemList, ...items],
      hasMore: (pager.page - 1) * pager.per_page + items.length < pager.count,
      page: get().page + 1,
    });
  },
  reset() {
    set({
      itemList: [],
      hasMore: false,
      page: 0,
    });
  },
}));
export default useItemStore;
