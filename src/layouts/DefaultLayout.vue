<script setup lang="ts">
  import AppSidebar from '@/components/AppSidebar.vue'
  import DarkMode from '@/components/DarkMode.vue'

  import { Separator } from '@/components/ui/separator'
  import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
  } from '@/components/ui/sidebar'
  import Switcher from '@/components/AiSwitcher.vue'
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header class="flex h-14 shrink-0 items-center gap-2">
        <div class="flex flex-1 items-center gap-2 px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" class="mr-2 h-4" />
          <div class="max-w-[300px] min-w-[200px]">
            <Switcher />
          </div>
        </div>
        <div class="ml-auto px-3">
          <div class="flex items-center gap-2 text-sm">
            <!-- <div class="hidden font-medium text-muted-foreground md:inline-block">
              时间
            </div> -->
            <DarkMode />
          </div>
        </div>
      </header>
      <div class="flex flex-1 flex-col">
        <router-view />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
