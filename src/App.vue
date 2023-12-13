<template>
    <TopBar v-if="isLoggedIn" />
    <el-dialog v-model="dialogVisible" title="CoolGPT" width="30%" draggable>
        <ChatModel/>
    </el-dialog>
    <el-button class="floating-button" type="primary" :icon="ChatLineRound" @click="dialogVisible = true" size="large"/>
    <router-view />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import TopBar from './components/TopBar.vue';
import { ChatLineRound } from '@element-plus/icons-vue'
import ChatModel from '@/components/ChatModel.vue';
const dialogVisible = ref(false)
const store = useStore();
const isLoggedIn = computed(() => store.state.isLoggedIn);
</script>
<style>
html,
body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
}
.floating-button {
    position: fixed;
    right: 20px;  /* 可根据需要调整距离右侧的距离 */
    bottom: 20px; /* 可根据需要调整距离底部的距离 */
    z-index: 1000; /* 确保在其他内容之上 */
}
</style>