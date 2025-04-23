import { createApp } from 'vue';
import { createRouter } from 'vue-router';
import { createPinia } from 'pinia';
import '@svgstore';
import { App } from './App';
import { routes } from './config/routes';
import { history } from './utils/history';
import { useMeStore } from './stores/useMeStore';

const router = createRouter({ history, routes });

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount('#app');

const meStore = useMeStore();
meStore.fetchMe();

router.beforeEach((to) => {
  if (
    ['/start', '/'].includes(to.path) ||
    to.path.startsWith('welcome') ||
    to.path.startsWith('/sign_in')
  ) {
    return true;
  } else {
    return meStore.me!.then(
      () => true,
      () => '/sign_in?return_to=' + to.path
    );
  }
});
