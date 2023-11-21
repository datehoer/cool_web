<template>
    <div class="top-bar-container">
      <el-tabs v-model="activeTab" class="demo-tabs">
        <el-tab-pane label="Home" name="home"/>
        <el-tab-pane label="About" name="about"/>
        <el-tab-pane label="UserInfo" name="userinfo"/>
        <el-tab-pane label="Product" name="product"/>
        <el-tab-pane label="Task" name="task"/>
      </el-tabs>
      <div class="user-info" @mouseover="hover = true" @mouseleave="hover = false">
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <span class="username">{{ username }}</span>
        <el-button v-if="hover" type="text" class="logout-btn" @click="logout">注销</el-button>
        <el-button v-if="hover" type="text" class="info-btn" @click="logout">用户信息</el-button>
    </div>
  </div>
</template>
  
<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import getUsernameFromToken from '@/utils/parseJwt';
import { useStore } from 'vuex';

const store = useStore();
const hover = ref(false);

const router = useRouter();
const route = useRoute();
const activeTab = ref(route.name || 'home');
const username = computed(() => {
    const token = localStorage.getItem('token'); // 替换为实际的 token key
    return getUsernameFromToken(token);
});
watch(() => route.name, (newRouteName) => {
    if (typeof newRouteName === 'string') {
        activeTab.value = newRouteName;
    }
});
watch(activeTab, (newTab) => {
  if (newTab !== route.name) {
    router.push({ name: newTab });
  }
});
const logout = () => {
  localStorage.removeItem('token'); // 清除 token
  store.dispatch('logout')
  router.push({ name: 'login' }); // 跳转到登录页面
};
</script>
  
<style scoped>
.top-bar-container {
  display: flex;
  justify-content: space-between; /* 确保内容分散对齐在两侧 */
  align-items: flex-start;
}
.el-tabs {
  flex: 9; /* 使标签页占据多余空间 */
}
.user-info {
  flex: 1;
  display: flex;
  align-items: center;
  margin-left: auto;
  border-bottom: 2.5px solid #e4e7ed;
  height: 37.5px;
  position: relative;
}

/* 可能需要对 el-tabs 的样式进行一些微调，确保它们的边界和对齐是正确的 */
.el-tabs .el-tab-pane {
  padding-right: 10px; /* 或者其他值，视您的设计而定 */
}
.logout-btn {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  display: none;
}

.user-info:hover .logout-btn {
  display: block;
}
</style>