<script setup lang="ts">
import type { LucideIcon } from 'lucide-vue-next'

import type { Component } from 'vue'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuBadge,
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
    badge?: Component
    isActive?: boolean
  }[]
}>()

const { state } = useSidebar()
</script>

<template>
  <SidebarGroup>
    <SidebarGroupContent>
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
          <SidebarMenuBadge v-if="item.badge">
            <component :is="item.badge" />
          </SidebarMenuBadge>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</template>
