<script setup lang="ts">
import { MoreHorizontal, Edit, Shield, ShieldOff, Trash2 } from 'lucide-vue-next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import type { UserInfo } from '@/store/users'

interface Props {
  user: UserInfo
}

interface Emits {
  (e: 'edit-credit', user: UserInfo): void
  (e: 'toggle-admin', user: UserInfo): void
  (e: 'delete', user: UserInfo): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="h-8 w-8 p-0">
        <span class="sr-only">打开菜单</span>
        <MoreHorizontal class="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="$emit('edit-credit', user)">
        <Edit class="mr-2 h-4 w-4" />
        编辑积分
      </DropdownMenuItem>
      <DropdownMenuItem @click="$emit('toggle-admin', user)">
        <Shield v-if="!user.isAdmin" class="mr-2 h-4 w-4" />
        <ShieldOff v-else class="mr-2 h-4 w-4" />
        {{ user.isAdmin ? '移除管理员' : '设为管理员' }}
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="$emit('delete', user)" class="text-destructive">
        <Trash2 class="mr-2 h-4 w-4" />
        删除用户
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
