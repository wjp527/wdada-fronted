<template>
  <div class="home-container">
    <ShareModal v-model="visible" />
    <div class="flex justify-center">
      <a-input-search :style="{ width: '320px' }" v-model="appName" placeholder="快速发现答题应用" search-button allow-clear @search="loadData" />
    </div>

    <a-list class="list-demo-action-layout" :grid-props="{ gutter: [20, 20], sm: 24, md: 12, lg: 8, xl: 6 }" :bordered="false" :data="appList" :pagination-props="paginationProps" @page-change="onPageChange" @page-size-change="onPageSizeChange">
      <template #item="{ item }">
        <a-list-item class="list-demo-item" action-layout="horizontal">
          <Card :app="item" />
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>
<script setup lang="ts">
// 导入需要的组件和方法
import { ref, reactive, watchEffect, computed } from 'vue'
import Card from '@/components/Card/index.vue'
import { listAppVoByPageUsingPost } from '@/api/appController'
import { REVIEW_STATUS_ENUM } from '@/constant/app'
import ShareModal from '@/components/Modal/ShareModal.vue'

const searchParams = ref({
  current: 1,
  pageSize: 12,
})
const appName = ref('')
const appList = ref([])
const total = ref(0)
const loadData = async () => {
  const params = {
    reviewStatus: REVIEW_STATUS_ENUM.PASS,
    appName: appName.value,
    ...searchParams.value,
  }
  let res = await listAppVoByPageUsingPost(params)
  console.log(res.data.data.total, 'res.data.data.total')
  if (res.data.code === 0) {
    appList.value = res.data.data.records
    total.value = res.data.data.total
  }
}
loadData()

watchEffect(() => {
  loadData()
})
const paginationProps = computed(() => ({
  current: searchParams.value.current,
  pageSize: searchParams.value.pageSize,
  total: total.value,
}))

// 页码改变
const onPageChange = (page: number) => {
  searchParams.value.current = page
  loadData()
}

// 每页条数改变
const onPageSizeChange = (size: number) => {
  // 更新搜索参数中的每页条数
  searchParams.value.pageSize = size
  // 切换每页条数时重置为第一页
  searchParams.value.current = 1 // 切换每页条数时重置为第一页
  // 重新加载数据
  loadData()
}
</script>
<style lang="less" scoped>
.list-demo-action-layout .image-area {
  width: 183px;
  height: 119px;
  border-radius: 2px;
  overflow: hidden;
}

.list-demo-action-layout .list-demo-item {
  padding: 20px 0;
  border-bottom: 1px solid var(--color-fill-3);
}

.list-demo-action-layout .image-area img {
  width: 100%;
}

.list-demo-action-layout .arco-list-item-action .arco-icon {
  margin: 0 4px;
}

::v-deep .arco-btn-shape-square {
  width: 46px !important;
  height: 36px !important;
}
</style>
