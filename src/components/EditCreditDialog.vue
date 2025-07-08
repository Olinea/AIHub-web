<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUsersStore } from '@/store/users'
import type { UserInfo } from '@/store/users'

interface Props {
  open: boolean
  user: UserInfo | null
}

interface Emits {
  (e: 'update:open', value: boolean): void
  (e: 'success'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const usersStore = useUsersStore()
const creditInput = ref<string>('')
const loading = ref(false)

// 监听用户变化，初始化积分输入框
watch(() => props.user, (newUser) => {
  if (newUser) {
    creditInput.value = newUser.creditBalance.toString()
  }
}, { immediate: true })

// 处理对话框关闭
function handleClose() {
  emit('update:open', false)
  creditInput.value = ''
}

// 处理保存积分
async function handleConfirm() {
  if (!props.user) return

  const newCredit = parseFloat(creditInput.value)
  if (isNaN(newCredit) || newCredit < 0) {
    alert('请输入有效的积分数量')
    return
  }

  loading.value = true
  try {
    const success = await usersStore.updateUserCredit(props.user.id, newCredit)
    if (success) {
      emit('success')
      handleClose()
    } else {
      alert('更新积分失败')
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Dialog :open="open" @update:open="handleClose">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>编辑用户积分</DialogTitle>
        <DialogDescription>
          修改用户 {{ user?.username }} 的积分余额
        </DialogDescription>
      </DialogHeader>
      
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="credit" class="text-right">积分余额</Label>
          <Input
            id="credit"
            v-model="creditInput"
            type="number"
            step="0.01"
            min="0"
            class="col-span-3"
            placeholder="请输入积分数量"
          />
        </div>
      </div>
      
      <DialogFooter>
        <Button type="button" variant="outline" @click="handleClose">
          取消
        </Button>
        <Button 
          type="button" 
          @click="handleConfirm"
          :disabled="loading"
        >
          {{ loading ? '保存中...' : '保存' }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
