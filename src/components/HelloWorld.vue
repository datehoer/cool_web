<template>
    <div class="hello">
        <div class="common-layout">
            <el-container>
                <el-header :style="{ height: '50px', width: '1000px', backgroundColor: '#87CEEB' }">
                    <p class="centered-text">机器人</p>
                </el-header>
                <el-main :style="{ height: '600px', width: '1000px', border: '2px solid #ccc' }">
                    <el-scrollbar height="600px">
                        <div
                        class="message-container" v-for="(message, index) in messages" :key="index"
                            :class="get_message">
                            <div class="message-container">
                                <div class="bubble">
                                    <div class="message bot" v-if="index % 2 != 0" v-html="parseMarkdown(message)"></div>
                                </div>
                            </div>
                            <div class="message-container">
                                <div class="bubble">
                                    <div class="message user" v-if="index % 2 == 0" v-html="parseMarkdown(message)"></div>
                                </div>
                            </div>
                        </div>
                    </el-scrollbar>
                </el-main>
                <el-row :style="{ width: '1000px' }">
                    <el-input
                        v-model="textarea"
                        :autosize="{ minRows: 2, maxRows: 4 }"
                        type="textarea"
                        placeholder="Please input"
                    />
                    <el-button type="primary" plain style="width: 50px;" @click="handleButtonClick">发送</el-button>
                </el-row>
            </el-container>
        </div>
    </div>
</template>

<script lang="ts" setup>
import request from '@/utils/request';
import { ref, onMounted } from 'vue';
import MarkdownIt from 'markdown-it';
const chat_id = ref(1);
const textarea = ref("");
const messages = ref<any>([]);
const md = new MarkdownIt();
const parseMarkdown = (markdownText) => {
    return md.render(markdownText);
};
const get_message = async () => {
    try {
        const res = await request.get("/chat/chat-get-message", {
            params: {
                chat_id: chat_id.value
            }
        })
        if (res.data.code === 1) {
            messages.value = res.data.data;
        }
    } catch (e) {
        console.log(e);
    }
}
const handleButtonClick = async () => {
    try {
        const res = await request.post("/chat/chat-post-message",
            {
                chat_id: chat_id.value,
                message: textarea.value
            }
        )
        if (res.data.code === 0) {
            messages.value = res.data.data;
            textarea.value = "";
            get_message();
        }
    } catch (e) {
        console.log(e);
    }
}
onMounted(() => {
    get_message();
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.centered-text {
    text-align: center;
    color: black;
}

.message-container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    justify-content: space-between;
}

.bubble {
    background-color: #e8e8e8;
    color: #000;
    border-radius: 5px;
}

.message {
    text-align: left;
    padding: 1px 10px;
    margin: 0;
}
</style>
