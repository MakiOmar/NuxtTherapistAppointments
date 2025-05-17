<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <UCard class="w-full max-w-md space-y-6 p-6">
      <h2 class="text-2xl font-bold text-center">{{ $t('login_title') }}</h2>

      <USelect
        v-model="selectedRole"
        :items="translatedRoles"
        :placeholder="$t('select_role')"
        class="w-full"
        @update:model-value="handleRoleChange"
      />

      <UInput
        v-model="form.email"
        type="email"
        :placeholder="$t('email')"
        icon="i-heroicons-envelope"
        :disabled="!!selectedRole"
      />

      <UInput
        v-model="form.password"
        type="password"
        :placeholder="$t('password')"
        icon="i-heroicons-lock-closed"
      />

      <UButton
        @click="handleLogin"
        :loading="loading"
        block
        :disabled="!form.email || !form.password"
        class="mt-4"
      >
        {{ $t('sign_in') }}
      </UButton>

      <div v-if="error" class="text-red-600 text-sm text-center mt-2">
        {{ error }}
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '#imports'

interface LoginForm {
  email: string
  password: string
}

const { t } = useI18n()
const router = useRouter()
const apiBase = useRuntimeConfig().public.apiBase

const form = reactive<LoginForm>({
  email: '',
  password: ''
})

const selectedRole = ref<string | null>(null)
const loading = ref(false)
const error = ref('')

const translatedRoles = computed(() => [
  { label: t('admin'), value: 'admin' },
  { label: t('doctor'), value: 'doctor' },
  { label: t('patient'), value: 'patient' }
])

function handleRoleChange(role: string | null) {
  if (role) {
    const roleCredentials = {
      admin: { email: 'admin@test.com', password: 'password' },
      doctor: { email: 'doctor@test.com', password: 'password' },
      patient: { email: 'patient@test.com', password: 'password' }
    }

    const credentials = roleCredentials[role as keyof typeof roleCredentials]
    form.email = credentials.email
    form.password = credentials.password
  } else {
    form.email = ''
    form.password = ''
  }
}

async function handleLogin() {
  if (!form.email || !form.password) {
    error.value = t('login_error_required')
    return
  }

  loading.value = true
  error.value = ''

  try {
    const response = await $fetch(`${apiBase}/login`, {
      method: 'POST',
      body: {
        email: form.email,
        password: form.password
      }
    })

    localStorage.setItem('auth_token', response.token)

    const redirectPath =
      selectedRole.value === 'admin'
        ? '/admin/dashboard'
        : selectedRole.value === 'doctor'
          ? '/doctor/dashboard'
          : '/patient/dashboard'

    await router.push(redirectPath)
  } catch (err: any) {
    error.value = err.data?.message || t('login_error_failed')
    console.error('Login error:', err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Custom styles (optional) */
</style>
