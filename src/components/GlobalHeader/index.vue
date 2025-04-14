<template>
  <div class="GlobalHeader">
    <a-row class="grid-demo" align="center" :wrap="false">
      <a-col flex="auto">
        <a-menu mode="horizontal" :selected-keys="selectedKey" :default-selected-keys="['1']">
          <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }">
            <div class="titlebar flex items-center justify-center">
              <img src="@/assets/logo.png" alt="" style="width: 48px; height: 48px" />
              <div class="text-sm text-black-300 dark:text-black-400">wAI答题</div>
            </div>
          </a-menu-item>
          <a-menu-item v-for="item in visibleRoutes" :key="item.path" @click="handleTo(item)">{{ item.name }}</a-menu-item>
        </a-menu>
      </a-col>
      <a-col flex="100px">
        <div>
          <a-button type="primary" @click="handleLogin" v-if="!loginUser.id">登录</a-button>

          <a-dropdown v-else :popup-max-height="false">
            <a-button>{{ loginUser.userName || defineName }}<icon-down /></a-button>
            <template #content>
              <a-doption>个人中心</a-doption>
              <a-doption @click="handleLogout">退出登录</a-doption>
            </template>
          </a-dropdown>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { routes } from '../../router/routes'
import { ref, computed } from 'vue'
import checkAccess from '@/access/checkAccess'
import { useRouter } from 'vue-router'

const router = useRouter()

import { useLoginUserStore } from '@/store/User'
import { storeToRefs } from 'pinia'
const loginUserStore = useLoginUserStore()
// 登录用户信息
const { defineName, loginUser } = storeToRefs(loginUserStore)

// 可见的菜单
const visibleRoutes = computed(() => {
  return routes.filter(item => {
    if (item.meta?.hideInMenu) {
      return false
    }

    // 根据权限过滤菜单
    if (!checkAccess(loginUserStore.loginUser, item?.meta?.access as string)) {
      return false
    }
    return true
  })
})

// 初始化登录用户信息
const initLoginUser = () => {
  loginUserStore.fetchLoginUserAsync()
}

initLoginUser()
// 当前选中的菜单项的 key 数组
const selectedKey = ref(['/'])
router.afterEach(to => {
  selectedKey.value = [to.path]
})

// 导航栏之间的跳转
const handleTo = (item: any) => {
  router.push(item.path)
}

// 登录
const handleLogin = () => {
  router.replace('/user/login')
}
// 退出登录
const handleLogout = () => {
  // 退出登录操作
  loginUserStore.logoutLoginUserAsync()
  // 重新获取登录用户信息
  initLoginUser()
  router.replace('/user/login')
}
</script>

<style lang="less" scoped>
.GlobalHeader {
}
</style>
