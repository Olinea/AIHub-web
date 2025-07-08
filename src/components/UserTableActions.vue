<script setup lang="ts">
import { ref } from 'vue'
import { Edit, Shield, ShieldOff, Trash2, MoreHorizontal } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useUsersStore } from '@/store/users'
import type { UserInfo } from '@/store/users'

interface Props {
  user: UserInfo
}

interface Emits {
  (e: 'edit-credit', user: UserInfo): void
  (e: 'refresh'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const usersStore = useUsersStore()
const loading = ref(false)

async function toggleAdminStatus() {
  loading.value = true
  try {
    const newAdminStatus = props.user.isAdmin === 1 ? 0 : 1
    const success = await usersStore.updateUserAdmin(props.user.id, newAdminStatus)
    if (success) {
      emit('refresh')
    } else {
      alert('更新用户状态失败')
    }
  } finally {
    loading.value = false
  }
}

async function deleteUser() {
  if (!confirm(`确定要删除用户 "${props.user.username}" 吗？此操作不可恢复。`)) {
    return
  }

  loading.value = true
  try {
    const success = await usersStore.deleteUser(props.user.id)
    if (success) {
      emit('refresh')
    } else {
      alert('删除用户失败')
    }
  } finally {
    loading.value = false
  }
}

function editCredit() {
  emit('edit-credit', props.user)
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="sm" :disabled="loading">
        <MoreHorizontal class="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="editCredit">
        <Edit class="mr-2 h-4 w-4" />
        编辑积分
      </DropdownMenuItem>
      
      <DropdownMenuItem @click="toggleAdminStatus">
        <Shield v-if="user.isAdmin !== 1" class="mr-2 h-4 w-4" />
        <ShieldOff v-else class="mr-2 h-4 w-4" />
        {{ user.isAdmin === 1 ? '取消管理员' : '设为管理员' }}
      </DropdownMenuItem>
      
      <DropdownMenuSeparator />
      
      <DropdownMenuItem 
        @click="deleteUser" 
        class="text-red-600 focus:text-red-600"
      >
        <Trash2 class="mr-2 h-4 w-4" />
        删除用户
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
