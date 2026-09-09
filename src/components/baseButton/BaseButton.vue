<template>
  <component
    :is="tag"
    :class="['button', `button--${color}`, `button--${variant}`, size, shape, { 'button--loading': loadingActive }]"
    :disabled="tag === 'button' ? disabled : undefined"
    :href="tag === 'a' ? href : undefined"
    role="button"
    :style="props.customStyles"
  >
    <BaseLoading
      v-if="loadingActive && loadingPosition === 'start'"
      class="button__loader"
      :size="loadingSize"
      :color="loadingColor"
    />
    <BaseIcon
      v-if="startIconParams"
      v-bind="normalizeIconParams(startIconParams)"
      :class="['button__icon', { 'button__icon--colored': !startIconParams?.textColor }]"
    />
    <BaseLoading
      v-if="loadingActive && loadingPosition === 'center'"
      class="button__loader"
      :size="loadingSize"
      :color="loadingColor"
    />
    <div v-if="$slots.default" v-show="!(loadingActive && loadingHideText)" class="button__text">
      <slot />
    </div>
    <BaseIcon
      v-if="endIconParams"
      v-bind="normalizeIconParams(endIconParams)"
      :class="['button__icon', { 'button__icon--colored': !endIconParams?.textColor }]"
    />
    <BaseLoading
      v-if="loadingActive && loadingPosition === 'end'"
      class="button__loader"
      :size="loadingSize"
      :color="loadingColor"
    />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ButtonColor, ButtonTag, ButtonVariant, ButtonShape } from '@fc/components/baseButton/types';
import { Size } from '@fc/components/types/BaseElementsType';
import BaseIcon from '@fc/components/baseIcon/BaseIcon.vue';
import type { IconParams } from '@fc/components/baseIcon/types';
import BaseLoading from '@fc/components/basePreloader/BaseLoader.vue';

type LoadingPosition = 'start' | 'end' | 'center';

type LoadingOptions = {
  position?: LoadingPosition;
  hideText?: boolean;
};

const props = withDefaults(
  defineProps<{
    size?: Size;
    variant?: ButtonVariant;
    color?: ButtonColor;
    tag?: ButtonTag;
    href?: string;
    disabled?: boolean;
    customStyles?: Record<string, string> | null;
    startIconParams?: IconParams | null;
    endIconParams?: IconParams | null;
    shape?: ButtonShape;
    loading?: boolean | LoadingOptions;
  }>(),
  {
    size: Size.Medium,
    variant: ButtonVariant.Solid,
    color: ButtonColor.Primary,
    tag: ButtonTag.Button,
    href: '',
    disabled: false,
    startIconParams: null,
    endIconParams: null,
    customStyles: null,
    shape: ButtonShape.Rectangle,
    loading: false,
  }
);

const variant = computed(() => props.variant);
const color = computed(() => props.color);
const tag = computed(() => props.tag);
const href = computed(() => props.href);
const startIconParams = computed(() => props.startIconParams);
const endIconParams = computed(() => props.endIconParams);

const iconsSize = computed(() => {
  switch (props.size) {
    case Size.Small:
      return '16px';
    case Size.Medium:
      return '20px';
    case Size.Large:
      return '24px';
    case Size.ExtraSmall:
      return '12px';
    default:
      return '24px';
  }
});

const loadingConfig = computed<LoadingOptions | null>(() => {
  if (!props.loading) {
    return null;
  }

  if (props.loading === true) {
    return { position: 'center', hideText: true };
  }

  return props.loading;
});

const loadingActive = computed(() => Boolean(loadingConfig.value));

const loadingPosition = computed<LoadingPosition>(() => {
  return loadingConfig.value?.position ?? 'center';
});

const loadingSize = computed(() => iconsSize.value);

const loadingColor = computed(() => 'currentColor');

const loadingHideText = computed(() => {
  if (!loadingConfig.value) return false;
  if (loadingPosition.value === 'center') return true;
  return loadingConfig.value.hideText ?? false;
});

function normalizeIconParams(params: IconParams): IconParams {
  params.size = iconsSize.value;
  params.fontSize = iconsSize.value;

  return params;
}
</script>

<style lang="scss">
@use "@fc/scss/settings" as *;
.button {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: rem(8px);
  height: rem(40px);
  padding: rem(10px);
  border-radius: var(--radius-button-40);
  border: 1px solid transparent;
  background: transparent;
  font-size: rem(14px);
  font-weight: 600;
  line-height: rem(20px);
  text-align: center;
  cursor: pointer;
  user-select: none;
  transition: 0.2s;
  text-decoration: none;

  &:disabled {
    cursor: auto;
    pointer-events: none;
  }

  &__text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__icon {
    flex: 0 0 auto;
  }

  &__loader {
    width: fit-content;
  }

  &__icon--colored {
    color: currentColor;
  }

  &.large {
    padding: rem(12px);
    font-size: rem(16px);
    font-style: normal;
    line-height: rem(24px);
    height: rem(48px);
    gap: rem(10px);
    border-radius: var(--radius-button-40);
  }

  &.medium {
    padding: rem(10px);
    font-size: rem(14px);
    font-style: normal;
    line-height: rem(20px);
    height: rem(40px);
    gap: rem(8px);
    border-radius: var(--radius-button-40);
  }

  &.small {
    padding: rem(8px);
    font-size: rem(14px);
    font-style: normal;
    line-height: rem(16px);
    gap: rem(6px);
    height: rem(32px);
    border-radius: var(--radius-button-32);
  }

  &.extra-small {
    padding: rem(4px);
    gap: rem(4px);
    font-size: rem(12px);
    line-height: rem(16px);
    height: rem(24px);
    border-radius: var(--radius-button-24);
  }

  &.rounded {
    border-radius: var(--full, 999999px);
    overflow: hidden;
  }
}

.button--solid {
  &.button--primary {
    background-color: var(--primary-default);
    color: var(--primary-fg);

    &:hover:not(:disabled) {
      background-color: var(--primary-hover);
    }

    &:active:not(:disabled) {
      background-color: var(--primary-active);
    }

    &.button--loading:disabled {
      background-color: var(--primary-active);
      color: var(--primary-fg);
    }
  }

  &.button--secondary {
    background-color: var(--secondary-default);
    color: var(--secondary-fg);

    &:hover:not(:disabled) {
      background-color: var(--secondary-hover);
    }

    &:active:not(:disabled) {
      background-color: var(--secondary-active);
    }

    &.button--loading:disabled {
      background-color: var(--secondary-active);
      color: var(--secondary-fg);
    }
  }

  &.button--tertiary {
    background-color: var(--tertiary-default);
    color: var(--tertiary-fg);

    &:hover:not(:disabled) {
      background-color: var(--tertiary-hover);
    }

    &:active:not(:disabled) {
      background-color: var(--tertiary-active);
    }

    &.button--loading:disabled {
      background-color: var(--tertiary-active);
      color: var(--tertiary-fg);
    }
  }

  &.button--error {
    background-color: var(--error-default);
    color: var(--error-fg);

    &:hover:not(:disabled) {
      background-color: var(--error-hover);
    }

    &:active:not(:disabled) {
      background-color: var(--error-active);
    }
  }

  &.button--white {
    background-color: var(--white-100);
    color: var(--black-80);

    &:hover:not(:disabled) {
      background-color: var(--black-5);
    }

    &:active:not(:disabled) {
      background-color: var(--black-10);
    }
  }
}

.button--outlined {
  background-color: transparent;

  &.button--primary {
    border-color: var(--primary-container);
    color: var(--primary-default);

    &:hover:not(:disabled) {
      background-color: var(--primary-hover);
      border-color: var(--primary-hover);
      color: var(--primary-fg);
    }

    &:active:not(:disabled) {
      background-color: var(--primary-active);
      border-color: var(--primary-active);
      color: var(--primary-fg);
    }
  }

  &.button--secondary {
    border-color: var(--border-divider);
    color: var(--secondary-default);

    &:hover:not(:disabled) {
      background-color: var(--secondary-default);
      border-color: var(--secondary-default);
      color: var(--secondary-fg);
    }

    &:active:not(:disabled) {
      background-color: var(--secondary-active);
      border-color: var(--secondary-active);
      color: var(--secondary-fg);
    }
  }

  &.button--tertiary {
    border-color: var(--tertiary-container);
    color: var(--tertiary-default);

    &:hover:not(:disabled) {
      background-color: var(--tertiary-hover);
      border-color: var(--tertiary-hover);
      color: var(--tertiary-fg);
    }

    &:active:not(:disabled) {
      background-color: var(--tertiary-active);
      border-color: var(--tertiary-active);
      color: var(--tertiary-fg);
    }
  }

  &.button--error {
    border-color: var(--error-container);
    color: var(--error-default);

    &:hover:not(:disabled) {
      background-color: var(--error-hover);
      border-color: var(--error-hover);
      color: var(--error-fg);
    }

    &:active:not(:disabled) {
      background-color: var(--error-active);
      border-color: var(--error-active);
      color: var(--error-fg);
    }
  }

  &.button--white {
    border-color: var(--white-20);
    color: var(--white-100);

    &:hover:not(:disabled) {
      background-color: var(--white-10);
      border-color: var(--white-10);
    }

    &:active:not(:disabled) {
      background-color: var(--white-20);
      border-color: var(--white-20);
    }
  }
}

.button--soft {
  background-color: transparent;

  &.button--primary {
    background-color: var(--primary-container);
    color: var(--primary-container-fg);

    &:hover:not(:disabled) {
      background-color: var(--primary-container-hover);
    }

    &:active:not(:disabled) {
      background-color: var(--primary-container);
    }
  }

  &.button--secondary {
    background-color: var(--secondary-container);
    color: var(--secondary-container-fg);

    &:hover:not(:disabled) {
      background: var(--secondary-container-hover, #e9eaeb);
      color: var(--secondary-hover, #40424a);
    }

    &:active:not(:disabled) {
      background-color: var(--secondary-container);
    }
  }

  &.button--tertiary {
    background-color: var(--tertiary-container);
    color: var(--tertiary-container-fg);

    &:hover:not(:disabled) {
      background-color: var(--tertiary-container-hover);
      color: var(--tertiary-hover);
    }

    &:active:not(:disabled) {
      background-color: var(--tertiary-container);
    }
  }

  &.button--error {
    background-color: var(--error-container);
    color: var(--error-container-fg);

    &:hover:not(:disabled) {
      background-color: var(--error-container);
      color: var(--error-hover);
    }

    &:active:not(:disabled) {
      background-color: var(--error-container);
    }
  }

  &.button--white {
    background-color: var(--white-10);
    color: var(--white-100);

    &:hover:not(:disabled) {
      background-color: var(--white-20);
    }

    &:active:not(:disabled) {
      background-color: var(--white-10);
    }
  }
}

.button--ghost {
  background-color: transparent;

  &.button--primary {
    color: var(--primary-default);

    &:hover:not(:disabled) {
      background-color: var(--primary-container);
    }

    &:active:not(:disabled) {
      background-color: var(--primary-container-hover);
    }
  }

  &.button--secondary {
    color: var(--secondary-default);

    &:hover:not(:disabled) {
      background-color: var(--bg-level);
      color: var(--secondary-hover);
    }

    &:active:not(:disabled) {
      background-color: var(--border-divider);
    }
  }

  &.button--tertiary {
    color: var(--tertiary-default);

    &:hover:not(:disabled) {
      background: var(--tertiary-container-hover);
      color: var(--tertiary-hover);
    }

    &:active:not(:disabled) {
      background-color: var(--tertiary-container-hover);
      color: var(--tertiary-active);
    }
  }

  &.button--error {
    color: var(--error-default);

    &:hover:not(:disabled) {
      background-color: var(--error-container);
      color: var(--error-hover);
    }

    &:active:not(:disabled) {
      background-color: var(--error-container);
      color: var(--error-active);
    }
  }

  &.button--white {
    color: var(--white-100);

    &:hover:not(:disabled) {
      background-color: var(--white-10);
    }

    &:active:not(:disabled) {
      background-color: var(--white-20);
    }
  }
}

.button:disabled {
  background-color: var(--disable-surface);
  color: var(--disable-fg);
  border-color: transparent;
}
</style>
