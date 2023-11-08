<template>
    <div class="category">
      <h1>category</h1>
      <el-button type="primary" @click="goToMsg">进入消息</el-button>
      <el-button type="primary" @click="goToBack">返回上级</el-button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    name: 'Category',
    setup() {
      const router = useRouter();
      function goToMsg() {
        router.push({ name: 'msg' });
      }
      function goToBack() {
        router.back();
      }
      return { goToMsg, goToBack };
    },
  });
  </script>
  