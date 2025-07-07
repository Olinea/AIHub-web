<template>
  <div class="flex flex-1 flex-col px-4 py-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold mb-2">系统帮助</h1>
      <p class="text-muted-foreground">获取使用指南和常见问题解答</p>
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
            <a href="#basic-usage" class="block px-3 py-2 text-sm hover:bg-accent rounded-md">
              基本使用
            </a>
            <a href="#advanced-features" class="block px-3 py-2 text-sm hover:bg-accent rounded-md">
              高级功能
            </a>
            <a href="#troubleshooting" class="block px-3 py-2 text-sm hover:bg-accent rounded-md">
              故障排除
            </a>
            <a href="#faq" class="block px-3 py-2 text-sm hover:bg-accent rounded-md">
              常见问题
            </a>
            <a href="#contact" class="block px-3 py-2 text-sm hover:bg-accent rounded-md">
              联系我们
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
              <h3 class="font-medium mb-2">1. 设置API密钥</h3>
              <p class="text-sm text-muted-foreground">
                前往设置页面，配置您的AI服务API密钥。支持OpenAI、Claude等主流AI服务。
              </p>
            </div>
            <div>
              <h3 class="font-medium mb-2">2. 选择AI模板</h3>
              <p class="text-sm text-muted-foreground">
                浏览模板页面，选择适合您需求的预设模板，或创建自定义模板。
              </p>
            </div>
            <div>
              <h3 class="font-medium mb-2">3. 开始对话</h3>
              <p class="text-sm text-muted-foreground">
                在主界面开始您的AI对话，享受智能助手带来的便利。
              </p>
            </div>
          </div>
        </section>

        <!-- 基本使用 -->
        <section id="basic-usage" class="bg-card rounded-lg border p-6">
          <h2 class="text-xl font-semibold mb-4">📖 基本使用</h2>
          <div class="space-y-4">
            <div>
              <h3 class="font-medium mb-2">发送消息</h3>
              <p class="text-sm text-muted-foreground mb-2">
                在输入框中输入您的问题或请求，按Enter键或点击发送按钮。
              </p>
              <div class="bg-muted p-3 rounded text-sm font-mono">
                示例：请帮我写一份项目计划书
              </div>
            </div>
            <div>
              <h3 class="font-medium mb-2">管理对话</h3>
              <p class="text-sm text-muted-foreground">
                您可以新建对话、重命名对话、删除对话。所有对话记录会自动保存。
              </p>
            </div>
            <div>
              <h3 class="font-medium mb-2">切换AI角色</h3>
              <p class="text-sm text-muted-foreground">
                点击"Ask AI Role"可以选择不同的AI助手角色，如编程助手、写作助手等。
              </p>
            </div>
          </div>
        </section>

        <!-- 高级功能 -->
        <section id="advanced-features" class="bg-card rounded-lg border p-6">
          <h2 class="text-xl font-semibold mb-4">⚡ 高级功能</h2>
          <div class="space-y-4">
            <div>
              <h3 class="font-medium mb-2">自定义模板</h3>
              <p class="text-sm text-muted-foreground">
                创建个性化的AI助手模板，设置专属的系统提示词和参数配置。
              </p>
            </div>
            <div>
              <h3 class="font-medium mb-2">多模型支持</h3>
              <p class="text-sm text-muted-foreground">
                支持多种AI模型，可在设置中切换不同的模型和调整参数。
              </p>
            </div>
            <div>
              <h3 class="font-medium mb-2">对话导出</h3>
              <p class="text-sm text-muted-foreground">
                支持将对话记录导出为Markdown、PDF等格式，便于保存和分享。
              </p>
            </div>
          </div>
        </section>

        <!-- 故障排除 -->
        <section id="troubleshooting" class="bg-card rounded-lg border p-6">
          <h2 class="text-xl font-semibold mb-4">🔧 故障排除</h2>
          <div class="space-y-4">
            <div>
              <h3 class="font-medium mb-2">API密钥无效</h3>
              <p class="text-sm text-muted-foreground">
                请检查API密钥是否正确输入，确保密钥有效且有足够的配额。
              </p>
            </div>
            <div>
              <h3 class="font-medium mb-2">响应缓慢</h3>
              <p class="text-sm text-muted-foreground">
                可能是网络连接问题或AI服务繁忙，请稍后重试或联系技术支持。
              </p>
            </div>
            <div>
              <h3 class="font-medium mb-2">对话记录丢失</h3>
              <p class="text-sm text-muted-foreground">
                对话记录保存在本地存储中，清除浏览器数据会导致记录丢失。
              </p>
            </div>
          </div>
        </section>

        <!-- 常见问题 -->
        <section id="faq" class="bg-card rounded-lg border p-6">
          <h2 class="text-xl font-semibold mb-4">❓ 常见问题</h2>
          <div class="space-y-4">
            <div>
              <h3 class="font-medium mb-2">Q: 支持哪些AI模型？</h3>
              <p class="text-sm text-muted-foreground">
                A: 目前支持OpenAI GPT系列、Anthropic Claude系列等主流AI模型。
              </p>
            </div>
            <div>
              <h3 class="font-medium mb-2">Q: 对话记录是否安全？</h3>
              <p class="text-sm text-muted-foreground">
                A: 对话记录仅保存在您的本地设备上，我们不会收集或存储您的对话内容。
              </p>
            </div>
            <div>
              <h3 class="font-medium mb-2">Q: 如何提高AI回复质量？</h3>
              <p class="text-sm text-muted-foreground">
                A: 提供清晰具体的问题描述，使用合适的模板，调整温度等参数设置。
              </p>
            </div>
          </div>
        </section>

        <!-- 联系我们 -->
        <section id="contact" class="bg-card rounded-lg border p-6">
          <h2 class="text-xl font-semibold mb-4">📞 联系我们</h2>
          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 class="font-medium mb-2">技术支持</h3>
                <p class="text-sm text-muted-foreground">
                  邮箱: support@example.com<br>
                  工作时间: 周一至周五 9:00-18:00
                </p>
              </div>
              <div>
                <h3 class="font-medium mb-2">用户反馈</h3>
                <p class="text-sm text-muted-foreground">
                  邮箱: feedback@example.com<br>
                  我们重视每一条建议和意见
                </p>
              </div>
            </div>
            <div class="pt-4 border-t">
              <p class="text-sm text-muted-foreground">
                版本: v1.0.0 | 
                <a href="#" class="text-primary hover:underline">更新日志</a> | 
                <a href="#" class="text-primary hover:underline">隐私政策</a>
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
