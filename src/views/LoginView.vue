<template>
    <div class="login-container">
        <el-card class="box-card">
            <h1 class="title">Sign in</h1>
            <el-form ref="loginFormRef" :model="loginForm" :rules="rules" class="login-form">
                <el-form-item prop="username">
                    <el-input v-model.trim="loginForm.username" placeholder="username" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model.trim="loginForm.password" placeholder="password" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="login-btn" @click="handleLogin">Login</el-button>
                </el-form-item>
                <div class="signup-text">Don't have account?
                    <el-button type="primary" text @click="goToSignUp">Sign up</el-button>
                </div>
            </el-form>
        </el-card>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import request from '@/utils/request';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();
const loginFormRef = ref<any>(null);
const loginForm = ref({
    username: '',
    password: ''
});

const rules = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
};

const fetchLogin = async () => {
    try {
        const response = await request.post("/login", loginForm.value);
        if (response && response.data.code === 1) {
            localStorage.setItem('token', response.data.data.token);
            store.dispatch("login")
            router.push({ name: 'home' });
        } else {
            ElMessage.error(response.data.msg || '登录失败');
        }
    } catch (error) {
        ElMessage.error('登录请求失败');
        console.error(error);
    }
};
const goToSignUp = () => {
    router.push({ name: 'register' });
};
const goToForgetPassword = () => {
    router.push({ name: 'forget' });
};
const handleLogin = () => {
    loginFormRef.value.validate((valid: any) => {
        if (valid) fetchLogin();
    });
};
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    /* 用 min-height 保证至少100% 的视口高度 */
    background: linear-gradient(to right, #a18cd1, #fbc2eb);
}

.box-card {
    width: 400px;
    max-width: 100%;
    /* 防止在小屏幕上超出视口宽度 */
    padding: 35px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    text-align: center;
    box-sizing: border-box;
    /* 确保内边距和边框包含在宽度内 */
}

.title {
    font-size: 24px;
    margin-bottom: 20px;
}

.login-form {
    margin-top: 20px;
}

.login-btn {
    width: 100%;
    padding: 10px 0;
    /* 增加按钮的高度 */
}

.signup-text {
    margin-top: 15px;
}

.signup-text a {
    color: #409EFF;
    cursor: pointer;
}

/* 可能还需要进一步的样式调整 */
</style>