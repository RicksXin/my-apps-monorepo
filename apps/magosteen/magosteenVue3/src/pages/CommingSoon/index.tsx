import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { Icon } from '@/components/Icon';
import { Button } from "@/components/Button";
import styles from './index.module.scss';

const ComingSoon = defineComponent({
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  setup: (props) => {
    const router = useRouter()
    const onClick = () => {
      router.back()
    }
    return () => (
      <div class={styles.container}>
        <div class={styles.icon_wrapper}>
          <Icon name="pig" class={styles.icon} />
        </div>
        <p class={styles.text}>敬请期待</p>
        <Button class={styles.btn} onClick={onClick}>返回</Button>
      </div>
    )
  }
})
export default ComingSoon;