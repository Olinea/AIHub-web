<template>
  <div class="flex flex-col h-full bg-white">
    <!-- 对话头部 -->
    <div class="border-b border-gray-200 px-6 py-4 bg-white">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <h1 v-if="conversation" class="text-xl font-semibold text-gray-900">
            {{ conversation.title }}
          </h1>
          <div v-else-if="loading" class="animate-pulse h-6 bg-gray-200 rounded w-48"></div>
          <div v-else class="text-xl font-semibold text-gray-900">新对话</div>
        </div>
        
        <div v-if="conversation" class="flex items-center space-x-3 text-sm text-gray-500">
          <span class="px-2 py-1 bg-gray-100 rounded-full">{{ conversation.modelName }}</span>
          <span>{{ conversation.messageCount }} 条消息</span>
          <span>{{ conversation.totalTokens }} tokens</span>
        </div>
      </div>
    </div>

    <!-- 错误提示 -->
    <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mx-6 mt-4 rounded-lg">
      <div class="flex items-center justify-between">
        <p>{{ error }}</p>
        <button 
          @click="clearError"
          class="text-red-500 hover:text-red-700 ml-4"
        >
          ✕
        </button>
      </div>
    </div>

    <!-- 消息列表容器 -->
    <div 
      ref="messagesContainer"
      class="flex-1 overflow-y-auto bg-gray-50"
      @scroll="handleScroll"
    >
      <!-- 加载状态 -->
      <div v-if="loading && !conversation && !isNewConversation" class="p-6">
        <div class="space-y-6 max-w-4xl mx-auto">
          <div v-for="i in 3" :key="i" class="animate-pulse">
            <div class="flex space-x-4 p-6">
              <div class="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div class="flex-1 space-y-3">
                <div class="h-4 bg-gray-300 rounded w-1/4"></div>
                <div class="space-y-2">
                  <div class="h-4 bg-gray-300 rounded"></div>
                  <div class="h-4 bg-gray-300 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 消息列表 -->
      <div v-else-if="conversation?.messages?.length || currentMessages.length" class="py-6">
        <div class="max-w-4xl mx-auto px-6">
          <div class="space-y-6">
            <!-- 历史消息 -->
            <div
              v-for="message in displayMessages"
              :key="message.id"
              class="group"
            >
              <div 
                class="flex items-start space-x-4 p-4 rounded-lg transition-colors"
                :class="{
                  'bg-white': message.role === 'user',
                  'bg-gray-50': message.role === 'assistant',
                  'bg-blue-50': message.role === 'system'
                }"
              >
                <!-- 头像 -->
                <div class="flex-shrink-0">
                  <div 
                    class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium text-white"
                    :class="{
                      'bg-blue-600': message.role === 'user',
                      'bg-green-600': message.role === 'assistant',
                      'bg-gray-600': message.role === 'system'
                    }"
                  >
                    {{ message.role === 'user' ? 'U' : message.role === 'assistant' ? 'A' : 'S' }}
                  </div>
                </div>

                <!-- 消息内容 -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-center space-x-2 mb-2">
                    <span class="text-sm font-medium text-gray-900">
                      {{ message.role === 'user' ? '您' : message.role === 'assistant' ? 'AI助手' : '系统' }}
                    </span>
                    <span class="text-xs text-gray-500">
                      {{ message.createdAt ? formatTime(message.createdAt) : '刚刚' }}
                    </span>
                    <span v-if="message.totalTokens" class="text-xs text-gray-400">
                      {{ message.totalTokens }} tokens
                    </span>
                  </div>
                  
                  <!-- Markdown 渲染的消息内容 -->
                  <div 
                    class="prose prose-sm max-w-none"
                    :class="{
                      'prose-blue': message.role === 'user',
                      'prose-green': message.role === 'assistant'
                    }"
                  >
                    <div 
                      v-if="message.role === 'assistant'"
                      v-html="renderMarkdown(message.content)"
                      class="markdown-content"
                    ></div>
                    <div 
                      v-else 
                      class="whitespace-pre-wrap break-words text-gray-800"
                    >{{ message.content }}</div>
                  </div>

                  <!-- 工具调用信息 -->
                  <div v-if="message.toolCalls" class="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <details>
                      <summary class="cursor-pointer text-yellow-700 text-sm font-medium">工具调用</summary>
                      <pre class="mt-2 text-xs text-yellow-600 overflow-auto">{{ message.toolCalls }}</pre>
                    </details>
                  </div>
                </div>
              </div>
            </div>

            <!-- AI正在回复的流式内容 -->
            <div v-if="chatStore.loading && streamingMessage" class="group">
              <div class="flex items-start space-x-4 p-4 rounded-lg bg-gray-50">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium text-white bg-green-600">
                    A
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center space-x-2 mb-2">
                    <span class="text-sm font-medium text-gray-900">AI助手</span>
                    <span class="text-xs text-gray-500">正在回复...</span>
                    <div class="flex space-x-1">
                      <div class="w-1 h-1 bg-green-500 rounded-full animate-bounce"></div>
                      <div class="w-1 h-1 bg-green-500 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                      <div class="w-1 h-1 bg-green-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                    </div>
                  </div>
                  <div 
                    class="prose prose-sm max-w-none prose-green typewriter-content"
                    :class="{ 'typing': isTyping }"
                    v-html="renderMarkdown(streamingMessage)"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态 - 新对话 -->
      <div v-else class="flex flex-col items-center justify-center h-full text-gray-500">
        <div class="text-center max-w-md">
          <MessageCircle class="w-16 h-16 mb-4 text-gray-300 mx-auto" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">开始新对话</h3>
          <p class="text-gray-600 mb-6">向AI助手发送消息开始对话，支持Markdown格式</p>
          
          <!-- 示例问题 -->
          <div class="space-y-2">
            <button
              v-for="example in exampleQuestions"
              :key="example"
              @click="setInputText(example)"
              class="block w-full p-3 text-left bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-sm"
            >
              {{ example }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 输入区域 -->
    <div class="border-t border-gray-200 bg-white">
      <div class="max-w-4xl mx-auto px-6 py-4">
        <div class="flex space-x-4">
          <div class="flex-1">
            <div class="relative">
              <textarea
                ref="textareaRef"
                v-model="inputText"
                @keydown="handleKeyDown"
                @input="adjustTextareaHeight"
                placeholder="输入消息... (Shift + Enter 换行，Enter 发送)"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                :class="{
                  'bg-gray-100': chatStore.loading
                }"
                :disabled="chatStore.loading"
                rows="1"
                style="max-height: 200px;"
              ></textarea>
              
              <!-- 字符计数 -->
              <div class="absolute bottom-2 right-2 text-xs text-gray-400">
                {{ inputText.length }}/2000
              </div>
            </div>
          </div>
          
          <button
            @click="sendMessage"
            :disabled="!inputText.trim() || chatStore.loading"
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
          >
            <span v-if="!chatStore.loading">发送</span>
            <span v-else class="flex items-center space-x-2">
              <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>发送中</span>
            </span>
          </button>
        </div>

        <!-- 模型信息显示 -->
        <div class="flex items-center justify-between mt-3">
          <div class="flex items-center space-x-3 text-sm text-gray-500">
            <span>当前模型:</span>
            <span v-if="aiModelsStore.currentModel" class="font-medium text-gray-700">
              {{ aiModelsStore.currentModel.modelName }} ({{ aiModelsStore.currentModel.provider }})
            </span>
            <span v-else class="text-gray-400">请在侧边栏选择模型</span>
          </div>
          
          <div class="text-xs text-gray-400">
            <span v-if="aiModelsStore.currentModel">
              每1K tokens: ¥{{ aiModelsStore.currentModel.costPer1kTokens }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { MessageCircle } from 'lucide-vue-next'
import { useConversationsStore } from '@/store/conversations'
import { useChatStore, type ChatMessage } from '@/store/chat'
import { useAiModelsStore } from '@/store/aiModels'
import { storeToRefs } from 'pinia'
import { marked } from 'marked'
import type { MessageDetail } from '@/store/conversations'

// 路由和store
const route = useRoute()
const router = useRouter()
const conversationsStore = useConversationsStore()
const chatStore = useChatStore()
const aiModelsStore = useAiModelsStore()

// 响应式数据
const { currentConversation: conversation, loading, error } = storeToRefs(conversationsStore)
const { fetchConversationDetail, clearError, createConversation } = conversationsStore

// 界面状态
const inputText = ref('')
const textareaRef = ref<HTMLTextAreaElement>()
const messagesContainer = ref<HTMLDivElement>()
const currentMessages = ref<MessageDetail[]>([])
const streamingMessage = ref('')
const typewriterText = ref('')
const isTyping = ref(false)

// 示例问题
const exampleQuestions = [
  '请介绍一下人工智能的发展历程',
  '如何学习前端开发？',
  '写一个JavaScript排序算法',
  '解释一下什么是机器学习'
]

// 计算属性
const isNewConversation = computed(() => {
  return route.params.id === 'new'
})

const displayMessages = computed(() => {
  if (conversation.value) {
    return [...conversation.value.messages, ...currentMessages.value]
  }
  return currentMessages.value
})

// 配置marked选项
marked.setOptions({
  breaks: true,
  gfm: true
})

// Markdown渲染函数
function renderMarkdown(content: string): string {
  return marked(content) as string
}

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

// 自动调整textarea高度
function adjustTextareaHeight() {
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto'
    textareaRef.value.style.height = textareaRef.value.scrollHeight + 'px'
  }
}

// 处理键盘事件
function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    sendMessage()
  }
}

// 设置输入框内容
function setInputText(text: string) {
  inputText.value = text
  nextTick(() => {
    textareaRef.value?.focus()
  })
}

// 滚动到底部
function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

// 打字机效果
let typewriterQueue: string[] = []
let typewriterTimer: number | null = null
let accumulatedContent = ''

function startTypewriter(newContent: string) {
  // 累积内容
  accumulatedContent += newContent
  
  // 将新内容加入队列
  typewriterQueue.push(...newContent.split(''))
  
  if (!isTyping.value) {
    isTyping.value = true
    processTypewriterQueue()
  }
}

function processTypewriterQueue() {
  if (typewriterQueue.length === 0) {
    isTyping.value = false
    return
  }
  
  const char = typewriterQueue.shift()
  if (char) {
    typewriterText.value += char
    streamingMessage.value = typewriterText.value
    scrollToBottom()
  }
  
  // 调整打字速度 - 根据字符类型和队列长度动态调整
  let delay = 50
  if (char === ' ') {
    delay = 30
  } else if (char === '\n') {
    delay = 100
  } else if (char === '.' || char === '!' || char === '?') {
    delay = 150
  } else if (char === ',') {
    delay = 80
  } else {
    // 如果队列很长，加快速度
    delay = typewriterQueue.length > 50 ? 20 : Math.random() * 30 + 30
  }
  
  typewriterTimer = window.setTimeout(processTypewriterQueue, delay)
}

function stopTypewriter() {
  if (typewriterTimer) {
    clearTimeout(typewriterTimer)
    typewriterTimer = null
  }
  
  // 立即显示所有剩余内容
  if (typewriterQueue.length > 0) {
    typewriterText.value += typewriterQueue.join('')
    streamingMessage.value = typewriterText.value
    typewriterQueue = []
  }
  
  isTyping.value = false
  scrollToBottom()
}

// 处理滚动事件
function handleScroll() {
  // 可以在这里处理滚动相关逻辑，比如检测是否滚动到顶部加载更多消息
}

// 发送消息
async function sendMessage() {
  if (!inputText.value.trim()) return
  
  const messageContent = inputText.value.trim()
  inputText.value = ''
  
  // 检查是否选择了模型
  if (!aiModelsStore.currentModelId) {
    chatStore.error = '请先在侧边栏选择AI模型'
    return
  }
  
  // 如果是新对话，先创建对话
  let conversationId: number
  if (isNewConversation.value) {
    const newId = await createConversation('新对话')
    if (!newId) {
      chatStore.error = '创建对话失败'
      return
    }
    conversationId = newId
    // 跳转到新创建的对话
    router.push(`/conversation/${newId}`)
  } else {
    conversationId = parseInt(route.params.id as string, 10)
  }
  
  // 添加用户消息到临时列表
  const userMessage: MessageDetail = {
    id: Date.now(), // 临时ID
    role: 'user',
    content: messageContent,
    name: null,
    modelId: aiModelsStore.currentModelId,
    modelName: aiModelsStore.currentModel?.modelName || '',
    tokensConsumed: 0,
    promptTokens: 0,
    completionTokens: 0,
    totalTokens: 0,
    finishReason: '',
    toolCalls: null,
    toolCallId: null,
    systemFingerprint: '',
    createdAt: new Date().toISOString()
  }
  
  currentMessages.value.push(userMessage)
  scrollToBottom()
  
  // 构建消息历史
  const messages: ChatMessage[] = displayMessages.value.map(msg => ({
    role: msg.role,
    content: msg.content,
    name: msg.name
  }))
  
  // 重置流式消息和打字机
  streamingMessage.value = ''
  typewriterText.value = ''
  accumulatedContent = ''
  stopTypewriter()
  
  try {
    // 发送流式请求
    await chatStore.sendMessageStream(
      messages,
      conversationId,
      {
        temperature: 0.7,
        max_tokens: 2000,
        onDelta: (delta: string) => {
          startTypewriter(delta)
        },
        onDone: () => {
          // 流式完成，停止打字机效果
          setTimeout(() => {
            stopTypewriter()
            // 重新加载对话详情以获取完整的消息记录
            if (!isNewConversation.value) {
              fetchConversationDetail(conversationId)
            }
            streamingMessage.value = ''
            typewriterText.value = ''
            accumulatedContent = ''
            currentMessages.value = []
          }, 1000) // 给打字机效果一点时间完成
        }
      }
    )
  } catch (err) {
    console.error('发送消息失败:', err)
  }
}

// 加载对话详情
async function loadConversation() {
  if (isNewConversation.value) {
    // 清空当前对话和消息
    conversationsStore.clearCurrentConversation()
    currentMessages.value = []
    return
  }
  
  const conversationId = route.params.id
  if (conversationId && typeof conversationId === 'string') {
    const id = parseInt(conversationId, 10)
    if (!isNaN(id)) {
      await fetchConversationDetail(id)
      currentMessages.value = []
    }
  }
}

// 监听路由变化
watch(() => route.params.id, () => {
  if (route.name === 'ConversationDetail') {
    loadConversation()
  }
}, { immediate: true })

// 组件挂载
onMounted(async () => {
  // 加载启用的模型列表
  await aiModelsStore.fetchEnabledModels()
  
  if (route.params.id) {
    await loadConversation()
  }
})
</script>

<style scoped>
/* 打字机效果样式 */
.typewriter-content {
  position: relative;
}

.typewriter-content.typing::after {
  content: '▊';
  color: #10b981;
  animation: typewriter-blink 1.2s infinite;
  font-weight: normal;
  margin-left: 1px;
  display: inline-block;
  vertical-align: baseline;
}

@keyframes typewriter-blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0.3;
  }
}

/* 打字完成后隐藏光标 */
.typewriter-content:not(.typing)::after {
  display: none;
}

/* 打字机文本的流畅动画 */
.typewriter-content {
  transition: all 0.1s ease-out;
}

/* 让AI回复区域在打字时有轻微的发光效果 */
.typewriter-content.typing {
  animation: subtle-glow 2s ease-in-out infinite alternate;
}

@keyframes subtle-glow {
  from {
    box-shadow: 0 0 5px rgba(16, 185, 129, 0.1);
  }
  to {
    box-shadow: 0 0 10px rgba(16, 185, 129, 0.2);
  }
}

/* Markdown内容样式 */
.markdown-content {
  line-height: 1.7;
}

.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4,
.markdown-content h5,
.markdown-content h6 {
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  font-weight: 600;
}

.markdown-content h1 {
  font-size: 1.5em;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0.3em;
}

.markdown-content h2 {
  font-size: 1.3em;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.2em;
}

.markdown-content h3 {
  font-size: 1.1em;
}

.markdown-content p {
  margin-bottom: 1em;
}

.markdown-content ul,
.markdown-content ol {
  margin-bottom: 1em;
  padding-left: 1.5em;
}

.markdown-content li {
  margin-bottom: 0.25em;
}

.markdown-content blockquote {
  border-left: 4px solid #e5e7eb;
  padding-left: 1em;
  margin: 1em 0;
  font-style: italic;
  color: #6b7280;
}

.markdown-content code {
  background-color: #f3f4f6;
  padding: 0.125em 0.25em;
  border-radius: 0.25rem;
  font-size: 0.875em;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.markdown-content pre {
  background-color: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1em;
  overflow-x: auto;
  margin: 1em 0;
}

.markdown-content pre code {
  background-color: transparent;
  padding: 0;
  border-radius: 0;
}

.markdown-content a {
  color: #3b82f6;
  text-decoration: underline;
}

.markdown-content a:hover {
  color: #1d4ed8;
}

.markdown-content table {
  border-collapse: collapse;
  width: 100%;
  margin: 1em 0;
}

.markdown-content th,
.markdown-content td {
  border: 1px solid #e5e7eb;
  padding: 0.5em;
  text-align: left;
}

.markdown-content th {
  background-color: #f9fafb;
  font-weight: 600;
}

/* 自定义滚动条 */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* 输入框聚焦动画 */
textarea:focus {
  transform: translateY(-1px);
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.1);
}

/* 按钮悬停效果 */
button:hover:not(:disabled) {
  transform: translateY(-1px);
}

/* 加载动画 */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* 消息气泡样式 */
.group:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .max-w-4xl {
    max-width: 100%;
  }
  
  .px-6 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
