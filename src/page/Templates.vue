<template>
  <div class="flex flex-1 flex-col px-4 py-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold mb-2">AI 模板</h1>
      <p class="text-muted-foreground">预设的AI对话模板，快速开始不同类型的对话</p>
    </div>

    <!-- 搜索和筛选 -->
    <div class="mb-6">
      <div class="flex gap-4">
        <input 
          type="text" 
          placeholder="搜索模板..."
          class="flex-1 px-3 py-2 border border-input rounded-md bg-background"
        />
        <select class="px-3 py-2 border border-input rounded-md bg-background">
          <option>全部分类</option>
          <option>写作助手</option>
          <option>编程助手</option>
          <option>学习助手</option>
          <option>商务助手</option>
        </select>
      </div>
    </div>

    <!-- 模板网格 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- 写作助手模板 -->
      <div class="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow cursor-pointer">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <span class="text-blue-600 text-lg">✍️</span>
          </div>
          <div>
            <h3 class="font-semibold">文章写作助手</h3>
            <span class="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">写作助手</span>
          </div>
        </div>
        <p class="text-sm text-muted-foreground mb-4">
          帮助您撰写高质量的文章，包括结构规划、内容扩展和语言优化。
        </p>
        <div class="flex justify-between items-center">
          <span class="text-xs text-muted-foreground">使用次数: 1.2k</span>
          <button class="text-sm bg-primary text-primary-foreground px-3 py-1 rounded hover:bg-primary/90">
            使用模板
          </button>
        </div>
      </div>

      <!-- 代码审查模板 -->
      <div class="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow cursor-pointer">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <span class="text-green-600 text-lg">💻</span>
          </div>
          <div>
            <h3 class="font-semibold">代码审查助手</h3>
            <span class="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">编程助手</span>
          </div>
        </div>
        <p class="text-sm text-muted-foreground mb-4">
          专业的代码审查，发现潜在问题，提供优化建议和最佳实践。
        </p>
        <div class="flex justify-between items-center">
          <span class="text-xs text-muted-foreground">使用次数: 856</span>
          <button class="text-sm bg-primary text-primary-foreground px-3 py-1 rounded hover:bg-primary/90">
            使用模板
          </button>
        </div>
      </div>

      <!-- 学习计划模板 -->
      <div class="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow cursor-pointer">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <span class="text-purple-600 text-lg">📚</span>
          </div>
          <div>
            <h3 class="font-semibold">学习计划制定</h3>
            <span class="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">学习助手</span>
          </div>
        </div>
        <p class="text-sm text-muted-foreground mb-4">
          根据您的目标和时间安排，制定个性化的学习计划和进度跟踪。
        </p>
        <div class="flex justify-between items-center">
          <span class="text-xs text-muted-foreground">使用次数: 642</span>
          <button class="text-sm bg-primary text-primary-foreground px-3 py-1 rounded hover:bg-primary/90">
            使用模板
          </button>
        </div>
      </div>

      <!-- 商务邮件模板 -->
      <div class="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow cursor-pointer">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <span class="text-orange-600 text-lg">📧</span>
          </div>
          <div>
            <h3 class="font-semibold">商务邮件写作</h3>
            <span class="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">商务助手</span>
          </div>
        </div>
        <p class="text-sm text-muted-foreground mb-4">
          专业的商务邮件模板，包括会议邀请、项目汇报、合作提案等。
        </p>
        <div class="flex justify-between items-center">
          <span class="text-xs text-muted-foreground">使用次数: 923</span>
          <button class="text-sm bg-primary text-primary-foreground px-3 py-1 rounded hover:bg-primary/90">
            使用模板
          </button>
        </div>
      </div>

      <!-- 创意写作模板 -->
      <div class="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow cursor-pointer">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
            <span class="text-pink-600 text-lg">🎨</span>
          </div>
          <div>
            <h3 class="font-semibold">创意写作助手</h3>
            <span class="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded">写作助手</span>
          </div>
        </div>
        <p class="text-sm text-muted-foreground mb-4">
          激发创意灵感，帮助您创作小说、诗歌、剧本等创意内容。
        </p>
        <div class="flex justify-between items-center">
          <span class="text-xs text-muted-foreground">使用次数: 578</span>
          <button class="text-sm bg-primary text-primary-foreground px-3 py-1 rounded hover:bg-primary/90">
            使用模板
          </button>
        </div>
      </div>

      <!-- 数据分析模板 -->
      <div class="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow cursor-pointer">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
            <span class="text-indigo-600 text-lg">📊</span>
          </div>
          <div>
            <h3 class="font-semibold">数据分析助手</h3>
            <span class="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded">编程助手</span>
          </div>
        </div>
        <p class="text-sm text-muted-foreground mb-4">
          专业的数据分析工具，包括数据清洗、可视化和统计分析建议。
        </p>
        <div class="flex justify-between items-center">
          <span class="text-xs text-muted-foreground">使用次数: 734</span>
          <button class="text-sm bg-primary text-primary-foreground px-3 py-1 rounded hover:bg-primary/90">
            使用模板
          </button>
        </div>
      </div>
    </div>

    <!-- 创建自定义模板按钮 -->
    <div class="mt-8 text-center">
      <button class="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
        + 创建自定义模板
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// Templates页面逻辑
</script>
