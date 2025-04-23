import { defineStore } from 'pinia';
import { getItems } from '@/api/item';
import { ItemDTO } from '@/api/types/items';
import { onError } from '@/utils/onError';
import { Time } from '@/utils/time';

type ItemState = {
  itemList: ItemDTO[];
  hasMore: boolean;
  page: number;
};
type ItemActions = {
  fetchItems: (startDate?: string, endDate?: string) => void;
  fetchNextPage: (startDate?: string, endDate?: string) => void;
};
export const useItemStore = (id?: string) =>
  defineStore<string, ItemState, {}, ItemActions>((id = 'item'), {
    state: () => ({
      itemList: [],
      hasMore: false,
      page: 0,
    }),
    actions: {
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
        this.itemList = items;
        this.hasMore =
          (pager.page - 1) * pager.per_page + items.length < pager.count;
        this.page += 1;
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
        this.itemList.push(...items);
        this.hasMore =
          (pager.page - 1) * pager.per_page + items.length < pager.count;
        this.page += 1;
      },
    },
  })();
