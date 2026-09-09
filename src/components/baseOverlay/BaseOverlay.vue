<template>
  <div :class="['base-overlay', { 'base-overlay-white': white, 'base-overlay-soft': soft }]">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onMounted onBeforeUnmount } from 'vue';
const props = withDefaults(
  defineProps<{
    white?: boolean;
    lockScroll?: boolean;
    soft?: boolean;
  }>(),
  {
    white: false,
    lockScroll: true,
    soft: false,
  }
);
// когда оверлей монтируется — блокируем скролл
let scrollY = 0;

onMounted(() => {
  if (props.lockScroll) {
    handleLockScroll();
  }
});

// когда оверлей удаляется — возвращаем всё обратно
onBeforeUnmount(() => {
  if (props.lockScroll) {
    unlockScroll();
  }
});

function handleLockScroll() {
  // сохраняем текущую позицию
  scrollY = window.scrollY;

  // фиксируем body на месте
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.width = '100%';
  document.body.style.overflow = 'hidden';
}

function unlockScroll() {
  // убираем фиксацию
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.width = '';
  document.body.style.overflow = '';

  // восстанавливаем скролл
  window.scrollTo(0, scrollY);
}
</script>

<style lang="scss">
.base-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(6px);
  background-color: var(--black-60);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999;

  &.base-overlay-white {
    background-color: var(--white-60);
    backdrop-filter: none;
  }

  &.base-overlay-soft {
    position: absolute;
    z-index: 1000;
  }
}
</style>
