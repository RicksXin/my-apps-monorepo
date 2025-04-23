import { onMounted, ref } from 'vue';
import { TagDTO, TagResult } from '@/api/types/tags';
import { Result } from '@/config/request';

const useTags = (fetch: (page: number) => Promise<Result<TagResult>>) => {
  const page = ref<number>(0);
  const hasMore = ref<boolean>(false);
  const tags = ref<TagDTO[]>([]);
  const getTagList = async () => {
    const { data: { tagList, pager } } = await fetch(page.value);

    tags.value.push(...tagList);
    hasMore.value = (pager.page - 1) * pager.per_page + tagList.length < pager.count;
    page.value += 1;
  };
  onMounted(getTagList);
  return {
    page,
    hasMore,
    tags,
    getTagList,
  };
};

export default useTags;
