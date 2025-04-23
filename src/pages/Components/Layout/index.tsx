import { ElContainer, ElMain, ElScrollbar } from 'element-plus';
import { computed, defineComponent, KeepAlive, ref, VNode } from 'vue';
import { RouteLocationNormalizedLoaded, RouterView, useRoute } from 'vue-router';
import { useTagStore } from '@/store/tag';
import Header from './Header';
import NavBar from './NavBar';

type Params = { Component: VNode; route: RouteLocationNormalizedLoaded };

const Layout = defineComponent({
  setup: () => {
    const tagStore = useTagStore();
    const isCollapse = ref<boolean>(false);
    const cacheTags = computed(() => {
      return tagStore.cacheTags;
    });

    return () => (
      <ElContainer style="height:100%">
        <NavBar isCollapse={isCollapse.value} />
        <ElContainer direction="vertical">
          <Header v-model:isCollapse={isCollapse.value} />
          {/* <TagsView /> */}
          <ElMain>
            <RouterView>
              {({ Component: X }: Params) => (
                <ElScrollbar height="100%">
                  <KeepAlive include={cacheTags.value}>
                    {/* @ts-ignore */}
                    <X key={useRoute()?.params?.id?.toString()} />
                  </KeepAlive>
                </ElScrollbar>
              )}
            </RouterView>
          </ElMain>
        </ElContainer>
      </ElContainer>
    );
  },
});
export default Layout;
