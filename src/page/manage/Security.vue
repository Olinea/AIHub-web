<script setup lang="ts">
import { Shield, Key, Lock, UserCheck } from 'lucide-vue-next'
</script>

<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div>
      <h1 class="text-3xl font-bold">安全管理</h1>
      <p class="text-muted-foreground">管理系统的安全设置和权限控制</p>
    </div>

    <!-- 安全状态概览 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="p-6 bg-card rounded-lg border">
        <div class="flex items-center">
          <Shield class="h-8 w-8 text-green-600" />
          <div class="ml-4">
            <h3 class="text-sm font-medium text-muted-foreground">安全等级</h3>
            <p class="text-2xl font-bold text-green-600">高</p>
          </div>
        </div>
      </div>
      
      <div class="p-6 bg-card rounded-lg border">
        <div class="flex items-center">
          <Lock class="h-8 w-8 text-blue-600" />
          <div class="ml-4">
            <h3 class="text-sm font-medium text-muted-foreground">登录失败次数</h3>
            <p class="text-2xl font-bold">23</p>
          </div>
        </div>
      </div>
      
      <div class="p-6 bg-card rounded-lg border">
        <div class="flex items-center">
          <UserCheck class="h-8 w-8 text-purple-600" />
          <div class="ml-4">
            <h3 class="text-sm font-medium text-muted-foreground">在线管理员</h3>
            <p class="text-2xl font-bold">3</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 安全功能 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-card rounded-lg border">
        <div class="p-6 border-b">
          <div class="flex items-center gap-2">
            <Key class="h-5 w-5 text-yellow-600" />
            <h2 class="text-xl font-semibold">访问控制</h2>
          </div>
        </div>
        <div class="p-6">
          <div class="text-center py-8 text-muted-foreground">
            <Key class="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>访问控制功能正在开发中...</p>
          </div>
        </div>
      </div>

      <div class="bg-card rounded-lg border">
        <div class="p-6 border-b">
          <div class="flex items-center gap-2">
            <Lock class="h-5 w-5 text-red-600" />
            <h2 class="text-xl font-semibold">密码策略</h2>
          </div>
        </div>
        <div class="p-6">
          <div class="text-center py-8 text-muted-foreground">
            <Lock class="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>密码策略功能正在开发中...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
