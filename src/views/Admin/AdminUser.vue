<template>
  <div class="admin-user">
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
              <a-option value="ban">被封号</a-option>
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
                添加用户
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
      <template #userRole="{ record }">
        <a-tag v-if="record.userRole === 'admin'" color="green">管理员</a-tag>
        <a-tag v-else-if="record.userRole === 'user'" color="blue">用户</a-tag>
        <a-tag v-else color="red">被封号</a-tag>
      </template>
      <template #userAvatar="{ record }">
        <a-avatar v-if="record.userAvatar != null">
          <img alt="avatar" :src="record.userAvatar" />
        </a-avatar>
        <a-avatar v-else>
          <img alt="avatar" src="@/assets/logo.png" />
        </a-avatar>
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

    <User-Modal :title="userModalType === 'add' ? '添加用户' : '编辑用户'" :form="editUserInfo" v-model="visible" @ok="handleOk" @cancel="handleCancel" />
  </div>
</template>

<script setup lang="ts">
import { addUserUsingPost, deleteUserUsingPost, listUserVoByPageUsingPost, updateUserUsingPost } from '@/api/userController'
import { Message } from '@arco-design/web-vue'
import { computed, ref } from 'vue'
import { IconUserAdd, IconSearch, IconSync } from '@arco-design/web-vue/es/icon'
import UserModal from '@/components/Modal/index.vue' // 局部导入
import dayjs from 'dayjs'
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
  const res = await listUserVoByPageUsingPost(searchParams.value)
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
    title: '用户Id',
    dataIndex: 'id',
  },
  {
    title: '用户名',
    dataIndex: 'userName',
  },
  {
    title: '用户角色',
    slotName: 'userRole',
  },
  {
    title: '用户头像',
    slotName: 'userAvatar',
  },
  {
    title: '用户介绍',
    dataIndex: 'userProfile',
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
let editUserInfo = ref<API.User>()
// 添加用户
const handleAdd = () => {
  visible.value = true
  userModalType.value = 'add'
  editUserInfo.value = {}
}

const handleEdit = (record: API.User) => {
  editUserInfo.value = JSON.parse(JSON.stringify(record))
  visible.value = true
  userModalType.value = 'edit'
}
// 删除用户
const handleDelete = async (record: API.User) => {
  let res = await deleteUserUsingPost({
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
    res = await addUserUsingPost(editUserInfo.value)
  } else if (userModalType.value === 'edit') {
    res = await updateUserUsingPost(editUserInfo.value)
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
