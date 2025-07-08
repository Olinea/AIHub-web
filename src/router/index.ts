import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import Dashboard from '@/page/Dashboard.vue'
import Settings from '@/page/Settings.vue'
import Templates from '@/page/Templates.vue'
import Help from '@/page/Help.vue'
import NotFound from '@/page/NotFound.vue'
import Login from '@/page/Login.vue'

// 管理页面组件
import ManageIndex from '@/page/manage/Index.vue'
import ManageUsers from '@/page/manage/Users.vue'
import ManageAnalytics from '@/page/manage/Analytics.vue'
import ManageSystem from '@/page/manage/System.vue'
import ManageSecurity from '@/page/manage/Security.vue'
import ManageDatabase from '@/page/manage/Database.vue'
import ManageLogs from '@/page/manage/Logs.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: { requiresAuth: true }
  },
  {
    path: '/templates',
    name: 'Templates',
    component: Templates,
    meta: { requiresAuth: true }
  },
  {
    path: '/help',
    name: 'Help',
    component: Help,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { layout: 'Auth' }
  },
  // 管理后台路由
  {
    path: '/manage',
    name: 'Manage',
    component: ManageIndex,
    meta: { requiresAuth: true, requiresAdmin: true, layout: 'Manage' }
  },
  {
    path: '/manage/users',
    name: 'ManageUsers',
    component: ManageUsers,
    meta: { requiresAuth: true, requiresAdmin: true, layout: 'Manage' }
  },
  {
    path: '/manage/analytics',
    name: 'ManageAnalytics',
    component: ManageAnalytics,
    meta: { requiresAuth: true, requiresAdmin: true, layout: 'Manage' }
  },
  {
    path: '/manage/system',
    name: 'ManageSystem',
    component: ManageSystem,
    meta: { requiresAuth: true, requiresAdmin: true, layout: 'Manage' }
  },
  {
    path: '/manage/security',
    name: 'ManageSecurity',
    component: ManageSecurity,
    meta: { requiresAuth: true, requiresAdmin: true, layout: 'Manage' }
  },
  {
    path: '/manage/database',
    name: 'ManageDatabase',
    component: ManageDatabase,
    meta: { requiresAuth: true, requiresAdmin: true, layout: 'Manage' }
  },
  {
    path: '/manage/logs',
    name: 'ManageLogs',
    component: ManageLogs,
    meta: { requiresAuth: true, requiresAdmin: true, layout: 'Manage' }
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

router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore()
  
  // Attempt to fetch user info if token exists but user data doesn't
  if (authStore.token && !authStore.user) {
    await authStore.fetchUser()
  }

  const isAuthenticated = !!authStore.user
  const isAdmin = authStore.user?.isAdmin === 1

  // 检查是否需要认证
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'Login' })
    return
  }

  // 检查是否需要管理员权限
  if (to.matched.some(record => record.meta.requiresAdmin) && !isAdmin) {
    next({ name: 'Dashboard' }) // 非管理员重定向到首页
    return
  }

  // 已登录用户访问登录页面，重定向到首页
  if (to.name === 'Login' && isAuthenticated) {
    next({ name: 'Dashboard' })
    return
  }

  next()
})

export default router
