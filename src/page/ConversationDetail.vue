<template>
  <div class="flex flex-col h-full">
    <!-- 对话头部 -->
    <div class="border-b px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <h1 v-if="conversation" class="text-2xl font-semibold">
            {{ conversation.title }}
          </h1>
          <div v-if="loading" class="animate-pulse h-8 bg-gray-200 rounded w-48"></div>
        </div>
        
        <div v-if="conversation" class="flex items-center space-x-2 text-sm text-gray-500">
          <span>{{ conversation.modelName }}</span>
          <span>•</span>
          <span>{{ conversation.messageCount }} 条消息</span>
          <span>•</span>
          <span>{{ conversation.totalTokens }} tokens</span>
        </div>
      </div>
    </div>

    <!-- 错误提示 -->
    <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mx-6 mt-4">
      <p>{{ error }}</p>
      <button 
        @click="clearError"
        class="mt-2 text-sm underline hover:no-underline"
      >
        关闭
      </button>
    </div>

    <!-- 消息列表 -->
    <div class="flex-1 overflow-y-auto px-6 py-4">
      <div v-if="loading && !conversation" class="space-y-4">
        <!-- 加载骨架屏 -->
        <div v-for="i in 3" :key="i" class="animate-pulse">
          <div class="flex space-x-4">
            <div class="w-8 h-8 bg-gray-200 rounded-full"></div>
            <div class="flex-1 space-y-2">
              <div class="h-4 bg-gray-200 rounded w-1/4"></div>
              <div class="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="conversation" class="space-y-6">
        <div
          v-for="message in conversation.messages"
          :key="message.id"
          class="flex space-x-4"
          :class="{
            'flex-row-reverse space-x-reverse': message.role === 'user'
          }"
        >
          <!-- 头像 -->
          <div class="flex-shrink-0">
            <div 
              class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
              :class="{
                'bg-blue-500 text-white': message.role === 'user',
                'bg-green-500 text-white': message.role === 'assistant',
                'bg-gray-500 text-white': message.role === 'system'
              }"
            >
              {{ message.role === 'user' ? 'U' : message.role === 'assistant' ? 'A' : 'S' }}
            </div>
          </div>

          <!-- 消息内容 -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center space-x-2 mb-1">
              <span class="text-sm font-medium text-gray-900">
                {{ message.role === 'user' ? '用户' : message.role === 'assistant' ? '助手' : '系统' }}
              </span>
              <span class="text-xs text-gray-500">
                {{ formatTime(message.createdAt) }}
              </span>
              <span v-if="message.totalTokens" class="text-xs text-gray-400">
                {{ message.totalTokens }} tokens
              </span>
            </div>
            
            <div 
              class="prose max-w-none p-3 rounded-lg"
              :class="{
                'bg-blue-50 border border-blue-200': message.role === 'user',
                'bg-green-50 border border-green-200': message.role === 'assistant',
                'bg-gray-50 border border-gray-200': message.role === 'system'
              }"
            >
              <div class="whitespace-pre-wrap break-words">{{ message.content }}</div>
            </div>

            <!-- 工具调用信息 -->
            <div v-if="message.toolCalls" class="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
              <details>
                <summary class="cursor-pointer text-yellow-700">工具调用</summary>
                <pre class="mt-1 text-yellow-600">{{ message.toolCalls }}</pre>
              </details>
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-else class="flex flex-col items-center justify-center h-64 text-gray-500">
        <MessageCircle class="w-12 h-12 mb-4 text-gray-300" />
        <p>选择一个对话开始查看</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { MessageCircle } from 'lucide-vue-next'
import { useConversationsStore } from '@/store/conversations'
import { storeToRefs } from 'pinia'

const route = useRoute()
const conversationsStore = useConversationsStore()
const { currentConversation: conversation, loading, error } = storeToRefs(conversationsStore)
const { fetchConversationDetail, clearError } = conversationsStore

// 格式化时间
function formatTime(timeStr: string) {
  const date = new Date(timeStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  // 小于1分钟
  if (diff < 60 * 1000) {
    return '刚刚'
  }
  
  // 小于1小时
  if (diff < 60 * 60 * 1000) {
    const minutes = Math.floor(diff / (60 * 1000))
    return `${minutes}分钟前`
  }
  
  // 小于1天
  if (diff < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(diff / (60 * 60 * 1000))
    return `${hours}小时前`
  }
  
  // 超过1天，显示具体日期
  return date.toLocaleString('zh-CN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 加载对话详情
async function loadConversation() {
  const conversationId = route.params.id
  if (conversationId && typeof conversationId === 'string') {
    const id = parseInt(conversationId, 10)
    if (!isNaN(id)) {
      await fetchConversationDetail(id)
    }
  }
}

// 监听路由变化
watch(() => route.params.id, () => {
  if (route.name === 'ConversationDetail') {
    loadConversation()
  }
}, { immediate: true })

// 清理状态
onMounted(() => {
  if (route.params.id) {
    loadConversation()
  }
})

// 组件卸载时清理当前对话
// onUnmounted(() => {
//   clearCurrentConversation()
// })
</script>
