<template>
  <a-modal :visible="modelValue" @update:visible="handleVisibilityChange" @ok="handleOk" @cancel="handleCancel">
    <template #title>{{ title }}</template>

    <div>
      <a-form :model="form">
        <a-form-item field="appName" label="应用名称">
          <a-input v-model="form.appName" placeholder="请输入应用名称" />
        </a-form-item>
        <a-form-item field="appDesc" label="应用描述">
          <a-input v-model="form.appDesc" placeholder="请输入应用简介" />
        </a-form-item>
        <a-form-item field="appIcon" label="应用图标">
          <Picture-uploader biz="app_icon" v-model="form.appIcon"></Picture-uploader>
        </a-form-item>
        <a-form-item field="appType" label="应用类型">
          <a-select :style="{ width: '320px' }" v-model="form.appType" placeholder="请选择应用类型" allow-clear>
            <a-option v-for="item in APP_TYPE_ENUM" :value="item" :key="item">{{ APP_TYPE_MAP[item] }}</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="scoringStrategy" label="评分策略">
          <a-select :style="{ width: '320px' }" v-model="form.scoringStrategy" placeholder="请选择评分策略" allow-clear>
            <a-option v-for="item in SCORE_STRATEGY_ENUM" :value="item" :key="item">{{ SCORE_STRATEGY_MAP[item] }}</a-option>
          </a-select>
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { APP_TYPE_ENUM, APP_TYPE_MAP, SCORE_STRATEGY_ENUM, SCORE_STRATEGY_MAP } from '@/constant/app'

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
