<template>
  <div v-if="route?.path?.startsWith('/user')">
    <RouterView></RouterView>
  </div>
  <div v-else>
    <BasicLayout></BasicLayout>
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
const route = useRoute()
import BasicLayout from '@/layout/BasicLayout.vue'
</script>

<style scoped></style>
