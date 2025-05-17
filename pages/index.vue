<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-white text-center space-y-6">
    <h1 class="text-4xl font-bold text-gray-800">👨‍⚕️ Doctor Booking System</h1>
    <p class="text-gray-600">Login or Register to continue</p>

    <div class="flex space-x-4">
      <NuxtLink to="/login">
        <UButton color="blue">Login</UButton>
      </NuxtLink>
      <NuxtLink to="/register">
        <UButton color="gray">Register</UButton>
      </NuxtLink>
    </div>
  </div>
</template>
