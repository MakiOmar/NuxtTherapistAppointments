<template>
  <div class="flex gap-4">
    <button @click="setLocale('en')">🇺🇸 English</button>
    <button @click="setLocale('ar')">🇸🇦 العربية</button>
  </div>
</template>

<script setup>
const { locale, setLocale } = useI18n()
</script>
