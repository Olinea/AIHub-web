<script setup lang="ts">
  import { MessageCircle, Sparkles, Settings } from 'lucide-vue-next'
  import { useRouter } from 'vue-router'
  import { useConversationsStore } from '@/store/conversations'

  const router = useRouter()
  const conversationsStore = useConversationsStore()

  // 开始新对话
  async function startNewConversation() {
    router.push('/conversation/new')
  }
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- 欢迎区域 -->
    <div class="flex-1 flex flex-col items-center justify-center px-4 py-8">
      <div class="text-center max-w-2xl">
        <div class="mb-8">
          <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles class="w-8 h-8 text-white" />
          </div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            欢迎使用 AI 聊天助手
          </h1>
          <p class="text-lg text-gray-600">
            选择左侧的对话开始聊天，或创建新的对话
          </p>
        </div>

        <!-- 功能卡片 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div class="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <MessageCircle class="w-8 h-8 text-blue-500 mb-3" />
            <h3 class="font-semibold text-gray-900 mb-2">智能对话</h3>
            <p class="text-sm text-gray-600">与AI进行自然流畅的对话交流</p>
          </div>

          <div class="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <Sparkles class="w-8 h-8 text-green-500 mb-3" />
            <h3 class="font-semibold text-gray-900 mb-2">多模型支持</h3>
            <p class="text-sm text-gray-600">支持多种AI模型，满足不同需求</p>
          </div>

          <div class="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <Settings class="w-8 h-8 text-purple-500 mb-3" />
            <h3 class="font-semibold text-gray-900 mb-2">历史记录</h3>
            <p class="text-sm text-gray-600">查看和管理您的对话历史</p>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button @click="startNewConversation"
            class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            开始新对话
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
