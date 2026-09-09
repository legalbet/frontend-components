<template>
  <NuxtLink
    v-if="urlParams?.url"
    :rel="rel"
    :class="[
      'base-link',
      `base-link--${color}`,
      size,
      { 'base-link--underline': isUnderline },
      { 'base-link--centered': centered },
      { 'base-link--disabled': disabled },
    ]"
    :to="urlParams.url"
    :external="urlParams.external"
    :style="{ ...customStyles }"
    :title="title"
    :target="target"
    :noPrefetch="noPrefetch"
    :prefetchOn="prefetchOn"
  >
    <!-- no-prefetch -->

    <span v-if="startIcon" :class="[`icon icon-${startIcon}`]"></span>
    <slot></slot>
    <span v-if="endIcon" :class="[`icon icon-${endIcon}`]"></span>
  </NuxtLink>
</template>

<script setup lang="ts">
import { LinkColor, Size } from '@/components/types/BaseElementsType';

withDefaults(
  defineProps<{
    color?: LinkColor;
    size?: Size;
    endIcon?: string;
    startIcon?: string;
    disabled?: boolean;
    customStyles?: Record<string, string> | null;
    urlParams: { url: string; external: boolean };
    rel?: string;
    target?: string;
    isUnderline?: boolean;
    title?: string;
    centered?: boolean;
    noPrefetch?: boolean;
    prefetchOn?: 'visibility' | 'interaction';
  }>(),
  {
    endIcon: '',
    startIcon: '',
    size: Size.Medium,
    disabled: false,
    customStyles: null,
    color: LinkColor.Accent,
    rel: '',
    target: '',
    isUnderline: false,
    title: '',
    centered: false,
    noPrefetch: true,
    prefetchOn: 'interaction',
  }
);
</script>

<style lang="scss">
@use "@/scss/settings" as *;
.base-link {
  display: flex;
  align-items: center;
  gap: rem(4px);
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;

  &--accent {
    color: var(--fg-linked);
  }

  &--default {
    color: var(--fg-default);
  }

  &--invert {
    color: var(--fg-default-on-accent);
    &:hover {
      color: var(--fg-hover);
    }
    &--disabled {
      color: var(--bg-surface-accent);
      pointer-events: none;
      cursor: none;
    }
  }

  &--underline {
    border-bottom: 1px solid;
    width: fit-content;
  }

  &:hover {
    color: var(--fg-hover);
    .inner-link {
      color: var(--fg-hover) !important;
    }
  }

  &.extra-small {
    font-size: rem(12px);
    line-height: rem(16px);
  }
  &.small {
    font-size: rem(14px);
    line-height: rem(20px);
  }

  &.medium {
    font-size: rem(16px);
    line-height: rem(24px);
  }
  &.large {
    font-size: rem(18px);
    line-height: rem(24px);
  }
  &--centered {
    width: 100%;
    justify-content: center;
  }
  &--disabled {
    color: var(--disable-fg);
    pointer-events: none;
    cursor: none;
  }
}
</style>
