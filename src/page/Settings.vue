<template>
  <div class="flex flex-1 flex-col px-4 py-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold mb-2">AI 设置</h1>
      <p class="text-muted-foreground">配置您的AI助手偏好设置</p>
    </div>

    <div class="space-y-6">
      <!-- API 配置 -->
      <div class="bg-card rounded-lg border p-6">
        <h2 class="text-lg font-semibold mb-4">API 配置</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">API 密钥</label>
            <input 
              type="password" 
              class="w-full px-3 py-2 border border-input rounded-md bg-background"
              placeholder="输入您的API密钥"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">API 端点</label>
            <input 
              type="url" 
              class="w-full px-3 py-2 border border-input rounded-md bg-background"
              placeholder="https://api.openai.com/v1"
            />
          </div>
        </div>
      </div>

      <!-- 模型设置 -->
      <div class="bg-card rounded-lg border p-6">
        <h2 class="text-lg font-semibold mb-4">模型设置</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">默认模型</label>
            <select class="w-full px-3 py-2 border border-input rounded-md bg-background">
              <option>GPT-4</option>
              <option>GPT-3.5 Turbo</option>
              <option>Claude-3</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">温度设置</label>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1" 
              value="0.7"
              class="w-full"
            />
            <div class="flex justify-between text-xs text-muted-foreground mt-1">
              <span>精确 (0)</span>
              <span>创意 (1)</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 界面设置 -->
      <div class="bg-card rounded-lg border p-6">
        <h2 class="text-lg font-semibold mb-4">界面设置</h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-medium">深色模式</h3>
              <p class="text-sm text-muted-foreground">切换应用主题</p>
            </div>
            <input type="checkbox" class="h-4 w-4" />
          </div>
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-medium">自动保存对话</h3>
              <p class="text-sm text-muted-foreground">自动保存聊天记录</p>
            </div>
            <input type="checkbox" class="h-4 w-4" checked />
          </div>
        </div>
      </div>

      <!-- 保存按钮 -->
      <div class="flex justify-end">
        <button class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
          保存设置
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Settings页面逻辑
</script>
