<script setup lang="ts">
  import { ref } from 'vue'
  import { Button } from '@/components/ui/button'
  import { Input } from '@/components/ui/input'
  import { useAuthStore } from '@/store/auth'
  import { useRouter } from 'vue-router'

  const authStore = useAuthStore()
  const router = useRouter()

  const isLogin = ref(true)
  const email = ref('')
  const password = ref('')
  const username = ref('')
  const errorMessage = ref('')

  async function handleSubmit() {
    errorMessage.value = ''
    if (isLogin.value) {
      // Login
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.value, password: password.value }),
        })
        if (response.ok) {
          const data = await response.json()
          authStore.setToken(data.data.accessToken)
          await authStore.fetchUser()
          router.push('/')
        } else {
          const errorData = await response.json()
          errorMessage.value = errorData.message
          console.error('Login failed:', errorMessage.value)
        }
      } catch (error) {
        errorMessage.value = 'An unexpected error occurred.'
        console.error('Login error:', error)
      }
    } else {
      // Register
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: username.value, email: email.value, password: password.value }),
        })
        if (response.ok) {
          // switch to login view after successful registration
          isLogin.value = true
        } else {
          const errorData = await response.json()
          errorMessage.value = errorData.message
          console.error('Registration failed:', errorMessage.value)
        }
      } catch (error) {
        errorMessage.value = 'An unexpected error occurred.'
        console.error('Registration error:', error)
      }
    }
  }
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h1 class="text-2xl font-bold text-center">{{ isLogin ? '登录' : '注册' }}</h1>

      <form class="space-y-6" @submit.prevent="handleSubmit">
        <div v-if="!isLogin">
          <label for="username" class="text-sm font-medium">用户名</label>
          <Input id="username" v-model="username" type="text" placeholder="请输入用户名" required />
        </div>
        <div>
          <label for="email" class="text-sm font-medium">邮箱</label>
          <Input id="email" v-model="email" type="email" placeholder="m@example.com" required />
        </div>
        <div>
          <label for="password" class="text-sm font-medium">密码</label>
          <Input id="password" v-model="password" type="password" placeholder="••••••••" required />
        </div>
        <p v-if="errorMessage" class="text-sm text-center text-red-500">
          {{ errorMessage }}
        </p>
        <Button type="submit" class="w-full">
          {{ isLogin ? '登录' : '注册' }}
        </Button>
      </form>
      <p class="text-sm text-center">
        <a href="#" class="text-blue-600 hover:underline" @click.prevent="isLogin = !isLogin">
          {{ isLogin ? '没有账号？注册' : '已有账号？登录' }}
        </a>
      </p>
    </div>
  </div>
</template>