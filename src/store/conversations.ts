import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './auth'

// 对话列表项接口
export interface ConversationListItem {
  id: number
  title: string
  status: 'active' | 'archived' | 'deleted'
  modelId: number
  modelName: string
  messageCount: number
  totalTokens: number
  lastMessageContent: string
  lastMessageTime: string
  createdAt: string
  updatedAt: string
}

// 消息详情接口
export interface MessageDetail {
  id: number
  role: 'system' | 'user' | 'assistant' | 'tool' | 'function'
  content: string
  name: string | null
  modelId: number
  modelName: string
  tokensConsumed: number
  promptTokens: number
  completionTokens: number
  totalTokens: number
  finishReason: string
  toolCalls: string | null
  toolCallId: string | null
  systemFingerprint: string
  createdAt: string
}

// 对话详情接口
export interface ConversationDetail {
  id: number
  title: string
  status: 'active' | 'archived' | 'deleted'
  modelId: number
  modelName: string
  messageCount: number
  totalTokens: number
  createdAt: string
  updatedAt: string
  messages: MessageDetail[]
}

// API响应格式
interface ApiResponse<T> {
  code: number
  message: string
  data: T
  timestamp: number
}

// 分页响应格式
interface PageResponse<T> {
  current: number
  size: number
  total: number
  pages: number
  records: T[]
}

export const useConversationsStore = defineStore('conversations', () => {
  const authStore = useAuthStore()
  
  // 状态
  const conversations = ref<ConversationListItem[]>([])
  const currentConversation = ref<ConversationDetail | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  // 计算属性
  const activeConversations = computed(() => 
    conversations.value.filter(conv => conv.status === 'active')
  )
  
  const archivedConversations = computed(() => 
    conversations.value.filter(conv => conv.status === 'archived')
  )

  // 获取对话列表
  async function fetchConversations() {
    if (!authStore.token) {
      error.value = '未授权'
      return
    }

    loading.value = true
    error.value = null
    
    try {
      const response = await fetch('/api/v1/conversations', {
        headers: {
          'Authorization': `Bearer ${authStore.token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result: ApiResponse<ConversationListItem[]> = await response.json()
      
      if (result.code === 200) {
        conversations.value = result.data
      } else {
        throw new Error(result.message)
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : '获取对话列表失败'
      console.error('获取对话列表失败:', err)
    } finally {
      loading.value = false
    }
  }

  // 分页获取对话列表
  async function fetchConversationsWithPagination(current = 1, size = 20) {
    if (!authStore.token) {
      error.value = '未授权'
      return null
    }

    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(`/api/v1/conversations/page?current=${current}&size=${size}`, {
        headers: {
          'Authorization': `Bearer ${authStore.token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result: ApiResponse<PageResponse<ConversationListItem>> = await response.json()
      
      if (result.code === 200) {
        return result.data
      } else {
        throw new Error(result.message)
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : '获取对话列表失败'
      console.error('获取对话列表失败:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  // 获取对话详情
  async function fetchConversationDetail(conversationId: number) {
    if (!authStore.token) {
      error.value = '未授权'
      return null
    }

    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(`/api/v1/conversations/${conversationId}`, {
        headers: {
          'Authorization': `Bearer ${authStore.token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result: ApiResponse<ConversationDetail> = await response.json()
      
      if (result.code === 200) {
        currentConversation.value = result.data
        return result.data
      } else {
        throw new Error(result.message)
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : '获取对话详情失败'
      console.error('获取对话详情失败:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  // 更新对话标题
  async function updateConversationTitle(conversationId: number, title: string) {
    if (!authStore.token) {
      error.value = '未授权'
      return false
    }

    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(`/api/v1/conversations/${conversationId}/title`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authStore.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title })
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result: ApiResponse<null> = await response.json()
      
      if (result.code === 200) {
        // 更新本地状态
        const conversation = conversations.value.find(conv => conv.id === conversationId)
        if (conversation) {
          conversation.title = title
        }
        if (currentConversation.value && currentConversation.value.id === conversationId) {
          currentConversation.value.title = title
        }
        return true
      } else {
        throw new Error(result.message)
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : '更新对话标题失败'
      console.error('更新对话标题失败:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  // 归档对话
  async function archiveConversation(conversationId: number) {
    if (!authStore.token) {
      error.value = '未授权'
      return false
    }

    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(`/api/v1/conversations/${conversationId}/archive`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authStore.token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result: ApiResponse<null> = await response.json()
      
      if (result.code === 200) {
        // 更新本地状态
        const conversation = conversations.value.find(conv => conv.id === conversationId)
        if (conversation) {
          conversation.status = 'archived'
        }
        return true
      } else {
        throw new Error(result.message)
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : '归档对话失败'
      console.error('归档对话失败:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  // 删除对话
  async function deleteConversation(conversationId: number) {
    if (!authStore.token) {
      error.value = '未授权'
      return false
    }

    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(`/api/v1/conversations/${conversationId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authStore.token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result: ApiResponse<null> = await response.json()
      
      if (result.code === 200) {
        // 从本地状态中移除
        const index = conversations.value.findIndex(conv => conv.id === conversationId)
        if (index > -1) {
          conversations.value.splice(index, 1)
        }
        // 如果当前查看的对话被删除，清空当前对话
        if (currentConversation.value && currentConversation.value.id === conversationId) {
          currentConversation.value = null
        }
        return true
      } else {
        throw new Error(result.message)
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : '删除对话失败'
      console.error('删除对话失败:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  // 清空错误
  function clearError() {
    error.value = null
  }

  // 清空当前对话
  function clearCurrentConversation() {
    currentConversation.value = null
  }

  return {
    // 状态
    conversations,
    currentConversation,
    loading,
    error,
    
    // 计算属性
    activeConversations,
    archivedConversations,
    
    // 方法
    fetchConversations,
    fetchConversationsWithPagination,
    fetchConversationDetail,
    updateConversationTitle,
    archiveConversation,
    deleteConversation,
    clearError,
    clearCurrentConversation
  }
})
