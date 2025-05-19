import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: () => import('../views/Welcome.vue')
  },
  {
    path: '/guide',
    name: 'Guide',
    component: () => import('../views/Guide.vue')
  },
  {
    path: '/accept',
    name: 'Accept',
    component: () => import('../views/Accept.vue')
  },
  {
    path: '/submit',
    name: 'Submit',
    component: () => import('../views/Submit.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 