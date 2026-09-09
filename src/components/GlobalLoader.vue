<template>
  <div class="global-loader">
    <BaseLoader size="32px" />
  </div>
</template>

<script setup lang="ts">
import BaseLoader from '@/components/basePreloader/BaseLoader.vue';
</script>

<style lang="scss">
.global-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--black-60);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999999;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
