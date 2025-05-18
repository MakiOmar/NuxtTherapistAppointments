<template>
  <div class="min-h-screen flex items-center justify-center bg-white">
    <form @submit.prevent="handleRegister" class="space-y-4 w-full max-w-md p-6 border rounded-lg shadow">
      <h2 class="text-2xl font-semibold mb-4">{{ $t('register_title') }}</h2>

      <input
        v-model="form.name"
        type="text"
        :placeholder="$t('name')"
        class="input"
        required
      />
      <input
        v-model="form.email"
        type="email"
        :placeholder="$t('email')"
        class="input"
        required
      />
      <input
        v-model="form.password"
        type="password"
        :placeholder="$t('password')"
        class="input"
        required
      />

      <select v-model="form.role" class="input" required>
        <option disabled value="">{{ $t('select_role') }}</option>
        <option value="doctor">{{ $t('doctor') }}</option>
        <option value="patient">{{ $t('patient') }}</option>
      </select>

      <button type="submit" class="btn">{{ $t('register') }}</button>

      <p class="text-sm text-gray-600">
        {{ $t('have_account') }}
        <NuxtLink to="/login" class="text-blue-600 underline">
          {{ $t('login') }}
        </NuxtLink>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['redirect-if-auth']
})

const router = useRouter()
const { t } = useI18n()

const form = reactive({
  name: '',
  email: '',
  password: '',
  role: '',
})

const api = useApi()

async function handleRegister() {
  try {
    const res = await api('/register', {
      method: 'POST',
      body: form,
    })
    localStorage.setItem('token', res.token)
    router.push('/')
  } catch (err: any) {
    alert(err?.data?.message || t('register_error'))
  }
}
</script>

<style scoped>
@reference "tailwindcss";

.input {
  @apply w-full p-2 border rounded-md;
}
.btn {
  @apply w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700;
}
</style>