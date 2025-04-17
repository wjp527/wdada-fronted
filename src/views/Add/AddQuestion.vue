<template>
  <div id="addAppPage" class="flex flex-col items-center justify-center">
    <h2 class="text-2xl font-bold mb-8">创建应用</h2>

    <a-form :model="questionContent" :style="{ width: '920px' }" label-align="left" auto-label-width @submit="handleSubmit">
      <a-form-item label="应用 id" class="!flex !items-center justify-between">
        <div class="flex-1 flex items-center">
          <a-tag>2</a-tag>
        </div>
        <a-space>
          <a-button type="outline" size="small" class="ml-4" @click="addQuestion($event, questionContent.length)"> 底部添加题目 </a-button>
          <a-button type="primary" size="small" class="ml-4" @click="addAiQuestion()"> AI生成题目 </a-button>
        </a-space>
      </a-form-item>

      <a-form-item label="题目列表" :content-flex="false" :merge-props="false">
        <div v-if="loading" class="w-full h-[400px] flex justify-center items-center">
          <a-spin dot />
        </div>
        <a-space v-else direction="vertical" fill v-for="(item, index) in questionContent" :key="index">
          <a-collapse destroy-on-hide class="w-[860px]">
            <a-collapse-item :header="item.title" key="1">
              <template #header>
                <a-input v-model="item.title" placeholder="请输入题目" />
              </template>
              <template #extra>
                <a-button size="small" type="outline" status="success" class="!mr-2" @click="addQuestionOption($event, item, item.options.length)">底部添加选项</a-button>
                <a-button size="small" @click="addQuestion($event, index + 1)" class="!mr-2">添加题目</a-button>
                <a-button size="small" status="danger" @click="deleteQuestion($event, index)">删除题目</a-button>
              </template>

              <a-collapse destroy-on-hide v-for="(option, optionIndex) in item.options" :key="optionIndex">
                <a-collapse-item :header="`选项${optionIndex + 1}`" key="1.1">
                  <template #extra>
                    <a-button size="mini" @click="addQuestionOption($event, item, optionIndex + 1)" class="!mr-2">添加选项</a-button>
                    <a-button status="danger" size="mini" @click="deleteQuestionOption($event, item, optionIndex)">删除选项</a-button>
                  </template>
                  <a-form-item label="选项key">
                    <a-input v-model="option.key" placeholder="请输入选项key" class="!mb-1" />
                  </a-form-item>
                  <a-form-item label="选项value">
                    <a-input v-model="option.value" placeholder="请输入选项值" class="!mb-1" />
                  </a-form-item>
                  <a-form-item label="选项结果">
                    <a-input v-model="option.result" placeholder="请输入选项" class="!mb-1" />
                  </a-form-item>
                  <a-form-item label="选项分数">
                    <a-input-number v-model="option.score" placeholder="请输入选项" class="!mb-1" min="0" max="100" />
                  </a-form-item>
                </a-collapse-item>
              </a-collapse>
            </a-collapse-item>
          </a-collapse>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 120px"> 提交 </a-button>
      </a-form-item>
    </a-form>

    <!-- 智谱AI生成题目【抽屉】 -->
    <ZhiPuAiGenerateQuestionDrawer :appId="props.appId" v-model:AIloading="AIloading" v-model:visible="visible" @submit="ZhiPuAiGenerateQuestion" @ZhiPuAiSSEGenerateQuestion="ZhiPuAiSSEGenerateQuestion" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, reactive, ref, watchEffect, withDefaults } from 'vue'
import API from '@/api'
import message from '@arco-design/web-vue/es/message'
import { useRouter } from 'vue-router'
import { addAppUsingPost, editAppUsingPost, getAppVoByIdUsingGet } from '@/api/appController'
import { SCORE_STRATEGY_MAP, APP_TYPE_MAP } from '@/constant/app'
import { addQuestionUsingPost, aiGenerateQuestionUsingPost, editQuestionUsingPost, listQuestionVoByPageUsingPost } from '@/api/questionController'
import ZhiPuAiGenerateQuestionDrawer from './components/ZhiPuAiGenerateQuestionDrawer.vue'
interface Props {
  appId: string
}

const props = withDefaults(defineProps<Props>(), {
  appId: () => {
    return ''
  },
})

const router = useRouter()

// ============================
// 理解为题目列表
const questionContent = ref<API.QuestionContentDTO[]>([])
const addQuestion = (e, index: number) => {
  // 阻止冒泡
  e.stopPropagation()
  questionContent.value.splice(index, 0, {
    title: '',
    options: [],
  })
}
// 删除题目
const deleteQuestion = (e, index: number) => {
  // 阻止冒泡
  e.stopPropagation()

  questionContent.value.splice(index, 1)
}

/**
 * 添加题目选项
 */
const addQuestionOption = (e, question: API.QuestionContentDTO, index: number) => {
  // 阻止冒泡
  e.stopPropagation()
  if (!question.options) {
    question.options = []
  }
  question.options.splice(index, 0, {
    key: '',
    value: '',
    result: '',
    score: 0,
  })
}

/**
 * 删除题目选项
 */
const deleteQuestionOption = (e, question: API.QuestionContentDTO, index: number) => {
  // 阻止冒泡
  e.stopPropagation()
  if (!question.options) {
    question.options = []
  }
  question.options.splice(index, 1)
}

// AI生成题目
const visible = ref(false)
const addAiQuestion = () => {
  visible.value = true
}
const loading = ref(false)

// 智谱AI生成题目成功后后执行
const AIloading = ref(false)
const ZhiPuAiGenerateQuestion = async payload => {
  loading.value = true
  let res = await aiGenerateQuestionUsingPost(payload)
  if (res.data.code === 0) {
    questionContent.value = [...questionContent.value, ...res.data.data]
    visible.value = false
  } else {
    message.error('生成题目失败，' + res.data.message)
  }
  AIloading.value = false
  loading.value = false
}

// 智谱AI生成题目【SSE提交，流式生成】
const ZhiPuAiSSEGenerateQuestion = async form => {
  loading.value = true
  visible.value = false
  // 创建 SSE 请求
  const eventSource = new EventSource(`http://localhost:8101/api/question/ai_generate/sse?appId=${props.appId}&optionNumber=${form.optionNumber}&questionNumber=${form.questionNumber}`)
  // 接收消息
  eventSource.onmessage = function (event) {
    console.log(event.data)
    questionContent.value = [...questionContent.value, JSON.parse(event.data)]
  }
  // 报错后者连接关闭时触发
  eventSource.onerror = function (event) {
    if (event.eventPhase === EventSource.CLOSED) {
      console.error('关闭连接')
      eventSource.close()
    } else {
      eventSource.close()
    }
  }
  // 连接建立时触发
  eventSource.onopen = function () {
    console.log('建立连接')
  }

  loading.value = false
}

// ============================
const form = ref({
  appDesc: '',
  appIcon: '',
  appName: '',
  appType: 0,
  scoringStrategy: 0,
} as API.AppAddRequest)

const oldQuestion = ref<API.QuestionVO>()

/**
 * 加载数据
 */
const loadData = async () => {
  if (!props.appId) {
    return
  }
  const res = await listQuestionVoByPageUsingPost({
    appId: props.appId as any,
    current: 1,
    pageSize: 1,
    sortField: 'createTime',
    sortOrder: 'desc',
  })
  if (res.data.code === 0 && res.data.data.records.length > 0) {
    oldQuestion.value = res.data.data.records[0]
    if (oldQuestion.value) {
      questionContent.value = oldQuestion.value.questionContent ?? []
    }
  } else if (res.data.data.records.length == 0) {
    message.warning('请添加题目')
    questionContent.value.splice(0, 0, {
      title: '',
      options: [],
    })
  } else {
    message.error('获取数据失败，' + res.data.message)
  }
}

// 获取旧数据
watchEffect(() => {
  loadData()
})

/**
 * 提交
 */
const handleSubmit = async () => {
  if (!props.appId || !questionContent.value) {
    return
  }
  let res: any = null
  // 如果是修改
  if (oldQuestion.value?.id) {
    res = await editQuestionUsingPost({
      id: oldQuestion.value.id as any,
      questionContent: questionContent.value,
    })
  } else {
    // 创建
    res = await addQuestionUsingPost({
      appId: props.appId as any,
      questionContent: questionContent.value,
    })
  }
  if (res.data.code === 0) {
    message.success('操作成功，即将跳转到应用详情页')
    setTimeout(() => {
      router.push(`/app/detail/${props.appId as any}`)
    }, 3000)
  } else {
    message.error('操作失败，' + res.data.message)
  }
}
</script>
<style lang="less" scoped>
::v-deep.arco-input-wrapper {
  width: 400px !important;
}
</style>
