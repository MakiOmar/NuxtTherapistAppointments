<template>
  <div class="min-h-screen flex items-center justify-center bg-white">
    <form @submit.prevent="handleRegister" class="space-y-4 w-full max-w-md p-6 border rounded-lg shadow">
      <h2 class="text-2xl font-semibold mb-4">Register</h2>

      <input v-model="form.name" type="text" placeholder="Name" class="input" required />
      <input v-model="form.email" type="email" placeholder="Email" class="input" required />
      <input v-model="form.password" type="password" placeholder="Password" class="input" required />
      
      <select v-model="form.role" class="input" required>
        <option disabled value="">Select Role</option>
        <option value="doctor">Doctor</option>
        <option value="patient">Patient</option>
      </select>

      <button type="submit" class="btn">Register</button>
      <p class="text-sm text-gray-600">Already have an account? <NuxtLink to="/login" class="text-blue-600 underline">Login</NuxtLink></p>
    </form>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
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
    alert(err?.data?.message || 'Registration failed')
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
