<template>
  <div class="websiteIntroduction">
    <a-typography>
      <a-typography-title>π智链</a-typography-title>
      <a-typography-title :level="2">项目介绍:</a-typography-title>
      <a-typography-paragraph>
        {{ introduction }}
      </a-typography-paragraph>
    </a-typography>
  </div>
</template>
<script lang="ts" setup name="websiteIntroduction">
const introduction = '基于 Vue 3 + Spring Boot + Redis + ChatGLM + RxJava + SSE 的 AI 答题应用平台。 用户可以基于 AI 快速制作并发布答题应用，支持检索、分享、在线答题并基于 AI 得到回答总结；管理员可以集中管理和审核应用。'
</script>

<style lang="less" scoped></style>
