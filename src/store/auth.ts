import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '')
  const user = ref(null)

  function setToken(newToken: string) {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  function clearToken() {
    token.value = ''
    localStorage.removeItem('token')
    user.value = null
  }

  async function fetchUser() {
    if (!token.value) {
      return
    }

    try {
      // Note: Replace with your actual API endpoint and configuration
      const response = await fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        user.value = data.data.user
      } else {
        clearToken()
      }
    } catch (error) {
      console.error('Failed to fetch user:', error)
      clearToken()
    }
  }

  return { token, user, setToken, clearToken, fetchUser }
})
