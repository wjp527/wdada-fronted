<template>
  <a-card class="appCard" hoverable @click="doCardClick">
    <template #actions>
      <span class="icon-hover" @click="handleShare"> <IconShareInternal /> </span>
    </template>
    <template #cover>
      <div
        :style="{
          height: '204px',
          overflow: 'hidden',
        }"
      >
        <img :style="{ width: '100%', transform: 'translateY(-20px)' }" alt="dessert" :src="app.appIcon" v-if="app.appIcon?.startsWith('https://') && app.appIcon != null" />
        <img class="!w-[300px] !h-[300px]" src="@/assets/logo.png" alt="" v-else />
      </div>
    </template>
    <a-card-meta :title="app?.appName" :description="app?.appDesc">
      <template #avatar>
        <div :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }">
          <a-avatar :size="24" :style="{ marginRight: '8px' }">
            <img :src="app.user.userAvatar" alt="avatar" />
          </a-avatar>
          <a-typography-text>{{ app.appName ?? '佚名' }}</a-typography-text>
        </div>
      </template>
    </a-card-meta>
  </a-card>
  <ShareModal ref="shareModalRef" :link="link" :title="title" />
</template>

<script lang="ts" setup>
import { IconThumbUp, IconShareInternal, IconMore } from '@arco-design/web-vue/es/icon'

import API from '@/api'
import { ref, defineProps, withDefaults } from 'vue'
import { useRouter } from 'vue-router'
import ShareModal from '@/components/Modal/ShareModal.vue'

interface Props {
  app: API.AppVO
}

const props = withDefaults(defineProps<Props>(), {
  app: () => {
    return {}
  },
})

const router = useRouter()
const doCardClick = () => {
  router.push(`/app/detail/${props.app.id}`)
}

// 分享
const shareModalRef = ref('')
const link = ref('')
const title = ref('')
link.value = `${window.location.protocol}//${window.location.host}/app/detail/${props.app.id}`
title.value = '应用分享'
const handleShare = (e: any) => {
  if (shareModalRef.value) {
    // 阻止冒泡
    e.stopPropagation()
    shareModalRef.value.onOpen()
  }
}
</script>
<style scoped>
.icon-hover {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  transition: all 0.1s;
}
.icon-hover:hover {
  background-color: rgb(var(--gray-2));
}

.arco-list-content {
  margin: 0 !important;
}
</style>
