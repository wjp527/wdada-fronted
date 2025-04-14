<template>
 
<button>{{ text }}</button>
</template>


<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: '按钮'
  }
})
</script>

<style lang="less" scoped>
/* From Uiverse.io by adamgiebl */ 
button {
  font-size: 16px;
  padding: 0.8em 3.3em;
  // padding: 0.8em 3.3em;
  cursor: pointer;
  transform: perspective(200px) rotateX(15deg);
  color: white;
  font-weight: 900;
  border: none;
  border-radius: 5px;
  background: linear-gradient(
    0deg,
    rgba(63, 94, 251, 1) 0%,
    rgba(70, 135, 252, 1) 100%
  );
  box-shadow: rgba(63, 94, 251, 0.2) 0px 40px 29px 0px;
  will-change: transform;
  transition: all 0.3s;
  border-bottom: 2px solid rgba(70, 135, 252, 1);
}

button:hover {
  transform: perspective(180px) rotateX(30deg) translateY(2px);
}

button:active {
  transform: perspective(170px) rotateX(36deg) translateY(5px);
}

</style>