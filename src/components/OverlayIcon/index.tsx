import { User } from '@/api/types/common';
import { useMeStore } from '@/stores/useMeStore';
import { Dialog } from 'vant';
import { defineComponent, onMounted, PropType, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { Icon } from '../Icon';
import styles from './index.module.scss';

export const OverlayIcon = defineComponent({
  props: {
    onClose: {
      type: Function as PropType<() => void>,
    },
  },
  setup: (props, context) => {
    const meStore = useMeStore()
    const route = useRoute();
    const router = useRouter();
    const myInfo = ref<User>();
    onMounted(async () => {
      const result = await meStore.me;
      myInfo.value = result?.data;
    });
    const onSignOut = async () => {
      await Dialog.confirm({
        title: '确认',
        message: '确认要退出登录吗？',
      });
      localStorage.removeItem('jwt');
      router.push('/sign_in');
    };
    const close = () => {
      props.onClose?.();
    };

    return () => (
      <>
        <div class={styles.mask} onClick={close}></div>
        <div class={styles.overlay}>
          <section class={styles.currentUser}>
            {myInfo.value ? (
              <div>
                <h2 class={styles.email}>{myInfo.value.email}</h2>
                <p onClick={onSignOut}>退出登录</p>
              </div>
            ) : (
              <RouterLink to={`/sign_in?return_to=${route.fullPath}`}>
                <h2>未登录用户</h2>
                <p>点击这里登录</p>
              </RouterLink>
            )}
          </section>
          <nav>
            <ul class={styles.action_list}>
              <li>
                <RouterLink to="/items/create" class={styles.action}>
                  <Icon name="pig" class={styles.icon} />
                  <span>记账</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/statistics" class={styles.action}>
                  <Icon name="charts" class={styles.icon} />
                  <span>统计图表</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/export" class={styles.action}>
                  <Icon name="export" class={styles.icon} />
                  <span>导出数据</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/notify" class={styles.action}>
                  <Icon name="notify" class={styles.icon} />
                  <span>记账提醒</span>
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>
      </>
    );
  },
});
