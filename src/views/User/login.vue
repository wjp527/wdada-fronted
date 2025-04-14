<template>
  <div id="user-login">
    <h2 style="margin-bottom: 16px">用户登录</h2>
    <a-form style="max-width: 480px; margin: 0 auto" label-align="left" auto-label-width :model="form" @submit="handleSubmit">
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不少于 8 位" label="密码">
        <a-input-password v-model="form.userPassword" placeholder="请输入密码" />
      </a-form-item>
      <a-form-item>
        <a-button type="text" @click="handleTo('/user/register')">注册</a-button>
      </a-form-item>
      <a-form-item>
        <W-Button @click="handleSubmit" text="登录" /> 
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import message from '@arco-design/web-vue/es/message'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/store/user'
import { userLoginUsingPost } from '@/api/userController'
import API from '@/api'

/**
 * 表单信息
 */
const form = reactive({
  userAccount: '',
  userPassword: '',
} as API.UserLoginRequest)

const router = useRouter()
const loginUserStore = useLoginUserStore()

/**
 * 提交表单
 * @param data
 */
const handleSubmit = async () => {
  const res = await userLoginUsingPost(form)
  // 登录成功，跳转到主页
  if (res.data.code === 0) {
    await loginUserStore.fetchLoginUserAsync()
    message.success('登录成功')
    setTimeout(() => {
      router.push({
      path: '/',
      replace: true,
    })
    },300)
  } else {
    message.error('登录失败，' + res.data.message)
  }
}

/**
 * 跳转到注册页面
 */
const handleTo = (path: string) => {
  router.push(path)
}
</script>
