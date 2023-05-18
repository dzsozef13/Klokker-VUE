import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/regist',
      name: 'regist',
      component: () => import('../views/RegistView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue')
    }
  ],
})

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = localStorage.getItem("auth-token")
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  
  if ( !isAuthenticated && requiresAuth) {
    next('/login')
  }
  else {
    next()
  }
})

export default router
