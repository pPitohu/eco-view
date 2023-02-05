import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authRoutes = [ 'login', 'register' ]

  if (authRoutes.includes((to.name as string)) && localStorage.getItem('token')) {
    next({ name: 'map' })
  }

  if (to.meta.isPrivateRoute && !localStorage.getItem('token')) {
    next('/')
  }

  next()
})

export default router
