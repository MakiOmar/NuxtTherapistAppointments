<template>
  <div v-if="hydrated" class="min-h-screen flex items-center justify-center bg-gray-100">
    <UCard class="w-full max-w-md space-y-6 p-6">
      <h2 class="text-2xl font-bold text-center">{{ $t('welcome') }}</h2>

      <div v-if="loading">
        <p class="text-gray-500">{{ $t('loading') }}</p>
      </div>

      <div v-else-if="user">
        <p><strong>{{ $t('name') }}:</strong> {{ user.name }}</p>
        <p><strong>{{ $t('email') }}:</strong> {{ user.email }}</p>
        <p><strong>{{ $t('roles') }}:</strong> {{ user.roles.join(', ') }}</p>
      </div>

      <div v-else>
        <p class="text-red-600">{{ $t('not_logged_in') }}</p>
      </div>

      <div class="pt-4">
        <UButton color="red" @click="logout">{{ $t('logout') }}</UButton>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const user = ref(null)
const loading = ref(true)
const hydrated = ref(false)
const router = useRouter()
const apiBase = useRuntimeConfig().public.apiBase

onMounted(async () => {
  hydrated.value = true
  const token = localStorage.getItem('auth_token')

  if (!token) {
    return router.push('/login')
  }

  try {
    const res = await $fetch(`${apiBase}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    user.value = res
  } catch (err) {
    localStorage.removeItem('auth_token')
    router.push('/login')
  } finally {
    loading.value = false
  }
})

function logout() {
  localStorage.removeItem('auth_token')
  router.push('/login')
}
</script>
