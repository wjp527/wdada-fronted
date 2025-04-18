<template>
  <div class="UserLayout">
    <a-layout style="height: 100vh">
      <a-layout-header class="header"
        ><div class="flex flex-col items-center justify-center">
          <img class="w-[68px] h-[68px]" src="@/assets/logo.png" alt="" />
          <div class="my-4">π智链</div>
        </div>
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
.UserLayout {
  text-align: center;
  background: url('https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png') 0% 0% / 100% 100%;

  .header {
    margin-top: 16px;
    font-size: 21px;
  }

  .content {
    width: 100vw;
    margin-bottom: 28px;
    padding: 20px;
  }

  .footer {
    background-color: #efefef;
    padding: 16px;
    text-align: center;
  }
}
</style>
