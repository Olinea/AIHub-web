<script setup lang="ts">
import { TrendingUp, Eye, MousePointer, Clock } from 'lucide-vue-next'
</script>

<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div>
      <h1 class="text-3xl font-bold">数据分析</h1>
      <p class="text-muted-foreground">查看系统的实时数据和统计信息</p>
    </div>

    <!-- 关键指标 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="p-6 bg-card rounded-lg border">
        <div class="flex items-center">
          <Eye class="h-8 w-8 text-blue-600" />
          <div class="ml-4">
            <h3 class="text-sm font-medium text-muted-foreground">页面访问量</h3>
            <p class="text-2xl font-bold">45,231</p>
            <p class="text-xs text-green-600 mt-1">+12% 比昨天</p>
          </div>
        </div>
      </div>
      
      <div class="p-6 bg-card rounded-lg border">
        <div class="flex items-center">
          <MousePointer class="h-8 w-8 text-green-600" />
          <div class="ml-4">
            <h3 class="text-sm font-medium text-muted-foreground">API 调用次数</h3>
            <p class="text-2xl font-bold">8,765</p>
            <p class="text-xs text-green-600 mt-1">+5% 比昨天</p>
          </div>
        </div>
      </div>
      
      <div class="p-6 bg-card rounded-lg border">
        <div class="flex items-center">
          <TrendingUp class="h-8 w-8 text-purple-600" />
          <div class="ml-4">
            <h3 class="text-sm font-medium text-muted-foreground">转化率</h3>
            <p class="text-2xl font-bold">3.2%</p>
            <p class="text-xs text-red-600 mt-1">-0.3% 比昨天</p>
          </div>
        </div>
      </div>
      
      <div class="p-6 bg-card rounded-lg border">
        <div class="flex items-center">
          <Clock class="h-8 w-8 text-orange-600" />
          <div class="ml-4">
            <h3 class="text-sm font-medium text-muted-foreground">平均响应时间</h3>
            <p class="text-2xl font-bold">145ms</p>
            <p class="text-xs text-green-600 mt-1">-5ms 比昨天</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 图表区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-card rounded-lg border">
        <div class="p-6 border-b">
          <h2 class="text-xl font-semibold">访问量趋势</h2>
        </div>
        <div class="p-6">
          <div class="text-center py-12 text-muted-foreground">
            <TrendingUp class="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>图表功能正在开发中...</p>
          </div>
        </div>
      </div>

      <div class="bg-card rounded-lg border">
        <div class="p-6 border-b">
          <h2 class="text-xl font-semibold">用户活跃度</h2>
        </div>
        <div class="p-6">
          <div class="text-center py-12 text-muted-foreground">
            <Eye class="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>用户活跃度分析正在开发中...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
