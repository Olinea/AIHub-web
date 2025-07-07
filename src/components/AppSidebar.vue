<script setup lang="ts">
  import {
    AudioWaveform,
    Blocks,
    Calendar,
    Command,
    Home,

    MessageCircleQuestion,
    Search,
    Settings2,
    Sparkles,
  } from 'lucide-vue-next'

  import NavChat from '@/components/NavChat.vue'
  import NavMain from '@/components/NavMain.vue'
  import NavSecondary from '@/components/NavSecondary.vue'


  import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    type SidebarProps,
    SidebarRail,
    SidebarFooter,
  } from '@/components/ui/sidebar'

  const props = defineProps<SidebarProps>()

  // This is sample data.
  const data = {
    navMain: [
      {
        title: 'Home',
        url: '#',
        icon: Home,
        isActive: true,
      },
      {
        title: 'Search',
        url: '#',
        icon: Search,
      },
      {
        title: 'Ask AI',
        url: '#',
        icon: Sparkles,
      },
    ],
    navSecondary: [
      {
        title: 'Settings',
        url: '#',
        icon: Settings2,
      },
      {
        title: 'Templates',
        url: '#',
        icon: Blocks,
      },
      {
        title: 'Help',
        url: '#',
        icon: MessageCircleQuestion,
      },
    ],
    chat: [
      {
        name: '对话的标题,这个应该是从api获取的',
        url: '#',
      },
    ]
  }
</script>

<template>
  <Sidebar class="border-r-0" v-bind="props">
    <SidebarHeader>
      <NavMain :items="data.navMain" />
    </SidebarHeader>
    <SidebarContent>
      <NavChat :chat="data.chat" />
    </SidebarContent>
    <SidebarFooter>
    </SidebarFooter>
    <NavSecondary :items="data.navSecondary" />
    <SidebarRail />
  </Sidebar>
</template>
