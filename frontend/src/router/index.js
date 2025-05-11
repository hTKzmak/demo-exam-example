import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RequestView from '@/views/RequestView.vue'
import CreateView from '@/views/CreateView.vue'
import AuthView from '@/views/AuthView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/request/:id',
      name: 'request',
      component: RequestView
    },
    {
      path: '/create',
      name: 'create',
      component: CreateView
    },
    {
      path: '/auth/login',
      name: 'login',
      component: AuthView
    },
    {
      path: '/auth/reg',
      name: 'reg',
      component: AuthView
    },
  ],
})

// перенаправление на страницу авторизации, если нет аккаунта
router.beforeEach((to, from, next) => {
  const userDemoData = localStorage.getItem('userDemoData') // Получаем актуальные данные при каждом переходе
  
  const authRoutes = ['/auth/login', '/auth/reg']
  
  if (!authRoutes.includes(to.path) && !userDemoData) {
    next('/auth/login')
  } else {
    next()
  }
})

export default router