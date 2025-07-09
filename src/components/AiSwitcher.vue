<script setup lang="ts">
  import { ChevronsUpDown, Plus, Sparkles, Bot, BrainCircuit } from 'lucide-vue-next'
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu'
  import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
  } from '@/components/ui/sidebar'
  import { onMounted, computed, watch } from 'vue'
  import { useAiModelsStore } from '@/store/aiModels'
  import { storeToRefs } from 'pinia'

  const { isMobile } = useSidebar()
  const aiModelsStore = useAiModelsStore()
  const { models, enabledModels, currentModelId } = storeToRefs(aiModelsStore)
  const { fetchEnabledModels, setCurrentModel } = aiModelsStore

  // 使用models作为备选方案
  const displayModels = computed(() => {
    console.log('displayModels computed:', {
      enabledModels: enabledModels.value,
      models: models.value
    })
    return enabledModels.value.length > 0 ? enabledModels.value : models.value
  })

  // 监听enabledModels变化
  watch(enabledModels, (newModels) => {
    console.log('AiSwitcher - enabledModels changed:', newModels)
  }, { immediate: true, deep: true })

  onMounted(async () => {
    await fetchEnabledModels()
    console.log('AiSwitcher - enabledModels:', enabledModels.value)
    console.log('AiSwitcher - currentModelId:', currentModelId.value)
    
    // 如果有模型但没有选择当前模型，自动选择第一个
    if (displayModels.value.length > 0 && !currentModelId.value) {
      setCurrentModel(displayModels.value[0].id)
      console.log('AiSwitcher - 自动选择第一个模型:', displayModels.value[0])
    }
  })

  // 图标映射
  const modelIcon = (provider: string) => {
    if (provider.toLowerCase().includes('openai')) return Sparkles
    if (provider.toLowerCase().includes('deepseek')) return Bot
    if (provider.toLowerCase().includes('google')) return BrainCircuit
    return Sparkles
  }

  const activeModel = computed(() => {
    const modelList = displayModels.value
    const found = modelList.find(m => m.id === currentModelId.value) || modelList[0]
    console.log('AiSwitcher - activeModel computed:', {
      displayModels: modelList,
      currentModelId: currentModelId.value,
      activeModel: found
    })
    return found
  })
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
            <div
              class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <component :is="modelIcon(activeModel?.provider || '')" class="size-4" />
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">
                {{ activeModel?.modelName || '选择模型' }}
              </span>
              <span class="truncate text-xs">{{ activeModel?.provider }}</span>
            </div>
            <ChevronsUpDown class="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg" align="start"
          :side="isMobile ? 'bottom' : 'right'" :side-offset="4">
          <DropdownMenuLabel class="text-xs text-muted-foreground">
            可用模型 ({{ displayModels.length }})
          </DropdownMenuLabel>
          <!-- 调试信息 -->
          <div v-if="displayModels.length === 0" class="p-2 text-xs text-red-500">
            没有可用的模型数据
          </div>
          <DropdownMenuItem v-for="(model, index) in displayModels" :key="model.id" class="gap-2 p-2"
            :class="{ 'bg-accent text-accent-foreground': model.id === currentModelId }"
            @click="setCurrentModel(model.id)">
            <div class="flex size-6 items-center justify-center rounded-sm border">
              <component :is="modelIcon(model.provider)" class="size-4 shrink-0" />
            </div>
            <div class="flex flex-col min-w-0">
              <span class="truncate">{{ model.modelName }}</span>
              <span class="truncate text-xs text-muted-foreground">{{ model.provider }}</span>
            </div>
            <DropdownMenuShortcut>⌘{{ index + 1 }}</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="gap-2 p-2" disabled>
            <div class="flex size-6 items-center justify-center rounded-md border bg-background">
              <Plus class="size-4" />
            </div>
            <div class="font-medium text-muted-foreground">
              新增模型（请到管理后台）
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
