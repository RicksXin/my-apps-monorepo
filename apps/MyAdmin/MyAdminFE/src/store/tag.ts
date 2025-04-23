import { defineStore, _GettersTree } from 'pinia';
import config from '@/config';
import { routeByName, routeFormatTag, RouteFormTag } from '@/utils/helper';
import { router } from '@/const/route';

interface TagState {
  tagList: RouteFormTag[];
}

interface TagAction {
  openTagView: (tag: RouteFormTag) => void;
  closeTagView: (key: string) => void;
  closeTagHandle: () => void;
}
interface TagGetter extends _GettersTree<TagState> {
  tags: (state: TagState) => RouteFormTag[];
  cacheTags: (state: TagState) => string[];
}

export const useTagStore = defineStore<string, TagState, TagGetter, TagAction>('tag', {
  state: () => ({
    tagList: [],
  }),
  getters: {
    tags: (state) => state.tagList,
    cacheTags: (state) => {
      return state.tagList.length ? state.tagList.filter((item) => item.cache).map((item) => item.name as string) : [];
    },
  },
  actions: {
    openTagView(tag: RouteFormTag) {
      const isset = this.tagList.some(function (item) {
        return item.fullPath === tag.fullPath;
      });

      const dashboardName = config.dashboardName;
      if (tag.name !== dashboardName && (this.tagList.length === 0 || this.tagList[0].name !== dashboardName)) {
        const dashboardTag = routeFormatTag(routeByName(dashboardName));
        dashboardTag.fullPath = config.dashboardFullPath;

        this.tagList.splice(0, 0, dashboardTag);
      }

      if (!isset) {
        this.tagList.push(tag);
      }
    },
    closeTagView(key) {
      for (let item of this.tagList) {
        if (key === item.fullPath) {
          const index = this.tagList.indexOf(item);
          this.tagList.splice(index, 1);

          if (router.currentRoute.value.fullPath === item.fullPath) {
            router.push({ path: this.tagList[index - 1].fullPath });
          }
        }
      }
    },
    closeTagHandle() {
      this.tagList.reverse().forEach((_, key) => {
        this.tagList.splice(key, 1);
      });
    },
  },
});
