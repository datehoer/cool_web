<template>
    <div class="login-container">
        <el-card class="box-card">
            <el-button type="primary" class="back-btn" @click="goLogin">&lt;&lt; Back</el-button>
            <h1 class="title">Sign Up</h1>
            <el-form ref="signUpFormRef" :model="signUpForm" :rules="signUpRules" class="login-form">
                <el-form-item prop="username">
                    <el-input v-model.trim="signUpForm.username" placeholder="username" />
                </el-form-item>
                <el-form-item prop="email">
                    <el-input v-model.trim="signUpForm.email" placeholder="email" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model.trim="signUpForm.password" placeholder="password" />
                </el-form-item>
                <el-form-item prop="confirmPassword">
                    <el-input type="password" v-model.trim="signUpForm.confirmPassword" placeholder="confirm password" />
                </el-form-item>
                <el-form-item prop="code">
                    <div class="code-container">
                        <el-input v-model.trim="signUpForm.code" placeholder="code" class="code-input" />
                        <el-button
                            :disabled="isCodeButtonDisabled"
                            @click="handleSendCode"
                            class="code-btn"
                            >发送验证码
                        </el-button>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="login-btn" @click="handleSignUp">Sign Up</el-button>
                </el-form-item>
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
const isCodeButtonDisabled = ref(false);

const store = useStore();
const router = useRouter();
const signUpFormRef = ref<any>(null);
const signUpForm = ref({
    username: '',
    password: '',
    email: '',
    confirmPassword: '',
    code: ''
});

const signUpRules = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
    confirmPassword: [{ required: true, message: '请确认密码', trigger: 'blur' }],
    code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
};

const fetchLogin = async () => {
    try {
        const response = await request.post("/user/register", signUpForm.value);
        if (response && response.data.code === 1) {
            router.push({ name: 'login' });
        } else {
            ElMessage.error(response.data.msg || '登录失败');
        }
    } catch (error) {
        ElMessage.error('登录请求失败');
        console.error(error);
    }
};
const handleSendCode = async () => {
    if (isCodeButtonDisabled.value) return;
    isCodeButtonDisabled.value = true;
    // 调用发送验证码的函数
    await fetchCode();

    // 启动60秒计时器

    setTimeout(() => {
        isCodeButtonDisabled.value = false;
    }, 60000);
};
const goLogin = () => {
    router.push({ name: 'login' });
};
const fetchCode = async () => {
    try {
        const response = await request.post("/user/sendCode", {
            email: signUpForm.value.email
        });
        if (response && response.data.code === 1) {
            ElMessage.success('验证码发送成功');
        } else {
            ElMessage.error(response.data.msg || '验证码发送失败');
        }
    } catch (error) {
        ElMessage.error('验证码发送请求失败');
        console.error(error);
    }
}
const handleSignUp = () => {
    signUpFormRef.value.validate((valid: any) => {
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
    position: relative;
}

.title {
    font-size: 24px;
    margin-bottom: 20px;
}

.back-btn {
    position: absolute;
    top: 10px;
    left: 10px;
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

.code-container {
    display: flex;
    align-items: center;
}

.code-input {
    flex-grow: 1;
    /* 确保输入框占据剩余空间 */
    margin-right: 10px;
    /* 在输入框和按钮之间添加一些间隔 */
}

.code-btn {
    white-space: nowrap;
    /* 防止按钮文字折行 */
}

/* 可能还需要进一步的样式调整 */</style>