import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { getUserRolesFromToken } from '@/utils/parseJwt';
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
        component: HomeView,
        meta: {
            requiresAuth: true,
            roles: ['user']
        }
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
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
        meta: {
            requiresAuth: true,
            roles: ['user']
        }
    },
    {
        path: '/userinfo',
        name: 'userinfo',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: UserinfoView,
        meta: {
            requiresAuth: true,
            roles: ['user']
        }
    },
    {
        path: '/product',
        name: 'product',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: ProductView,
        meta: {
            requiresAuth: true,
            roles: ['user']
        }
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
        },
        meta: {
            requiresAuth: true,
            roles: ['user']
        }
    },
    {
        path: '/category/:brandId&:productId',
        name: 'category',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Category,
        meta: {
            requiresAuth: true,
            roles: ['user']
        }
    },
    {
        path: '/msg/:categoryId',
        name: 'msg',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Msg,
        meta: {
            requiresAuth: true,
            roles: ['user']
        }
    },
    {
        path: '/task',
        name: 'task',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Task,
        meta: {
            requiresAuth: true,
            roles: ['admin']
        }
    },
    {
        path: '/taskResult/:taskId',
        name: 'taskResult',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: TaskResult,
        meta: {
            requiresAuth: true,
            roles: ['admin']
        }
    }

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem('token');
    const userRoles = isLoggedIn ? getUserRolesFromToken(localStorage.getItem('token')) : [];
    if (!isLoggedIn && to.path !== '/login' && to.path !== '/register' && to.path !== '/forget') {
        next('/login');
    } else if (to.meta && to.meta.requiresAuth && to.meta.roles) {
        if (Array.isArray(to.meta.roles) && to.meta.roles.some(role => userRoles.includes(role))) {
            next();
        } else {
            next('/home');
        }
    } else {
        next();
    }
});
export default router
