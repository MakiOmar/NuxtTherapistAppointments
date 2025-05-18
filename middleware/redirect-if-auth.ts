export default defineNuxtRouteMiddleware(async () => {
  const localePath = useLocalePath()

  const token = process.client ? localStorage.getItem('auth_token') : null
  if (!token) return

  try {
    const user = await $fetch('/me', {
      baseURL: useRuntimeConfig().public.apiBase,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const role = user.roles?.[0] || ''

    if (role === 'admin') return navigateTo(localePath('/admin/dashboard'))
    if (role === 'doctor') return navigateTo(localePath('/doctor/dashboard'))
    if (role === 'patient') return navigateTo(localePath('/patient/dashboard'))
  } catch (err) {
    localStorage.removeItem('auth_token')
  }
})
