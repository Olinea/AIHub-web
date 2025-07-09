import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { useAuthStore } from './auth'
import { useAiModelsStore } from './aiModels'

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant' | 'tool' | 'function'
  content: string
  name?: string | null
}

export interface ChatCompletionRequest {
  id: number // 模型ID
  conversationId?: number // 对话ID
  messages: ChatMessage[]
  stream?: boolean
  temperature?: number
  max_tokens?: number
  top_p?: number
  frequency_penalty?: number
  presence_penalty?: number
  stop?: string[]
}

export const useChatImprovedStore = defineStore('chat-improved', () => {
  const authStore = useAuthStore()
  const aiModelsStore = useAiModelsStore()
  const loading = ref(false)
  const error = ref<string | null>(null)
  const streamContent = ref('')

  // 改进的流式对话方法
  async function sendMessageStream(messages: ChatMessage[], conversationId?: number, options?: {
    temperature?: number
    max_tokens?: number
    top_p?: number
    frequency_penalty?: number
    presence_penalty?: number
    stop?: string[]
    onDelta?: (delta: string) => void
    onDone?: () => void
    onError?: (error: Error) => void
  }) {
    if (!authStore.token) {
      error.value = '未授权'
      return null
    }
    if (!aiModelsStore.currentModelId) {
      error.value = '未选择模型'
      return null
    }

    loading.value = true
    error.value = null
    streamContent.value = ''

    const req: ChatCompletionRequest = {
      id: aiModelsStore.currentModelId,
      conversationId,
      messages,
      stream: true,
      ...options
    }

    try {
      await fetchEventSource('/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authStore.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(req),
        async onopen(res) {
          if (res.ok && res.status === 200) {
            console.log('Connection made ', res)
          } else if (res.status >= 400 && res.status < 500 && res.status !== 429) {
            // 客户端错误，不重试
            console.log('Client side error ', res)
            throw new Error(`HTTP ${res.status}: ${res.statusText}`)
          }
        },
        onmessage(event) {
          console.log('Received SSE message:', event.data)
          
          // 处理[DONE]信号
          if (event.data === '[DONE]' || event.data.trim() === '[DONE]') {
            console.log('Received [DONE] signal')
            loading.value = false
            options?.onDone?.()
            return
          }

          // 尝试解析JSON数据
          try {
            const data = JSON.parse(event.data)
            console.log('Parsed SSE data:', data)
            
            const delta = data.choices?.[0]?.delta?.content || ''
            if (delta) {
              console.log('Extracted delta content:', delta)
              streamContent.value += delta
              options?.onDelta?.(delta)
            } else {
              console.log('No delta content found in:', data)
            }
          } catch (err) {
            console.error('Error parsing streaming data:', err, 'Raw data:', event.data)
          }
        },
        onclose() {
          console.log('Connection closed by the server')
          loading.value = false
        },
        onerror(err) {
          console.error('EventSource failed:', err)
          loading.value = false
          error.value = err instanceof Error ? err.message : '流式请求失败'
          options?.onError?.(err instanceof Error ? err : new Error('Unknown error'))
          throw err // 重新抛出错误以停止重试
        }
      })

      return streamContent.value
    } catch (err) {
      loading.value = false
      error.value = err instanceof Error ? err.message : 'AI流式请求失败'
      options?.onError?.(err instanceof Error ? err : new Error('Unknown error'))
      return null
    }
  }

  function clear() {
    streamContent.value = ''
    error.value = null
    loading.value = false
  }

  return {
    loading,
    error,
    streamContent,
    sendMessageStream,
    clear
  }
})
