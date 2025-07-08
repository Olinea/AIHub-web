<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import {
    Users,
    BarChart3,
    Settings,
    Shield,
    Database,
    FileText,
    Home,
    LogOut,
    Bot
  } from 'lucide-vue-next'

  import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarFooter,
  } from '@/components/ui/sidebar'
  import { Button } from '@/components/ui/button'
  import { Separator } from '@/components/ui/separator'
  import { useAuthStore } from '@/store/auth'

  const route = useRoute()
  const router = useRouter()
  const authStore = useAuthStore()

  // 管理菜单项
  const menuItems = computed(() => [
    {
      id: 'users',
      title: '用户管理',
      url: '/manage/users',
      icon: Users,
      isActive: route.path === '/manage/users',
    },
    {
      id: 'ai-models',
      title: 'AI模型管理',
      url: '/manage/ai-models',
      icon: Bot,
      isActive: route.path === '/manage/ai-models',
    },
    {
      id: 'analytics',
      title: '数据分析',
      url: '/manage/analytics',
      icon: BarChart3,
      isActive: route.path === '/manage/analytics',
    },
    {
      id: 'system',
      title: '系统设置',
      url: '/manage/system',
      icon: Settings,
      isActive: route.path === '/manage/system',
    },
    {
      id: 'security',
      title: '安全管理',
      url: '/manage/security',
      icon: Shield,
      isActive: route.path === '/manage/security',
    },
    {
      id: 'database',
      title: '数据库',
      url: '/manage/database',
      icon: Database,
      isActive: route.path === '/manage/database',
    },
    {
      id: 'logs',
      title: '日志管理',
      url: '/manage/logs',
      icon: FileText,
      isActive: route.path === '/manage/logs',
    },
  ])

  // 返回主应用
  const goBack = () => {
    router.push('/')
  }

  // 退出登录
  const logout = () => {
    authStore.clearToken()
    router.push('/login')
  }
</script>

<template>
  <Sidebar class="border-r-0" variant="sidebar">
    <SidebarHeader class="border-b">
      <div class="flex items-center justify-between p-2">
        <h2 class="text-lg font-semibold">管理后台</h2>
        <Button variant="ghost" size="icon" @click="goBack" title="返回主应用">
          <Home class="h-4 w-4" />
        </Button>
      </div>
    </SidebarHeader>

    <SidebarContent>
      <SidebarMenu>
        <SidebarMenuItem v-for="item in menuItems" :key="item.id">
          <SidebarMenuButton :as-child="true" :is-active="item.isActive">
            <router-link :to="item.url" class="flex items-center gap-2">
              <component :is="item.icon" class="h-4 w-4" />
              <span>{{ item.title }}</span>
            </router-link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarContent>

    <SidebarFooter class="border-t">
      <div class="p-2">
        <!-- <div class="flex items-center gap-2 mb-2 px-2 py-1 text-sm text-muted-foreground">
          <span class="font-medium">{{ authStore.user?.username || '管理员' }}</span>
        </div>
        <Separator class="mb-2" /> -->
        <!-- 返回首页 -->
        <Button variant="ghost" size="sm" @click="goBack" class="w-full justify-start">
          <Home class="h-4 w-4 mr-2" />
          返回首页
        </Button>
        <Separator class="my-2" />
        <Button variant="ghost" size="sm" @click="logout"
          class="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-50">
          <LogOut class="h-4 w-4 mr-2" />
          退出登录
        </Button>
      </div>
    </SidebarFooter>

    <SidebarRail />
  </Sidebar>
</template>
