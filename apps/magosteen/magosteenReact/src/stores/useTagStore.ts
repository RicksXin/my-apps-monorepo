import create from "zustand";
import { TagDTO } from "@/api/types/tags";
import { getTags } from "@/api/tags";
import { onError } from "@/utils/onError";

interface TagProps {
  page: number;
  hasMore: boolean;
  tagList: TagDTO[];
  getTagList: (kind: string) => Promise<void> 
  getNextTagList: (kind: string) => Promise<void> 
}
const useTagStore = create<TagProps>((set, get) => ({
  page: 1,
  hasMore: false,
  tagList: [],

  async getTagList (kind) {    
    const {
      data: { tagList, pager },
    } = await getTags({ kind, page: 1 }).catch(onError);

    set({
      page: get().page + 1,
      hasMore: (+pager.page - 1) * pager.per_page + tagList.length < pager.count,
      tagList,
    })
  },
  async getNextTagList (kind) {    
    const {
      data: { tagList, pager },
    } = await getTags({ kind, page: this.page + 1 }).catch(onError);
    this.page += 1
    set({
      page: get().page + 1,
      hasMore: (+pager.page - 1) * pager.per_page + tagList.length < pager.count,
      tagList: [...get().tagList, ...tagList],
    })
  },
}))
export default useTagStore