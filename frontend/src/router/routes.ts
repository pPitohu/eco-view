import type { RouteRecordRaw } from 'vue-router'
import Authorization from '@/views/Authorization/Authorization.vue'
import Login from '@/views/Authorization/Login/Login.vue'
import Register from '@/views/Authorization/Register/Register.vue'
import Home from '@/views/Home/Home.vue'
import Map from '@/views/Map/Map.vue'
import Profile from '@/views/Profile/Profile.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/map',
    name: 'map',
    component: Map
  },
  {
    path: '/auth',
    name: 'auth',
    redirect: { name: 'login' },
    component: Authorization,
    meta: {
      shouldHideHeader: true,
      shouldHideLeftMenu: true
    },
    children: [
      {
        path: 'login',
        name: 'login',
        component: Login,
      },
      {
        path: 'register',
        name: 'register',
        component: Register,
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: () => { }
      }
    ]
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: {
      isPrivateRoute: true,
      shouldHideLeftMenu: true
    }
  }
]

export default routes
