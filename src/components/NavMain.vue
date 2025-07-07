<script setup lang="ts">
import type { LucideIcon } from 'lucide-vue-next'

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

defineProps<{
  items: {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
  }[]
}>()

const { state } = useSidebar()
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem v-for="item in items" :key="item.title">
      <Tooltip v-if="state === 'collapsed'">
        <TooltipTrigger as-child>
          <SidebarMenuButton as-child :is-active="item.isActive">
            <router-link :to="item.url">
              <component :is="item.icon" />
              <span>{{ item.title }}</span>
            </router-link>
          </SidebarMenuButton>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{{ item.title }}</p>
        </TooltipContent>
      </Tooltip>
      <SidebarMenuButton v-else as-child :is-active="item.isActive">
        <router-link :to="item.url">
          <component :is="item.icon" />
          <span>{{ item.title }}</span>
        </router-link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
