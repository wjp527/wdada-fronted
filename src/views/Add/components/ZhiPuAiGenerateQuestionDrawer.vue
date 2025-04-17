<template>
  <a-drawer :width="640" :visible="modelValue" @ok="handleOk" @cancel="handleCancel" unmountOnClose>
    <template #title> AI生成题目 </template>
    <a-form :model="form" :style="{ width: '600px' }" @submit="handleSubmit">
      <a-form-item field="appId" label="应用id">
        <a-input disabled v-model="form.appId" placeholder="请输入应用id" />
      </a-form-item>
      <a-form-item field="questionNumber" label="题目数量">
        <a-input-number min="1" max="10" v-model="form.questionNumber" placeholder="请输入题目数量" />
      </a-form-item>
      <a-form-item field="optionNumber" label="选项数量">
        <a-input-number min="1" max="10" v-model="form.optionNumber" placeholder="请输入选项数量" />
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" type="primary" :loading="props.AIloading" class="w-[100px]">一键生成</a-button>
        <a-button type="primary" status="success" class="!ml-4" @click="addAiSSEQuestion()">实时生成</a-button>
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<script lang="ts" setup>
import { ref, withDefaults, defineProps } from 'vue'
interface Props {
  appId: Number | string
  modelValue: boolean
  AIloading: boolean
}

const props = withDefaults(defineProps<Props>(), {
  appId: () => {
    return 0
  },
  modelValue: () => {
    return false
  },
  AIloading: () => {
    return false
  },
})

const emit = defineEmits(['submit', 'ZhiPuAiSSEGenerateQuestion', 'update:AIloading', 'update:modelValue'])

const AIloading = ref(false)
const form = ref({
  // 应用id
  appId: props.appId,
  // 题目数量
  questionNumber: 1,
  // 选项数量
  optionNumber: 2,
})

// AI生成题目
const handleSubmit = async () => {
  // 关闭弹窗
  emit('update:modelValue', false)
  // 开启加载状态
  emit('update:AIloading', true)
  // 提交表单数据
  emit('submit', form.value)
}

// SSE异步生成题目
const addAiSSEQuestion = async () => {
  // 关闭弹窗
  emit('update:modelValue', false)
  // 提交表单数据
  emit('ZhiPuAiSSEGenerateQuestion', form.value)
}

const handleOk = () => {
  emit('update:modelValue', false)
}
const handleCancel = () => {
  emit('update:modelValue', false)
}
</script>
