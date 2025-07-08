<script setup lang="ts">
import { Settings, Server, Mail, Bell } from 'lucide-vue-next'
</script>

<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div>
      <h1 class="text-3xl font-bold">系统设置</h1>
      <p class="text-muted-foreground">配置系统的各项参数和选项</p>
    </div>

    <!-- 设置分类 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-card rounded-lg border">
        <div class="p-6 border-b">
          <div class="flex items-center gap-2">
            <Server class="h-5 w-5 text-blue-600" />
            <h2 class="text-xl font-semibold">服务器配置</h2>
          </div>
        </div>
        <div class="p-6">
          <div class="text-center py-8 text-muted-foreground">
            <Server class="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>服务器设置功能正在开发中...</p>
          </div>
        </div>
      </div>

      <div class="bg-card rounded-lg border">
        <div class="p-6 border-b">
          <div class="flex items-center gap-2">
            <Mail class="h-5 w-5 text-green-600" />
            <h2 class="text-xl font-semibold">邮件配置</h2>
          </div>
        </div>
        <div class="p-6">
          <div class="text-center py-8 text-muted-foreground">
            <Mail class="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>邮件设置功能正在开发中...</p>
          </div>
        </div>
      </div>

      <div class="bg-card rounded-lg border">
        <div class="p-6 border-b">
          <div class="flex items-center gap-2">
            <Bell class="h-5 w-5 text-orange-600" />
            <h2 class="text-xl font-semibold">通知设置</h2>
          </div>
        </div>
        <div class="p-6">
          <div class="text-center py-8 text-muted-foreground">
            <Bell class="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>通知设置功能正在开发中...</p>
          </div>
        </div>
      </div>

      <div class="bg-card rounded-lg border">
        <div class="p-6 border-b">
          <div class="flex items-center gap-2">
            <Settings class="h-5 w-5 text-purple-600" />
            <h2 class="text-xl font-semibold">其他设置</h2>
          </div>
        </div>
        <div class="p-6">
          <div class="text-center py-8 text-muted-foreground">
            <Settings class="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>其他设置功能正在开发中...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
