import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserinfoView from '../views/UserinfoView.vue';
import ProductView from '../views/ProductView.vue';
import Brands from '../views/BrandsView.vue';
import Category from '../views/CategoryView.vue';
import Msg from '../views/MsgView.vue';
import Task from '../views/TaskView.vue';
import TaskResult from '../views/TaskResultView.vue';
import Login from "../views/LoginView.vue";
import Register from "../views/RegisterView.vue";
import Forget from "../views/ForgetView.vue";
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/login',
        name: 'login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Register
    },
    {
        path: '/forget',
        name: 'forget',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Forget
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
    {
        path: '/userinfo',
        name: 'userinfo',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: UserinfoView
    },
    {
        path: '/product',
        name: 'product',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: ProductView
    },
    {
        path: '/brands/:productId',
        name: 'brands',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Brands,
        beforeEnter: (to, from, next) => {
            console.log('Navigating to brands...');
            next();
        }
    },
    {
        path: '/category/:brandId&:productId',
        name: 'category',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Category
    },
    {
        path: '/msg/:categoryId',
        name: 'msg',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Msg
    },
    {
        path: '/task',
        name: 'task',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Task
    },
    {
        path: '/taskResult/:taskId',
        name: 'taskResult',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: TaskResult
    }

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem('token'); // 或者使用其他方法检查登录状态
    if (!isLoggedIn && to.path !== '/login' && to.path !== '/register' && to.path !== '/forget') {
        next('/login');
    } else {
        next();
    }
});
export default router
