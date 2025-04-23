import { createApp } from 'vue';
import { createPinia } from 'pinia';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'; //引入图标
import 'element-plus/dist/index.css'; //引入样式
import { router } from './const/route';
import App from './App';
import './style.less';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia).use(router);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount('#app');
