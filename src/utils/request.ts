    import axios from 'axios'
    import { ElMessage } from 'element-plus';
    import store from '@/store'; // 假设您的store文件在这个路径
import router from '@/router'; // 假设您的router文件在这个路径
    const request = axios.create({
        baseURL: 'http://localhost:8080/' // 基础路径
    })
    // 请求拦截器
    request.interceptors.request.use(
        config => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        error => {
            // 请求错误处理
            return Promise.reject(error);
        }
    );

    request.interceptors.response.use(
        response => {
            // 正常响应处理
            return response;
        },
        error => {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('token');
                store.dispatch('logout');
                ElMessage.error('登录信息失效');
                router.push('/login');
            }
            return Promise.reject(error);
        }
    );

    export default request
