<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import { Check, X, Loader2, TestTube } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAiModelsStore, type AiModel, type AddAiModelRequest, type UpdateAiModelRequest } from '@/store/aiModels'

interface Props {
  open: boolean
  model?: AiModel | null
}

interface Emits {
  (e: 'update:open', value: boolean): void
  (e: 'success'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const aiModelsStore = useAiModelsStore()

const loading = ref(false)
const testingConnection = ref(false)

// 预定义的提供商选项
const providers = [
  'OpenAI',
  'Google',
  'DeepSeek',
  'Other'
]

// 表单数据
const formData = reactive<AddAiModelRequest>({
  modelName: '',
  provider: '',
  apiEndpoint: '',
  apiKey: '',
  apiSecret: '',
  organizationId: '',
  projectId: '',
  extraHeaders: '',
  costPer1kTokens: 0,
  rateLimitPerMinute: 60,
  isEnabled: false
})

// 计算属性
const isEdit = computed(() => !!props.model)
const title = computed(() => isEdit.value ? '编辑AI模型' : '添加AI模型')
const submitText = computed(() => isEdit.value ? '更新' : '创建')

// 表单验证
const isValid = computed(() => {
  return formData.modelName.trim() &&
         formData.provider.trim() &&
         formData.apiEndpoint.trim() &&
         formData.apiKey.trim() &&
         formData.costPer1kTokens >= 0 &&
         formData.rateLimitPerMinute > 0
})

// 监听模型变化，重置表单
watch(() => props.model, (newModel) => {
  if (newModel) {
    Object.assign(formData, {
      modelName: newModel.modelName,
      provider: newModel.provider,
      apiEndpoint: newModel.apiEndpoint,
      apiKey: newModel.apiKey,
      apiSecret: newModel.apiSecret || '',
      organizationId: newModel.organizationId || '',
      projectId: newModel.projectId || '',
      extraHeaders: newModel.extraHeaders || '',
      costPer1kTokens: newModel.costPer1kTokens,
      rateLimitPerMinute: newModel.rateLimitPerMinute,
      isEnabled: newModel.isEnabled
    })
  } else {
    resetForm()
  }
}, { immediate: true })

// 重置表单
function resetForm() {
  Object.assign(formData, {
    modelName: '',
    provider: '',
    apiEndpoint: '',
    apiKey: '',
    apiSecret: '',
    organizationId: '',
    projectId: '',
    extraHeaders: '',
    costPer1kTokens: 0,
    rateLimitPerMinute: 60,
    isEnabled: false
  })
}

// 关闭对话框
function closeDialog() {
  emit('update:open', false)
  setTimeout(resetForm, 300) // 延迟重置，避免关闭动画期间看到表单重置
}

// 提交表单
async function handleSubmit() {
  if (!isValid.value) return

  try {
    loading.value = true
    let success = false

    if (isEdit.value && props.model) {
      const updateData: UpdateAiModelRequest = {
        ...formData,
        id: props.model.id
      }
      success = await aiModelsStore.updateModel(props.model.id, updateData)
    } else {
      success = await aiModelsStore.addModel(formData)
    }

    if (success) {
      toast('成功', {
        description: isEdit.value ? 'AI模型更新成功' : 'AI模型创建成功',
      })
      emit('success')
      closeDialog()
    } else {
      toast('失败', {
        description: isEdit.value ? 'AI模型更新失败' : 'AI模型创建失败',
      })
    }
  } catch (error) {
    toast('错误', {
      description: '操作失败，请稍后重试',
    })
  } finally {
    loading.value = false
  }
}

// 测试连接
async function testConnection() {
  if (!props.model?.id) {
    toast('提示', {
      description: '请先保存模型后再测试连接',
    })
    return
  }

  try {
    testingConnection.value = true
    const result = await aiModelsStore.testConnection(props.model.id)
    
    
    if (result) {
      toast('API连接测试', {
        description: result
      })
    } else {
      toast('测试失败', {
        description: '连接测试失败，请检查配置',
      })
    }
  } catch (error) {
    toast('测试失败', {
      description: '连接测试失败，请稍后重试',
    })
  } finally {
    testingConnection.value = false
  }
}

// 格式化API Key显示
function formatApiKey(key: string) {
  if (!key) return ''
  if (key.length <= 8) return key
  return key.substring(0, 4) + '***' + key.substring(key.length - 4)
}
</script>

<template>
  <Drawer :open="open" @update:open="emit('update:open', $event)">
    <DrawerContent class="max-h-[90vh]">
      <DrawerHeader>
        <DrawerTitle>{{ title }}</DrawerTitle>
        <DrawerDescription>
          {{ isEdit ? '修改AI模型配置信息' : '配置新的AI模型参数' }}
        </DrawerDescription>
      </DrawerHeader>

      <div class="px-6 pb-6 overflow-y-auto max-h-[calc(90vh-180px)]">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- 基本信息 -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium">基本信息</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="modelName">模型名称 *</Label>
                <Input
                  id="modelName"
                  v-model="formData.modelName"
                  placeholder="例如: gpt-4, gemini-1.5-pro"
                  required
                />
              </div>

              <div class="space-y-2">
                <Label for="provider">提供商 *</Label>
                <Select v-model="formData.provider" required>
                  <SelectTrigger>
                    <SelectValue placeholder="选择提供商" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem v-for="provider in providers" :key="provider" :value="provider">
                      {{ provider }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div class="space-y-2">
              <Label for="apiEndpoint">API端点 *</Label>
              <Input
                id="apiEndpoint"
                v-model="formData.apiEndpoint"
                placeholder="例如: https://api.openai.com/v1/chat/completions"
                required
              />
            </div>
          </div>

          <!-- 认证信息 -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium">认证信息</h3>
            
            <div class="space-y-2">
              <Label for="apiKey">API密钥 *</Label>
              <Input
                id="apiKey"
                v-model="formData.apiKey"
                type="password"
                placeholder="输入API密钥"
                required
              />
              <p v-if="isEdit && formData.apiKey" class="text-sm text-muted-foreground">
                当前密钥: {{ formatApiKey(formData.apiKey) }}
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="apiSecret">API密钥（可选）</Label>
                <Input
                  id="apiSecret"
                  v-model="formData.apiSecret"
                  type="password"
                  placeholder="某些服务商需要"
                />
              </div>

              <div class="space-y-2">
                <Label for="organizationId">组织ID（可选）</Label>
                <Input
                  id="organizationId"
                  v-model="formData.organizationId"
                  placeholder="例如: org-xxxxxxxxx"
                />
              </div>
            </div>

            <div class="space-y-2">
              <Label for="projectId">项目ID（可选）</Label>
              <Input
                id="projectId"
                v-model="formData.projectId"
                placeholder="例如: proj_xxxxxxxxx"
              />
            </div>

            <div class="space-y-2">
              <Label for="extraHeaders">额外请求头（可选）</Label>
              <Textarea
                id="extraHeaders"
                v-model="formData.extraHeaders"
                placeholder='例如: {"Custom-Header": "value"}'
                rows="3"
              />
              <p class="text-sm text-muted-foreground">
                JSON格式的额外HTTP请求头
              </p>
            </div>
          </div>

          <!-- 配置参数 -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium">配置参数</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="costPer1kTokens">每1K Token成本 *</Label>
                <Input
                  id="costPer1kTokens"
                  v-model.number="formData.costPer1kTokens"
                  type="number"
                  step="0.001"
                  min="0"
                  placeholder="0.030"
                  required
                />
                <p class="text-sm text-muted-foreground">
                  美元单位，用于成本计算
                </p>
              </div>

              <div class="space-y-2">
                <Label for="rateLimitPerMinute">每分钟请求限制 *</Label>
                <Input
                  id="rateLimitPerMinute"
                  v-model.number="formData.rateLimitPerMinute"
                  type="number"
                  min="1"
                  placeholder="60"
                  required
                />
              </div>
            </div>

            <div class="flex items-center space-x-2">
              <input
                id="isEnabled"
                v-model="formData.isEnabled"
                type="checkbox"
                class="h-4 w-4 rounded border border-input bg-background"
              />
              <Label for="isEnabled">启用此模型</Label>
            </div>
          </div>
        </form>
      </div>

      <DrawerFooter>
        <div class="flex items-center gap-2">
          <Button
            type="submit"
            @click="handleSubmit"
            :disabled="!isValid || loading"
            class="flex-1"
          >
            <Loader2 v-if="loading" class="h-4 w-4 mr-2 animate-spin" />
            <Check v-else class="h-4 w-4 mr-2" />
            {{ submitText }}
          </Button>
          
          <Button
            v-if="isEdit"
            type="button"
            variant="outline"
            @click="testConnection"
            :disabled="testingConnection"
          >
            <Loader2 v-if="testingConnection" class="h-4 w-4 mr-2 animate-spin" />
            <TestTube v-else class="h-4 w-4 mr-2" />
            测试连接
          </Button>
          
          <DrawerClose as-child>
            <Button variant="outline" @click="closeDialog">
              <X class="h-4 w-4 mr-2" />
              取消
            </Button>
          </DrawerClose>
        </div>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
