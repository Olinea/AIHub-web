<script setup lang="ts">
import { ref } from 'vue'
import { X, Users, Settings, BarChart3, Shield, Database, FileText } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

// 定义 props
defineProps<{
  isOpen: boolean
}>()

// 定义 emits
const emit = defineEmits<{
  close: []
}>()

// 当前选中的菜单项
const selectedMenu = ref('users')

// 管理菜单项
const menuItems = [
  { id: 'users', label: '用户管理', icon: Users },
  { id: 'analytics', label: '数据分析', icon: BarChart3 },
  { id: 'system', label: '系统设置', icon: Settings },
  { id: 'security', label: '安全管理', icon: Shield },
  { id: 'database', label: '数据库', icon: Database },
  { id: 'logs', label: '日志管理', icon: FileText },
]

// 处理菜单点击
const handleMenuClick = (menuId: string) => {
  selectedMenu.value = menuId
}

// 关闭面板
const handleClose = () => {
  emit('close')
}
</script>

<template>
  <div class="flex h-full bg-background">
    <!-- 左侧导航栏 -->
    <div class="w-64 bg-muted/50 border-r flex flex-col">
      <!-- 头部 -->
      <div class="p-4 border-b">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">管理员面板</h2>
          <Button variant="ghost" size="icon" @click="handleClose">
            <X class="h-4 w-4" />
          </Button>
        </div>
      </div>

      <!-- 菜单列表 -->
      <div class="flex-1 p-2">
        <nav class="space-y-1">
          <button
            v-for="item in menuItems"
            :key="item.id"
            @click="handleMenuClick(item.id)"
            :class="[
              'w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors text-left',
              selectedMenu === item.id
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            ]"
          >
            <component :is="item.icon" class="h-4 w-4" />
            {{ item.label }}
          </button>
        </nav>
      </div>
    </div>

    <!-- 右侧内容区域 -->
    <div class="flex-1 flex flex-col">
      <!-- 内容头部 -->
      <div class="p-4 border-b">
        <h3 class="text-xl font-semibold">
          {{ menuItems.find(item => item.id === selectedMenu)?.label }}
        </h3>
      </div>

      <!-- 内容区域 -->
      <div class="flex-1 p-4 overflow-auto">
        <!-- 用户管理 -->
        <div v-if="selectedMenu === 'users'" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="p-4 bg-card rounded-lg border">
              <h4 class="font-semibold text-sm text-muted-foreground">总用户数</h4>
              <p class="text-2xl font-bold">1,234</p>
            </div>
            <div class="p-4 bg-card rounded-lg border">
              <h4 class="font-semibold text-sm text-muted-foreground">活跃用户</h4>
              <p class="text-2xl font-bold">856</p>
            </div>
            <div class="p-4 bg-card rounded-lg border">
              <h4 class="font-semibold text-sm text-muted-foreground">新用户（本月）</h4>
              <p class="text-2xl font-bold">127</p>
            </div>
          </div>
          
          <Separator />
          
          <div class="space-y-2">
            <h4 class="font-semibold">用户列表</h4>
            <div class="bg-card rounded-lg border p-4">
              <p class="text-muted-foreground">用户管理功能正在开发中...</p>
            </div>
          </div>
        </div>

        <!-- 数据分析 -->
        <div v-else-if="selectedMenu === 'analytics'" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="p-4 bg-card rounded-lg border">
              <h4 class="font-semibold text-sm text-muted-foreground">页面访问量</h4>
              <p class="text-2xl font-bold">45,231</p>
              <p class="text-xs text-green-600">+12% 比昨天</p>
            </div>
            <div class="p-4 bg-card rounded-lg border">
              <h4 class="font-semibold text-sm text-muted-foreground">API 调用次数</h4>
              <p class="text-2xl font-bold">8,765</p>
              <p class="text-xs text-green-600">+5% 比昨天</p>
            </div>
            <div class="p-4 bg-card rounded-lg border">
              <h4 class="font-semibold text-sm text-muted-foreground">错误率</h4>
              <p class="text-2xl font-bold">0.5%</p>
              <p class="text-xs text-red-600">+0.1% 比昨天</p>
            </div>
            <div class="p-4 bg-card rounded-lg border">
              <h4 class="font-semibold text-sm text-muted-foreground">响应时间</h4>
              <p class="text-2xl font-bold">145ms</p>
              <p class="text-xs text-green-600">-5ms 比昨天</p>
            </div>
          </div>
          
          <div class="bg-card rounded-lg border p-4">
            <h4 class="font-semibold mb-2">分析图表</h4>
            <p class="text-muted-foreground">数据分析图表功能正在开发中...</p>
          </div>
        </div>

        <!-- 系统设置 -->
        <div v-else-if="selectedMenu === 'system'" class="space-y-4">
          <div class="bg-card rounded-lg border p-4">
            <h4 class="font-semibold mb-2">系统配置</h4>
            <p class="text-muted-foreground">系统设置功能正在开发中...</p>
          </div>
        </div>

        <!-- 安全管理 -->
        <div v-else-if="selectedMenu === 'security'" class="space-y-4">
          <div class="bg-card rounded-lg border p-4">
            <h4 class="font-semibold mb-2">安全配置</h4>
            <p class="text-muted-foreground">安全管理功能正在开发中...</p>
          </div>
        </div>

        <!-- 数据库 -->
        <div v-else-if="selectedMenu === 'database'" class="space-y-4">
          <div class="bg-card rounded-lg border p-4">
            <h4 class="font-semibold mb-2">数据库状态</h4>
            <p class="text-muted-foreground">数据库管理功能正在开发中...</p>
          </div>
        </div>

        <!-- 日志管理 -->
        <div v-else-if="selectedMenu === 'logs'" class="space-y-4">
          <div class="bg-card rounded-lg border p-4">
            <h4 class="font-semibold mb-2">系统日志</h4>
            <p class="text-muted-foreground">日志管理功能正在开发中...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
