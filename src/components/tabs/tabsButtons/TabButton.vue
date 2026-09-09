<template>
  <component
    :is="tab.href ? 'a' : 'div'"
    v-goal="{ goalName: tab.goal?.goalName, events: [WebEvent.Click] }"
    :href="tab.href ?? undefined"
    :class="[
      'tab',
      `tab--${props.variant}`,
      `tab--${props.theme}`,
      {
        'tab--active': props.active,
        'tab--disabled': props.tab.disabled,
      },
    ]"
    @click="onClick"
  >
    <slot :tab="props.tab" :active="props.active">
      <BaseIcon
        v-if="props.tab.startIconName"
        :iconName="props.tab.startIconName"
        size="var(--tab-icon-size)"
        fontSize="var(--tab-icon-size)"
        textColor="var(--tab-icon-color)"
      />
      <NuxtImg
        v-if="tab.startImgParams"
        width="24"
        height="24"
        class="tab__img"
        :src="tab.startImgParams.src"
        :alt="tab.startImgParams.alt"
      />

      <div v-if="tab.text" class="tab__text">{{ tab.text }}</div>

      <BaseIcon
        v-if="tab.endIconName"
        :iconName="tab.endIconName"
        size="var(--tab-icon-size)"
        fontSize="var(--tab-icon-size)"
        textColor="var(--tab-icon-color)"
      />
      <NuxtImg
        v-if="tab.endImgParams"
        width="24"
        height="24"
        class="tab__img"
        :src="tab.endImgParams.src"
        :alt="tab.endImgParams.alt"
      />
    </slot>
    <slot name="content" />
  </component>
</template>

<script setup lang="ts">
import type { TabButtonItem } from '@fc/components/tabs/types';
import { TabsVariant, TabsTheme } from '@fc/components/tabs/types';
import { WebEvent } from '@fc/types/WebEvent';
import BaseIcon from '@fc/components/baseIcon/BaseIcon.vue';

const props = withDefaults(
  defineProps<{
    tab: TabButtonItem;
    active?: boolean;
    variant?: TabsVariant;
    theme?: TabsTheme;
  }>(),
  {
    active: false,
    variant: TabsVariant.Tab,
    theme: TabsTheme.Default,
  }
);

const emit = defineEmits<{
  (e: 'click', tab: TabButtonItem): void;
}>();

function onClick() {
  if (props.tab.disabled) return;
  emit('click', props.tab);
}
</script>

<style lang="scss" scoped>
@use "@fc/scss/settings" as *;
.tab {
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all ease-in-out 150ms;
  --tab-icon-size: 20px;

  &.tab--default {
    padding: rem(10px) rem(12px);
    height: rem(40px);
    gap: rem(8px);
    color: var(--fg-default);
    border-radius: var(--radius-button-40);
    background: var(--bg-level);

    @media #{$md_max} {
      height: rem(32px);
      padding: rem(6px) rem(8px);
      --tab-icon-size: 24px;
    }

    &:hover {
      color: var(--fg-soft);
      --tab-icon-color: var(--fg-soft);
    }

    &.tab--active {
      color: var(--fg-default-on-accent);
      background: var(--bg-surface-accent);
      --tab-icon-color: var(--fg-default-on-accent);

      &:hover {
        color: var(--fg-default-on-accent);
        --tab-icon-color: var(--fg-default-on-accent);
      }
    }

    &.tab--disabled {
      cursor: not-allowed;
    }
    &.tab--dark {
      background: var(--bg-level-accent);
      color: var(--fg-default-on-accent);
      --tab-icon-color: var(--fg-default-on-accent);

      &:hover {
        color: var(--fg-soft-on-accent);
        --tab-icon-color: var(--fg-soft-on-accent);
      }

      &.tab--active {
        background: var(--bg-surface);
        color: var(--fg-default);
        --tab-icon-color: var(--fg-default);

        &:hover {
          color: var(--fg-default);
          --tab-icon-color: var(--fg-default);
        }
      }
    }
  }

  &.tab--segmented {
    background: none;
    color: var(--fg-muted);
    --tab-icon-color: var(--fg-muted);
    padding: rem(10px) rem(12px);
    gap: rem(8px);
    border-radius: rem(8px);
    height: rem(40px);

    &:hover {
      background: var(--bg-level);
      color: var(--fg-default);
      --tab-icon-color: var(--fg-default);
    }

    &.tab--active {
      background: var(--secondary-default);
      color: var(--secondary-fg);
      --tab-icon-color: var(--secondary-fg);
    }

    &.tab--dark {
      background: none;
      color: var(--fg-muted-on-accent);
      --tab-icon-color: var(--fg-muted-on-accent);

      &:hover {
        color: var(--fg-default-on-accent);
        background: var(--bg-level-accent);
        --tab-icon-color: var(--fg-default-on-accent);
      }

      &.tab--active {
        background: var(--secondary-fg);
        color: var(--secondary-container-fg);
        --tab-icon-color: var(--secondary-container-fg);
      }
    }
  }

  &.tab--line {
    background: none;
    border-radius: 0;
    padding: rem(6px) 0 rem(12px);
    border-bottom: 2px solid transparent;
    color: var(--fg-linked);
    --tab-icon-color: var(--fg-linked);
    margin-bottom: -1.5px;

    &:hover {
      color: var(--primary-hover);
      --tab-icon-color: var(--primary-hover);
    }

    &.tab--active {
      background: none;
      color: var(--secondary-default);
      border-bottom-color: var(--secondary-default);
      --tab-icon-color: var(--secondary-default);

      &:hover {
        color: var(--secondary-default);
        --tab-icon-color: var(--secondary-default);
      }
    }

    &.tab--dark {
      color: var(--fg-default-on-accent);
      --tab-icon-color: var(--fg-default-on-accent);

      &:hover {
        color: var(--primary-hover);
        --tab-icon-color: var(--primary-hover);
      }

      &.tab--active {
        border-bottom-color: var(--fg-default-on-accent);
        color: var(--fg-default-on-accent);
        --tab-icon-color: var(--fg-default-on-accent);

        &:hover {
          color: var(--fg-default-on-accent);
          --tab-icon-color: var(--fg-default-on-accent);
        }
      }
    }
  }

  .tab__text {
    font-size: rem(14px);
    font-weight: 500;
    line-height: rem(16px);
  }

  .tab__img {
    width: rem(20px);
    height: rem(20px);
    border-radius: var(--radius-button-24);

    @media #{$md_max} {
      width: rem(24px);
      height: rem(24px);
    }
  }
}
</style>
