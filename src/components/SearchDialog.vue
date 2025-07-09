<template>
  <Dialog v-model:open="isOpen">
    <DialogContent class="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle>搜索对话</DialogTitle>
        <DialogDescription>
          搜索你的历史对话消息
        </DialogDescription>
      </DialogHeader>
      
      <div class="space-y-4">
        <!-- 搜索输入框 -->
        <div class="relative">
          <Search class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            ref="searchInput"
            v-model="searchKeyword"
            placeholder="输入关键词搜索对话... (⌘K)"
            class="pl-10"
            @input="handleSearch"
            @keydown.enter="handleSearch"
            @keydown.esc="isOpen = false"
          />
        </div>
        
        <!-- 搜索结果 -->
        <div class="max-h-96 overflow-y-auto space-y-2">
          <!-- 加载状态 -->
          <div v-if="isLoading" class="flex items-center justify-center py-8">
            <div class="flex items-center space-x-2">
              <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              <span class="text-sm text-muted-foreground">搜索中...</span>
            </div>
          </div>
          
          <!-- 空状态 -->
          <div v-else-if="!searchKeyword.trim() && !hasSearched" class="text-center py-8">
            <Search class="mx-auto h-12 w-12 text-muted-foreground/50" />
            <p class="mt-2 text-sm text-muted-foreground">输入关键词开始搜索</p>
          </div>
          
          <!-- 无结果 -->
          <div v-else-if="hasSearched && searchResults.length === 0 && !errorMessage" class="text-center py-8">
            <div class="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center">
              <Search class="h-6 w-6 text-muted-foreground" />
            </div>
            <p class="mt-2 text-sm text-muted-foreground">未找到相关对话</p>
          </div>
          
          <!-- 错误状态 -->
          <div v-else-if="errorMessage" class="text-center py-8">
            <div class="mx-auto h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
              <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p class="mt-2 text-sm text-red-600">{{ errorMessage }}</p>
            <Button
              variant="outline"
              size="sm"
              class="mt-3"
              @click="handleSearch"
            >
              重试
            </Button>
          </div>
          
          <!-- 搜索结果列表 -->
          <div v-else class="space-y-2">
            <div
              v-for="result in searchResults"
              :key="`${result.conversationId}-${result.messageId}`"
              class="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors group"
              @click="goToConversation(result.conversationId)"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1 min-w-0">
                  <!-- 对话标题和时间 -->
                  <div class="flex items-center space-x-2 mb-1">
                    <h4 class="text-sm font-medium truncate group-hover:text-primary">{{ result.conversationTitle }}</h4>
                    <Badge variant="outline" class="text-xs">
                      {{ result.modelName }}
                    </Badge>
                  </div>
                  
                  <!-- 消息角色标识 -->
                  <div class="flex items-center space-x-1 mb-2">
                    <Avatar class="h-5 w-5">
                      <AvatarFallback class="text-xs" :class="result.messageRole === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'">
                        {{ result.messageRole === 'user' ? 'U' : 'AI' }}
                      </AvatarFallback>
                    </Avatar>
                    <span class="text-xs text-muted-foreground">
                      {{ result.messageRole === 'user' ? '用户' : 'AI助手' }}
                    </span>
                  </div>
                  
                  <!-- 消息内容预览 -->
                  <p class="text-sm text-muted-foreground line-clamp-2" v-html="highlightKeyword(result.messageContent)"></p>
                </div>
                
                <!-- 时间 -->
                <div class="text-xs text-muted-foreground ml-2 flex-shrink-0">
                  {{ formatTime(result.messageCreatedAt) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 分页 -->
        <div v-if="searchResults.length > 0" class="flex items-center justify-between pt-2 border-t">
          <div class="text-sm text-muted-foreground">
            共 {{ pagination.total }} 条结果
          </div>
          <div class="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              :disabled="pagination.current <= 1"
              @click="changePage(pagination.current - 1)"
            >
              上一页
            </Button>
            <span class="text-sm">
              {{ pagination.current }} / {{ pagination.pages }}
            </span>
            <Button
              variant="outline"
              size="sm"
              :disabled="pagination.current >= pagination.pages"
              @click="changePage(pagination.current + 1)"
            >
              下一页
            </Button>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from 'lucide-vue-next'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { searchConversations, type SearchResult } from '@/lib/search'



const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const router = useRouter()

const searchInput = ref<HTMLInputElement>()

const isOpen = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value)
})

const searchKeyword = ref('')
const searchResults = ref<SearchResult[]>([])
const isLoading = ref(false)
const hasSearched = ref(false)
const searchTimeout = ref<number | null>(null)
const errorMessage = ref('')

const pagination = ref({
  total: 0,
  size: 20,
  current: 1,
  pages: 0
})

// 监听搜索关键词变化，实现防抖搜索
watch(searchKeyword, (newKeyword) => {
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value)
  }
  
  if (newKeyword.trim()) {
    searchTimeout.value = setTimeout(() => {
      handleSearch()
    }, 500)
  } else {
    searchResults.value = []
    hasSearched.value = false
  }
})

// 执行搜索
const handleSearch = async () => {
  if (!searchKeyword.value.trim()) {
    return
  }
  
  isLoading.value = true
  hasSearched.value = true
  errorMessage.value = ''
  
  try {
    const result = await searchConversations(
      searchKeyword.value, 
      pagination.value.current, 
      pagination.value.size
    )
    
    searchResults.value = result.records
    pagination.value = {
      total: result.total,
      size: result.size,
      current: result.current,
      pages: result.pages
    }
  } catch (error) {
    console.error('搜索失败:', error)
    errorMessage.value = error instanceof Error ? error.message : '搜索失败，请稍后重试'
    searchResults.value = []
    pagination.value = {
      total: 0,
      size: 20,
      current: 1,
      pages: 0
    }
  } finally {
    isLoading.value = false
  }
}

// 翻页
const changePage = (page: number) => {
  pagination.value.current = page
  handleSearch()
}

// 跳转到对话详情
const goToConversation = (conversationId: number) => {
  isOpen.value = false
  router.push(`/conversation/${conversationId}`)
}

// 高亮关键词
const highlightKeyword = (text: string) => {
  if (!searchKeyword.value.trim()) {
    return text
  }
  
  const keyword = searchKeyword.value.trim()
  const regex = new RegExp(`(${keyword})`, 'gi')
  return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800">$1</mark>')
}

// 格式化时间
const formatTime = (timeStr: string) => {
  const date = new Date(timeStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  // 一天内显示时间
  if (diff < 24 * 60 * 60 * 1000) {
    return date.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }
  
  // 一年内显示月日
  if (diff < 365 * 24 * 60 * 60 * 1000) {
    return date.toLocaleDateString('zh-CN', { 
      month: '2-digit', 
      day: '2-digit' 
    })
  }
  
  // 超过一年显示年月日
  return date.toLocaleDateString('zh-CN', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit' 
  })
}

// 重置搜索状态
watch(isOpen, async (newValue) => {
  if (!newValue) {
    searchKeyword.value = ''
    searchResults.value = []
    hasSearched.value = false
    errorMessage.value = ''
    pagination.value.current = 1
  } else {
    // 对话框打开时自动聚焦到搜索框
    await nextTick()
    searchInput.value?.focus()
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
