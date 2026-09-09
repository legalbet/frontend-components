<template>
  <div class="app-loader">
    <svg xmlns="http://www.w3.org/2000/svg" version="1.0" :style="{ width: size, height: size }" viewBox="0 0 128 128">
      <g>
        <circle cx="16" cy="64" r="16" :fill="color" />
        <circle cx="16" cy="64" r="14.344" :fill="color" transform="rotate(45 64 64)" />
        <circle cx="16" cy="64" r="12.531" :fill="color" transform="rotate(90 64 64)" />
        <circle cx="16" cy="64" r="10.75" :fill="color" transform="rotate(135 64 64)" />
        <circle cx="16" cy="64" r="10.063" :fill="color" transform="rotate(180 64 64)" />
        <circle cx="16" cy="64" r="8.063" :fill="color" transform="rotate(225 64 64)" />
        <circle cx="16" cy="64" r="6.438" :fill="color" transform="rotate(270 64 64)" />
        <circle cx="16" cy="64" r="5.375" :fill="color" transform="rotate(315 64 64)" />
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 64 64;315 64 64;270 64 64;225 64 64;180 64 64;135 64 64;90 64 64;45 64 64"
          calcMode="discrete"
          dur="880ms"
          repeatCount="indefinite"
        />
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: string;
    speed?: string;
    color?: string;
  }>(),
  {
    size: '24px',
    speed: '1.5s',
    color: '#3591fd',
  }
);
</script>

<style lang="scss">
.app-loader {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

@keyframes pulse0112 {
  0%,
  100% {
    transform: scale(0);
    opacity: 0.5;
  }

  50% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
