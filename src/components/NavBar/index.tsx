import { defineComponent, PropType, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Icon, IconName } from '../Icon';
import { OverlayIcon } from '../OverlayIcon';
import styles from './index.module.scss';

export const NavBar = defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String as PropType<IconName>,
      default: 'back',
    },
  },
  setup: ({ title, icon }) => {
    const overlayVisible = ref(false);
    const route = useRoute();
    const router = useRouter();
    const goBack = () => {
      const { return_to } = route.query;
      if (return_to) {
        router.push(return_to.toString());
      } else {
        router.back();
      }
    };
    const openMenu = () => {
      overlayVisible.value = !overlayVisible.value;
    };
    return () => (
      <div class={styles.navbar}>
        {icon ? (
          <span class={styles.icon_wrapper}>
            <Icon name={icon} class={styles.icon} onClick={icon === 'menu' ? openMenu : goBack} />
          </span>
        ) : null}
        <span class={styles.title_wrapper}>{title}</span>
        {icon === 'menu' && overlayVisible.value === true ? (
          <OverlayIcon
            onClose={() => {
              overlayVisible.value = false;
            }}
          />
        ) : null}
      </div>
    );
  },
});
