import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/page/Dashboard.vue'
import Settings from '@/page/Settings.vue'
import Templates from '@/page/Templates.vue'
import Help from '@/page/Help.vue'
import NotFound from '@/page/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/templates',
    name: 'Templates',
    component: Templates
  },
  {
    path: '/help',
    name: 'Help',
    component: Help
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
