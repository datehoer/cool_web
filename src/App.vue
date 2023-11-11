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
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const activeTab = ref('home'); // 默认设置为'home'

// 当路由变更时，更新activeTab
watch(() => route.name, (newRouteName) => {
  if (typeof newRouteName === 'string' && newRouteName !== activeTab.value) {
    activeTab.value = newRouteName;
  }
});

// 当Tab变更时，更新路由
watch(activeTab, (newTab) => {
  if (newTab !== router.currentRoute.value.name) {
    updateRoute(newTab);
  }
});

// 更新路由的函数
const updateRoute = (tabName: string) => {
  router.push({ name: tabName });
};
</script>


