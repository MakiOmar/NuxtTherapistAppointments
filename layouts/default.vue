<template>
  <div>
    <LangSwitcher />
    <Navbar />
    <main class="p-4">
      <slot />
    </main>
  </div>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue'
</script>
