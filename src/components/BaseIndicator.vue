<script setup lang="ts">
import { computed } from 'vue';
type IndicatorType = 'daily' | 'status' | 'status-fill' | 'square';
type IndicatorColor = 'green' | 'blue' | 'red' | 'yellow';

const props = withDefaults(
  defineProps<{
    type?: IndicatorType;
    color?: IndicatorColor;
    bordered?: boolean;
    position?: 'absolute' | 'relative';
  }>(),
  {
    type: 'status-fill',
    color: 'green',
    bordered: false,
    position: 'relative',
  }
);

const colorVar = computed(() => {
  switch (props?.color) {
    case 'green':
      return 'var(--green-500, #62b435)';
    case 'blue':
      return 'var(--blue-500, #2d7ff9)';
    case 'yellow':
      return 'var(--yellow-500, #f5c542)';
    case 'red':
    default:
      return 'var(--red-500, #f64748)';
  }
});
</script>

<template>
  <span
    class="base-indicator"
    :class="[
      `base-indicator--${props?.type}`,
      `base-indicator--color-${props?.color}`,
      props?.bordered ? 'base-indicator--bordered' : null,
      `base-indicator--position-${props?.position}`,
    ]"
    :style="{ '--indicator-color': colorVar }"
  >
    <slot />
  </span>
</template>

<style lang="scss">
@use "@/scss/settings" as *;
.base-indicator {
  display: inline-block;
  position: relative;
  background: transparent;
}
.base-indicator--position-absolute {
  position: absolute;
}

.base-indicator--status,
.base-indicator--status-fill,
.base-indicator--new {
  width: rem(10px);
  height: rem(10px);
  border-radius: 50%;
}

.base-indicator--square {
  width: rem(16px);
  height: rem(16px);
  border-radius: rem(4px);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.base-indicator--status {
  background: transparent;
  border: rem(2px) solid var(--indicator-color);
}

.base-indicator--status-fill,
.base-indicator--new,
.base-indicator--square {
  background: var(--indicator-color);
  border: 2px solid var(--white-100, #fff);
  color: var(--white-100, #fff);
}

.base-indicator--bordered {
  border: 2px solid #f0f1f2;
  &.base-indicator--square {
    border: rem(2px) solid var(--white-100, #fff);
  }
}

.base-indicator--daily {
  display: block;
  top: rem(-2px);
  right: 0;
  width: rem(12px);
  height: rem(12px);
  @media #{$lg} {
    right: rem(-12px);
    top: calc(50% - 1rem);
    transform: translateY(calc(-50% + 0.5rem));
  }

  @keyframes indicate {
    0% {
      background: rgba(246, 71, 71, 0.24);
      transform: scale(1);
    }
    50% {
      background: rgba(246, 71, 71, 0.36);
      transform: scale(1.16);
    }
    100% {
      background: rgba(246, 71, 71, 0.24);
      transform: scale(1);
    }
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: rem(12px);
    height: rem(12px);
    animation: indicate 1.2s ease-in-out 200ms infinite;
    background: rgba(246, 71, 71, 0.24);
    border-radius: 50%;
  }
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: rem(6px);
    height: rem(6px);
    background: var(--red-500);
    border-radius: 50%;
  }
}
</style>
