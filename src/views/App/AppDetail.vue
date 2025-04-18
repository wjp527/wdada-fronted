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
            <a-button type="primary" v-if="appDetailInfo?.reviewStatus === REVIEW_STATUS_ENUM.REVIEWING">审核中</a-button>
            <a-button type="primary" status="danger" v-else-if="appDetailInfo?.reviewStatus === REVIEW_STATUS_ENUM.REJECT">已拒绝</a-button>
            <div v-else>
              <a-button type="primary" @click="handleStartAnswer" class="!mr-4">开始答题</a-button>
              <a-button @click="handleShareApp" class="!mr-4">分享应用</a-button>
              <a-button @click="handleSetQuestion" class="!mr-4" v-if="isMe">设置题目</a-button>
              <a-button @click="handleSetScoring" class="!mr-4" v-if="isMe">设置评分</a-button>
              <a-button @click="handleEditApp" class="!mr-4" v-if="isMe">修改应用</a-button>
            </div>
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
    <ShareModal ref="shareModalRef" :link="link" :title="title" />
  </div>
</template>

<script lang="ts" setup>
import { getAppVoByIdUsingGet } from '@/api/appController'
import { APP_TYPE_MAP, REVIEW_STATUS_ENUM, SCORE_STRATEGY_MAP } from '@/constant/app'
import { computed, onMounted, ref } from 'vue'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/store/user'
import ShareModal from '@/components/Modal/ShareModal.vue'
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
const shareModalRef = ref('')
const link = ref('')
const title = ref('')
link.value = `${window.location.protocol}://${window.location.host}/app/detail/${props.id}`
title.value = '应用分享'
const handleShareApp = (e: any) => {
  if (shareModalRef.value) {
    // 阻止冒泡
    e.stopPropagation()
    shareModalRef.value.onOpen()
  }
}
// 设置题目
const handleSetQuestion = () => {
  router.push(`/add/question/${props.id}`)
}
// 设置评分
/**
 * 设置评分结果
 *
 * 该函数会将页面路由跳转到添加评分结果的页面，并传递当前组件的props中的id作为参数。
 */
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
