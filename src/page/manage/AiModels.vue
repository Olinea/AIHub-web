<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { Bot, Activity, Plus, RefreshCw, Filter, X } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'

import { useAiModelsStore, type AiModel } from '@/store/aiModels'
import EditAiModelDialog from '@/components/EditAiModelDialog.vue'
import AiModelTableActions from '@/components/AiModelTableActions.vue'

const aiModelsStore = useAiModelsStore()
const editDialogOpen = ref(false)
const currentEditModel = ref<AiModel | null>(null)
const showFilters = ref(false)

// 过滤器状态
const filters = ref({
  modelName: '',
  provider: '',
  isEnabled: '' as string
})

// 预定义的提供商选项
const providers = [
  'OpenAI',
  'Google',
  'DeepSeek',
  'Anthropic',
  'Microsoft',
  'Meta',
  'Alibaba',
  'Baidu',
  'Tencent',
  'ByteDance',
  'Other'
]

// 计算统计数据
const totalModels = computed(() => aiModelsStore.totalModels)
const enabledModels = computed(() => aiModelsStore.models.filter(m => m.isEnabled).length)
const disabledModels = computed(() => aiModelsStore.models.filter(m => !m.isEnabled).length)

// 格式化日期
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 格式化API Key显示
function formatApiKey(key: string) {
  if (!key) return ''
  if (key.length <= 8) return key
  return key.substring(0, 4) + '***' + key.substring(key.length - 4)
}

// 获取提供商颜色
function getProviderColor(provider: string) {
  const colors: Record<string, string> = {
    'OpenAI': 'bg-green-100 text-green-800',
    'Google': 'bg-blue-100 text-blue-800',
    'Anthropic': 'bg-purple-100 text-purple-800',
    'Microsoft': 'bg-sky-100 text-sky-800',
    'Meta': 'bg-indigo-100 text-indigo-800',
    'Alibaba': 'bg-orange-100 text-orange-800',
    'Baidu': 'bg-red-100 text-red-800',
    'Tencent': 'bg-emerald-100 text-emerald-800',
    'ByteDance': 'bg-pink-100 text-pink-800'
  }
  return colors[provider] || 'bg-gray-100 text-gray-800'
}

// 搜索和过滤
function applyFilters() {
  const filterData = {
    modelName: filters.value.modelName.trim() || undefined,
    provider: filters.value.provider || undefined,
    isEnabled: filters.value.isEnabled === 'true' ? true : filters.value.isEnabled === 'false' ? false : undefined
  }
  aiModelsStore.applyFilters(filterData)
}

function clearFilters() {
  filters.value = {
    modelName: '',
    provider: '',
    isEnabled: ''
  }
  aiModelsStore.clearFilters()
}

// 刷新数据
async function refreshData() {
  await Promise.all([
    aiModelsStore.fetchModels(aiModelsStore.currentPage, aiModelsStore.pageSize, aiModelsStore.searchFilters),
    aiModelsStore.fetchAllModels()
  ])
}

// 打开编辑对话框
function openEditDialog(model?: AiModel) {
  currentEditModel.value = model || null
  editDialogOpen.value = true
}

// 处理编辑成功
function handleEditSuccess() {
  refreshData()
}

// 换页
function changePage(page: number) {
  aiModelsStore.changePage(page)
}

// 改变每页大小
function changePageSize(size: number) {
  aiModelsStore.changePageSize(size)
}

onMounted(() => {
  refreshData()
})
</script>

<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div>
      <h1 class="text-3xl font-bold">AI模型管理</h1>
      <p class="text-muted-foreground">管理系统中的AI模型配置</p>
    </div>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="p-6 bg-card rounded-lg border">
        <div class="flex items-center">
          <Bot class="h-8 w-8 text-blue-600" />
          <div class="ml-4">
            <h3 class="text-sm font-medium text-muted-foreground">总模型数</h3>
            <p class="text-2xl font-bold">{{ totalModels }}</p>
          </div>
        </div>
      </div>
      
      <div class="p-6 bg-card rounded-lg border">
        <div class="flex items-center">
          <Activity class="h-8 w-8 text-green-600" />
          <div class="ml-4">
            <h3 class="text-sm font-medium text-muted-foreground">已启用</h3>
            <p class="text-2xl font-bold">{{ enabledModels }}</p>
          </div>
        </div>
      </div>
      
      <div class="p-6 bg-card rounded-lg border">
        <div class="flex items-center">
          <Activity class="h-8 w-8 text-gray-600" />
          <div class="ml-4">
            <h3 class="text-sm font-medium text-muted-foreground">已禁用</h3>
            <p class="text-2xl font-bold">{{ disabledModels }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 模型列表 -->
    <div class="bg-card rounded-lg border">
      <div class="p-6 border-b">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold">模型列表</h2>
          <div class="flex items-center gap-2">
            <!-- 过滤器切换 -->
            <Button
              @click="showFilters = !showFilters"
              size="sm"
              variant="outline"
            >
              <Filter class="h-4 w-4 mr-2" />
              过滤器
            </Button>
            
            <!-- 刷新按钮 -->
            <Button @click="refreshData" size="sm" variant="outline" :disabled="aiModelsStore.loading">
              <RefreshCw class="h-4 w-4 mr-2" :class="{ 'animate-spin': aiModelsStore.loading }" />
              刷新
            </Button>
            
            <!-- 添加模型按钮 -->
            <Button @click="openEditDialog()" size="sm">
              <Plus class="h-4 w-4 mr-2" />
              添加模型
            </Button>
          </div>
        </div>

        <!-- 过滤器面板 -->
        <div v-if="showFilters" class="mt-4 p-4 bg-muted/50 rounded-lg">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="space-y-2">
              <Label for="filter-name">模型名称</Label>
              <Input
                id="filter-name"
                v-model="filters.modelName"
                placeholder="搜索模型名称..."
                @keyup.enter="applyFilters"
              />
            </div>

            <div class="space-y-2">
              <Label for="filter-provider">提供商</Label>
              <Select v-model="filters.provider">
                <SelectTrigger>
                  <SelectValue placeholder="选择提供商" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">全部</SelectItem>
                  <SelectItem v-for="provider in providers" :key="provider" :value="provider">
                    {{ provider }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div class="space-y-2">
              <Label for="filter-status">状态</Label>
              <Select v-model="filters.isEnabled">
                <SelectTrigger>
                  <SelectValue placeholder="选择状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">全部</SelectItem>
                  <SelectItem value="true">已启用</SelectItem>
                  <SelectItem value="false">已禁用</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div class="flex items-end gap-2">
              <Button @click="applyFilters" size="sm" class="flex-1">
                <Filter class="h-4 w-4 mr-2" />
                应用
              </Button>
              <Button @click="clearFilters" size="sm" variant="outline">
                <X class="h-4 w-4 mr-2" />
                清除
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div class="p-6">
        <!-- 加载状态 -->
        <div v-if="aiModelsStore.loading" class="text-center py-12 text-muted-foreground">
          <RefreshCw class="h-8 w-8 mx-auto mb-4 animate-spin" />
          <p>加载中...</p>
        </div>

        <!-- 模型表格 -->
        <div v-else-if="aiModelsStore.hasModels">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>模型名称</TableHead>
                <TableHead>提供商</TableHead>
                <TableHead>API端点</TableHead>
                <TableHead>API密钥</TableHead>
                <TableHead>成本/1K Tokens</TableHead>
                <TableHead>限制/分钟</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>创建时间</TableHead>
                <TableHead class="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="model in aiModelsStore.models" :key="model.id">
                <TableCell class="text-muted-foreground">{{ model.id }}</TableCell>
                <TableCell class="font-medium">{{ model.modelName }}</TableCell>
                <TableCell>
                  <Badge 
                    variant="secondary" 
                    :class="getProviderColor(model.provider)"
                  >
                    {{ model.provider }}
                  </Badge>
                </TableCell>
                <TableCell class="max-w-xs truncate" :title="model.apiEndpoint">
                  {{ model.apiEndpoint }}
                </TableCell>
                <TableCell class="font-mono text-sm">
                  {{ formatApiKey(model.apiKey) }}
                </TableCell>
                <TableCell>${{ model.costPer1kTokens.toFixed(3) }}</TableCell>
                <TableCell>{{ model.rateLimitPerMinute }}</TableCell>
                <TableCell>
                  <Badge v-if="model.isEnabled" variant="default" class="bg-green-600">
                    已启用
                  </Badge>
                  <Badge v-else variant="secondary" class="bg-gray-500 text-white">
                    已禁用
                  </Badge>
                </TableCell>
                <TableCell>{{ formatDate(model.createdAt) }}</TableCell>
                <TableCell class="text-right">
                  <AiModelTableActions 
                    :model="model" 
                    @edit="openEditDialog"
                    @refresh="refreshData"
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <!-- 分页 -->
          <div class="flex items-center justify-between mt-6">
            <div class="flex items-center gap-4">
              <div class="text-sm text-muted-foreground">
                共 {{ aiModelsStore.totalModels }} 条记录
              </div>
              <div class="flex items-center gap-2 text-sm">
                <span>每页显示</span>
                <select 
                  :value="aiModelsStore.pageSize" 
                  @change="changePageSize(Number(($event.target as HTMLSelectElement).value))"
                  class="border border-input bg-background px-2 py-1 rounded text-sm"
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <span>条</span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <Button 
                @click="changePage(aiModelsStore.currentPage - 1)"
                :disabled="aiModelsStore.currentPage <= 1"
                size="sm"
                variant="outline"
              >
                上一页
              </Button>
              <span class="text-sm">
                第 {{ aiModelsStore.currentPage }} / {{ aiModelsStore.totalPages }} 页
              </span>
              <Button 
                @click="changePage(aiModelsStore.currentPage + 1)"
                :disabled="aiModelsStore.currentPage >= aiModelsStore.totalPages"
                size="sm"
                variant="outline"
              >
                下一页
              </Button>
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <div v-else class="text-center py-12 text-muted-foreground">
          <Bot class="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>暂无AI模型数据</p>
          <Button @click="openEditDialog()" class="mt-4" size="sm">
            <Plus class="h-4 w-4 mr-2" />
            添加第一个模型
          </Button>
        </div>
      </div>
    </div>

    <!-- 编辑/添加模型对话框 -->
    <EditAiModelDialog 
      v-model:open="editDialogOpen"
      :model="currentEditModel"
      @success="handleEditSuccess"
    />
  </div>
</template>
