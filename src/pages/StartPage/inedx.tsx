import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import { Button } from '@/components/Button';
import { FloatButton } from '@/components/FloatButton';
import { Icon } from '@/components/Icon';
import styles from './index.module.scss';
import { MainLayout } from '@/components/MainLayout';

const StartPage = defineComponent({
  setup: () => () => (
    <MainLayout title="山竹记账" icon="menu">
      <div class={styles.icon_wrapper}>
        <Icon name="pig" class={styles.icon} />
      </div>
      <div class={styles.btn_wrapper}>
        <RouterLink to="/items/create">
          <Button class={styles.btn}>
            开始记账
          </Button>
        </RouterLink>
      </div>
      <RouterLink to="/items/create">
        <FloatButton name="add" />
      </RouterLink>
    </MainLayout >
  ),
});
export default StartPage;