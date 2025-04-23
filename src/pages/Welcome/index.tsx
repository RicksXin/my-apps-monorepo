import { FC, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { animated, useTransition } from '@react-spring/web';
import { throttle } from '@/utils/throttle';
import { useSwipe } from '@/hooks/useSwipe';
import Icon from '@/Components/Icon';
import WelcomeRender from './Components/Render';
import WelcomeAction from './Components/Action';
import styles from './index.module.scss';

const Welcome: FC = () => {
  const main = useRef<HTMLElement>(null);
  const route = useParams();
  const { swiping, direction } = useSwipe(main);
  const location = useLocation(); // 获取当前路径
  const [extraStyle, setExtraStyle] = useState<{
    position: 'absolute' | 'relative';
  }>({ position: 'relative' });

  const transitions = useTransition(location.pathname, {
    from: () =>
      direction === 'left'
        ? location.pathname === '/welcome/1'
          ? { transform: 'translateX(0%)' }
          : { transform: 'translateX(100%)' }
        : { transform: 'translateX(-100%)' },
    enter: { transform: 'translateX(0%)' },
    leave: () =>
      direction === 'left' ? { transform: 'translateX(-100%)' } : { transform: 'translateX(100%)' },
    config: { duration: 300 },
    onStart: () => {
      setExtraStyle({ position: 'absolute' });
    },
    onRest: () => {
      setExtraStyle({ position: 'relative' });
    },
  });

  const nav = useNavigate();
  const pushRouter = throttle(() => {
    const pageId = parseInt(route?.id || '');
    if (pageId === 4) return;
    nav(`/welcome/${pageId + 1}`);
  }, 500);
  const backRouter = throttle(() => {
    const pageId = parseInt(route?.id?.toString() || '');
    if (pageId === 1) return;
    nav(-1);
  }, 500);

  useEffect(() => {
    if (swiping && direction === 'left') {
      pushRouter();
    } else if (swiping && direction === 'right') {
      backRouter();
    }
  }, [swiping, direction]);

  return (
    <div className={styles.wrapper} flex flex-col>
      <header flex flex-col justify-center items-center pt-66px color="#d4d4ee">
        <Icon name="logo" />
        <h1 text="#D4D4EE" text-32px>
          山竹记账
        </h1>
      </header>
      <main shrink-1 grow-1 flex flex-col relative ref={main}>
        {transitions((style, pathname) => (
          <animated.div
            key={pathname}
            style={{ ...style, ...extraStyle }}
            flex
            p-16px
            w="100%"
            h="100%"
          >
            <div grow-1>
              <WelcomeRender pathname={pathname} />
            </div>
          </animated.div>
        ))}
      </main>
      <footer shrink-0>
        <WelcomeAction />
      </footer>
    </div>
  );
};

export default Welcome;
