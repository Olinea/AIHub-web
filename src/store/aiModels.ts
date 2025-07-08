import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface AiModel {
  id: number
  modelName: string
  provider: string
  apiEndpoint: string
  apiKey: string
  apiSecret: string
  organizationId: string
  projectId: string
  extraHeaders: string
  costPer1kTokens: number
  rateLimitPerMinute: number
  isEnabled: boolean
  createdAt: string
  updatedAt: string
}

export interface AiModelPageInfo {
  records: AiModel[]
  total: number
  size: number
  current: number
  pages: number
}

export interface AddAiModelRequest {
  modelName: string
  provider: string
  apiEndpoint: string
  apiKey: string
  apiSecret?: string
  organizationId?: string
  projectId?: string
  extraHeaders?: string
  costPer1kTokens: number
  rateLimitPerMinute: number
  isEnabled: boolean
}

export interface UpdateAiModelRequest extends AddAiModelRequest {
  id: number
}

export const useAiModelsStore = defineStore('aiModels', () => {
  // 状态
  const models = ref<AiModel[]>([])
  const allModels = ref<AiModel[]>([])
  const currentPage = ref(1)
  const pageSize = ref(10)
  const totalModels = ref(0)
  const totalPages = ref(0)
  const loading = ref(false)
  const searchFilters = ref({
    modelName: '',
    provider: '',
    isEnabled: undefined as boolean | undefined
  })

  // 计算属性
  const hasModels = computed(() => models.value.length > 0)
  const enabledModels = computed(() => allModels.value.filter(model => model.isEnabled))

  // API调用函数
  async function fetchModels(page = 1, size = 10, filters?: {
    modelName?: string
    provider?: string
    isEnabled?: boolean
  }) {
    try {
      loading.value = true
      const token = localStorage.getItem('token')
      
      const params = new URLSearchParams({
        current: page.toString(),
        size: size.toString()
      })
      
      if (filters?.modelName) params.append('modelName', filters.modelName)
      if (filters?.provider) params.append('provider', filters.provider)
      if (filters?.isEnabled !== undefined) params.append('isEnabled', filters.isEnabled.toString())
      
      const response = await fetch(`/api/admin/ai-models?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const result = await response.json()
        if (result.code === 200) {
          const pageData: AiModelPageInfo = result.data
          models.value = pageData.records
          totalModels.value = pageData.total
          currentPage.value = pageData.current
          pageSize.value = pageData.size
          totalPages.value = pageData.pages
        }
      }
    } catch (error) {
      console.error('获取AI模型列表失败:', error)
    } finally {
      loading.value = false
    }
  }

  async function fetchAllModels() {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/admin/ai-models/all', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const result = await response.json()
        if (result.code === 200) {
          allModels.value = result.data
        }
      }
    } catch (error) {
      console.error('获取所有AI模型失败:', error)
    }
  }

  async function fetchModelById(id: number): Promise<AiModel | null> {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/admin/ai-models/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const result = await response.json()
        if (result.code === 200) {
          return result.data
        }
      }
      return null
    } catch (error) {
      console.error('获取AI模型详情失败:', error)
      return null
    }
  }

  async function addModel(modelData: AddAiModelRequest): Promise<boolean> {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/admin/ai-models', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(modelData)
      })

      if (response.ok) {
        const result = await response.json()
        if (result.code === 200) {
          // 刷新列表
          await fetchModels(currentPage.value, pageSize.value, searchFilters.value)
          await fetchAllModels()
          return true
        }
      }
      return false
    } catch (error) {
      console.error('添加AI模型失败:', error)
      return false
    }
  }

  async function updateModel(id: number, modelData: UpdateAiModelRequest): Promise<boolean> {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/admin/ai-models/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(modelData)
      })

      if (response.ok) {
        const result = await response.json()
        if (result.code === 200) {
          // 更新本地状态
          const modelIndex = models.value.findIndex(m => m.id === id)
          if (modelIndex > -1) {
            models.value[modelIndex] = result.data
          }
          
          const allModelIndex = allModels.value.findIndex(m => m.id === id)
          if (allModelIndex > -1) {
            allModels.value[allModelIndex] = result.data
          }
          return true
        }
      }
      return false
    } catch (error) {
      console.error('更新AI模型失败:', error)
      return false
    }
  }

  async function deleteModel(id: number): Promise<boolean> {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/admin/ai-models/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const result = await response.json()
        if (result.code === 200) {
          // 从本地状态中移除模型
          models.value = models.value.filter(m => m.id !== id)
          allModels.value = allModels.value.filter(m => m.id !== id)
          totalModels.value -= 1
          return true
        }
      }
      return false
    } catch (error) {
      console.error('删除AI模型失败:', error)
      return false
    }
  }

  async function toggleModelStatus(id: number): Promise<boolean> {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/admin/ai-models/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const result = await response.json()
        if (result.code === 200) {
          // 更新本地状态
          const modelIndex = models.value.findIndex(m => m.id === id)
          if (modelIndex > -1) {
            models.value[modelIndex] = result.data
          }
          
          const allModelIndex = allModels.value.findIndex(m => m.id === id)
          if (allModelIndex > -1) {
            allModels.value[allModelIndex] = result.data
          }
          return true
        }
      }
      return false
    } catch (error) {
      console.error('切换AI模型状态失败:', error)
      return false
    }
  }

  async function testConnection(id: number): Promise<string | null> {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/admin/ai-models/${id}/test-connection`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const result = await response.json()
        if (result.code === 200) {
          return result.data
        }
      }
      return null
    } catch (error) {
      console.error('测试API连接失败:', error)
      return null
    }
  }

  function applyFilters(filters: {
    modelName?: string
    provider?: string
    isEnabled?: boolean
  }) {
    searchFilters.value = {
      modelName: filters.modelName || '',
      provider: filters.provider || '',
      isEnabled: filters.isEnabled
    }
    fetchModels(1, pageSize.value, filters)
  }

  function clearFilters() {
    searchFilters.value = {
      modelName: '',
      provider: '',
      isEnabled: undefined
    }
    fetchModels(1, pageSize.value)
  }

  function changePage(page: number) {
    if (page >= 1 && page <= totalPages.value) {
      fetchModels(page, pageSize.value, searchFilters.value)
    }
  }

  function changePageSize(size: number) {
    pageSize.value = size
    fetchModels(1, size, searchFilters.value)
  }

  return {
    // 状态
    models,
    allModels,
    currentPage,
    pageSize,
    totalModels,
    totalPages,
    loading,
    searchFilters,
    
    // 计算属性
    hasModels,
    enabledModels,
    
    // 方法
    fetchModels,
    fetchAllModels,
    fetchModelById,
    addModel,
    updateModel,
    deleteModel,
    toggleModelStatus,
    testConnection,
    applyFilters,
    clearFilters,
    changePage,
    changePageSize
  }
})
