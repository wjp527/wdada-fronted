<template>
  <div class="admin-user-answer">
    <a-form :model="searchParams" @submit="loadData">
      <a-row :gutter="16">
        <a-col :span="8">
          <a-form-item field="resultName" label="结果名称" label-col-flex="100px">
            <a-input v-model="searchParams.resultName" placeholder="请输入结果名称" allow-clear />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="appType" label="应用类型" label-col-flex="80px">
            <a-select :style="{ width: '320px' }" v-model="searchParams.appType" placeholder="请选择应用类型" allow-clear>
              <a-option v-for="item in APP_TYPE_ENUM" :value="item">{{ APP_TYPE_MAP[item] }}</a-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
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
      <template #appType="{ record }">
        {{ APP_TYPE_MAP[record.appType] }}
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
      <template #scoringStrategy="{ record }">
        {{ SCORE_STRATEGY_MAP[record.scoringStrategy] }}
      </template>
      <template #createTime="{ record }">
        {{ dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss') }}
      </template>
      <template #updateTime="{ record }">
        {{ dayjs(record.updateTime).format('YYYY-MM-DD HH:mm:ss') }}
      </template>

      <template #userEdit="{ record }">
        <a-popconfirm content="您确定要删除吗?" @ok="handleDelete(record)">
          <a-button type="text">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>

    <User-Modal :title="userModalType === 'add' ? '添加用户' : '编辑用户'" :form="editUserAnswer" v-model="visible" @ok="handleOk" @cancel="handleCancel" />
  </div>
</template>

<script setup lang="ts">
import { addUserUsingPost, deleteUserUsingPost, getUserByIdUsingGet, getUserVoByIdUsingGet, listUserVoByPageUsingPost, updateUserUsingPost } from '@/api/userController'
import { Message } from '@arco-design/web-vue'
import { computed, ref } from 'vue'
import { IconUserAdd, IconSearch, IconSync } from '@arco-design/web-vue/es/icon'
import UserModal from '@/components/Modal/index.vue' // 局部导入
import dayjs from 'dayjs'
import { addUserAnswerUsingPost, deleteUserAnswerUsingPost, getUserAnswerVoByIdUsingGet, listMyUserAnswerVoByPageUsingPost, listUserAnswerByPageUsingPost, updateUserAnswerUsingPost } from '@/api/userAnswerController'
import { APP_TYPE_ENUM, APP_TYPE_MAP, SCORE_STRATEGY_MAP } from '@/constant/app'
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
  const res = await listMyUserAnswerVoByPageUsingPost(searchParams.value)
  if (res.data.code === 0) {
    dataList.value = res.data.data.records
    total.value = res.data.data.total
  } else {
    Message.error(res.data.message + '111')
  }
}

loadData()

const columns = [
  {
    title: '答题记录Id',
    dataIndex: 'id',
  },
  // {
  //   title: '选项',
  //   dataIndex: 'choices',
  // },
  {
    title: '结果Id',
    dataIndex: 'resultId',
  },
  {
    title: '结果名称',
    dataIndex: 'resultName',
  },
  {
    title: '应用类型',
    slotName: 'appType',
  },
  {
    title: '用户Id',
    slotName: 'userId',
  },
  {
    title: '评分策略',
    slotName: 'scoringStrategy',
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
let editUserAnswer = ref<API.User>()
// 添加用户
const handleAdd = () => {
  visible.value = true
  userModalType.value = 'add'
  editUserAnswer.value = {}
}

const handleEdit = (record: API.User) => {
  editUserAnswer.value = JSON.parse(JSON.stringify(record))
  visible.value = true
  userModalType.value = 'edit'
}
// 删除用户
const handleDelete = async (record: API.User) => {
  let res = await deleteUserAnswerUsingPost({
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
    res = await addUserAnswerUsingPost(editUserAnswer.value)
  } else if (userModalType.value === 'edit') {
    res = await updateUserAnswerUsingPost(editUserAnswer.value)
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

// ======================
const userInfo = ref<API.User>()
const handleUserId = async (record: API.UserAnswerVO) => {
  let res = await getUserVoByIdUsingGet({
    id: record.userId,
  })
  if (res.data.code === 0) {
    userInfo.value = res.data.data
  } else {
    Message.error(res.data.message)
  }
}

// 页码改变
const onPageChange = (page: number) => {
  searchParams.value.current = page
  loadData()
}

// 每页条数改变
const onPageSizeChange = (size: number) => {
  searchParams.value.pageSize = size
  searchParams.value.current = 1 // 切换每页条数时重置为第一页
  loadData()
}
</script>

<style lang="less" scoped></style>
