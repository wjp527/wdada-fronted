<template>
  <a-modal :visible="modelValue" @update:visible="handleVisibilityChange">
    <template #title>{{ title }}</template>

    <div>
      <a-form :model="form">
        <a-form-item v-if="!form.id" field="userAccount" label="用户账号">
          <a-input disabled v-model="form.userAccount" placeholder="请输入用户账号" />
        </a-form-item>
        <a-form-item field="userName" label="用户">
          <a-input disabled v-model="form.userName" placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item field="userProfile" label="用户简介">
          <a-input disabled v-model="form.userProfile" placeholder="请输入用户简介" />
        </a-form-item>
        <a-form-item field="userAvatar" label="用户头像">
          <img :src="form.userAvatar" alt="" />
        </a-form-item>
        <a-form-item field="userRole" label="用户权限">
          <a-select disabled :style="{ width: '320px' }" v-model="form.userRole" placeholder="请选择用户权限" allow-clear>
            <a-option value="admin">管理员</a-option>
            <a-option value="user">普通用户</a-option>
            <a-option value="ban">ban</a-option>
          </a-select>
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
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
