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
    onClick?: () => void
  }[]
}>()

const { state } = useSidebar()
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem v-for="item in items" :key="item.title">
      <Tooltip v-if="state === 'collapsed'">
        <TooltipTrigger as-child>
          <SidebarMenuButton 
            :as-child="!item.onClick" 
            :is-active="item.isActive"
            @click="item.onClick"
          >
            <router-link v-if="!item.onClick" :to="item.url">
              <component :is="item.icon" />
              <span>{{ item.title }}</span>
            </router-link>
            <template v-else>
              <component :is="item.icon" />
              <span>{{ item.title }}</span>
            </template>
          </SidebarMenuButton>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{{ item.title }}</p>
        </TooltipContent>
      </Tooltip>
      <SidebarMenuButton 
        v-else 
        :as-child="!item.onClick" 
        :is-active="item.isActive"
        @click="item.onClick"
      >
        <router-link v-if="!item.onClick" :to="item.url">
          <component :is="item.icon" />
          <span>{{ item.title }}</span>
        </router-link>
        <template v-else>
          <component :is="item.icon" />
          <span>{{ item.title }}</span>
        </template>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
