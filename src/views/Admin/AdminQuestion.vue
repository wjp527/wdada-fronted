<template>
  <div class="admin-question">
    <a-form :model="searchParams" @submit="loadData">
      <a-row :gutter="16">
        <a-col :span="8">
          <a-form-item field="userName" label="用户名" label-col-flex="100px">
            <a-input v-model="searchParams.userName" placeholder="请输入用户名" allow-clear />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="userRole" label="用户角色" label-col-flex="80px">
            <a-select :style="{ width: '320px' }" v-model="searchParams.userRole" placeholder="请选择用户角色" allow-clear>
              <a-option value="admin">管理员</a-option>
              <a-option value="user">用户</a-option>
              <a-option value="ban">禁用</a-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="userProfile" label="用户介绍" label-col-flex="80px">
            <a-input v-model="searchParams.userProfile" placeholder="请输入用户介绍" allow-clear />
          </a-form-item>
          <a-form-item>
            <a-space>
              <a-button @click="handleAdd" type="primary">
                <template #icon>
                  <icon-user-add />
                </template>
                添加题目
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
      <template #questionContent="{ record }">
        <a-button type="primary" size="small" @click="showQuestionDetail(record)"> 查看题目 </a-button>
        <ShowQuestion 
    :record="currentQuestion" 
    :visible="modalVisible"
    @update:visible="handleVisibleChange"
  />
      </template>
      <template #userId="{ record }">
        <a-popover title="用户信息" trigger="click" @popup-visible-change="handleUserId(record)">
          <a-button>{{ record.userId }}</a-button>
          <template #content>
            <div>
              <p>用户名: {{ userInfo?.userName }}</p>
              <p>用户介绍: {{ userInfo?.userProfile }}</p>
            </div>
          </template>
        </a-popover>
      </template>
      <template #appId="{ record }">
        <a-popover title="应用信息" trigger="click" @popup-visible-change="handleAppId(record)">
          <a-button>{{ record.appId }}</a-button>
          <template #content>
            <div>
              <p>应用名: {{ appInfo?.appName }}</p>
              <p>应用介绍: {{ appInfo?.appDesc }}</p>
            </div>
          </template>
        </a-popover>
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

    <QuestionModal :title="userModalType === 'add' ? '添加题目' : '编辑题目'" :form="editQuestionInfo" v-model="visible" @ok="handleOk" @cancel="handleCancel" />
  </div>
</template>

<script setup lang="ts">
import { addUserUsingPost, deleteUserUsingPost, getUserByIdUsingGet, listUserVoByPageUsingPost, updateUserUsingPost } from '@/api/userController'
import { Message } from '@arco-design/web-vue'
import { computed, ref } from 'vue'
import { IconUserAdd, IconSearch, IconSync } from '@arco-design/web-vue/es/icon'

import QuestionModal from '@/components/Modal/Question/index.vue' // 局部导入
import dayjs from 'dayjs'
import { addQuestionUsingPost, deleteQuestionUsingPost, listQuestionByPageUsingPost, updateQuestionUsingPost } from '@/api/questionController'
// 引入图标
import { IconRecord } from '@arco-design/web-vue/es/icon'
import { getAppVoByIdUsingGet } from '@/api/appController'
import ShowQuestion from '@/components/Modal/Question/ShowQuestion.vue'
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
  const res = await listQuestionByPageUsingPost(searchParams.value)
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
    title: '题目Id',
    dataIndex: 'id',
  },
  {
    title: '题目内容',
    slotName: 'questionContent',
  },
  {
    title: '用户Id',
    slotName: 'userId',
  },
  {
    title: '应用Id',
    slotName: 'appId',
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
let editQuestionInfo = ref<API.QuestionAddRequest>({
  appId: 0,
  questionContent: [
    {
      options: [
        {
          key: '',
          result: '',
          score: 0,
          value: '',
        },
      ],
      title: '',
    },
  ],
})
// 添加用户
const handleAdd = () => {
  visible.value = true
  userModalType.value = 'add'
  editQuestionInfo.value = {
    appId: 0,
    questionContent: [
      {
        options: [
          {
            key: '',
            result: '',
            score: 0,
            value: '',
          },
        ],
        title: '',
      },
    ],
  }
}

const handleEdit = (record: API.Question) => {
  editQuestionInfo.value = JSON.parse(JSON.stringify(record))
  visible.value = true
  userModalType.value = 'edit'
}
// 删除用户
const handleDelete = async (record: API.Question) => {
  let res = await deleteQuestionUsingPost({
    id: record.id,
  })
  if (res.data.code === 0) {
    Message.success('删除成功')
    loadData()
  } else {
    Message.error(res.data.message)
  }
}

// 确认按钮【添加/修改 - 子组件传来】

const handleOk = async () => {
  visible.value = false
  // 处理确认逻辑
  let res = null
  if (userModalType.value === 'add') {
    res = await addQuestionUsingPost(editQuestionInfo.value)
  } else if (userModalType.value === 'edit') {
    res = await updateQuestionUsingPost(editQuestionInfo.value)
  }
  if (res.data.code === 0) {
    Message.success('操作成功')
    loadData()
  } else {
    Message.error(res.data.message)
  }
}

// 取消按钮【添加/修改 - 子组件传来】
const handleCancel = () => {
  visible.value = false
  // 处理取消逻辑
}

// =------------------------------

// 获取用户信息
const userInfo = ref<API.User>()
const handleUserId = async (record: API.User) => {
  const res = await getUserByIdUsingGet({
    id: record.userId,
  })
  if (res.data.code === 0) {
    userInfo.value = res.data.data
  }
}

// 获取应用信息
const appInfo = ref<API.App>()
const handleAppId = async (record: API.User) => {
  const res = await getAppVoByIdUsingGet({
    id: record.appId,
  })
  if (res.data.code === 0) {
    appInfo.value = res.data.data
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
 
const currentQuestion = ref<API.Question>()

const modalVisible = ref(false) // 父组件状态

// 监听子组件的 visible 变化
const handleVisibleChange = (newVisible) => {
  modalVisible.value = newVisible
}
const showQuestionDetail = (record: API.Question) => {
  modalVisible.value = true
  console.log( modalVisible.value ,' modalVisible.value ');
  currentQuestion.value = record
}
</script>
