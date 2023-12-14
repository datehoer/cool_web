<template>
    <div class="table-container">
        <div class="block text-center">
            <span class="demonstration">Switch when indicator is clicked</span>
            <el-carousel height="150px">
                <el-carousel-item v-for="key in imagesPath" :key="key">
                    <el-image :src="key" fit="contain" style="width: 100%; height: 100%" />
                </el-carousel-item>
            </el-carousel>
        </div>
        <el-dialog v-model="dialogVisible" title="CoolGPT" width="30%" draggable>
            <ChatModel />
        </el-dialog>
    </div>
    <el-button class="floating-button" type="primary" :icon="ChatLineRound" @click="dialogVisible = true" size="large" />
</template>

<script lang="ts" setup>
import { ChatLineRound } from '@element-plus/icons-vue'
import { ref } from 'vue'
import ChatModel from '@/components/ChatModel.vue';
const dialogVisible = ref(false)
const imagesPath = ["https://s2.loli.net/2023/12/14/eWEcB3uA9R5DzUy.png", "https://s2.loli.net/2023/12/14/X4hDavyJVPWtumB.png", "https://s2.loli.net/2023/12/14/4k8rRAvBbuS7D3U.png"]
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
    right: 20px;
    /* 可根据需要调整距离右侧的距离 */
    bottom: 20px;
    /* 可根据需要调整距离底部的距离 */
    z-index: 1000;
    /* 确保在其他内容之上 */
}

.demonstration {
    color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}</style>