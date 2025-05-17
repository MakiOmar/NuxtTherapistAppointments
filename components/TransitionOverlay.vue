<!-- components/TransitionOverlay.vue -->
<template>
  <div 
    v-if="isLoading"
    class="transition-overlay"
    @transitionend="onTransitionEnd"
  >
    <div class="loader">Loading...</div> <!-- Customize your loader here -->
  </div>
</template>

<script setup>
const isLoading = ref(false)

// Call this when transition starts
const show = () => {
  isLoading.value = true
}

// Automatically hides when transition ends
const onTransitionEnd = () => {
  isLoading.value = false
}

// Expose methods to parent
defineExpose({ show })
</script>

<style scoped>
.transition-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8); /* Semi-dark overlay */
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
}
.loader {
  color: white;
  font-size: 1.5rem;
  /* Add your custom loader styles here */
}
</style>