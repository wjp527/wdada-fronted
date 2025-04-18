import { createApp } from 'vue';
import App from './App.vue';
// 引入路由配置文件
import router from './router';
// 引入状态管理配置文件
import store from './store';
// 全局权限管理
import '@/access/index.js';
// 引入 Arco Design Vue 组件库
import ArcoVue from '@arco-design/web-vue';
// 引入 Arco Design Vue 组件库的 CSS 文件
import '@arco-design/web-vue/dist/arco.css';
// 引入全局样式文件
import '@/style/index.css';
// 引入全局组件
// 页面头部组件
import GlobalHeader from '@/components/GlobalHeader/index.vue';
// 文件上传组件
import PictureUploader from '@/components/PictureUploader/index.vue';
// 按钮组件
import Button from '@/components/Button/index.vue';
const app = createApp(App);
app.use(ArcoVue);
app.use(store);
app.use(router);
app.component('Global-header', GlobalHeader);
app.component('Picture-uploader', PictureUploader);
app.component('W-Button', Button);
app.mount('#app');
