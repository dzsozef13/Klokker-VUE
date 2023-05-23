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
    },
    {
      path: '/myteam',
      name: 'myteam',
      component: () => import('../views/TeamView.vue')
    },
    {
      path: '/project/:id',
      name: 'project',
      component: () => import('../views/ProjectView.vue')
    },
    {
      path: '/new-project',
      name: 'new-project',
      component: () => import('../views/NewProjectView.vue')
    },
    {
      path: '/new-task/:id',
      name: 'new-task',
      component: () => import('../views/NewTaskView.vue')
    },
    {
      path: '/invite/',
      name: 'invite',
      component: () => import('../views/InviteView.vue')
    },
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
