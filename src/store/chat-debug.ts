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
  
  // Ollama思考模式状态管理
  const isInThinkMode = ref(false)
  const ollamaThinkBuffer = ref('')

  // 处理Ollama的思考模式内容
  function processOllamaContent(content: string, options?: { onDelta?: (delta: string, isReasoning?: boolean) => void }) {
    ollamaThinkBuffer.value += content
    
    // 检查是否进入思考模式
    if (ollamaThinkBuffer.value.includes('<think>') && !isInThinkMode.value) {
      isInThinkMode.value = true
      console.log('Entering Ollama think mode')
      
      // 处理<think>标签之前的内容作为正式回答
      const beforeThink = ollamaThinkBuffer.value.split('<think>')[0]
      if (beforeThink) {
        console.log('Content before think:', JSON.stringify(beforeThink))
        streamContent.value += beforeThink
        options?.onDelta?.(beforeThink, false)
      }
      
      // 重置buffer，准备收集思考内容
      ollamaThinkBuffer.value = ollamaThinkBuffer.value.substring(ollamaThinkBuffer.value.indexOf('<think>') + 7)
      return
    }
    
    // 检查是否退出思考模式
    if (ollamaThinkBuffer.value.includes('</think>') && isInThinkMode.value) {
      console.log('Exiting Ollama think mode')
      
      // 提取思考内容
      const thinkContent = ollamaThinkBuffer.value.split('</think>')[0]
      if (thinkContent) {
        console.log('Think content:', JSON.stringify(thinkContent))
        options?.onDelta?.(thinkContent, true) // true表示这是思考内容
      }
      
      // 处理</think>标签之后的内容作为正式回答
      const afterThink = ollamaThinkBuffer.value.split('</think>')[1]
      if (afterThink) {
        console.log('Content after think:', JSON.stringify(afterThink))
        streamContent.value += afterThink
        options?.onDelta?.(afterThink, false)
      }
      
      isInThinkMode.value = false
      ollamaThinkBuffer.value = ''
      return
    }
    
    // 如果在思考模式中，累积思考内容
    if (isInThinkMode.value) {
      console.log('Accumulating think content:', JSON.stringify(content))
      // 思考内容会在退出思考模式时一次性发送
      return
    }
    
    // 正常内容直接处理
    console.log('Normal Ollama content:', JSON.stringify(content))
    streamContent.value += content
    options?.onDelta?.(content, false)
  }

  // 调试版本的流式对话方法
  async function sendMessageStream(messages: ChatMessage[], conversationId?: number, options?: {
    temperature?: number
    max_tokens?: number
    top_p?: number
    frequency_penalty?: number
    presence_penalty?: number
    stop?: string[]
    onDelta?: (delta: string, isReasoning?: boolean) => void
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
    
    // 重置Ollama思考模式状态
    isInThinkMode.value = false
    ollamaThinkBuffer.value = ''

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
                
                // 检查是否是ollama格式
                if (parsed.message && parsed.message.content !== undefined) {
                  // Ollama 格式处理
                  console.log('Detected Ollama format')
                  
                  const content = parsed.message.content || ''
                  if (content) {
                    // 使用新的思考模式处理函数
                    processOllamaContent(content, options)
                  }
                  
                  // 检查是否完成
                  if (parsed.done === true) {
                    console.log('Ollama stream complete - received done:true')
                    loading.value = false
                    
                    // 如果还在思考模式中，需要处理剩余的思考内容
                    if (isInThinkMode.value && ollamaThinkBuffer.value) {
                      console.log('Processing remaining think content on completion')
                      options?.onDelta?.(ollamaThinkBuffer.value, true)
                    }
                    
                    // 重置状态
                    isInThinkMode.value = false
                    ollamaThinkBuffer.value = ''
                    
                    options?.onDone?.()
                    return streamContent.value
                  }
                } else {
                  // OpenAI 格式处理
                  console.log('Detected OpenAI format')
                  
                  const choice = parsed.choices?.[0]
                  if (choice) {
                    const delta = choice.delta
                    
                    // 处理思考内容 (reasoning_content)
                    const reasoningContent = delta?.reasoning_content || ''
                    if (reasoningContent) {
                      console.log('Reasoning content:', JSON.stringify(reasoningContent))
                      options?.onDelta?.(reasoningContent, true) // true表示这是思考内容
                    }
                    
                    // 处理正式回答内容 (content)
                    const responseContent = delta?.content || ''
                    if (responseContent) {
                      console.log('Response content:', JSON.stringify(responseContent))
                      streamContent.value += responseContent
                      options?.onDelta?.(responseContent, false) // false表示这是正式回答
                    }
                  } else {
                    console.log('No choices in parsed data')
                  }
                }
              } catch (err) {
                console.error('Error parsing JSON:', err, 'Data was:', data)
              }
            } else {
              // 尝试直接解析JSON（兼容ollama不带data:前缀的情况）
              try {
                const parsed = JSON.parse(line)
                console.log('Parsed direct JSON:', parsed)
                
                // 检查是否是ollama格式
                if (parsed.message && parsed.message.content !== undefined) {
                  console.log('Detected Ollama format (direct JSON)')
                  
                  const content = parsed.message.content || ''
                  if (content) {
                    // 使用新的思考模式处理函数
                    processOllamaContent(content, options)
                  }
                  
                  // 检查是否完成
                  if (parsed.done === true) {
                    console.log('Ollama stream complete - received done:true (direct)')
                    loading.value = false
                    
                    // 如果还在思考模式中，需要处理剩余的思考内容
                    if (isInThinkMode.value && ollamaThinkBuffer.value) {
                      console.log('Processing remaining think content on completion (direct)')
                      options?.onDelta?.(ollamaThinkBuffer.value, true)
                    }
                    
                    // 重置状态
                    isInThinkMode.value = false
                    ollamaThinkBuffer.value = ''
                    
                    options?.onDone?.()
                    return streamContent.value
                  }
                } else {
                  console.log('Line does not match expected formats:', JSON.stringify(line))
                }
              } catch (err) {
                console.log('Line is not valid JSON:', JSON.stringify(line))
              }
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
    // 重置Ollama思考模式状态
    isInThinkMode.value = false
    ollamaThinkBuffer.value = ''
  }

  return {
    loading,
    error,
    streamContent,
    sendMessageStream,
    clear
  }
})
