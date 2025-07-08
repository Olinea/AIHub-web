<script setup lang="ts">
import { Users, Activity, UserPlus, UserCheck } from 'lucide-vue-next'
</script>

<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div>
      <h1 class="text-3xl font-bold">用户管理</h1>
      <p class="text-muted-foreground">管理系统中的所有用户账户</p>
    </div>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="p-6 bg-card rounded-lg border">
        <div class="flex items-center">
          <Users class="h-8 w-8 text-blue-600" />
          <div class="ml-4">
            <h3 class="text-sm font-medium text-muted-foreground">总用户数</h3>
            <p class="text-2xl font-bold">1,234</p>
          </div>
        </div>
      </div>
      
      <div class="p-6 bg-card rounded-lg border">
        <div class="flex items-center">
          <Activity class="h-8 w-8 text-green-600" />
          <div class="ml-4">
            <h3 class="text-sm font-medium text-muted-foreground">活跃用户</h3>
            <p class="text-2xl font-bold">856</p>
          </div>
        </div>
      </div>
      
      <div class="p-6 bg-card rounded-lg border">
        <div class="flex items-center">
          <UserPlus class="h-8 w-8 text-purple-600" />
          <div class="ml-4">
            <h3 class="text-sm font-medium text-muted-foreground">新用户（本月）</h3>
            <p class="text-2xl font-bold">127</p>
          </div>
        </div>
      </div>
      
    </div>

    <!-- 用户列表 -->
    <div class="bg-card rounded-lg border">
      <div class="p-6 border-b">
        <h2 class="text-xl font-semibold">用户列表</h2>
      </div>
      <div class="p-6">
        <div class="text-center py-12 text-muted-foreground">
          <Users class="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>用户列表功能正在开发中...</p>
          <p class="text-sm mt-2">这里将显示用户表格、搜索、筛选等功能</p>
        </div>
      </div>
    </div>
  </div>
</template>
