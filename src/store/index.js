import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
// 创建pinia实例
const store = createPinia();
// 持久化插件配置，持久化配置在store中单独设置
store.use(piniaPluginPersistedstate);
export default store;
