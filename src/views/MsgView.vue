<template>
    <div class="msg">
      <h1>msg</h1>
      <el-button type="primary" @click="goToBack">返回上级</el-button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    name: 'Msg',
    setup() {
      const router = useRouter();
      function goToBack() {
        router.back();
      }
      return { goToBack };
    },
  });
  </script>
  