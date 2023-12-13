import router from './router'
import store from './store'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import request from './utils/request'
import { ElNotification } from 'element-plus';
const app = createApp(App)
router.beforeEach(async (to, from, next) => {
    // 检查会话存储中是否已经显示过通知
    if (sessionStorage.getItem("notified") !== "true" && to.path !== '/login') {
        try {
            const response = await request.get('/task/task_info/tips');
            const data = response.data.data;
            for (const task in data) {
                ElNotification({
                    dangerouslyUseHTMLString: true,
                    message: `<p>${task}监控到的数据有 <span style="color: red;">${data[task]}</span> 条</p>`,
                    duration: 5000,
                });
            }
            // 设置会话标记为已通知
            sessionStorage.setItem("notified", "true");
        } catch (error) {
            console.error('请求任务提示失败:', error);
        }
    }
    next();
});
const token = localStorage.getItem('token');
if (token) {
    store.commit('SET_LOGIN_STATE', true);
}

app.use(ElementPlus)

app.use(store)
app.use(router)
app.mount('#app')