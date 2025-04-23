import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import styles from './index.module.scss';
import { Icon, IconName } from '@/components/Icon';

const WelcomeRender = defineComponent({
  setup: () => {
    const slotsArray: {
      icon: IconName;
      title: string;
      subTitle: string;
    }[] = [{
      icon: 'pig',
      title: '会挣钱',
      subTitle: '还会省钱',
    },
    {
      icon: 'clock',
      title: '每日提醒',
      subTitle: '不遗漏每一笔账单',
    },
    {
      icon: 'chart',
      title: '数据可视化',
      subTitle: '收支一目了然',
    },
    {
      icon: 'cloud',
      title: '云备份',
      subTitle: '再也不怕数据丢失',
    }];
    const pageId = parseInt(useRoute()?.params?.id.toString());
    const item = slotsArray[pageId - 1];

    return () => (
      <div class={styles.card}>
        <Icon name={item.icon} />
        <h2>
          {item.title}
          <br />
          {item.subTitle}
        </h2>
      </div>
    );
  },
});
export default WelcomeRender;