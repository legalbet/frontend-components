<script lang="ts" setup>
import type { Color, Size } from '@fc/components/types/BaseElementsType';

defineProps<{
  size: Size;
  color: Color;
}>();
</script>

<template>
  <div :class="['base-counter', `base-counter--${size}`, `base-counter--${color}`]">
    <div class="base-counter__content">
      <slot> </slot>
    </div>
  </div>
</template>
<style lang="scss">
@use "@fc/scss/settings" as *;
.base-counter {
  width: fit-content;
  justify-content: center;
  align-items: center;

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &--small {
    padding: rem(2px) rem(4px);
    border-radius: 8px;
    font-size: rem(10px);
    font-style: normal;
    font-weight: 600;
    line-height: rem(12px);
    height: rem(16px);
    min-width: rem(16px);
    .base-counter__content {
      min-height: rem(12px);
    }
  }

  &--medium {
    border-radius: 10px;
    padding: rem(4px) rem(6px);
    min-width: rem(20px);
    font-size: rem(12px);
    font-style: normal;
    font-weight: 500;
    line-height: rem(12px);
    .base-counter__content {
      min-height: rem(10px);
    }
  }
  &--secondary {
    background: var(--secondary-default);
    color: var(--secondary-fg, #fff);
  }
  &--neutral {
    background: var(--neutral-container);
    color: var(--neutral-container-fg, #55585e);
  }
  &--primary {
    background: var(--primary-default);
    color: var(--primary-fg, #fff);
  }
}
</style>
