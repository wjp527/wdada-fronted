<template>
  <div>
    <a-card>
      <a-row class="grid-demo" style="margin-bottom: 16px">
        <a-col flex="auto">
          <div>
            <h2 class="text-2xl font-bold">{{ userAnswerDetailInfo?.resultName }}</h2>
            <p class="text-gray-500 mt-4">结果描述: {{ userAnswerDetailInfo?.resultDesc }}</p>
            <p class="text-gray-500 mt-4">结果 id: {{ userAnswerDetailInfo?.resultId }}</p>
            <p class="text-gray-500 mt-4">结果得分: {{ userAnswerDetailInfo?.resultScore }}</p>
            <p class="text-gray-500 mt-4">我的答案: {{ userAnswerDetailInfo?.choices }}</p>
            <p class="text-gray-500 mt-4">应用 id: {{ userAnswerDetailInfo?.appId }}</p>
            <p class="text-gray-500 mt-4">应用类型: {{ APP_TYPE_MAP[userAnswerDetailInfo?.appType] }}</p>
            <p class="text-gray-500 mt-4">评分策略: {{ SCORE_STRATEGY_MAP[userAnswerDetailInfo?.scoringStrategy] }}</p>
            <div class="text-gray-500 mt-4">
              答题人:
              <a-avatar class="!w-[36px] !h-[36px]">
                <img :src="userAnswerDetailInfo?.user?.userAvatar" alt="" />
              </a-avatar>
              {{ userAnswerDetailInfo?.user?.userName }}
            </div>
            <p class="text-gray-500 mt-4">答题时间: {{ dayjs(userAnswerDetailInfo?.createTime).format('YYYY-MM-DD HH:mm:ss') }}</p>
          </div>
          <div class="mt-10 mb-10">
            <a-button type="primary" @click="handleStartAnswer" class="!mr-4">去答题</a-button>
          </div>
        </a-col>
        <a-col flex="300px">
          <div>
            <a-image :src="userAnswerDetailInfo?.resultPicture" v-if="userAnswerDetailInfo?.resultPicture?.startsWith('https://') && userAnswerDetailInfo?.resultPicture != null" />
            <img class="!w-[300px] !h-[300px]" src="@/assets/logo.png" alt="" v-else />
          </div>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { getUserAnswerVoByIdUsingGet } from '@/api/userAnswerController'
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

const userAnswerDetailInfo = ref<API.UserAnswerVO>(null)
const loadData = async () => {
  const res = await getUserAnswerVoByIdUsingGet({ id: props.id })
  if (res.data.code == 0) {
    userAnswerDetailInfo.value = res.data.data
    console.log(userAnswerDetailInfo.value, 'userAnswerDetailInfo')
  }
}
loadData()

// 去答题
const handleStartAnswer = () => {
  router.push(`/answer/do/${userAnswerDetailInfo.value.appId}`)
} 

 
</script>

<style lang="less" scoped></style>
