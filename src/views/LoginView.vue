<template>
    <div class="login-container">
      <el-card class="box-card">
        <div class="clearfix">
          <span>登录</span>
        </div>
        <el-form ref="loginFormRef" :model="loginForm" :rules="rules" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model.trim="loginForm.username"/>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model.trim="loginForm.password"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleLogin">登录</el-button>
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
  
  const handleLogin = () => {
    loginFormRef.value.validate((valid: any) => {
      if (valid) fetchLogin();
    });
  };
  </script>
  
  <style scoped>
  .login-container {
    width: 300px;
    margin: 100px auto 0;
  }
  
  .box-card {
    padding: 20px;
  }
  </style>
  