<script setup lang="ts">
import { computed } from 'vue';
import { AllColors } from '@/components/BaseBadge/types';
import { BaseIcon } from '@/components/baseIcon';
import { Size, Variant } from '@/components/types/BaseElementsType';
import type { IconParams } from '@/components/baseIcon/types';

const props = withDefaults(
  defineProps<{
    size?: Size;
    color?: AllColors;
    variant?: Variant;
    rounded?: boolean;
    icon?: IconParams | null;
    text?: string;
  }>(),
  {
    size: Size.Medium,
    color: AllColors.Primary,
    variant: Variant.Solid,
    rounded: false,
    icon: null,
  }
);

const textClass = computed(() => {
  switch (props.size) {
    case 'large':
      return 'text-t14';
    case 'medium':
      return 'text-t12';
    case 'small':
      return 'text-t12';
    case 'extra-small':
      return 'text-t10';
    default:
      return 'text-t14';
  }
});

const iconSize = computed(() => {
  switch (props.size) {
    case 'large':
      return '14px';
    case 'medium':
      return '12px';
    case 'small':
      return '10px';
    case 'extra-small':
      return '8px';
    default:
      return '14px';
  }
});
</script>
<template>
  <div
    :class="[
      'base-badge',
      `base-badge--${props.size}`,
      `base-badge--${props.color}`,
      `base-badge--${props.variant}`,
      props.rounded ? 'base-badge--rounded' : '',
    ]"
  >
    <BaseIcon v-if="props?.icon" v-bind="props?.icon" :fontSize="iconSize" />
    <span :class="textClass" class="badge-text">
      <slot>{{ props?.text }}</slot>
    </span>
  </div>
</template>

<style lang="scss">
@use "@/scss/settings" as *;
.base-badge {
  border-radius: var(--radius-button-24, 4px);
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: rem(12px);
  font-style: normal;
  font-weight: 500;
  line-height: 14px;
  gap: rem(4px);
  width: fit-content;

  //SIZES
  &--large {
    height: rem(24px);
    padding: rem(4px) rem(6px);
    gap: rem(5px);
  }
  &--medium {
    height: rem(20px);
    padding: rem(3px) rem(5px);
    gap: rem(4px);
  }
  &--small {
    height: rem(16px);
    padding: rem(2px) rem(4px);
    gap: rem(3px);
  }
  &--rounded {
    border-radius: rem(12px);
  }
  //COLORS
  &--primary {
    background-color: var(--primary-default);
    color: var(--primary-fg);
    .icon {
      color: var(--primary-fg);
    }
    &.base-badge--soft {
      background-color: var(--primary-container);
      color: var(--primary-container-fg);
      .icon {
        color: var(--primary-container-fg);
      }
    }
    &.base-badge--outlined {
      background-color: transparent;
      border: 1px solid var(--primary-default);
      color: var(--primary-default);
      .icon {
        color: var(--primary-default);
      }
    }
  }
  &--secondary {
    background-color: var(--secondary-default);
    color: var(--secondary-fg);
    .icon {
      color: var(--secondary-fg);
    }
    &.base-badge--soft {
      background-color: var(--secondary-container);
      color: var(--secondary-container-fg);
      .icon {
        color: var(--secondary-container-fg);
      }
    }
    &.base-badge--outlined {
      background-color: transparent;
      border: 1px solid var(--secondary-default);
      color: var(--secondary-default);
      .icon {
        color: var(--secondary-default);
      }
    }
  }

  &--tertiary {
    background-color: var(--tertiary-default);
    color: var(--tertiary-fg);
    .icon {
      color: var(--tertiary-fg);
    }
    &.base-badge--soft {
      background-color: var(--tertiary-container);
      color: var(--tertiary-container-fg);
      .icon {
        color: var(--tertiary-container-fg);
      }
    }
    &.base-badge--outlined {
      background-color: transparent;
      border: 1px solid var(--tertiary-default);
      color: var(--tertiary-default);
      .icon {
        color: var(--tertiary-default);
      }
    }
  }

  &--positive {
    background-color: var(--success-default);
    color: var(--success-fg);
    .icon {
      color: var(--success-fg);
    }
    &.base-badge--soft {
      background-color: var(--success-container);
      color: var(--success-container-fg);
      .icon {
        color: var(--success-container-fg);
      }
    }
    &.base-badge--outlined {
      background-color: transparent;
      border: 1px solid var(--success-default);
      color: var(--success-default);
      .icon {
        color: var(--success-default);
      }
    }
  }

  &--negative {
    background-color: var(--error-default);
    color: var(--error-fg);
    .icon {
      color: var(--error-fg);
    }
    &.base-badge--soft {
      background-color: var(--error-container);
      color: var(--error-container-fg);
      .icon {
        color: var(--error-container-fg);
      }
    }
    &.base-badge--outlined {
      background-color: transparent;
      border: 1px solid var(--error-default);
      color: var(--error-default);
      .icon {
        color: var(--error-default);
      }
    }
  }

  &--neutral {
    background-color: var(--neutral-default);
    color: var(--neutral-fg);
    .icon {
      color: var(--neutral-fg);
    }
    &.base-badge--soft {
      background-color: var(--neutral-container);
      color: var(--neutral-container-fg);
      .icon {
        color: var(--neutral-container-fg);
      }
    }
    &.base-badge--outlined {
      .icon {
        color: var(--neutral-default);
      }
      background-color: transparent;
      border: 1px solid var(--neutral-default);
      color: var(--neutral-default);
    }
  }
}
</style>
