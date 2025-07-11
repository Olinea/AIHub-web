<template>
  <div class="flex flex-1 flex-col px-4 py-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold mb-2">AI聚合平台帮助中心</h1>
      <p class="text-muted-foreground">欢迎使用AI聚合聊天平台，这里汇集了多种顶尖AI模型，为您提供统一的对话体验</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- 左侧导航 -->
      <div class="lg:col-span-1">
        <div class="bg-card rounded-lg border p-4 sticky top-4">
          <h3 class="font-semibold mb-4">帮助目录</h3>
          <nav class="space-y-2">
            <a href="#getting-started" class="block px-3 py-2 text-sm hover:bg-accent rounded-md">
              快速开始
            </a>
            <a href="#ai-models" class="block px-3 py-2 text-sm hover:bg-accent rounded-md">
              AI模型介绍
            </a>
            <a href="#conversation-management" class="block px-3 py-2 text-sm hover:bg-accent rounded-md">
              会话管理
            </a>
            <a href="#api-usage" class="block px-3 py-2 text-sm hover:bg-accent rounded-md">
              API使用
            </a>

          </nav>
        </div>
      </div>

      <!-- 右侧内容 -->
      <div class="lg:col-span-2 space-y-8">
        <!-- 快速开始 -->
        <section id="getting-started" class="bg-card rounded-lg border p-6">
          <h2 class="text-xl font-semibold mb-4">🚀 快速开始</h2>
          <div class="space-y-4">
            <div>
              <h3 class="font-medium mb-2">1. 注册账户</h3>
              <p class="text-sm text-muted-foreground">
                创建您的AI聚合平台账户，新用户将获得免费体验积分，让您立即开始AI对话之旅。
              </p>
            </div>
            <div>
              <h3 class="font-medium mb-2">2. 选择AI模型</h3>
              <p class="text-sm text-muted-foreground">
                平台集成了OpenAI GPT、DeepSeek、Gemini等多种顶尖AI模型，您可以根据需求自由切换。
              </p>
            </div>
            <div>
              <h3 class="font-medium mb-2">3. 开始对话</h3>
              <p class="text-sm text-muted-foreground">
                创建新会话，输入您的问题，享受智能AI助手带来的高效体验。所有对话自动保存，支持多轮上下文。
              </p>
            </div>
            <div>
              <h3 class="font-medium mb-2">4. 管理积分</h3>
              <p class="text-sm text-muted-foreground">
                在用户中心查看积分余额和消费历史，合理规划您的AI使用。不同模型消耗积分不同。
              </p>
            </div>
          </div>
        </section>

        <!-- AI模型介绍 -->
        <section id="ai-models" class="bg-card rounded-lg border p-6">
          <h2 class="text-xl font-semibold mb-4">🤖 AI模型介绍</h2>
          <div class="space-y-4">
            <div>
              <h3 class="font-medium mb-2">DeepSeek</h3>
              <p class="text-sm text-muted-foreground mb-2">
                国产优秀AI模型，支持中文理解，在编程、推理等任务上表现出色。
              </p>
              <div class="bg-muted p-3 rounded text-sm">
                <span class="font-medium">特色:</span> 数学推理、代码生成、中文对话
              </div>
            </div>
            <div>
              <h3 class="font-medium mb-2">OpenAI GPT系列</h3>
              <p class="text-sm text-muted-foreground mb-2">
                全球领先的大语言模型，包括GPT-4、GPT-3.5等，适合各种通用任务。
              </p>
              <div class="bg-muted p-3 rounded text-sm">
                <span class="font-medium">特色:</span> 通用对话、创意写作、问题解答
              </div>
            </div>
            <div>
              <h3 class="font-medium mb-2">qwen系列</h3>
              <p class="text-sm text-muted-foreground mb-2">
                阿里云出品的AI助手，在稳定性和上下文方面表现优异。
              </p>
              <div class="bg-muted p-3 rounded text-sm">
                <span class="font-medium">特色:</span> 文档分析、长文本处理
              </div>
            </div>
          </div>
        </section>


        <!-- 会话管理 -->
        <section id="conversation-management" class="bg-card rounded-lg border p-6">
          <h2 class="text-xl font-semibold mb-4">💬 会话管理</h2>
          <div class="space-y-4">
            <div>
              <h3 class="font-medium mb-2">创建新会话</h3>
              <p class="text-sm text-muted-foreground">
                每个会话都有独立的上下文，您可以为不同的话题或任务创建专门的会话。
              </p>
            </div>
            <div>
              <h3 class="font-medium mb-2">会话功能</h3>
              <div class="bg-muted p-3 rounded text-sm space-y-1">
                <div>• 自动生成会话标题（基于首次提问）</div>
                <div>• 支持会话重命名和删除</div>
                <div>• 保留完整对话历史和上下文</div>
                <div>• 显示会话统计信息（消息数、Token消耗等）</div>
              </div>
            </div>
            <div>
              <h3 class="font-medium mb-2">会话状态</h3>
              <p class="text-sm text-muted-foreground">
                会话支持多种状态：活跃、归档、已删除，帮助您更好地组织对话记录。
              </p>
            </div>
          </div>
        </section>

        <!-- API使用 -->
        <section id="api-usage" class="bg-card rounded-lg border p-6">
          <h2 class="text-xl font-semibold mb-4">🔌 API使用指南</h2>
          <div class="space-y-4">
            <div>
              <h3 class="font-medium mb-2">统一聊天接口</h3>
              <p class="text-sm text-muted-foreground mb-2">
                平台提供完全兼容OpenAI格式的API接口，开发者可以轻松集成。
              </p>
              <div class="bg-muted p-3 rounded text-sm font-mono">
                POST /api/v1/chat/completions
              </div>
            </div>
            <div>
              <h3 class="font-medium mb-2">接口特性</h3>
              <div class="bg-muted p-3 rounded text-sm space-y-1">
                <div>• 支持同步和流式响应</div>
                <div>• 自动Token计费和余额检查</div>
                <div>• 完整的OpenAI兼容格式</div>
                <div>• 支持多种AI模型切换</div>
              </div>
            </div>
            <div>
              <h3 class="font-medium mb-2">认证方式</h3>
              <p class="text-sm text-muted-foreground">
                使用JWT Token进行API认证，确保接口调用的安全性。
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Help页面逻辑
</script>
