<template>
  <nav class="bg-white shadow p-4 flex justify-between items-center">
    <NuxtLink to="/" class="text-xl font-bold">
      {{ $t('home') }}
    </NuxtLink>
    <div class="space-x-4">
      <NuxtLink to="/login" class="text-blue-600 hover:underline">
        {{ $t('login') }}
      </NuxtLink>
      <NuxtLink to="/register" class="text-blue-600 hover:underline">
        {{ $t('register') }}
      </NuxtLink>
    </div>
  </nav>
</template>
