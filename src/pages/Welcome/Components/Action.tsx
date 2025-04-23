import { defineComponent } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import styles from './index.module.scss';

const WelcomeAction = defineComponent({
  setup: () => {
    const id = parseInt(useRoute()?.params?.id.toString());
    const onClick = () => {
      localStorage.setItem('skipFeature', 'yes');
    };
    return () => (
      <div class={styles.actions}>
        <RouterLink class={styles.fake} to="/start">
          跳过
        </RouterLink>
        <RouterLink to={id <= 3 ? `/welcome/${id + 1}` : '/start'}>
          {id <= 3 ? '下一页' : <span onClick={onClick}>完成</span>}
        </RouterLink>
        <RouterLink class={id === 4 ? styles.fake : ''} to="/start">
          <span onClick={onClick}>跳过</span>
        </RouterLink>
      </div>
    );
  },
});

export default WelcomeAction;
