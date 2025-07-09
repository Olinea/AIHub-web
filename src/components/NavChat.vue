<script setup lang="ts">
import {
  ArrowUpRight,
  Link,
  MoreHorizontal,
  Archive,
  Trash2,
  Edit3,
  Plus
} from 'lucide-vue-next'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useConversationsStore } from '@/store/conversations'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

interface ChatItem {
  name: string
  url: string
  id: number
  isActive?: boolean
  lastMessageTime?: string
  messageCount?: number
}

defineProps<{
  chat: ChatItem[]
}>()

const { isMobile } = useSidebar()
const router = useRouter()
const conversationsStore = useConversationsStore()
const { archiveConversation, deleteConversation, updateConversationTitle } = conversationsStore

// 新建对话
async function createNewConversation() {
  router.push('/conversation/new')
}

// 编辑模式状态
const editingId = ref<number | null>(null)
const editingTitle = ref('')

// 开始编辑标题
function startEditing(item: ChatItem) {
  editingId.value = item.id
  editingTitle.value = item.name
}

// 保存标题
async function saveTitle(id: number) {
  if (editingTitle.value.trim()) {
    await updateConversationTitle(id, editingTitle.value.trim())
  }
  editingId.value = null
  editingTitle.value = ''
}

// 取消编辑
function cancelEditing() {
  editingId.value = null
  editingTitle.value = ''
}

// 归档对话
async function handleArchive(id: number) {
  await archiveConversation(id)
}

// 删除对话
async function handleDelete(id: number) {
  if (confirm('确定要删除这个对话吗？此操作不可撤销。')) {
    const success = await deleteConversation(id)
    if (success) {
      // 如果当前正在查看被删除的对话，跳转到首页
      if (router.currentRoute.value.params.id === id.toString()) {
        router.push('/')
      }
    }
  }
}

// 复制链接
function copyLink(item: ChatItem) {
  const url = window.location.origin + item.url
  navigator.clipboard.writeText(url).then(() => {
    // 可以添加成功提示
    console.log('链接已复制到剪贴板')
  })
}

// 在新标签页打开
function openInNewTab(item: ChatItem) {
  window.open(item.url, '_blank')
}

// 格式化时间
function formatTime(timeStr?: string) {
  if (!timeStr) return ''
  
  const date = new Date(timeStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  // 小于1分钟
  if (diff < 60 * 1000) {
    return '刚刚'
  }
  
  // 小于1小时
  if (diff < 60 * 60 * 1000) {
    const minutes = Math.floor(diff / (60 * 1000))
    return `${minutes}分前`
  }
  
  // 小于1天
  if (diff < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(diff / (60 * 60 * 1000))
    return `${hours}时前`
  }
  
  // 超过1天，显示具体日期
  return date.toLocaleDateString('zh-CN', {
    month: 'numeric',
    day: 'numeric'
  })
}
</script>

<template>
  <SidebarGroup class="group-data-[collapsible=icon]:hidden">
    <SidebarGroupLabel>对话</SidebarGroupLabel>
    <SidebarMenu>
      <!-- 新建对话按钮 -->
      <SidebarMenuItem>
        <SidebarMenuButton @click="createNewConversation" class="text-muted-foreground hover:text-foreground">
          <Plus class="mr-2 h-4 w-4" />
          <span>新建对话</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      
      <!-- 对话列表 -->
      <SidebarMenuItem v-for="item in chat" :key="item.id">
        <SidebarMenuButton as-child>
          <router-link 
            :to="item.url" 
            :title="item.name"
            :class="{ 'bg-accent text-accent-foreground': item.isActive }"
          >
            <div class="flex flex-col items-start w-full min-w-0">
              <div class="truncate font-medium text-sm">{{ item.name }}</div>
              <div v-if="item.lastMessageTime" class="text-xs text-muted-foreground">
                {{ formatTime(item.lastMessageTime) }} • {{ item.messageCount }} 条消息
              </div>
            </div>
          </router-link>
        </SidebarMenuButton>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <SidebarMenuAction show-on-hover>
              <MoreHorizontal />
              <span class="sr-only">更多</span>
            </SidebarMenuAction>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            class="w-56 rounded-lg"
            :side="isMobile ? 'bottom' : 'right'"
            :align="isMobile ? 'end' : 'start'"
          >
            <DropdownMenuItem @click="startEditing(item)">
              <Edit3 class="text-muted-foreground" />
              <span>重命名</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="copyLink(item)">
              <Link class="text-muted-foreground" />
              <span>复制链接</span>
            </DropdownMenuItem>
            <DropdownMenuItem @click="openInNewTab(item)">
              <ArrowUpRight class="text-muted-foreground" />
              <span>在新标签页打开</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="handleArchive(item.id)">
              <Archive class="text-muted-foreground" />
              <span>归档</span>
            </DropdownMenuItem>
            <DropdownMenuItem @click="handleDelete(item.id)" class="text-destructive">
              <Trash2 class="text-muted-foreground" />
              <span>删除</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
    
    <!-- 编辑对话标题的弹窗 -->
    <div v-if="editingId" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-96 max-w-[90vw]">
        <h3 class="text-lg font-semibold mb-4">重命名对话</h3>
        <input
          v-model="editingTitle"
          type="text"
          placeholder="输入新的对话标题"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          @keyup.enter="saveTitle(editingId!)"
          @keyup.escape="cancelEditing"
        />
        <div class="flex justify-end space-x-2 mt-4">
          <button
            @click="cancelEditing"
            class="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            取消
          </button>
          <button
            @click="saveTitle(editingId!)"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  </SidebarGroup>
</template>