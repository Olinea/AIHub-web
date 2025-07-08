<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

// 自动重定向到用户管理页面
router.push('/manage/users')
</script>

<template>
  <div class="flex items-center justify-center h-full">
    <div class="text-center">
      <h1 class="text-2xl font-bold mb-2">正在跳转...</h1>
      <p class="text-muted-foreground">正在重定向到用户管理页面</p>
    </div>
  </div>
</template>
