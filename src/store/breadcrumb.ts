import { defineStore } from 'pinia';
import { RouteLocationMatched } from 'vue-router';

interface BreadcrumbState {
  local: string;
  breadcrumb: RouteLocationMatched[];
}

interface BreadcrumbAction {
  setBreadcrumb: (breadcrumb: RouteLocationMatched[]) => void;
}
// eslint-disable-next-line @typescript-eslint/ban-types
export const useBreadcrumbStore = defineStore<string, BreadcrumbState, {}, BreadcrumbAction>('breadcrumb', {
  state: () => ({
    local: '',
    breadcrumb: [],
  }),
  actions: {
    setBreadcrumb(breadcrumb: RouteLocationMatched[]) {
      const title: string[] = [];
      this.breadcrumb = breadcrumb.filter((item) => {
        const t = item.meta.title as string;
        if (title.indexOf(t) >= 0) {
          return false;
        }
        title.push(t);
        return t;
      });
    },
  },
});
