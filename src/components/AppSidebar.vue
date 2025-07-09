<script setup lang="ts">
  import { computed, onMounted } from 'vue'
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

  // 在组件挂载时获取对话列表
  onMounted(async () => {
    await fetchConversations()
  })

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
</template>
