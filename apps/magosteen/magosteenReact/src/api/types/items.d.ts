import { TagDTO } from './tags';

export type ItemCreateDTO = {
  happen_at: string;
  amount: number;
  kind: 'expenses' | 'income';
  tag_id: string;
  tag_ids?: string[];
};
export type ItemParams = {
  // happen_at: string;
  happen_after: string;
  happen_before: string;
  page: number;
};

export interface ItemDTO {
  id: number;
  user_id: number;
  amount: number;
  tags: TagDTO;
  tag_ids: number[];
  happen_at: string;
  kind: 'expenses' | 'income';
}

export interface ItemResultDTO {
  itemsList: ItemDTO[];
  pager: {
    page: number;
    per_page: number;
    count: number;
  };
}
export interface BalanceDTO {
  balance: number;
  expenses: number;
  income: number;
}

export interface HappenAtDTO {
  happen_at: string;
  amount: number;
}
export interface TagIdDTO {
  tag: TagDTO;
  amount: number;
}
export interface ItemSummaryByTagId {
  groups: TagIdDTO[];
  total: number;
}
export interface ItemSummaryByHappenAt {
  groups: HappenAtDTO[];
  total: number;
}

export type ItemSummaryDTO = ItemSummaryByTagId | ItemSummaryByHappenAt;
