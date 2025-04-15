<template>
  <div></div>
  <!-- <a-modal :visible="modelValue" @update:visible="handleVisibilityChange" @ok="handleOk" @cancel="handleCancel">
    <template #title>{{ title }}</template>

    <div>
      <a-form :model="form">
        <a-form-item field="appId" label="应用">
          <a-select :style="{ width: '320px' }" v-model="form.userRole" placeholder="请选择用户权限" allow-clear>
            <a-option v-for="item in APP_TYPE_ENUM" :value="item">{{ APP_TYPE_MAP[item] }}</a-option>
          </a-select>
        </a-form-item> 
        <a-form-item label="Posts" :content-flex="false" :merge-props="false">
          <a-space direction="vertical" fill>
            <a-form-item field="questionContent[0].options.title" :label="`题目${form.questionContent.length}`">
              <a-input v-model="form.questionContent[0].options.title" placeholder="请输入选项key" />
            </a-form-item>
            <a-form-item field="questionContent[0].options.key" label="Post1">
              <a-input v-model="form.questionContent[0].options.key" placeholder="请输入选项key" />
            </a-form-item>
            <a-form-item field="questionContent[0].options.value" label="Post2">
              <a-input v-model="form.questionContent[0].options.value" placeholder="请输入选项值" />
            </a-form-item>
            <a-form-item field="questionContent[0].options.result" label="Post2">
              <a-input v-model="form.questionContent[0].options.result" placeholder="请输入结果" />
            </a-form-item>
            <a-form-item field="questionContent[0].options.score" label="Post2">
              <a-input v-model="form.questionContent[0].options.score" placeholder="请输入分值" />
            </a-form-item>
          </a-space>
        </a-form-item>
      </a-form>
    </div>
  </a-modal> -->
</template>

<script setup lang="ts">
import { APP_TYPE_ENUM, APP_TYPE_MAP } from '@/constant/app'

const props = defineProps({
  title: { type: String, default: 'Title' },
  modelValue: { type: Boolean, default: false },
  form: { type: Object, default: {} },
})

const emit = defineEmits(['update:modelValue', 'ok', 'cancel'])

const handleVisibilityChange = (visible: boolean) => {
  emit('update:modelValue', visible)
}

// 确定事件
const handleOk = () => {
  // 返回给父组件，父组件进行处理
  emit('ok')
}

// 取消事件
const handleCancel = () => {
  // 返回给父组件，父组件进行处理
  emit('cancel')
}
</script>
