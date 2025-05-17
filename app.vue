<template>
  <UApp>
    <Loading />
    <NuxtLayout>
          <NuxtPage :transition="pageTransition" />
    </NuxtLayout>
  </UApp>
</template>
<script setup>
  const pageTransition = {
    name: 'slide',
    mode: 'out-in',
  }

  // ✅ Watch locale to set text direction
  const { locale } = useI18n();

  watch(locale, (val) => {
    document.dir = val === 'ar' ? 'rtl' : 'ltr'
  });

  onMounted(() => {
    document.dir = locale.value === 'ar' ? 'rtl' : 'ltr'
  });

</script>
<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
  position: absolute;
  overflow-x: hidden;
  width: 100%;
}

.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-enter-to {
  transform: translateX(0%);
  opacity: 1;
}

.slide-leave-from {
  transform: translateX(0%);
  opacity: 1;
}

.slide-leave-to {
  transform: translateX(-50%);
  opacity: 0;
}
</style>