<script setup lang="ts">
import { Database, HardDrive, Activity, RefreshCw } from 'lucide-vue-next'
</script>

<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div>
      <h1 class="text-3xl font-bold">数据库管理</h1>
      <p class="text-muted-foreground">监控和管理数据库的状态与性能</p>
    </div>

    <!-- 数据库状态 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="p-6 bg-card rounded-lg border">
        <div class="flex items-center">
          <Database class="h-8 w-8 text-green-600" />
          <div class="ml-4">
            <h3 class="text-sm font-medium text-muted-foreground">连接状态</h3>
            <p class="text-lg font-bold text-green-600">正常</p>
          </div>
        </div>
      </div>
      
      <div class="p-6 bg-card rounded-lg border">
        <div class="flex items-center">
          <HardDrive class="h-8 w-8 text-blue-600" />
          <div class="ml-4">
            <h3 class="text-sm font-medium text-muted-foreground">存储使用</h3>
            <p class="text-lg font-bold">2.5GB</p>
          </div>
        </div>
      </div>
      
      <div class="p-6 bg-card rounded-lg border">
        <div class="flex items-center">
          <Activity class="h-8 w-8 text-purple-600" />
          <div class="ml-4">
            <h3 class="text-sm font-medium text-muted-foreground">活跃连接</h3>
            <p class="text-lg font-bold">12</p>
          </div>
        </div>
      </div>
      
      <div class="p-6 bg-card rounded-lg border">
        <div class="flex items-center">
          <RefreshCw class="h-8 w-8 text-orange-600" />
          <div class="ml-4">
            <h3 class="text-sm font-medium text-muted-foreground">查询/秒</h3>
            <p class="text-lg font-bold">245</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 数据库操作 -->
    <div class="bg-card rounded-lg border">
      <div class="p-6 border-b">
        <h2 class="text-xl font-semibold">数据库操作</h2>
      </div>
      <div class="p-6">
        <div class="text-center py-12 text-muted-foreground">
          <Database class="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>数据库管理功能正在开发中...</p>
          <p class="text-sm mt-2">这里将包含备份、恢复、优化等功能</p>
        </div>
      </div>
    </div>
  </div>
</template>
