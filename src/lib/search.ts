import { useAuthStore } from '@/store/auth'

// 搜索结果接口
export interface SearchResult {
  conversationId: number
  conversationTitle: string
  messageId: number
  messageRole: 'user' | 'assistant'
  messageContent: string
  messageCreatedAt: string
  modelId: number
  modelName: string
  matchScore: number
}

// 搜索响应接口
export interface SearchResponse {
  total: number
  size: number
  current: number
  pages: number
  records: SearchResult[]
}

// API响应基础结构
interface ApiResponse<T> {
  code: number
  message: string
  data: T
  timestamp: number
}

/**
 * 搜索历史对话
 * @param keyword 搜索关键词
 * @param current 当前页数，默认1
 * @param size 每页大小，默认20
 * @returns Promise<SearchResponse>
 */
export async function searchConversations(
  keyword: string,
  current: number = 1,
  size: number = 20
): Promise<SearchResponse> {
  const authStore = useAuthStore()
  
  if (!keyword.trim()) {
    throw new Error('搜索关键词不能为空')
  }

  const response = await fetch(
    `/api/v1/conversations/search?keyword=${encodeURIComponent(keyword)}&current=${current}&size=${size}`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authStore.token}`,
        'Content-Type': 'application/json'
      }
    }
  )

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('用户未认证')
    } else if (response.status === 400) {
      throw new Error('请求参数错误')
    } else {
      throw new Error(`搜索请求失败: ${response.status}`)
    }
  }

  const result: ApiResponse<SearchResponse> = await response.json()
  
  if (result.code !== 200) {
    throw new Error(result.message || '搜索失败')
  }

  return result.data
}
