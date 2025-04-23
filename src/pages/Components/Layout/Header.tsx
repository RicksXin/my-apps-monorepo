import { computed, defineComponent } from 'vue';
import { ElBreadcrumb, ElBreadcrumbItem, ElCol, ElHeader, ElIcon, ElRow } from 'element-plus';
import { Fold, Expand } from '@element-plus/icons-vue';
import { useBreadcrumbStore } from '@/store/breadcrumb';
import styles from './index.module.less';

const Header = defineComponent({
  props: {
    isCollapse: {
      type: Boolean,
    },
  },
  emits: ['update:isCollapse'],
  setup: (props, ctx) => {
    const breadcrumbStore = useBreadcrumbStore();
    const breadcrumb = computed(() => breadcrumbStore.breadcrumb);
    const menuOpenOrClose = () => {
      ctx.emit('update:isCollapse', !props.isCollapse);
    };

    return () => (
      <div class={styles.header}>
        <ElHeader>
          <ElRow>
            <ElCol span={1} class={styles.open_menu}>
              <div onClick={menuOpenOrClose}>
                <ElIcon>
                  {props.isCollapse ? <Expand /> : null}
                  {!props.isCollapse ? <Fold /> : null}
                </ElIcon>
              </div>
            </ElCol>
            <ElCol span={15}>
              <ElBreadcrumb separator="/">
                {breadcrumb.value.map((bc) => (
                  <ElBreadcrumbItem to={{ path: bc.path }} key={bc.path}>
                    {bc.meta.title}
                  </ElBreadcrumbItem>
                ))}
              </ElBreadcrumb>
            </ElCol>
          </ElRow>
        </ElHeader>
      </div>
    );
  },
});

export default Header;
