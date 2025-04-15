<template>
  <div class="admin-app">
    <a-form :model="searchParams" @submit="loadData">
      <a-row :gutter="16">
        <a-col :span="8">
          <a-form-item field="appName" label="应用名" label-col-flex="100px">
            <a-input v-model="searchParams.appName" placeholder="请输入应用名" allow-clear />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="appDesc" label="应用描述" label-col-flex="80px">
            <a-input v-model="searchParams.appDesc" placeholder="请输入应用描述" allow-clear />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="appType" label="应用类型" label-col-flex="80px">
            <a-select :style="{ width: '320px' }" v-model="searchParams.appType" placeholder="请选择应用类型" allow-clear>
              <a-option v-for="item in APP_TYPE_ENUM" :value="item" :key="item">{{ APP_TYPE_MAP[item] }}</a-option>
            </a-select>
          </a-form-item>
          <a-form-item field="scoringStrategy" label="评分策略" label-col-flex="80px">
            <a-select :style="{ width: '320px' }" v-model="searchParams.scoringStrategy" placeholder="请选择评分策略" allow-clear>
              <a-option v-for="item in SCORE_STRATEGY_ENUM" :value="item" :key="item">{{ SCORE_STRATEGY_MAP[item] }}</a-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-space>
              <a-button @click="handleAdd" type="primary">
                <template #icon>
                  <icon-folder-add />
                </template>
                添加应用
              </a-button>
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
      <template #appType="{ record }">
        <a-tag>{{ APP_TYPE_MAP[record.appType] }}</a-tag>
      </template>
      <template #scoringStrategy="{ record }">
        <a-tag>{{ SCORE_STRATEGY_MAP[record.scoringStrategy] }}</a-tag>
      </template>
      <template #reviewStatus="{ record }">
        <a-tag>{{ REVIEW_STATUS_MAP[record.reviewStatus] }}</a-tag>
      </template>
      <template #appIcon="{ record }">
        <a-avatar v-if="record.appIcon.startsWith('http' || 'https')">
          <img alt="avatar" :src="record.appIcon" />
        </a-avatar>
        <a-avatar v-else>
          <img alt="avatar" src="@/assets/logo.png" />
        </a-avatar>
      </template>
      <template #userAvatar="{ record }">
        <a-avatar v-if="record.userAvatar != null">
          <img alt="avatar" :src="record.userAvatar" />
        </a-avatar>
        <a-avatar v-else>
          <img alt="avatar" src="@/assets/logo.png" />
        </a-avatar>
      </template>
      <template #reviewerId="{ record }">
        <a-button type="outline" v-if="record.reviewerId != null" status="warning" @click="handleReviewerId(record)">
          <template #icon>
            <icon-eye />
          </template>
        </a-button>
        <a-button type="outline" v-else status="warning">未审核</a-button>
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

    <!-- 添加/修改弹窗 -->
    <AdminAppModal v-if="ModalType !== null" :title="ModalType === 'add' ? '添加应用' : '编辑应用'" :form="editAppInfo" v-model="visible" @ok="handleOk" @cancel="handleCancel" />
    <!-- 审核人/创建人弹窗 -->
    <ReviewOrUserModal v-if="ReviewerOrUserModalType !== null" :title="ReviewerOrUserModalType === 'reviewerId' ? '审核人信息' : '创建人信息'" :form="reviewerOrUserInfo" v-model="visible" />
  </div>
</template>

<script setup lang="ts">
import { getUserByIdUsingGet } from '@/api/userController'
import { Message } from '@arco-design/web-vue'
import { computed, ref } from 'vue'
import { IconFolderAdd, IconSearch, IconSync } from '@arco-design/web-vue/es/icon'
// 日期格式校验
import dayjs from 'dayjs'
// 添加/修改弹窗
import AdminAppModal from '@/components/Modal/App/AdminAppModal.vue'
// 审核人/创建人弹窗
import ReviewOrUserModal from '@/components/Modal/Common/ReviewOrUserModal.vue'

import { addAppUsingPost, deleteAppUsingPost, listAppByPageUsingPost, updateAppUsingPost } from '@/api/appController'
import { APP_TYPE_ENUM, APP_TYPE_MAP, REVIEW_STATUS_MAP, SCORE_STRATEGY_ENUM, SCORE_STRATEGY_MAP } from '@/constant/app'
// 引入图标
import { IconEye, IconRecord } from '@arco-design/web-vue/es/icon'
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
  const res = await listAppByPageUsingPost(searchParams.value)
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
    title: '应用Id',
    dataIndex: 'id',
  },
  {
    title: '应用名称',
    dataIndex: 'appName',
  },
  {
    title: '应用描述',
    dataIndex: 'appDesc',
  },
  {
    title: '应用图标',
    slotName: 'appIcon',
  },
  {
    title: '用户头像',
    slotName: 'userAvatar',
  },
  {
    title: '应用类型',
    slotName: 'appType',
  },
  {
    title: '评分策略',
    slotName: 'scoringStrategy',
  },
  {
    title: '审核状态',
    slotName: 'reviewStatus',
  },
  {
    title: '审核信息',
    dataIndex: 'reviewMessage',
  },
  {
    title: '审核人Id',
    slotName: 'reviewerId',
  },
  {
    title: '创建人Id',
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

// 弹窗是否显示
const visible = ref(false) // 改为 const 声明
// 弹窗类型
const ModalType = ref('add')
let editAppInfo = ref<API.App>()
// 添加用户
const handleAdd = () => {
  visible.value = true
  ModalType.value = 'add'
  editAppInfo.value = {}
  ReviewerOrUserModalType.value = null
}

const handleEdit = (record: API.App) => {
  editAppInfo.value = JSON.parse(JSON.stringify(record))
  visible.value = true
  ModalType.value = 'edit'
  ReviewerOrUserModalType.value = null
}
// 删除用户
const handleDelete = async (record: API.App) => {
  let res = await deleteAppUsingPost({
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
  if (ModalType.value === 'add') {
    res = await addAppUsingPost(editAppInfo.value)
  } else if (ModalType.value === 'edit') {
    res = await updateAppUsingPost(editAppInfo.value)
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

// 审核人信息
const ReviewerOrUserModalType = ref('reviewerId')
const reviewerOrUserInfo = ref<API.User>()
const handleReviewerId = async (record: API.App) => {
  console.log(record.reviewerId, 'record.reviewerId')
  let res = await getUserByIdUsingGet({
    id: record.reviewerId,
  })
  if (res.data.code === 0) {
    visible.value = true
    reviewerOrUserInfo.value = res.data.data
    ReviewerOrUserModalType.value = 'reviewerId'
    ModalType.value = null
  }
}

// 获取用户信息
const handleUserId = async (record: API.App) => {
  console.log(record)
  //
  let res = await getUserByIdUsingGet({
    id: record.userId,
  })
  if (res.data.code === 0) {
    visible.value = true
    reviewerOrUserInfo.value = res.data.data
    ReviewerOrUserModalType.value = 'userId'
    ModalType.value = null
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
