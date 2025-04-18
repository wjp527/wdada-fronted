<template>
  <div id="addAppPage" class="flex flex-col items-center justify-center">
    <a-card :style="{ width: '860px' }">
      <div class="flex items-center justify-between">
        <a-progress :animation="true" :percent="percent" :steps="questionContent.length" status="primary" :show-text="false" style="display: " class="flex" />
        <div class="flex-1/10 ml-6">
          (
          {{ current }}
          /{{ questionContent.length }})
        </div>
      </div>
      <h1 class="text-2xl font-bold">{{ app.appName }}</h1>
      <h2 class="text-lg">{{ app.appDesc }}</h2>

      <h3 class="font-bold mt-2 mb-2">{{ currentQuestion?.title }}</h3>
      <div class="my-4">
        <a-radio-group direction="vertical" v-model="currentAnswer" :options="questionOptions" @change="doRadioChange"> </a-radio-group>
      </div>
      <div class="mt-2">
        <a-space>
          <a-button v-if="current < questionContent.length" :disabled="!currentAnswer" type="primary" @click="nextProblem" class="!mx-2">下一题</a-button>
          <a-button v-if="current > 1" :disabled="loading" @click="blackProblem">上一题</a-button>
          <a-button v-if="current == questionContent.length" :disabled="!currentAnswer" :loading="loading" type="primary" status="success" @click="handleSubmit">查看结果</a-button>
        </a-space>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, nextTick, reactive, ref, watchEffect, withDefaults } from 'vue'
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
let percent = ref(0)
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

    percent.value = 1 / questionContent.value.length
    console.log(percent.value, '==')
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

// 进度条百分比

// 下一题
const nextProblem = () => {
  current.value++
  percent.value += 1 / questionContent.value.length
}
// 上一题
const blackProblem = () => {
  current.value--
  percent.value -= 1 / questionContent.value.length
}
// 进入页面，生成唯一Id
watchEffect(() => {
  generateId()
})

const formatWithPrecision = (value, precision) => {
  return value.toFixed(precision) + '%'
}
</script>

<style lang="less" scoped>
:deep.arco-progress-steps-text::after {
  content: attr(data-percent);
  /* 通过max-width和overflow隐藏超长内容 */
  max-width: 80px !important;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /* 精确控制文本显示长度 */
  font-family: monospace; /* 等宽字体保证字符对齐 */
}
</style>
