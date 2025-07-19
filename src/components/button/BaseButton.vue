<template>
  <button :class="['base-button', 'base-button--' + buttonType]" :style="buttonStyles">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ButtonType } from './ButtonTypes';

const props = withDefaults(
  defineProps<{
    height?: string | number;
    width?: string | number;
    buttonType: ButtonType;
  }>(),
  {
    height: 'auto',
    width: 'auto',
  }
);
const buttonStyles = computed(() => ({
  '--height': typeof props.height === 'number' ? `${props.height}px` : props.height,
  '--width': typeof props.width === 'number' ? `${props.width}px` : props.width,
}));
</script>
