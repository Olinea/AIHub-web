import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth'
import { useAiModelsStore } from './aiModels'

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant' | 'tool' | 'function'
  content: string
  name?: string | null
}

export interface ChatCompletionRequest {
  id: number // 模型ID
  messages: ChatMessage[]
  stream?: boolean
  temperature?: number
  max_tokens?: number
  top_p?: number
  frequency_penalty?: number
  presence_penalty?: number
  stop?: string[]
}

export interface ChatCompletionResponse {
  id: string
  object: string
  created: number
  model: string
  systemFingerprint: string | null
  choices: Array<{
    index: number
    message: ChatMessage
    delta: any
    finishReason: string | null
  }>
  usage: any
}

export const useChatStore = defineStore('chat', () => {
  const authStore = useAuthStore()
  const aiModelsStore = useAiModelsStore()
  const loading = ref(false)
  const error = ref<string | null>(null)
  const response = ref<ChatCompletionResponse | null>(null)
  const streamContent = ref('')

  // 发送AI对话请求（同步）
  async function sendMessage(messages: ChatMessage[], options?: {
    temperature?: number
    max_tokens?: number
    top_p?: number
    frequency_penalty?: number
    presence_penalty?: number
    stop?: string[]
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
    response.value = null
    try {
      const req: ChatCompletionRequest = {
        id: aiModelsStore.currentModelId,
        messages,
        stream: false,
        ...options
      }
      const res = await fetch('/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authStore.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
      })
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`)
      }
      const data = await res.json()
      if (data.choices) {
        response.value = data
        return data
      } else {
        throw new Error(data.message || 'AI响应异常')
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'AI请求失败'
      return null
    } finally {
      loading.value = false
    }
  }

  // 流式对话
  async function sendMessageStream(messages: ChatMessage[], options?: {
    temperature?: number
    max_tokens?: number
    top_p?: number
    frequency_penalty?: number
    presence_penalty?: number
    stop?: string[]
    onDelta?: (delta: string) => void
    onDone?: () => void
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
    try {
      const req: ChatCompletionRequest = {
        id: aiModelsStore.currentModelId,
        messages,
        stream: true,
        ...options
      }
      const res = await fetch('/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authStore.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
      })
      if (!res.body) throw new Error('无响应流')
      const reader = res.body.getReader()
      const decoder = new TextDecoder('utf-8')
      let done = false
      while (!done) {
        const { value, done: readerDone } = await reader.read()
        if (value) {
          const chunk = decoder.decode(value, { stream: true })
          // 处理每一行 data: ...
          chunk.split('\n').forEach(line => {
            if (line.startsWith('data: ')) {
              const json = line.slice(6)
              if (json === '[DONE]') {
                options?.onDone?.()
              } else {
                try {
                  const obj = JSON.parse(json)
                  const delta = obj.choices?.[0]?.delta?.content || ''
                  if (delta) {
                    streamContent.value += delta
                    options?.onDelta?.(delta)
                  }
                } catch {}
              }
            }
          })
        }
        done = readerDone
      }
      options?.onDone?.()
      return streamContent.value
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'AI流式请求失败'
      return null
    } finally {
      loading.value = false
    }
  }

  function clear() {
    response.value = null
    streamContent.value = ''
    error.value = null
  }

  return {
    loading,
    error,
    response,
    streamContent,
    sendMessage,
    sendMessageStream,
    clear
  }
})
