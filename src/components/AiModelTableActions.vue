<script setup lang="ts">
import { ref } from 'vue'
import { MoreHorizontal, Edit, Trash2, Power, PowerOff, TestTube } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { useAiModelsStore, type AiModel } from '@/store/aiModels'

interface Props {
  model: AiModel
}

interface Emits {
  (e: 'edit', model: AiModel): void
  (e: 'refresh'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const aiModelsStore = useAiModelsStore()

const loading = ref(false)
const testingConnection = ref(false)

// 编辑模型
function handleEdit() {
  emit('edit', props.model)
}

// 切换状态
async function toggleStatus() {
  try {
    loading.value = true
    const success = await aiModelsStore.toggleModelStatus(props.model.id)
    
    if (success) {
      toast( '模型状态修改成功', {
        description: `模型“${props.model.modelName}”状态已变更`
      })
      emit('refresh')
    } else {
      toast('状态切换失败', {
        description: '请稍后重试'
      })
    }
  } catch (error) {
    toast('操作失败，请稍后重试', {
      description: error instanceof Error ? error.message : ''
    })
  } finally {
    loading.value = false
  }
}

// 删除模型
async function handleDelete() {
  if (!confirm(`确定要删除模型 "${props.model.modelName}" 吗？此操作不可撤销。`)) {
    return
  }

  try {
    loading.value = true
    const success = await aiModelsStore.deleteModel(props.model.id)
    if (success) {
      toast('模型删除成功', {
        description: `模型“${props.model.modelName}”已被删除`
      })
      emit('refresh')
    } else {
      toast('模型删除失败', {
        description: '请稍后重试'
      })
    }
  } catch (error) {
    toast('删除失败，请稍后重试', {
      description: error instanceof Error ? error.message : ''
    })
  } finally {
    loading.value = false
  }
}

// 测试连接
async function testConnection() {
  try {
    testingConnection.value = true
    const result = await aiModelsStore.testConnection(props.model.id)
    if (result) {
      toast('连接测试完成', {
        description: typeof result === 'string' ? result : '连接成功'
      })
    } else {
      toast('连接测试失败', {
        description: '请检查模型配置或网络后重试'
      })
    }
  } catch (error) {
    toast('测试失败，请稍后重试', {
      description: error instanceof Error ? error.message : ''
    })
  } finally {
    testingConnection.value = false
  }
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button 
        variant="ghost" 
        size="icon" 
        class="h-8 w-8"
        :disabled="loading || testingConnection"
      >
        <MoreHorizontal class="h-4 w-4" />
        <span class="sr-only">打开菜单</span>
      </Button>
    </DropdownMenuTrigger>
    
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="handleEdit" class="cursor-pointer">
        <Edit class="h-4 w-4 mr-2" />
        编辑
      </DropdownMenuItem>
      
      <!-- <DropdownMenuItem 
        @click="testConnection" 
        class="cursor-pointer"
        :disabled="testingConnection"
      >
        <TestTube class="h-4 w-4 mr-2" />
        测试连接
      </DropdownMenuItem> -->
      
      <DropdownMenuItem 
        @click="toggleStatus" 
        class="cursor-pointer"
        :disabled="loading"
      >
        <Power v-if="!model.isEnabled" class="h-4 w-4 mr-2 text-green-600" />
        <PowerOff v-else class="h-4 w-4 mr-2 text-orange-600" />
        {{ model.isEnabled ? '禁用' : '启用' }}
      </DropdownMenuItem>
      
      <DropdownMenuSeparator />
      
      <DropdownMenuItem 
        @click="handleDelete"
        class="cursor-pointer text-red-600 focus:text-red-600"
        :disabled="loading"
      >
        <Trash2 class="h-4 w-4 mr-2" />
        删除
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
