<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-white text-center space-y-6">
    <h1 class="text-4xl font-bold text-gray-800">{{ $t('home_title') }}</h1>
    <p class="text-gray-600">{{ $t('home_subtitle') }}</p>

    <div class="flex space-x-4">
      <NuxtLink to="/login">
        <UButton color="blue">{{ $t('login') }}</UButton>
      </NuxtLink>
      <NuxtLink to="/register">
        <UButton color="gray">{{ $t('register') }}</UButton>
      </NuxtLink>
    </div>
  </div>
</template>
