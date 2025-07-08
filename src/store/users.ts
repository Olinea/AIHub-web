import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface UserInfo {
  id: number
  username: string
  email: string
  creditBalance: number
  createdAt: string
  updatedAt: string
  isAdmin: number
}

export interface UsersSummary {
  total: number
  newUsers: {
    daily: number
    weekly: number
    monthly: number
  }
  activeUsers: {
    dau: number
    wau: number
    mau: number
  }
}

export interface PageInfo {
  records: UserInfo[]
  total: number
  size: number
  current: number
  pages: number
}

export const useUsersStore = defineStore('users', () => {
  // 状态
  const users = ref<UserInfo[]>([])
  const usersSummary = ref<UsersSummary | null>(null)
  const currentPage = ref(1)
  const pageSize = ref(10)
  const totalUsers = ref(0)
  const totalPages = ref(0)
  const loading = ref(false)
  const searchKeyword = ref('')
  const searchResults = ref<UserInfo[]>([])

  // 计算属性
  const hasUsers = computed(() => users.value.length > 0)
  const hasSearchResults = computed(() => searchResults.value.length > 0)

  // API调用函数
  async function fetchUsersSummary() {
    try {
      loading.value = true
      const token = localStorage.getItem('token')
      const response = await fetch('/api/auth/admin/users/summary', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const result = await response.json()
        if (result.code === 200) {
          usersSummary.value = result.data
        }
      }
    } catch (error) {
      console.error('获取用户统计失败:', error)
    } finally {
      loading.value = false
    }
  }

  async function fetchUsers(page = 1, size = 10) {
    try {
      loading.value = true
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/auth/admin/users?current=${page}&size=${size}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const result = await response.json()
        if (result.code === 200) {
          const pageData: PageInfo = result.data
          users.value = pageData.records
          totalUsers.value = pageData.total
          currentPage.value = pageData.current
          pageSize.value = pageData.size
          totalPages.value = pageData.pages
        }
      }
    } catch (error) {
      console.error('获取用户列表失败:', error)
    } finally {
      loading.value = false
    }
  }

  async function searchUsers(keyword: string) {
    if (!keyword.trim()) {
      searchResults.value = []
      searchKeyword.value = ''
      return
    }

    try {
      loading.value = true
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/auth/admin/users/search?keyword=${encodeURIComponent(keyword)}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const result = await response.json()
        if (result.code === 200) {
          searchResults.value = result.data
          searchKeyword.value = keyword
        }
      }
    } catch (error) {
      console.error('搜索用户失败:', error)
    } finally {
      loading.value = false
    }
  }

  async function updateUserCredit(userId: number, creditBalance: number) {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/auth/admin/users/credit', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, creditBalance })
      })

      if (response.ok) {
        const result = await response.json()
        if (result.code === 200) {
          // 更新本地状态
          const userIndex = users.value.findIndex(u => u.id === userId)
          if (userIndex > -1) {
            users.value[userIndex].creditBalance = creditBalance
          }
          return true
        }
      }
      return false
    } catch (error) {
      console.error('更新用户积分失败:', error)
      return false
    }
  }

  async function updateUserAdmin(userId: number, isAdmin: number) {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/auth/admin/users/admin', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, isAdmin })
      })

      if (response.ok) {
        const result = await response.json()
        if (result.code === 200) {
          // 更新本地状态
          const userIndex = users.value.findIndex(u => u.id === userId)
          if (userIndex > -1) {
            users.value[userIndex].isAdmin = isAdmin
          }
          return true
        }
      }
      return false
    } catch (error) {
      console.error('更新用户管理员状态失败:', error)
      return false
    }
  }

  async function deleteUser(userId: number) {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/auth/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const result = await response.json()
        if (result.code === 200) {
          // 从本地状态中移除用户
          users.value = users.value.filter(u => u.id !== userId)
          totalUsers.value -= 1
          return true
        }
      }
      return false
    } catch (error) {
      console.error('删除用户失败:', error)
      return false
    }
  }

  function clearSearch() {
    searchResults.value = []
    searchKeyword.value = ''
  }

  function changePage(page: number) {
    if (page >= 1 && page <= totalPages.value) {
      fetchUsers(page, pageSize.value)
    }
  }

  function changePageSize(size: number) {
    pageSize.value = size
    fetchUsers(1, size)
  }

  return {
    // 状态
    users,
    usersSummary,
    currentPage,
    pageSize,
    totalUsers,
    totalPages,
    loading,
    searchKeyword,
    searchResults,
    
    // 计算属性
    hasUsers,
    hasSearchResults,
    
    // 方法
    fetchUsersSummary,
    fetchUsers,
    searchUsers,
    updateUserCredit,
    updateUserAdmin,
    deleteUser,
    clearSearch,
    changePage,
    changePageSize
  }
})
