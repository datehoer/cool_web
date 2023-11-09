import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserinfoView from '../views/UserinfoView.vue';
import ProductView from '../views/ProductView.vue';
import Brands from '../views/BrandsView.vue';
import Category from '../views/CategoryView.vue';
import Msg from '../views/MsgView.vue';
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HomeView
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
    }

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
