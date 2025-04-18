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
    name: '主页',
    component: () => import('@/views/Home/index.vue'),
    meta: { title: '主页' }
  },
  {
    path: `/app/detail/:id`,
    // 确保可以获取到 id
    props: true,
    name: '应用详情',
    component: () => import('@/views/App/AppDetail.vue'),
    meta: {
      title: '应用详情',
      hideInMenu: true
    }
  },
  {
    path: "/add/app",
    name: "创建应用",
    component: () => import('@/views/Add/AddApp.vue')
  },
  {
    path: "/add/app/:id",
    name: "修改应用",
    component: () => import('@/views/Add/AddApp.vue'),
    props: true,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/add/question/:appId",
    name: "创建题目",
    component: () => import('@/views/Add/AddQuestion.vue'),
    props: true,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/add/scoring_result/:appId",
    name: "创建评分",
    component: () => import('@/views/Add/AddScoringResult.vue'),
    props: true,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/answer/do/:appId",
    name: "答题",
    component: () => import('@/views/Answer/DoAnswer.vue'),
    props: true,
    meta: {
      hideInMenu: true,
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/answer/result/:id",
    name: "答题结果",
    component: () => import('@/views/Answer/AnswerResult.vue'),
    props: true,
    meta: {
      hideInMenu: true,
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/answer/my",
    name: "我的答题",
    component: () => import('@/views/Answer/MyAnswer.vue'),
    meta: {
      access: ACCESS_ENUM.USER,
    },
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
      },

    ]
  },

  {
    path: "/admin/user",
    name: '用户管理',
    component: () => import('@/views/Admin/AdminUser.vue'),
    meta: {
      // 权限: 管理员
      access: ACCESS_ENUM.ADMIN
    }
  },
  {
    path: "/admin/app",
    name: '应用管理',
    component: () => import('@/views/Admin/AdminApp.vue'),
    meta: {
      // 权限: 管理员
      access: ACCESS_ENUM.ADMIN
    }
  },
  {
    path: "/admin/question",
    name: '题目管理',
    component: () => import('@/views/Admin/AdminQuestion.vue'),
    meta: {
      // 权限: 管理员
      access: ACCESS_ENUM.ADMIN
    }
  },
  {
    path: "/admin/scoring_result",
    name: '评分结果管理',
    component: () => import('@/views/Admin/AdminScoringResult.vue'),
    meta: {
      // 权限: 管理员
      access: ACCESS_ENUM.ADMIN
    }
  },
  {
    path: "/admin/user_answer",
    name: '用户答题记录管理',
    component: () => import('@/views/Admin/AdminUserAnswer.vue'),
    meta: {
      // 权限: 管理员
      access: ACCESS_ENUM.ADMIN
    }
  },
  {
    path: "/app_statistic",
    name: "应用统计",
    component: () => import('@/views/Admin/AppStatistic.vue'),
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/center",
    name: '个人中心',
    component: () => import('@/views/User/userCenter.vue'),
    meta: {
      hideInMenu: true
    }
  },
  {
    path: '/website',
    name: '网站介绍',
    component: () => import('@/views/website/websiteIntroduction.vue'),
  },
  {
    path: '/noAuth',
    name: '无权限',
    component: () => import('@/views/Test/NoAuth.vue'),
    meta: {
      hideInMenu: true
    }
  },
]