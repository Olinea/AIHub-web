<script setup lang="ts">
import { FileText, AlertTriangle, Info, CheckCircle } from 'lucide-vue-next'
</script>

<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div>
      <h1 class="text-3xl font-bold">日志管理</h1>
      <p class="text-muted-foreground">查看和管理系统运行日志</p>
    </div>

    <!-- 日志统计 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="p-6 bg-card rounded-lg border">
        <div class="flex items-center">
          <AlertTriangle class="h-8 w-8 text-red-600" />
          <div class="ml-4">
            <h3 class="text-sm font-medium text-muted-foreground">错误日志</h3>
            <p class="text-2xl font-bold">3</p>
          </div>
        </div>
      </div>
      
      <div class="p-6 bg-card rounded-lg border">
        <div class="flex items-center">
          <AlertTriangle class="h-8 w-8 text-yellow-600" />
          <div class="ml-4">
            <h3 class="text-sm font-medium text-muted-foreground">警告日志</h3>
            <p class="text-2xl font-bold">15</p>
          </div>
        </div>
      </div>
      
      <div class="p-6 bg-card rounded-lg border">
        <div class="flex items-center">
          <Info class="h-8 w-8 text-blue-600" />
          <div class="ml-4">
            <h3 class="text-sm font-medium text-muted-foreground">信息日志</h3>
            <p class="text-2xl font-bold">1,245</p>
          </div>
        </div>
      </div>
      
      <div class="p-6 bg-card rounded-lg border">
        <div class="flex items-center">
          <CheckCircle class="h-8 w-8 text-green-600" />
          <div class="ml-4">
            <h3 class="text-sm font-medium text-muted-foreground">成功操作</h3>
            <p class="text-2xl font-bold">8,765</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 日志列表 -->
    <div class="bg-card rounded-lg border">
      <div class="p-6 border-b">
        <h2 class="text-xl font-semibold">最近日志</h2>
      </div>
      <div class="p-6">
        <div class="text-center py-12 text-muted-foreground">
          <FileText class="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>日志查看功能正在开发中...</p>
          <p class="text-sm mt-2">这里将显示实时日志、搜索、筛选等功能</p>
        </div>
      </div>
    </div>
  </div>
</template>
