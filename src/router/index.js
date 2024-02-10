import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { useStore } from 'vuex'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  const store = useStore()
  const isAuthenticated = store.getters['auth/isAuthenticated']

  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      return next('login')
    }
  } else {
    if (isAuthenticated) {
      return next('home')
    }
  }

  return next()
})

export default router
