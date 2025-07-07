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

async function handleSubmit() {
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
        console.error('Login failed')
      }
    } catch (error) {
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
        console.error('Registration failed')
      }
    } catch (error) {
      console.error('Registration error:', error)
    }
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h1 class="text-2xl font-bold text-center">{{ isLogin ? 'Login' : 'Register' }}</h1>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div v-if="!isLogin">
          <label for="username" class="text-sm font-medium">Username</label>
          <Input id="username" v-model="username" type="text" placeholder="Your username" required />
        </div>
        <div>
          <label for="email" class="text-sm font-medium">Email</label>
          <Input id="email" v-model="email" type="email" placeholder="m@example.com" required />
        </div>
        <div>
          <label for="password" class="text-sm font-medium">Password</label>
          <Input id="password" v-model="password" type="password" placeholder="••••••••" required />
        </div>
        <Button type="submit" class="w-full">{{ isLogin ? 'Login' : 'Register' }}</Button>
      </form>
      <p class="text-sm text-center">
        <a @click.prevent="isLogin = !isLogin" href="#" class="text-blue-600 hover:underline">
          {{ isLogin ? 'Need an account? Register' : 'Already have an account? Login' }}
        </a>
      </p>
    </div>
  </div>
</template>
