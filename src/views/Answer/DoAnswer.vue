<template>
  <div id="addAppPage" class="flex flex-col items-center justify-center">
    <a-card :style="{ width: '860px' }">
      <h1 class="text-2xl font-bold">{{ app.appName }}</h1>
      <h2 class="text-lg">{{ app.appDesc }}</h2>

      <h3 class="font-bold mt-2 mb-2">{{ currentQuestion?.title }}</h3>
      <div class="my-4">
        <a-radio-group direction="vertical" v-model="currentAnswer" :options="questionOptions" @change="doRadioChange"> </a-radio-group>
      </div>
      <div class="mt-2">
        <a-space>
          <a-button v-if="current < questionContent.length" :disabled="!currentAnswer" type="primary" @click="current++" class="!mx-2">下一题</a-button>
          <a-button v-if="current > 1" :disabled="loading" @click="current--">上一题</a-button>
          <a-button v-if="current == questionContent.length" :disabled="!currentAnswer" :loading="loading" type="primary" status="success" @click="handleSubmit">查看结果</a-button>
        </a-space>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, reactive, ref, watchEffect, withDefaults } from 'vue'
import API from '@/api'
import message from '@arco-design/web-vue/es/message'
import { useRouter } from 'vue-router'
import { addAppUsingPost, editAppUsingPost, getAppVoByIdUsingGet } from '@/api/appController'
import { SCORE_STRATEGY_MAP, APP_TYPE_MAP, APP_TYPE_ENUM, SCORE_STRATEGY_ENUM } from '@/constant/app'
import { addQuestionUsingPost, editQuestionUsingPost, listQuestionVoByPageUsingPost } from '@/api/questionController'
import { addUserAnswerUsingPost, generateUserAnswerIdUsingGet } from '@/api/userAnswerController'
interface Props {
  appId: string
}

const props = withDefaults(defineProps<Props>(), {
  appId: () => {
    return ''
  },
})

//

const router = useRouter()
const app = ref<API.AppVO>({})
// 题目内容结构（理解为题目列表）
const questionContent = ref<API.QuestionContentDTO[]>([])

// 当前题目的序号（从1开始）
const current = ref(1)
// 当前题目
const currentQuestion = ref<API.QuestionContentDTO>({})
// 当前题目选项
const questionOptions = computed(() => {
  return currentQuestion.value?.options
    ? currentQuestion.value.options.map(item => {
        return {
          label: `${item.key}. ${item.value}`,
          value: item.key,
        }
      })
    : []
})
// 当前答案
const currentAnswer = ref<string>('')
// 回答列表【A、B、C】
const answerList = ref<string[]>([])
// 用户选中选项的值列表【xxx、xxxx】
const answerValueList = ref<string[]>([])
/**
 * 加载数据
 */
const loadData = async () => {
  if (!props.appId) {
    return
  }
  // 获取App
  let res: any = null
  res = await getAppVoByIdUsingGet({ id: props.appId })
  if (res.data.code == 0) {
    app.value = res.data.data
  } else {
    message.error('获取应用详情失败，' + res.data.message)
  }

  // 获取题目
  res = await listQuestionVoByPageUsingPost({
    appId: props.appId as any,
    current: 1,
    pageSize: 1,
    sortField: 'createTime',
    sortOrder: 'desc',
  })
  if (res.data.code === 0 && res.data.data.records) {
    questionContent.value = res.data.data.records[0]?.questionContent
  } else {
    message.error('获取数据失败，' + res.data.message)
  }
}

// 获取旧数据
watchEffect(() => {
  loadData()
})

// 监听当前题目序号
watchEffect(() => {
  // 获取当前题目
  currentQuestion.value = questionContent.value[current.value - 1]
  // 获取当前答案
  currentAnswer.value = answerList.value[current.value - 1]
})

// 选中选项后，进行保存
const doRadioChange = (value: string) => {
  currentAnswer.value = value
  // 保存答案列表
  answerList.value[current.value - 1] = value
  // 保存答案值列表
  answerValueList.value[current.value - 1] = questionOptions.value.find(item => item.value === value)?.label || ''
}

/**
 * 提交
 */
const loading = ref(false)
const handleSubmit = async () => {
  loading.value = true
  if (!props.appId || !answerList.value) {
    return
  }

  let res: any = null

  // app.appType === 0: 与答案做比较
  // app.appType === 1: 将选项值与AI对评测
  // 提交答案
  let resultAnswerList = ref([])
  // 是 测试类 并且是 交给AI 来检测的场景
  if (app.value.appType === APP_TYPE_ENUM.TEST && app.value.scoringStrategy === SCORE_STRATEGY_ENUM.AI) {
    resultAnswerList.value = answerValueList.value
  } else {
    resultAnswerList.value = answerList.value
  }
  res = await addUserAnswerUsingPost({
    id: id.value as number,
    appId: props.appId as any,
    choices: resultAnswerList.value,
  })

  if (res.data.code === 0 && res.data.data) {
    router.push(`/answer/result/${res.data.data}`)
  } else {
    message.error('提交答案失败，' + res.data.message)
  }

  loading.value = false
}

// 唯一id
const id = ref<number>()
/**
 * 生成唯一Id
 */
const generateId = async () => {
  let res = await generateUserAnswerIdUsingGet()
  if (res.data.code === 0) {
    id.value = res.data.data
  } else {
    message.error('获取唯一ID失败，' + res.data.message)
  }
}
// 进入页面，生成唯一Id
watchEffect(() => {
  generateId()
})
</script>
