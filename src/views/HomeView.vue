<template>
    <div class="table-container">
        <img alt="Vue logo" src="../assets/logo.png" />
        <el-button text @click="dialogVisible = true">
            Click to open Dialog
        </el-button>
        <el-dialog v-model="dialogVisible" title="CoolGPT" width="30%" draggable>
            <HelloWorld/>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
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
</style>