<template>
  <div class="min-h-[calc(100vh-3.5rem)] flex items-center justify-center">
    <div class="text-center space-y-4">
      <div class="text-9xl font-bold text-gray-300 dark:text-gray-600">
        404
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100">
        页面未找到
      </h1>
      <p class="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
        抱歉，您访问的页面不存在。请检查URL是否正确，或返回首页。
      </p>
      <div class="space-x-4 pt-6">
        <router-link 
          to="/" 
          class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          返回首页
        </router-link>
        <button 
          @click="$router.go(-1)"
          class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          返回上页
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 404 Not Found Page
</script>
