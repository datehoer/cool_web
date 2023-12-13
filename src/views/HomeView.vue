<template>
    <div class="table-container">
        <img alt="Vue logo" src="../assets/banner.png" />
        <el-dialog v-model="dialogVisible" title="CoolGPT" width="30%" draggable>
            <ChatModel/>
        </el-dialog>
    </div>
    <el-button class="floating-button" type="primary" :icon="ChatLineRound" @click="dialogVisible = true" size="large"/>
</template>

<script lang="ts" setup>
import { ChatLineRound } from '@element-plus/icons-vue'
import { ref } from 'vue'
import ChatModel from '@/components/ChatModel.vue';
const dialogVisible = ref(false)
</script>
<style scoped>
html,
body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
    /* 防止出现滚动条 */
}

.table-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.floating-button {
    position: fixed;
    right: 20px;  /* 可根据需要调整距离右侧的距离 */
    bottom: 20px; /* 可根据需要调整距离底部的距离 */
    z-index: 1000; /* 确保在其他内容之上 */
}
</style>