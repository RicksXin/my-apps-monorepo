import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Close, ArrowLeft, ArrowRight, StarFilled } from '@element-plus/icons-vue';
import config from '@/config';
import { useTagStore } from '@/store/tag';
import styles from './index.module.less';
import { RouteFormTag } from '@/utils/helper';

const TagsView = defineComponent({
  setup: () => {
    let tagsViewLeft = ref<number>(0);

    const tagStore = useTagStore();
    const route = useRoute();
    const router = useRouter();

    const isStar = (tag: RouteFormTag) => {
      return tag.fullPath === route.fullPath;
    };

    const closeAll = (tag: RouteFormTag) => {
      let tagList = [];
      tagStore.tags.forEach((item, index) => {
        if (item.closable) {
          tagList.push(index);
        }
      });

      tagStore.closeTagHandle(tagList);
      router.push({ path: config.dashboardFullPath });
    };

    const closeOther = () => {
      let tagList = [];
      tagStore.tags.forEach((item, index) => {
        if (item.closable && item.fullPath !== route.fullPath) {
          tagList.push(index);
        }
      });

      tagStore.closeTagHandle(tagList);
    };

    const closeRight = () => {
      let tagList = [];
      let flag = false;
      tagStore.tags.forEach((item, index) => {
        if (item.fullPath === route.fullPath) {
          flag = true;
        } else if (item.closable && flag) {
          tagList.push(index);
        }
      });

      tagStore.closeTagHandle(tagList);
    };

    const closeLeft = () => {
      let tagList = [];
      let flag = true;
      tagStore.tags.forEach((item, index) => {
        if (item.fullPath === route.fullPath) {
          flag = false;
        }
        if (item.closable && flag) {
          tagList.push(index);
        }
      });

      tagStore.closeTagHandle(tagList);
    };

    const tagsListRef = ref(null);
    const tagsViewRef = ref(null);

    const tagsScroll = (offset) => {
      const tagsListWidth = tagsListRef.value.offsetWidth - 150;
      const tagsViewWidth = tagsViewRef.value.offsetWidth;

      if (tagsListWidth > tagsViewWidth) {
        return (tagsViewLeft.value = 0);
      }

      if (offset > 0) {
        return (tagsViewLeft.value = Math.min(0, tagsViewLeft.value + offset));
      }

      if (tagsViewLeft.value > -(tagsViewWidth - tagsListWidth)) {
        tagsViewLeft.value = Math.max(tagsViewLeft.value + offset, tagsListWidth - tagsViewWidth);
      }
    };

    const tagList = tagStore.tags;
    const closeTagPage = (tag) => tagStore.closeTagView(tag.fullPath);
    const isActive = (tag) => (tag.fullPath === route.fullPath ? '' : '#fff');
    const openTagPage = (tag) => router.push({ path: tag.fullPath });

    return () => (
      <div class={styles.tags_box}>
        <div class={styles.tags_left_btn} onClick={() => tagsScroll(300)}>
          <el-button plain icon={ArrowLeft}></el-button>
        </div>
        <div class={styles.tags_right_btn} onClick={() => tagsScroll(-300)}>
          <el-button plain icon={ArrowRight}></el-button>
        </div>
        <div class={styles.tags_close}>
          <el-dropdown trigger="click">
            <el-button plain icon={Close}></el-button>
            <template v-slot:dropdown>
              <el-dropdown-item onClick={closeAll}>{$t('closeButton.closeAll')}</el-dropdown-item>
              <el-dropdown-item onClick={closeOther}>{$t('closeButton.closeOther')}</el-dropdown-item>
              <el-dropdown-item onClick={closeRight}>{$t('closeButton.closeRight')}</el-dropdown-item>
              <el-dropdown-item onClick={closeLeft}>{$t('closeButton.closeLeft')}</el-dropdown-item>
            </template>
          </el-dropdown>
        </div>
        <div class={styles.tags_list} ref="tagsListRef">
          <div class={styles.tags_view} ref="tagsViewRef" style={{ left: tagsViewLeft + 'px' }}>
            {tagList.map((tag) => (
              <el-tag
                key={tag.fullPath}
                size="large"
                closable={tag.closable}
                color={isActive(tag)}
                disable-transitions={false}
                onClick="openTagPage(tag)"
                // @close="closeTagPage(tag)"
              >
                {isStar(tag) ? (
                  <el-icon size={10}>
                    <star-filled />
                  </el-icon>
                ) : null}
                {tag.title}
              </el-tag>
            ))}
          </div>
        </div>
      </div>
    );
  },
});

export default TagsView;
