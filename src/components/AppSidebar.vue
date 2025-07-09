<script setup lang="ts">
  import { computed, onMounted, ref, onUnmounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import {
    Blocks,
    Home,
    MessageCircleQuestion,
    Search,
    Settings2,
    Sparkles,
  } from 'lucide-vue-next'

  import NavChat from '@/components/NavChat.vue'
  import NavMain from '@/components/NavMain.vue'
  import NavSecondary from '@/components/NavSecondary.vue'
  import NavUser from '@/components/NavUser.vue'
  import SearchDialog from '@/components/SearchDialog.vue'
  import { useConversationsStore } from '@/store/conversations'

  import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    type SidebarProps,
    SidebarRail,
    SidebarFooter,
  } from '@/components/ui/sidebar'

  const props = defineProps<SidebarProps>()
  const route = useRoute()
  const conversationsStore = useConversationsStore()
  const { activeConversations } = storeToRefs(conversationsStore)
  const { fetchConversations } = conversationsStore

  // 搜索对话框状态
  const showSearchDialog = ref(false)

  // 在组件挂载时获取对话列表
  onMounted(async () => {
    await fetchConversations()
    // 添加键盘快捷键监听
    document.addEventListener('keydown', handleKeydown)
  })

  // 组件卸载时移除事件监听
  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })

  // 键盘快捷键处理
  const handleKeydown = (event: KeyboardEvent) => {
    // Ctrl+K 或 Cmd+K 打开搜索
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault()
      showSearchDialog.value = true
    }
  }

  // 处理搜索点击
  const handleSearchClick = () => {
    showSearchDialog.value = true
  }

  // This is sample data.
  const data = computed(() => ({
    navMain: [
      {
        title: 'Home',
        url: '/',
        icon: Home,
        isActive: route.path === '/',
      },
      {
        title: 'Search',
        url: '#',
        icon: Search,
        isActive: false,
        onClick: handleSearchClick,
      },
      {
        title: 'Ask AI Role',
        url: '#',
        icon: Sparkles,
        isActive: false,
      },
    ],
    navSecondary: [
      {
        title: 'Settings',//ai设置
        url: '/settings',
        icon: Settings2,
        isActive: route.path === '/settings',
      },
      {
        title: 'Templates',//ai模板
        url: '/templates',
        icon: Blocks,
        isActive: route.path === '/templates',
      },
      {
        title: 'Help',// 系统帮助
        url: '/help',
        icon: MessageCircleQuestion,
        isActive: route.path === '/help',
      },
    ],
    // 使用真实的对话数据
    chat: activeConversations.value.map(conversation => ({
      name: conversation.title,
      url: `/conversation/${conversation.id}`,
      id: conversation.id,
      isActive: route.path === `/conversation/${conversation.id}`,
      lastMessageTime: conversation.lastMessageTime,
      messageCount: conversation.messageCount
    }))
  }))
</script>

<template>
  <Sidebar class="border-r-0" collapsible="icon" :side="props.side" :variant="props.variant">
    <SidebarHeader>
      <NavMain :items="data.navMain" />
    </SidebarHeader>
    <SidebarContent>
      <NavChat :chat="data.chat" />
    </SidebarContent>
    <SidebarFooter>
    </SidebarFooter>
    <NavSecondary :items="data.navSecondary" />
    <NavUser />

    <SidebarRail />
  </Sidebar>
  
  <!-- 搜索对话框 -->
  <SearchDialog v-model:open="showSearchDialog" />
</template>
