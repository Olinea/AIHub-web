<script setup lang="ts">
import ManageSidebar from '@/components/ManageSidebar.vue'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
</script>

<template>
  <SidebarProvider>
    <ManageSidebar />
    <SidebarInset>
      <div class="flex flex-1 flex-col gap-4 p-4 min-h-screen">
        <router-view />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
