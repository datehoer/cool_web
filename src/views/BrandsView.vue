<template>
    <div class="brands">
      <h1>brands</h1>
      <el-button type="primary" @click="goToCategory">进入品牌类别</el-button>
      <el-button type="primary" @click="goToBack">返回上级</el-button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    name: 'Brands',
    setup() {
      const router = useRouter();
      function goToCategory() {
        router.push({ name: 'category' });
      }
      function goToBack() {
        router.back();
      }
      return { goToCategory, goToBack };
    },
    mounted() {
        console.log('Brands component is mounted!');
    },
  });
  </script>
  