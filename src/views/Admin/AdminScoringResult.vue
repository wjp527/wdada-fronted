<template>
  <div class="admin-scoring-result">
    <a-form :model="searchParams" @submit="loadData">
      <a-row :gutter="16">
        <a-col :span="8">
          <a-form-item field="resultName" label="结果名称" label-col-flex="100px">
            <a-input v-model="searchParams.resultName" placeholder="请输入结果名称" allow-clear />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="resultDesc" label="结果描述" label-col-flex="80px">
            <a-input v-model="searchParams.resultDesc" placeholder="请输入结果描述" allow-clear />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="resultProp" label="结果属性" label-col-flex="80px">
            <a-input v-model="searchParams.resultProp" placeholder="请输入结果属性" allow-clear />
          </a-form-item>
          <a-form-item>
            <a-space>
              <a-button html-type="submit" type="primary">
                <template #icon>
                  <icon-search />
                </template>
                搜索
              </a-button>
              <a-button @click="clearSearchParams()">
                <template #icon>
                  <icon-sync />
                </template>
                重置
              </a-button>
            </a-space>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>

    <a-table :columns="columns" :data="dataList" :pagination="pagination" @page-change="onPageChange" @page-size-change="onPageSizeChange">
      <template #resultPicture="{ record }">
        <a-avatar v-if="record?.resultPicture?.startsWith('http' || 'https')">
          <img alt="avatar" :src="record?.resultPicture" />
        </a-avatar>
        <a-avatar v-else>
          <img alt="avatar" src="@/assets/logo.png" />
        </a-avatar>
      </template>
      <template #userId="{ record }">
        <a-button type="outline" status="success" @click="handleUserId(record)">
          <template #icon>
            <icon-record />
          </template>
        </a-button>
      </template>
      <template #createTime="{ record }">
        {{ dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss') }}
      </template>
      <template #updateTime="{ record }">
        {{ dayjs(record.updateTime).format('YYYY-MM-DD HH:mm:ss') }}
      </template>

      <template #userEdit="{ record }">
        <a-button type="primary" @click="handleEdit(record)">编辑</a-button>
        <a-popconfirm content="您确定要删除吗?" @ok="handleDelete(record)">
          <a-button type="text">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>

    <User-Modal :title="userModalType === 'add' ? '添加用户' : '编辑用户'" :form="editScoringResult" v-model="visible" @ok="handleOk" @cancel="handleCancel" />

    <ReviewOrUserModal v-if="ReviewerOrUserModalType !== null" :title="ReviewerOrUserModalType === 'reviewerId' ? '审核人信息' : '创建人信息'" :form="reviewerOrUserInfo" v-model="visible" />
  </div>
</template>

<script setup lang="ts">
import { addUserUsingPost, deleteUserUsingPost, getUserByIdUsingGet, listUserVoByPageUsingPost, updateUserUsingPost } from '@/api/userController'
import { Message } from '@arco-design/web-vue'
import { computed, ref } from 'vue'
import { IconUserAdd, IconSearch, IconSync } from '@arco-design/web-vue/es/icon'
import UserModal from '@/components/Modal/index.vue' // 局部导入
import dayjs from 'dayjs'
import { addScoringResultUsingPost, deleteScoringResultUsingPost, listScoringResultByPageUsingPost, updateScoringResultUsingPost } from '@/api/scoringResultController'
// 审核人/创建人弹窗
import ReviewOrUserModal from '@/components/Modal/Common/ReviewOrUserModal.vue'
// 引入图标
import { IconRecord } from '@arco-design/web-vue/es/icon'
// 搜索条件
const searchParams = ref<API.UserQueryRequest>({
  userName: '',
  userRole: '',
  userProfile: '',
  current: 1,
  pageSize: 10,
})
// 展示数据
const dataList = ref<API.User[]>()
// 总条数
const total = ref<number>(0)
const pagination = computed(() => ({
  total: total.value,
  current: searchParams.value.current,
  pageSize: searchParams.value.pageSize,
  showTotal: true,
  showJumper: true,
}))
// 加载数据
const loadData = async () => {
  const res = await listScoringResultByPageUsingPost(searchParams.value)
  if (res.data.code === 0) {
    dataList.value = res.data.data.records
    total.value = res.data.data.total
  } else {
    Message.error(res.data.message)
  }
}

loadData()

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
  },
  {
    title: '结果名称',
    dataIndex: 'resultName',
  },
  {
    title: '结果描述',
    dataIndex: 'resultDesc',
  },
  {
    title: '结果图片',
    slotName: 'resultPicture',
  },
  {
    title: '结果属性',
    dataIndex: 'resultProp',
  },
  {
    title: '评分范围',
    dataIndex: 'resultScoreRange',
  },
  {
    title: '用户Id',
    slotName: 'userId',
  },
  {
    title: '创建时间',
    slotName: 'createTime',
  },
  {
    title: '更新时间',
    slotName: 'updateTime',
  },
  {
    title: '操作',
    slotName: 'userEdit',
  },
]
// 清空搜索条件
const clearSearchParams = () => {
  searchParams.value = {
    userName: '',
    userRole: '',
    userProfile: '',
    current: 1,
    pageSize: 10,
  }
  loadData()
}

const visible = ref(false) // 改为 const 声明
const userModalType = ref('add')
let editScoringResult = ref<API.User>()
// 添加用户
const handleAdd = () => {
  visible.value = true
  userModalType.value = 'add'
  editScoringResult.value = {}
}

const handleEdit = (record: API.User) => {
  editScoringResult.value = JSON.parse(JSON.stringify(record))
  visible.value = true
  userModalType.value = 'edit'
}
// 删除用户
const handleDelete = async (record: API.User) => {
  let res = await deleteScoringResultUsingPost({
    id: record.id,
  })
  if (res.data.code === 0) {
    Message.success('删除成功')
    loadData()
  } else {
    Message.error(res.data.message)
  }
}

const handleOk = async () => {
  visible.value = false
  // 处理确认逻辑
  let res = null
  if (userModalType.value === 'add') {
    res = await addScoringResultUsingPost(editScoringResult.value)
  } else if (userModalType.value === 'edit') {
    res = await updateScoringResultUsingPost(editScoringResult.value)
  }
  if (res.data.code === 0) {
    Message.success('操作成功')
    loadData()
  } else {
    Message.error(res.data.message)
  }
}

const handleCancel = () => {
  visible.value = false
  // 处理取消逻辑
}

// ===========
const reviewerOrUserInfo = ref<API.User>()
const ReviewerOrUserModalType = ref('userId')

// 获取用户信息
const handleUserId = async (record: API.App) => {
  //
  let res = await getUserByIdUsingGet({
    id: record.userId,
  })
  if (res.data.code === 0) {
    visible.value = true
    reviewerOrUserInfo.value = res.data.data
    ReviewerOrUserModalType.value = 'userId'
  }
}

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

<style lang="less" scoped></style>
