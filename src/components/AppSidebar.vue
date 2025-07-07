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
    teams: [
      {
        name: 'Acme Inc',
        logo: Command,
        plan: 'Enterprise',
      },
      {
        name: 'Acme Corp.',
        logo: AudioWaveform,
        plan: 'Startup',
      },
      {
        name: 'Evil Corp.',
        logo: Command,
        plan: 'Free',
      },
    ],
    navMain: [
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
      {
        title: 'Home',
        url: '#',
        icon: Home,
        isActive: true,
      },
    ],
    navSecondary: [
      {
        title: 'Calendar',
        url: '#',
        icon: Calendar,
      },
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
        name: 'Project Management & Task Tracking',
        url: '#',
        emoji: '📊',
      },
      {
        name: 'Family Recipe Collection & Meal Planning',
        url: '#',
        emoji: '🍳',
      },
      {
        name: 'Fitness Tracker & Workout Routines',
        url: '#',
        emoji: '💪',
      },
      {
        name: 'Book Notes & Reading List',
        url: '#',
        emoji: '📚',
      },
      {
        name: 'Sustainable Gardening Tips & Plant Care',
        url: '#',
        emoji: '🌱',
      },
      {
        name: 'Language Learning Progress & Resources',
        url: '#',
        emoji: '🗣️',
      },
      {
        name: 'Home Renovation Ideas & Budget Tracker',
        url: '#',
        emoji: '🏠',
      },
      {
        name: 'Personal Finance & Investment Portfolio',
        url: '#',
        emoji: '💰',
      },
      {
        name: 'Movie & TV Show Watchlist with Reviews',
        url: '#',
        emoji: '🎬',
      },
      {
        name: 'Daily Habit Tracker & Goal Setting',
        url: '#',
        emoji: '✅',
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
