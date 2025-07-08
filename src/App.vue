<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import ManageLayout from '@/layouts/ManageLayout.vue'

const route = useRoute()

const layoutComponent = computed(() => {
  switch (route.meta.layout) {
    case 'Auth':
      return AuthLayout
    case 'Manage':
      return ManageLayout
    default:
      return DefaultLayout
  }
})
</script>

<template>
  <component :is="layoutComponent" />
</template>