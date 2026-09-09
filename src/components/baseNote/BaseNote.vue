<template>
  <div :class="['base-note', `base-note--${noteStyle}`, `base-note--${type}`, `base-note--${size}`]">
    <BaseIcon
      v-if="!hideIcon"
      :icon-name="iconName"
      :class="['base-note__icon']"
      :fontSize="size === NoteSize.Large ? '24px' : '16px'"
      :size="size === NoteSize.Large ? '24px' : '16px'"
      :pointed="false"
    />
    <div class="base-note__text-container">
      <p class="base-note__text">
        <slot>{{ text }}</slot>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { NoteStyle, NoteType, NoteSize, NOTE_ICONS } from '@fc/components/baseNote/NoteTypes';
import BaseIcon from '@fc/components/baseIcon/BaseIcon.vue';
import type { IconNames } from '@fc/components/baseIcon/iconNames';

const props = withDefaults(
  defineProps<{
    noteStyle?: NoteStyle;
    type?: NoteType;
    size?: NoteSize;
    text?: string;
    customIconName?: IconNames | null;
    hideIcon?: boolean;
  }>(),
  {
    noteStyle: NoteStyle.Neutral,
    type: NoteType.Outline,
    size: NoteSize.Large,
    text: '',
    customIconName: null,
    hideIcon: false,
  }
);

// Автоматически определяем иконку по типу уведомления
const iconName = computed(() => props.customIconName ?? NOTE_ICONS[props.noteStyle]);
</script>

<style lang="scss">
@use "@fc/scss/settings" as *;
.base-note {
  display: flex;
  gap: rem(12px);
  border-radius: var(--radius-base);
  border: 1px solid;

  // Размеры
  &--large {
    padding: rem(16px);
    gap: rem(12px);

    .base-note__text {
      font-size: rem(14px);
      line-height: rem(20px);
    }
  }

  &--small {
    padding: rem(12px);
    gap: rem(8px);

    .base-note__text {
      font-size: rem(12px);
      line-height: rem(16px);
    }
  }

  // Стили: positive
  &--positive {
    &.base-note--outline {
      border-color: var(--success-default);
      background-color: transparent;

      .base-note__icon {
        color: var(--success-default);
      }

      .base-note__text {
        color: var(--secondary-default);
      }
    }

    &.base-note--fill {
      border-color: transparent;
      background-color: var(--green-100);

      .base-note__icon {
        color: var(--success-default);
      }

      .base-note__text {
        color: var(--secondary-default);
      }
    }
  }

  // Стили: negative
  &--negative {
    &.base-note--outline {
      border-color: var(--error-default);
      background-color: transparent;

      .base-note__icon {
        color: var(--error-default);
      }

      .base-note__text {
        color: var(--secondary-default);
      }
    }

    &.base-note--fill {
      border-color: transparent;
      background-color: var(--error-container);

      .base-note__icon {
        color: var(--error-default);
      }

      .base-note__text {
        color: var(--secondary-default);
      }
    }
  }

  // Стили: neutral
  &--neutral {
    &.base-note--outline {
      border-color: var(--neutral-default);
      background-color: transparent;

      .base-note__icon {
        color: var(--neutral-default);
      }

      .base-note__text {
        color: var(--secondary-default);
      }
    }

    &.base-note--fill {
      border-color: transparent;
      background-color: var(--grey-100);

      .base-note__icon {
        color: var(--neutral-default);
      }

      .base-note__text {
        color: var(--secondary-default);
      }
    }
  }

  &--system {
    &.base-note--outline {
      border-color: var(--blue-500);

      .base-note__icon {
        color: var(--blue-500);
      }
    }
    &.base-note--fill {
      background-color: var(--tertiary-container);
      border: none;
      .base-note__icon {
        color: var(--tertiary-container-fg);
      }
    }
  }

  &__icon {
    flex-shrink: 0;
  }

  &__text-container {
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    gap: rem(8px);
  }

  &__text {
    flex-grow: 1;
    margin: 0;
  }
}
</style>
