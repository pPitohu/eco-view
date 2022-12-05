import type { RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home/Home.vue'
import Login from '@/views/Login/Login.vue'
import Register from '@/views/Register/Register.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }
]

export default routes
