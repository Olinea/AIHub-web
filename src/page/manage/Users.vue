<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { Users, Activity, UserPlus, RefreshCw } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge/index'

import { useUsersStore } from '@/store/users'
import EditCreditDialog from '@/components/EditCreditDialog.vue'
import UserTableActions from '@/components/UserTableActions.vue'
import type { UserInfo } from '@/store/users'

const usersStore = useUsersStore()
const searchKeyword = ref('')
const editCreditDialogOpen = ref(false)
const currentEditUser = ref<UserInfo | null>(null)

// 计算显示的用户列表
const displayUsers = computed(() => {
  if (usersStore.hasSearchResults) {
    return usersStore.searchResults
  }
  return usersStore.users
})

// 格式化日期
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 搜索用户
async function handleSearch() {
  if (searchKeyword.value.trim()) {
    await usersStore.searchUsers(searchKeyword.value.trim())
  } else {
    usersStore.clearSearch()
  }
}

// 清除搜索
function clearSearch() {
  searchKeyword.value = ''
  usersStore.clearSearch()
}

// 刷新数据
async function refreshData() {
  await Promise.all([
    usersStore.fetchUsersSummary(),
    usersStore.fetchUsers(usersStore.currentPage, usersStore.pageSize)
  ])
}

// 打开编辑积分对话框
function openEditCreditDialog(user: UserInfo) {
  currentEditUser.value = user
  editCreditDialogOpen.value = true
}

// 处理编辑积分成功
function handleEditCreditSuccess() {
  // 如果有搜索结果，重新搜索；否则刷新当前页
  if (usersStore.searchKeyword) {
    usersStore.searchUsers(usersStore.searchKeyword)
  } else {
    usersStore.fetchUsers(usersStore.currentPage, usersStore.pageSize)
  }
}

// 换页
function changePage(page: number) {
  usersStore.changePage(page)
}

// 改变每页大小
function changePageSize(size: number) {
  usersStore.changePageSize(size)
}

onMounted(() => {
  refreshData()
})
</script>

<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div>
      <h1 class="text-3xl font-bold">用户管理</h1>
      <p class="text-muted-foreground">管理系统中的所有用户账户</p>
    </div>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="p-6 bg-card rounded-lg border">
        <div class="flex items-center">
          <Users class="h-8 w-8 text-blue-600" />
          <div class="ml-4">
            <h3 class="text-sm font-medium text-muted-foreground">总用户数</h3>
            <p class="text-2xl font-bold">{{ usersStore.usersSummary?.total || 0 }}</p>
          </div>
        </div>
      </div>
      
      <div class="p-6 bg-card rounded-lg border">
        <div class="flex items-center">
          <Activity class="h-8 w-8 text-green-600" />
          <div class="ml-4">
            <h3 class="text-sm font-medium text-muted-foreground">活跃用户（月）</h3>
            <p class="text-2xl font-bold">{{ usersStore.usersSummary?.activeUsers.mau || 0 }}</p>
          </div>
        </div>
      </div>
      
      <div class="p-6 bg-card rounded-lg border">
        <div class="flex items-center">
          <UserPlus class="h-8 w-8 text-purple-600" />
          <div class="ml-4">
            <h3 class="text-sm font-medium text-muted-foreground">新用户（本月）</h3>
            <p class="text-2xl font-bold">{{ usersStore.usersSummary?.newUsers.monthly || 0 }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 用户列表 -->
    <div class="bg-card rounded-lg border">
      <div class="p-6 border-b">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold">用户列表</h2>
          <div class="flex items-center gap-2">
            <!-- 搜索框 -->
            <div class="flex items-center gap-2">
              <Input
                v-model="searchKeyword"
                placeholder="搜索用户名或邮箱..."
                class="w-64"
                @keyup.enter="handleSearch"
              />
              <Button @click="handleSearch" size="sm">
                搜索
              </Button>
              <Button 
                v-if="usersStore.hasSearchResults" 
                @click="clearSearch" 
                size="sm" 
                variant="outline"
              >
                清除
              </Button>
            </div>
            <!-- 刷新按钮 -->
            <Button @click="refreshData" size="sm" variant="outline" :disabled="usersStore.loading">
              <RefreshCw class="h-4 w-4 mr-2" :class="{ 'animate-spin': usersStore.loading }" />
              刷新
            </Button>
          </div>
        </div>
      </div>

      <div class="p-6">
        <!-- 加载状态 -->
        <div v-if="usersStore.loading" class="text-center py-12 text-muted-foreground">
          <RefreshCw class="h-8 w-8 mx-auto mb-4 animate-spin" />
          <p>加载中...</p>
        </div>

        <!-- 用户表格 -->
        <div v-else-if="displayUsers.length > 0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>用户名</TableHead>
                <TableHead>邮箱</TableHead>
                <TableHead>积分余额</TableHead>
                <TableHead>管理员</TableHead>
                <TableHead>注册时间</TableHead>
                <TableHead>最后更新</TableHead>
                <TableHead class="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="user in displayUsers" :key="user.id">
                <TableCell class="text-muted-foreground">{{ user.id }}</TableCell>
                <TableCell class="font-medium">{{ user.username }}</TableCell>
                <TableCell>{{ user.email }}</TableCell>
                <TableCell>{{ user.creditBalance.toFixed(2) }}</TableCell>
                <TableCell>
                  <Badge v-if="user.isAdmin === 1" variant="secondary">管理员</Badge>
                  <span v-else class="text-muted-foreground">普通用户</span>
                </TableCell>
                <TableCell>{{ formatDate(user.createdAt) }}</TableCell>
                <TableCell>{{ formatDate(user.updatedAt) }}</TableCell>
                <TableCell class="text-right">
                  <UserTableActions 
                    :user="user" 
                    @edit-credit="openEditCreditDialog"
                    @refresh="refreshData"
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <!-- 分页 -->
          <div v-if="!usersStore.hasSearchResults" class="flex items-center justify-between mt-6">
            <div class="flex items-center gap-4">
              <div class="text-sm text-muted-foreground">
                共 {{ usersStore.totalUsers }} 条记录
              </div>
              <div class="flex items-center gap-2 text-sm">
                <span>每页显示</span>
                <select 
                  :value="usersStore.pageSize" 
                  @change="changePageSize(Number(($event.target as HTMLSelectElement).value))"
                  class="border border-input bg-background px-2 py-1 rounded text-sm"
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <span>条</span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <Button 
                @click="changePage(usersStore.currentPage - 1)"
                :disabled="usersStore.currentPage <= 1"
                size="sm"
                variant="outline"
              >
                上一页
              </Button>
              <span class="text-sm">
                第 {{ usersStore.currentPage }} / {{ usersStore.totalPages }} 页
              </span>
              <Button 
                @click="changePage(usersStore.currentPage + 1)"
                :disabled="usersStore.currentPage >= usersStore.totalPages"
                size="sm"
                variant="outline"
              >
                下一页
              </Button>
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <div v-else class="text-center py-12 text-muted-foreground">
          <Users class="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p v-if="usersStore.hasSearchResults">未找到匹配的用户</p>
          <p v-else>暂无用户数据</p>
        </div>
      </div>
    </div>

    <!-- 编辑积分对话框 -->
    <EditCreditDialog 
      v-model:open="editCreditDialogOpen"
      :user="currentEditUser"
      @success="handleEditCreditSuccess"
    />
  </div>
</template>
