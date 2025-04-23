export type TagDTO = {
  id?: string;
  user_id?: number;
  name: string;
  sign: string;
  kind: 'expenses' | 'income';
};
export interface TagResult {
  tagList: TagDTO[];
  pager: {
    page: string;
    per_page: number;
    count: number;
  };
}
