<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <UCard class="w-full max-w-md space-y-6 p-6">
      <h2 class="text-2xl font-bold text-center">Login</h2>

      <USelect
        v-model="selectedRole"
        :items="roleOptions"
        placeholder="Select your role"
        class="w-full"
        @update:model-value="handleRoleChange"
      />

      <UInput
        v-model="form.email"
        type="email"
        placeholder="Email"
        icon="i-heroicons-envelope"
        :disabled="!!selectedRole"
      />

      <UInput
        v-model="form.password"
        type="password"
        placeholder="Password"
        icon="i-heroicons-lock-closed"
      />

      <UButton
        @click="handleLogin"
        :loading="loading"
        block
        :disabled="!form.email || !form.password"
        class="mt-4"
      >
        Sign In
      </UButton>

      <div v-if="error" class="text-red-600 text-sm text-center mt-2">
        {{ error }}
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
interface LoginForm {
  email: string
  password: string
}

const form = reactive<LoginForm>({
  email: '',
  password: ''
})

const roleOptions = [
  { label: 'Administrator', value: 'admin' },
  { label: 'Medical Doctor', value: 'doctor' },
  { label: 'Patient', value: 'patient' }
]

const selectedRole = ref<string | null>(null)
const loading = ref(false)
const error = ref('')

const apiBase = useRuntimeConfig().public.apiBase

const router = useRouter()

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
    error.value = 'Please fill in all fields'
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


    // Redirect based on role
    const redirectPath = selectedRole.value === 'admin' 
      ? '/admin/dashboard' 
      : selectedRole.value === 'doctor' 
        ? '/doctor/dashboard' 
        : '/patient/dashboard'

    await router.push(redirectPath)
  } catch (err: any) {
    error.value = err.data?.message || 'Login failed. Please try again.'
    console.error('Login error:', err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Add any custom styles here */
</style>