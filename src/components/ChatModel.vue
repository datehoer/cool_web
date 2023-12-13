<template>
    <div class="hello">
        <div class="common-layout">
            <el-container>
                <el-main :style="{ height: '800px', width: '100%', border: '2px solid #ccc' }">
                    <el-scrollbar height="800px">
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
                <el-row :style="{ width: '100%' }" :gutter="20">
                    <el-col :span="18">
                        <el-input
                        v-model="textarea" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"
                            placeholder="Please input" />
                    </el-col>
                    <el-col :span="6">
                        <el-button
                        type="primary" style="width: 42%; height: 100%;" plain
                            @click="handleButtonSend">发送</el-button>
                        <el-button
                        type="danger" style="width: 42%; height: 100%;" plain
                            @click="handleButtonClear">清空</el-button>
                    </el-col>
                </el-row>
            </el-container>
        </div>
    </div>
</template>

<script lang="ts" setup>
import request from '@/utils/request';
import { ref, onMounted } from 'vue';
import markdownit from 'markdown-it';
import 'highlight.js/styles/default.css'; // 确保引入了highlight.js的样式文件
import hljs from 'highlight.js';
import { getChatIdFromToken } from '@/utils/parseJwt';
const token = localStorage.getItem('token'); // 替换为实际的 token key
const chat_id = getChatIdFromToken(token);
const textarea = ref("");
const messages = ref<any>([]);
const md = markdownit({
    // Enable HTML tags in source
    html: true,

    // Use '/' to close single tags (<br />).
    // This is only for full CommonMark compatibility.
    xhtmlOut: false,

    // Convert '\n' in paragraphs into <br>
    breaks: false,

    // CSS language prefix for fenced blocks. Can be
    // useful for external highlighters.
    langPrefix: 'language-',

    // Autoconvert URL-like text to links
    linkify: true,

    // Enable some language-neutral replacement + quotes beautification
    // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.mjs
    typographer: true,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '“”‘’',

    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externally.
    // If result starts with <pre... internal wrapper is skipped.
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(str, { language: lang }).value;
            } catch (__) {}
        }

        return ''; // use external default escaping
    }
});

const parseMarkdown = (markdownText) => {
    return md.render(markdownText);
};
const get_message = async () => {
    try {
        const res = await request.get("/chat/chat-get-message", {
            params: {
                chat_id: chat_id
            }
        })
        if (res.data.code === 1) {
            messages.value = res.data.data;
        }
    } catch (e) {
        console.log(e);
    }
}
const handleButtonSend = async () => {
    try {
        const res = await request.post("/chat/chat-post-message",
            {
                chat_id: chat_id,
                message: textarea.value
            }
        )
        if (res.data.code === 1) {
            messages.value = res.data.data;
            textarea.value = "";
            get_message();
        }
    } catch (e) {
        console.log(e);
    }
}
const handleButtonClear = async () => {
    try {
        const res = await request.delete("/chat/chat-delete-message", {
            params: {
                chat_id: chat_id
            }
        }
        )
        if (res.data.code === 1) {
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

.el-container {
    flex-wrap: wrap;
}
</style>
