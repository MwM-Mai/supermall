import Vue from 'vue'
import VueRouter from 'vue-router'

const Home =  () => import('../views/home/home') //懒加载
const Class =  () => import('../views/category/category') //懒加载
const ShopCard =  () => import('../views/cart/cart') //懒加载
const Profile = () => import('../views/me/me') //懒加载
const Detail = () => import('../views/detail/Detail')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Class
  },
  {
    path: '/cart',
    component: ShopCard
  },
  {
    path: '/me',
    component: Profile
  },
  {
    path: '/detail/:iid',   // /:iid 动态路由
    component: Detail
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router