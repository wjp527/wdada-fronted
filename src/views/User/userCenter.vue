<template>
  <div id="addAppPage" class="flex flex-col items-center justify-center">
    <h2 class="text-2xl font-bold mb-8">个人中心</h2>
    <a-form :model="form" :style="{ width: '920px' }" label-align="left" auto-label-width @submit="handleSubmit">
      <a-form-item label="用户名" :content-flex="false" :merge-props="false">
        <a-input v-model="form.userName" />
      </a-form-item>
      <a-form-item label="用户简介" :content-flex="false" :merge-props="false">
        <a-input v-model="form.userProfile" />
      </a-form-item>
      <a-form-item label="用户名" :content-flex="false" :merge-props="false">
        <Picture-uploader biz="user_avatar" v-model="form.userAvatar" :value="form.userAvatar"></Picture-uploader>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" :loading="loading" html-type="submit" style="width: 120px"> 提交 </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect } from 'vue'
import API from '@/api'
import message from '@arco-design/web-vue/es/message'
import { useRouter } from 'vue-router'
import { addQuestionUsingPost, aiGenerateQuestionUsingPost, editQuestionUsingPost, listQuestionVoByPageUsingPost } from '@/api/questionController'
import ZhiPuAiGenerateQuestionDrawer from './components/ZhiPuAiGenerateQuestionDrawer.vue'
import { baseURL, onlineUrl } from '@/request'
import { getLoginUserUsingGet, getUserVoByIdUsingGet, updateMyUserUsingPost } from '@/api/userController'

const form = ref<API.UserUpdateMyRequest>({
  userName: '',
  userProfile: '',
  userAvatar: '',
})

const router = useRouter()

const loadData = async () => {
  let res = await getLoginUserUsingGet()
  if (res.data.code === 0) {
    form.value = res.data.data
  } else {
    message.error('获取用户信息失败')
    return
  }
}
loadData()
/**
 * 提交
 */
const loading = ref(false)
const handleSubmit = async () => {
  loading.value = true

  let res: any = await updateMyUserUsingPost(form.value)
  if (res.data.code === 0) {
    message.success('修改成功,即将跳转首页...')
    setTimeout(() => {
      router.push(`/`)
    }, 1000)
  } else {
    message.error('操作失败，' + res.data.message)
  }
  loading.value = false
}
</script>
<style lang="less" scoped>
.arco-input-wrapper {
  width: 400px !important;
}
</style>
