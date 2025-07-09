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

export const useChatDebugStore = defineStore('chat-debug', () => {
  const authStore = useAuthStore()
  const aiModelsStore = useAiModelsStore()
  const loading = ref(false)
  const error = ref<string | null>(null)
  const streamContent = ref('')

  // 调试版本的流式对话方法
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
      console.log('Making request to:', '/api/v1/chat/completions')
      console.log('Request body:', JSON.stringify(req, null, 2))
      
      const res = await fetch('/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authStore.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
      })

      console.log('Response status:', res.status)
      console.log('Response headers:', Object.fromEntries(res.headers.entries()))

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`)
      }

      if (!res.body) {
        throw new Error('No response body')
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder('utf-8')
      let done = false
      let buffer = ''

      console.log('Starting to read stream...')

      while (!done) {
        const { value, done: readerDone } = await reader.read()
        done = readerDone

        if (value) {
          const chunk = decoder.decode(value, { stream: true })
          console.log('Raw chunk received:', JSON.stringify(chunk))
          
          buffer += chunk
          const lines = buffer.split('\n')
          
          // 保留最后一行（可能不完整）
          buffer = lines.pop() || ''
          
          for (const line of lines) {
            console.log('Processing line:', JSON.stringify(line))
            
            if (line.trim() === '') {
              continue
            }
            
            // 处理带data:前缀的行（支持有无空格两种格式）
            if (line.startsWith('data:')) {
              const data = line.startsWith('data: ') ? line.slice(6).trim() : line.slice(5).trim()
              console.log('Extracted data:', JSON.stringify(data))
              
              if (data === '[DONE]') {
                console.log('Stream complete - received [DONE]')
                loading.value = false
                options?.onDone?.()
                return streamContent.value
              }
              
              try {
                const parsed = JSON.parse(data)
                console.log('Parsed data:', parsed)
                
                const delta = parsed.choices?.[0]?.delta?.content || ''
                if (delta) {
                  console.log('Delta content:', JSON.stringify(delta))
                  streamContent.value += delta
                  options?.onDelta?.(delta)
                } else {
                  console.log('No delta content in parsed data')
                }
              } catch (err) {
                console.error('Error parsing JSON:', err, 'Data was:', data)
              }
            } else {
              console.log('Line does not start with "data:":', JSON.stringify(line))
            }
          }
        }
      }

      // 处理剩余的buffer
      if (buffer.trim()) {
        console.log('Processing remaining buffer:', JSON.stringify(buffer))
      }

      console.log('Stream reading complete')
      loading.value = false
      options?.onDone?.()
      return streamContent.value

    } catch (err) {
      console.error('Stream error:', err)
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
