<template>
    <div class="top-bar-container">
        <el-tabs v-model="activeTab" class="demo-tabs">
            <el-tab-pane label="Home" name="home" />
            <el-tab-pane label="About" name="about" />
            <el-tab-pane label="UserInfo" name="userinfo" />
            <el-tab-pane label="Product" name="product" />
            <el-tab-pane label="Task" name="task" />
        </el-tabs>
        <el-dropdown>
            <div class="user-info" @mouseover="hover = true" @mouseleave="hover = false">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                <span class="username">{{ username }}</span>
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                <el-dropdown-item @click="logout">用户信息</el-dropdown-item>
                <el-dropdown-item @click="logout">注销</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
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
    try{
        const token = localStorage.getItem('token'); // 替换为实际的 token key
        const name = getUsernameFromToken(token);
        return name;
    }catch(e){
        localStorage.removeItem('token'); // 清除 token
        store.dispatch('logout')
    }
    return null;
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
    sessionStorage.removeItem('notified'); // 清除 token
    store.dispatch('logout')
    router.push({ name: 'login' }); // 跳转到登录页面
};
</script>

<style scoped>
.top-bar-container {
    display: flex;
    justify-content: space-between;
    /* 确保内容分散对齐在两侧 */
    align-items: flex-start;
}

.el-tabs {
    flex: 9;
    /* 使标签页占据多余空间 */
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
</style>