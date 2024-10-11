import { createRouter, createWebHistory } from 'vue-router'
import OrdersView from '@/pages/orders/overview/OrdersView.vue'
import CreateOrderView from '@/pages/orders/create/CreateOrderView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'orders',
      component: OrdersView
    },
    {
      path: '/create-order',
      name: 'create-order',
      component: CreateOrderView
    },
  ]
})

export default router
