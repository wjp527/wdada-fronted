<template>
  <div v-if="visible">
    <a-modal :visible="visible" :footer="false" @cancel="visible = false">
      <template #title>{{ title }}</template>
      <h4>赋值分享链接</h4>
      <a-typography-paragraph copyable>
        {{ link }}
      </a-typography-paragraph>
      <h4 class="">手机扫码查看</h4>
      <img :src="codeImg" alt="" />
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, withDefaults, defineProps, onMounted } from 'vue'
import QRCode from 'qrcode'
import { Message } from '@arco-design/web-vue'

interface Props {
  // 分享链接
  link: string
  // 弹窗标题
  title: string
}

const props = withDefaults(defineProps<Props>(), {
  link: () => 'https://github.com/wjp527',
  title: () => '分享',
})

const visible = ref(false)
const link = ref(props.link)
const codeImg = ref('')

// With promises
QRCode.toDataURL(link.value)
  .then(url => {
    codeImg.value = url
  })
  .catch(err => {
    console.error(err)
    Message.error('生成二维码失败: ' + err.message)
  })
const onOpen = () => {
  visible.value = true
}

// 暴露方法
defineExpose({
  onOpen,
})
</script>

<style lang="less" scoped></style>
