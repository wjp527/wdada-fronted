<template>
  <div class="basic-layout">
    <a-layout style="height: 100vh">
      <a-layout-header class="header">
        <Global-header />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer class="footer">
        <div class="flex flex-col items-center justify-center">
          <a href="https://beian.miit.gov.cn/#/Integrated/index">备案号 苏ICP备2025155289号-1</a>
          <a href="https://github.com/wjp527" target="_blank">wjp</a>
        </div>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
// 组件逻辑
</script>

<style lang="less" scoped>
.basic-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .header {
    margin-bottom: 16px;
    box-shadow: #eee 1px 1px 5px;
  }

  .content {
    max-width: 1400px;
    width: 100%;
    background: linear-gradient(to right, #fefefe, #fff);
    margin: 0 auto;
    margin-bottom: 28px;
    padding: 20px;
    box-sizing: border-box;
  }

  .footer {
    background-color: #efefef;
    padding: 16px;
    text-align: center;
  }
}

.arco-list-content {
  margin: 0 !important;
}
</style>
