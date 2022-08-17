import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/batch-add',
    name: 'batch-add',
    component: () => import('../views/BatchAddView.vue')
  },
  {
    path: '/stock-out-history',
    name: 'stock-out-history',
    component: () => import('../views/StockOutHistoryView.vue')
  },
  {
    path: '/batch-history',
    name: 'batch-history',
    component: () => import('../views/BatchHistoryView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
