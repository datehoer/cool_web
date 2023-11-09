<template>
  <el-tabs v-model="activeTab" class="demo-tabs">
      <el-tab-pane label="Home" name="home"/>
      <el-tab-pane label="About" name="about"/>
      <el-tab-pane label="UserInfo" name="userinfo"/>
      <el-tab-pane label="Product" name="product"/>
      <el-tab-pane label="Task" name="task"/>
  </el-tabs>
  <router-view/>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const activeTab = ref('home');

const updateRoute = (tabName: string) => {
  router.push({ name: tabName });
};

watch(activeTab, (newTab) => {
  updateRoute(newTab);
});
</script>
