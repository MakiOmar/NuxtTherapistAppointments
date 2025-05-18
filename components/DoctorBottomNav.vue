<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t shadow z-50">
    <div class="flex justify-around items-center h-16">
      <NuxtLink to="/doctor/settings" class="nav-item" :class="isActive('/doctor/settings')">
        <UIcon name="i-heroicons-cog-6-tooth" class="w-6 h-6" />
      </NuxtLink>
      <div class="nav-item">
        <UIcon name="i-heroicons-plus-circle" class="w-6 h-6" />
      </div>
      <div class="nav-item">
        <UIcon name="i-heroicons-list-bullet" class="w-6 h-6" />
      </div>
      <div class="nav-item">
        <UIcon name="i-heroicons-calendar-days" class="w-6 h-6" />
      </div>
      <div class="nav-item">
        <UIcon name="i-heroicons-banknotes" class="w-6 h-6" />
      </div>
      <div class="nav-item">
        <UIcon name="i-heroicons-user" class="w-6 h-6" />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute()
const isActive = (path: string) => route.path === path ? 'text-blue-600' : 'text-gray-400'
</script>

<style scoped>
.nav-item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 0.5rem;
  transition: color 0.3s;
}
</style>
