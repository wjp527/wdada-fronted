<template>
  <div id="user-register">
    <h2 style="margin-bottom: 16px">用户注册</h2>
    <a-form style="max-width: 480px; margin: 0 auto" label-align="left" auto-label-width :model="form" @submit="handleSubmit">
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不少于 8 位" label="密码">
        <a-input-password v-model="form.userPassword" placeholder="请输入密码" />
      </a-form-item>
      <a-form-item field="checkPassword" tooltip="密码不少于 8 位" label="密码">
        <a-input-password v-model="form.checkPassword" placeholder="请再次输入密码" />
      </a-form-item>
      <a-form-item>
        <a-button type="text" @click="handleTo('/user/login')">登录</a-button>
      </a-form-item>
      <a-form-item>
        <W-Button @click="handleSubmit" text="注册" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import message from '@arco-design/web-vue/es/message'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/store/user'
import { userRegisterUsingPost } from '@/api/userController'
import API from '@/api'

/**
 * 表单信息
 */
const form = reactive({
  userAccount: '',
  userPassword: '',
  checkPassword: '',
} as API.UserLoginRequest)

const router = useRouter()
const loginUserStore = useLoginUserStore()

/**
 * 提交表单
 * @param data
 */
const handleSubmit = async () => {
  const res = await userRegisterUsingPost(form)
  // 登录成功，跳转到主页
  if (res.data.code === 0) {
    message.success('注册成功')
    router.push({
      path: '/user/login',
      replace: true,
    })
  } else {
    message.error('注册失败，' + res.data.message)
  }
}

/**
 * 跳转到登录页面
 */
const handleTo = (path: string) => {
  router.push(path)
}
</script>
