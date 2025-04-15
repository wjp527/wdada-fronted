<template>
  <div>
    <a-card>
      <a-row class="grid-demo" style="margin-bottom: 16px">
        <a-col flex="auto">
          <div>
            <h2 class="text-2xl font-bold">{{ appDetailInfo?.appName }}</h2>
            <p class="text-gray-500 mt-4">{{ appDetailInfo?.appDesc }}</p>
            <p class="text-gray-500 mt-4">应用类型: {{ APP_TYPE_MAP[appDetailInfo?.appType] }}</p>
            <p class="text-gray-500 mt-4">评分策略: {{ SCORE_STRATEGY_MAP[appDetailInfo?.scoringStrategy] }}</p>
            <div class="text-gray-500 mt-4">
              作者:
              <a-avatar class="!w-[36px] !h-[36px]">
                <img :src="appDetailInfo?.user?.userAvatar" alt="" />
              </a-avatar>
              {{ appDetailInfo?.user?.userName }}
            </div>
            <p class="text-gray-500 mt-4">创建时间: {{ dayjs(appDetailInfo?.createTime).format('YYYY-MM-DD HH:mm:ss') }}</p>
          </div>
          <div class="mt-10 mb-10">
            <a-button type="primary" @click="handleStartAnswer" class="!mr-4">开始答题</a-button>
            <a-button @click="handleShareApp" class="!mr-4">分享应用</a-button>
            <a-button @click="handleSetQuestion" class="!mr-4" v-if="isMe">设置题目</a-button>
            <a-button @click="handleSetScoring" class="!mr-4" v-if="isMe">设置评分</a-button>
            <a-button @click="handleEditApp" class="!mr-4" v-if="isMe">修改应用</a-button>
          </div>
        </a-col>
        <a-col flex="300px">
          <div>
            <a-image :src="appDetailInfo?.appIcon" v-if="appDetailInfo?.appIcon?.startsWith('https://') && appDetailInfo?.appIcon != null" />
            <img class="!w-[300px] !h-[300px]" src="@/assets/logo.png" alt="" v-else />
          </div>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { getAppVoByIdUsingGet } from '@/api/appController'
import { APP_TYPE_MAP, SCORE_STRATEGY_MAP } from '@/constant/app'
import { computed, onMounted, ref } from 'vue'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/store/user'
const router = useRouter()

interface Props {
  id: string
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
})

const appDetailInfo = ref<API.AppVO>(null)
// 获取App详情
const loadData = async () => {
  const res = await getAppVoByIdUsingGet({ id: props.id })
  if (res.data.code == 0) {
    appDetailInfo.value = res.data.data
  } else {
    message.error('获取应用详情失败，' + res.data.message)
  }
}
loadData()

// 开始答题
const handleStartAnswer = () => {
  // /answer/do/:appId
  router.push(`/answer/do/${props.id}`)
}
// 分享应用
const handleShareApp = () => {}
// 设置题目
const handleSetQuestion = () => {
  router.push(`/add/question/${props.id}`)
}
// 设置评分
const handleSetScoring = () => {
  router.push(`/add/scoring_result/${props.id}`)
}
// 修改应用
const handleEditApp = () => {
  router.push(`/add/app/${props.id}`)
}

// 控制权限
const userLoginUser = useLoginUserStore()
const isMe = computed(() => {
  return appDetailInfo.value?.userId == userLoginUser.loginUser.id
})
</script>

<style lang="less" scoped></style>
