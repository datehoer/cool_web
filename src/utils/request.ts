import axios from 'axios'

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
export default request
