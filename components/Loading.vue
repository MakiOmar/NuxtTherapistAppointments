<template>
    <Transition name="fade">
      <div v-if="pageLoading" class="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
        <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    </Transition>
</template>

<script setup>

  const pageLoading = usePageLoader()
  const router = useRouter()

  router.beforeEach(() => {
    pageLoading.value = true
  })

  router.afterEach(() => {
    setTimeout(() => {
      pageLoading.value = false
    }, 300) // small delay to match transition timing
  })
</script>