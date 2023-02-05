import type { RouteRecordRaw } from 'vue-router'
import Authorization from '@/views/Authorization/Authorization.vue'
import Login from '@/views/Authorization/Login/Login.vue'
import Register from '@/views/Authorization/Register/Register.vue'
import Map from '@/views/Map/Map.vue'
import Profile from '@/views/Profile/Profile.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: 'map' }
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
    meta: { shouldHideHeader: true },
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
      isPrivateRoute: true
    }
  }
]

export default routes
