import request from '@/config/request';
import {
  ItemDTO,
  ItemCreateDTO,
  ItemParams,
  ItemResultDTO,
  BalanceDTO,
  ItemSummaryDTO,
} from './types/items';

export const createItems = async (params: ItemCreateDTO) => {
  return request.post<ItemDTO>('/items', params);
};

export const getItems = async (params: ItemParams) => {
  return request.get<ItemResultDTO>('/items', params);
};

export const getBalance = async (params: Partial<ItemParams>) => {
  return request.get<BalanceDTO>('/items/balance', params);
};

export const getSummary = async (params: {
  happen_after: string;
  happen_before: string;
  kind: string;
  group_by: 'happen_at' | 'tag_id';
}) => {
  return request.get<ItemSummaryDTO>('/items/summary', params);
};
