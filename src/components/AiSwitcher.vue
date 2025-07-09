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
import { ref, onMounted, computed } from 'vue'
import { useAiModelsStore } from '@/store/aiModels'
import { storeToRefs } from 'pinia'

const { isMobile } = useSidebar()
const aiModelsStore = useAiModelsStore()
const { models, currentModelId, loading } = storeToRefs(aiModelsStore)
const { fetchEnabledModels, setCurrentModel } = aiModelsStore

onMounted(() => {
  fetchEnabledModels()
})

// 图标映射
const modelIcon = (provider: string) => {
  if (provider.toLowerCase().includes('openai')) return Sparkles
  if (provider.toLowerCase().includes('deepseek')) return Bot
  if (provider.toLowerCase().includes('google')) return BrainCircuit
  return Sparkles
}

const activeModel = computed(() => models.value.find(m => m.id === currentModelId.value) || models.value[0])
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
            可用模型
          </DropdownMenuLabel>
          <DropdownMenuItem v-for="(model, index) in models" :key="model.id" class="gap-2 p-2"
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
