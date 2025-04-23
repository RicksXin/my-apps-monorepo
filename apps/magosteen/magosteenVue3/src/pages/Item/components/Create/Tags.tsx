import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getTags } from '@/api/tags';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import useTags from '@/hooks/useTags';
import { onError } from '@/utils/onError';
import { TagDTO } from '@/api/types/tags';

import styles from './index.module.scss';

const Tags = defineComponent({
  props: {
    kind: {
      type: String,
      required: true,
    },
    selected: String,
  },
  setup: (props, context) => {
    const router = useRouter();
    const {
      tags: tagList,
      hasMore,
      getTagList,
    } = useTags((p) => getTags({ kind: props.kind, page: p + 1 }).catch(onError));
    const onSelect = (tag: TagDTO) => {
      context.emit('update:selected', tag.id);
    };
    const addNewTag = () => {
      router.push(`/tags/create?kind=${props.kind}`);
    };
    const timer = ref<NodeJS.Timeout>();
    const currentTag = ref<HTMLDivElement>();
    const onLongPress = (id: string) => {
      router.push(`/tags/${id}/edit?kind=${props.kind}`);
    };
    const onTouchStart = (e: TouchEvent, tag: TagDTO) => {
      currentTag.value = e.currentTarget as HTMLDivElement;
      timer.value = setTimeout(() => {
        onLongPress(tag.id!);
      }, 1000);
    };
    const onTouchEnd = (e: TouchEvent) => {
      clearTimeout(timer.value);
    };
    const onTouchMove = (e: TouchEvent) => {
      const pointedElement = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
      if (currentTag.value !== pointedElement && !currentTag.value?.contains(pointedElement)) {
        clearTimeout(timer.value);
      }
    };

    return () => (
      <>
        <div class={styles.main} onTouchmove={onTouchMove}>
          <div class={styles.tag} onClick={addNewTag}>
            <div class={styles.sign}>
              <Icon name="add" class={styles.createTag} />
            </div>
            <div class={styles.name}>新增</div>
          </div>
          {tagList.value.map((tag) => (
            <div
              class={[styles.tag, props.selected === tag.id ? styles.selected : '']}
              onClick={() => onSelect(tag)}
              onTouchstart={(e) => onTouchStart(e, tag)}
              onTouchend={onTouchEnd}
            >
              <div class={styles.sign}>{tag.sign}</div>
              <div class={styles.name}>{tag.name}</div>
            </div>
          ))}
        </div>
        <div class={styles.loadMore}>
          {hasMore.value && tagList.value.length ? (
            <Button onClick={getTagList}>加载更多</Button>
          ) : (
            <span>没有更多了</span>
          )}
        </div>
      </>
    );
  },
});

export default Tags;
