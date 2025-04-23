import { defineComponent, onMounted, watch } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import config from './config';
import { useBreadcrumbStore } from './store/breadcrumb';
import { useTagStore } from './store/tag';
import { routeFormatTag } from './utils/helper';

const App = defineComponent({
  setup: () => {
    const tagStore = useTagStore()
    const breadcrumbStore = useBreadcrumbStore()
    const route = useRoute()
    onMounted(() => {
      breadcrumbStore.setBreadcrumb(route.matched)
    })
    watch(route, () => {
      breadcrumbStore.setBreadcrumb(route.matched)
      if (route.name !== config.loginRouteName) {
        tagStore.openTagView(routeFormatTag(route))
      }
    })
    return () => <RouterView />
  }
});
export default App;
