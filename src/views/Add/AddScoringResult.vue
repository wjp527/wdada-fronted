<template>
  <div id="addScoringResultPage">
    <h2 class="text-2xl mb-8">创建评分结果</h2>
    <a-form :model="form" :style="{ width: '480px' }" label-align="left" auto-label-width @submit="handleSubmit">
      <a-form-item field="appName" label="应用id" disabled>
        {{ appId }}
      </a-form-item>
      <a-form-item v-if="updateId" label="修改评分id">
        {{ updateId }}
      </a-form-item>
      <a-form-item field="resultName" label="结果名称">
        <a-input v-model="form.resultName" placeholder="请输入结果名称" />
      </a-form-item>
      <a-form-item field="resultDesc" label="结果描述">
        <a-input v-model="form.resultDesc" placeholder="请输入结果描述" />
      </a-form-item>
      <a-form-item field="resultPicture" label="结果图标">
        <Picture-uploader biz="app_icon" v-model="form.resultPicture" :value="form.resultPicture"></Picture-uploader>
      </a-form-item>
      <a-form-item field="resultProp" label="结果集">
        <a-input-tag v-model="form.resultProp" :style="{ width: '320px' }" placeholder="输入结果集" allow-clear />
      </a-form-item>
      <a-form-item field="resultScoreRange" label="结果得分范围">
        <a-input-number v-model="form.resultScoreRange" placeholder="请输入结果得分范围" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 120px"> 提交 </a-button>
      </a-form-item>
    </a-form>

    <h2 class="text-2xl mb-8">评分管理</h2>
    <ScoringResultTable ref="scoringResultTableRef" :appId="appId" :doUpdate="doUpdate" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import API from '@/api'
import message from '@arco-design/web-vue/es/message'
import { addScoringResultUsingPost, updateScoringResultUsingPost } from '@/api/scoringResultController'
import { defineProps, withDefaults } from 'vue/dist/vue'
import ScoringResultTable from './components/ScoringResultTable.vue'
import { useRouter } from 'vue-router'

interface Props {
  appId: string
}

const props = withDefaults(defineProps<Props>(), {
  appId: () => '',
})

const router = useRouter()

const scoringResultTableRef = ref()
const form = ref({
  resultDesc: '',
  resultName: '',
  resultPicture: '',
} as API.ScoringResultAddRequest)

const updateId = ref<string | number>()
const doUpdate = (scoringResult: API.ScoringResultVO) => {
  updateId.value = scoringResult?.id
  form.value = JSON.parse(JSON.stringify(scoringResult))
}

/**
 * 提交
 */
const handleSubmit = async () => {
  if (!props.appId) {
    return
  }
  let res
  // 如果是修改
  if (updateId.value) {
    res = await updateScoringResultUsingPost({
      id: updateId.value,
      ...form.value,
    })
  } else {
    res = await addScoringResultUsingPost({
      appId: props.appId as any,
      ...form.value,
    })
  }
  if (res.data.code === 0) {
    message.success('操作成功')
  } else {
    message.error('操作失败，' + res.data.message)
  }

  // 使用子组件的 loadData方法 【刷新表格】
  if (scoringResultTableRef.value) {
    scoringResultTableRef.value.loadData()
    updateId.value = undefined
    form.value = {
      resultDesc: '',
      resultName: '',
      resultPicture: '',
    }
  }
}
</script>
