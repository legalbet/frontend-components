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

<style lang="scss" scoped>
@use '@/scss/settings' as *;

.base-button {
  height: var(--height);
  width: var(--width);
  cursor: pointer;
  text-align: center;
  display: block;
  border-radius: $elem-br;
  border: none;
  font-family: $regular-font;
  transition: 0.2s;
  &:disabled {
    cursor: auto;
  }
  &--red {
    background-color: color(brand-color);
    color: color(white);
    &:hover {
      background-color: color(red-hover);
    }
    &:active {
      background-color: color(red-click);
    }
    &:disabled {
      background-color: color(black-10);
    }
  }
  &--blue {
    background-color: color(blue-perfect);
    color: color(white);
    &:hover {
      background-color: color(blue-hover);
    }
    &:active {
      background-color: color(blue-active);
    }
    &:disabled {
      background-color: color(black-20);
    }
  }
  &--blue-stroke {
    border: 1px solid color(blue-perfect-30);
    color: color(black-80);
    background-color: rgba(255, 255, 255, 0);
    &:hover {
      color: color(white);
      border: none;
      background-color: color(blue-perfect);
    }
    &:active {
      color: color(white);
      border: none;
      background-color: color(blue-active);
    }
    &:disabled {
      border: 1px solid color(black-10);
      color: color(black-10);
      background-color: color(white);
    }
  }
  &--yellow {
    background-color: color(yellow);
    color: color(black-80);
    &:hover {
      background-color: color(yellow-hover);
    }
    &:active {
      background-color: color(yellow-active);
    }
    &:disabled {
      color: color(white);
      background-color: color(black-10);
    }
  }
  &--green {
    background-color: color(green);
    color: color(white);
    &:hover {
      background:
        linear-gradient(0deg, color(white-10), color(white-10)), linear-gradient(0deg, color(green), color(green));
      background-blend-mode: overlay;
    }
    &:active {
      background:
        linear-gradient(0deg, color(black-10), color(black-10)), linear-gradient(0deg, color(green), color(green));
      background-blend-mode: overlay;
    }
    &:disabled {
      background-color: color(black-10);
    }
  }
  &--black {
    background-color: color(dark-gray-1);
    color: color(white);
    border: 1px solid color(white);
    &:hover {
      background-color: color(grey-hover);
    }
    &:active {
      background-color: color(grey-active);
    }
    &:disabled {
      background-color: color(black-10);
    }
  }
  &--white {
    background-color: color(white);
    color: color(black-80);
    &:hover {
      background-color: color(white-90);
    }
    &:active {
      background-color: color(white-80);
    }
    &:disabled {
      color: color(black);
      background-color: color(white-10);
    }
  }
  &--white-stroke {
    border: 1px solid color(white);
    color: color(white);
    background-color: rgba(255, 255, 255, 0);
    &:hover {
      background-color: color(white-10);
    }
    &:active {
      background-color: color(white-20);
    }
    &:disabled {
      opacity: 0.3;
      color: color(white);
      background-color: rgba(255, 255, 255, 0);
      border: 1px solid color(white);
    }
  }
  &--white-stroke-transparency {
    border: 1px solid color(white-40);
    color: color(white);
    background-color: rgba(255, 255, 255, 0);
    &:hover {
      background-color: color(white-10);
    }
    &:active {
      background-color: color(white-20);
    }
    &:disabled {
      opacity: 0.3;
      color: color(white);
      background-color: rgba(255, 255, 255, 0);
      border: 1px solid color(white-40);
    }
  }
}
</style>
