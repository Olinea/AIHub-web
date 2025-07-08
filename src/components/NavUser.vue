<script setup lang="ts">
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import {
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    CreditCard,
    LogOut,
    Sparkles,
    Coins,
    Wrench
  } from 'lucide-vue-next'

  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from '@/components/ui/avatar'
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu'
  import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
  } from '@/components/ui/sidebar'
  import { useAuthStore } from '@/store/auth'

  const authStore = useAuthStore()
  const router = useRouter()
  const { isMobile } = useSidebar()

  // 计算用户数据
  const user = computed(() => {
    if (!authStore.user) {
      return {
        name: '未登录用户',
        email: '',
        avatar: '',
        creditBalance: 0
      }
    }

    return {
      name: authStore.user.username || '用户',
      email: authStore.user.email || '',
      avatar: authStore.user.avatar || '',
      creditBalance: authStore.user.creditBalance || 0
    }
  })

  // 生成用户头像的初始字母
  const avatarFallback = computed(() => {
    if (!user.value.name) return 'U'

    // 如果是中文名，取第一个字符
    if (/[\u4e00-\u9fa5]/.test(user.value.name)) {
      return user.value.name.charAt(0)
    }

    // 如果是英文名，取首字母
    const words = user.value.name.split(' ')
    if (words.length >= 2) {
      return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase()
    }

    return user.value.name.charAt(0).toUpperCase()
  })

  // 处理菜单项点击
  const handleMenuClick = (action: string) => {
    switch (action) {
      case 'account':
        router.push('/settings')
        break
      case 'billing':
        // TODO: 导航到计费页面
        console.log('导航到计费页面')
        break
      case 'notifications':
        // TODO: 导航到通知页面
        console.log('导航到通知页面')
        break
      case 'upgrade':
        // TODO: 导航到升级页面
        console.log('导航到升级页面')
        break
      case 'logout':
        handleLogout()
        break
      case 'admin':
        // 跳转到管理后台
        router.push('/manage')
        break
    }
  }

  // 处理登出
  const handleLogout = () => {
    authStore.clearToken()
    router.push('/login')
  }
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
            <Avatar class="h-8 w-8 rounded-lg">
              <AvatarImage :src="user.avatar" :alt="user.name" />
              <AvatarFallback class="rounded-lg">
                {{ avatarFallback }}
              </AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">{{ user.name }}</span>
              <span class="truncate text-xs">{{ user.email }}</span>
            </div>
            <ChevronsUpDown class="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          :side="isMobile ? 'bottom' : 'right'" align="end" :side-offset="4">
          <DropdownMenuLabel class="p-0 font-normal">
            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar class="h-8 w-8 rounded-lg">
                <AvatarImage :src="user.avatar" :alt="user.name" />
                <AvatarFallback class="rounded-lg">
                  {{ avatarFallback }}
                </AvatarFallback>
              </Avatar>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">{{ user.name }}</span>
                <span class="truncate text-xs">{{ user.email }}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <!-- 积分余额显示 -->
          <DropdownMenuLabel class="px-2 py-1.5 text-xs text-muted-foreground">
            <div class="flex items-center gap-2">
              <Coins class="h-3 w-3" />
              <span>积分余额: {{ user.creditBalance.toFixed(4) }}</span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem @click="handleMenuClick('upgrade')">
              <Sparkles />
              升级到专业版
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem @click="handleMenuClick('account')">
              <BadgeCheck />
              账户设置
            </DropdownMenuItem>
            <DropdownMenuItem @click="handleMenuClick('billing')">
              <CreditCard />
              计费管理
            </DropdownMenuItem>
            <DropdownMenuItem @click="handleMenuClick('notifications')">
              <Bell />
              通知设置
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="handleMenuClick('admin')" v-if="authStore.user?.isAdmin == 1">
            <Wrench />
            管理员功能
          </DropdownMenuItem>
          <DropdownMenuSeparator v-if="authStore.user?.isAdmin == 1" />
          <DropdownMenuItem @click="handleMenuClick('logout')" class="text-red-600 focus:text-red-600">
            <LogOut />
            退出登录
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
