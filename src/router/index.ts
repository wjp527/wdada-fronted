import { createRouter, createWebHashHistory } from 'vue-router'

import { routes } from './routes'

export default createRouter({
  history: createWebHashHistory(),
  // history: createWebHashHistory(process.env.BASE_URL),
  routes
})