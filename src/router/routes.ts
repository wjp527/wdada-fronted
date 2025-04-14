import ACCESS_ENUM from '@/access/accessEnum'
import UserLayout from '@/layout/UserLayout.vue'
import type { RouteRecordRaw } from 'vue-router'
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: '首页',
    component: () => import('@/views/Home/index.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/me',
    name: 'Me',
    component: () => import('@/views/Me/index.vue'),
    meta: {
      // 在菜单中隐藏该路由，默认为false
      hideInMenu: true
    }
  },
  {
    path: '/user',
    name: '用户',
    component: UserLayout,
    meta: {
      hideInMenu: true
    },
    children: [
      {
        path: "/user/login",
        name: '用户登录',
        component: () => import('@/views/User/login.vue'),
      },
      {
        path: '/user/register',
        name: '用户注册',
        component: () => import('@/views/User/register.vue'),
      }
    ]
  },
  {
    path: '/noAuth',
    name: '无权限',
    component: () => import('@/views/Test/NoAuth.vue'),
    meta: {
      hideInMenu: true
    }
  },
  {
    path: "/admin/user",
    name: '用户管理',
    component: () => import('@/views/Admin/AdminUser.vue'),
    meta: {
      access: ACCESS_ENUM.ADMIN
    }
  },
]