<template>
  <a-modal :visible="localVisible" @ok="handleOk" @cancel="handleCancel">
    <!-- 弹窗内容 -->
     <template #title>题目列表</template>
    <div class="question-list" v-if="record?.questionContent">
      <div  v-for="(question, index) in JSON.parse(record?.questionContent)" :key="index" class="question-item">
        <div class="question-title">{{ question.title }}</div>
        <div class="options-container">
          <div v-for="option in question.options" :key="option.key" class="option-item">
            <span class="option-key">{{ option.key }}.</span>
            <span class="option-value">{{ option.value }}</span>
            <span class="option-result">({{ option.result }})</span>
          </div>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  visible: Boolean,
  record: Object,
})

const emit = defineEmits(['update:visible'])

// 使用本地变量中转
const localVisible = ref(props.visible)

// 监听父组件传来的 visible 变化
watch(
  () => props.visible,
  newVal => {
    localVisible.value = newVal
  }
)

// 监听本地 visible 变化并通知父组件
watch(localVisible, newVal => {
  emit('update:visible', newVal)
})

const handleOk = () => {
  localVisible.value = false
}

const handleCancel = () => {
  localVisible.value = false
}
</script>
<style lang="less" scoped>
.question-list {
  padding: 12px;

  .question-item {
    margin-bottom: 16px;
    padding: 12px;
    border: 1px solid #e5e6eb;
    border-radius: 4px;

    &:hover {
      background-color: #f2f3f5;
    }

    .question-title {
      font-weight: 500;
      margin-bottom: 8px;
      color: #1d2129;
    }

    .options-container {
      padding-left: 16px;

      .option-item {
        margin: 8px 0;
        display: flex;
        align-items: center;
        gap: 8px;

        .option-key {
          color: #4e5969;
          font-weight: 500;
        }

        .option-value {
          color: #1d2129;
        }

        .option-result {
          color: #86909c;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
