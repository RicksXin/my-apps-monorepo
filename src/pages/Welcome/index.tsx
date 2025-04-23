import { defineComponent, ref, Transition, VNode, watchEffect } from 'vue';
import { RouteLocationNormalizedLoaded, RouterView, useRoute, useRouter } from 'vue-router';
import logoSvg from '@/assets/icons/logo.svg';
import { useSwipe } from '@/hooks/useSwipe';
import { throttle } from '@/utils/throttle';
import styles from './index.module.scss';

const Welcome = defineComponent({
  setup: () => {
    const main = ref<HTMLElement>();
    const router = useRouter();
    const route = useRoute();
    const { swiping, direction } = useSwipe(main);
    const pushRouter = throttle(() => {
      const pageId = parseInt(route?.params?.id.toString());
      if (pageId === 4) return;
      router.push(`/welcome/${pageId + 1}`);
    }, 500);
    const backRouter = throttle(() => {
      const pageId = parseInt(route?.params?.id.toString());
      if (pageId === 1) return;
      router.back();
    }, 500);
    watchEffect(() => {
      if (swiping.value && direction.value === 'left') {
        pushRouter();
      } else if (swiping.value && direction.value === 'right') {
        backRouter()
      }
    });

    type Params = { Component: VNode, route: RouteLocationNormalizedLoaded }

    return () => (
      <div class={styles.wrapper}>
        <header>
          <img src={logoSvg} />
          <h1>山竹记账</h1>
        </header>
        <main class={styles.main} ref={main}>
          <RouterView name="main">
            {({ Component: X, route }: Params) =>
              <Transition
                enterFromClass={direction.value === 'left' ? styles.enter_from : styles.leave_to}
                enterActiveClass={styles.enter_active}
                leaveActiveClass={styles.leave_active}
                leaveToClass={direction.value === 'left' ? styles.leave_to : styles.enter_from}
              >
                {/* @ts-ignore */}
                <X key={useRoute()?.params?.id.toString()} />
              </Transition>}
          </RouterView>
        </main>
        <footer>
          <RouterView name="footer" key={useRoute()?.params?.id.toString()} />
        </footer>
      </div>
    );
  },
});

export default Welcome;