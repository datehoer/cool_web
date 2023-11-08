<template>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="Home" name="first">
        <HomeView />
      </el-tab-pane>
      <el-tab-pane label="About" name="second">
        <AboutView />
      </el-tab-pane>
      <el-tab-pane label="UserInfo" name="third">
        <UserinfoView />
      </el-tab-pane>
    </el-tabs>
  </template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import AboutView from './views/AboutView.vue';
import HomeView from './views/HomeView.vue';
import UserinfoView  from './views/UserinfoView.vue';

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>
<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
