<template>
  <TabsButtons
    class="base-tabs"
    :class="{
      'base-tabs--neutral-color': color === Color.Neutral,
    }"
    :tabs="tabs"
    :modelValue="modelValue"
    :variant="TabsVariant.Line"
    :theme="theme"
    @update:modelValue="emit('update:modelValue', $event)"
    @change="(tab) => emit('change', tab)"
  >
    <template #tab="{ tab, active }">
      <slot name="tab" :tab="tab" :active="active">
        <BaseIcon
          v-if="tab.startIconName"
          :iconName="tab.startIconName"
          size="16px"
          fontSize="16px"
          textColor="var(--tab-icon-color)"
        />
        <span class="base-tabs__tab-text">{{ tab.text }}</span>
        <span v-if="tab.counter" class="base-tabs__tab-counter">{{ tab.counter }}</span>
      </slot>
    </template>
  </TabsButtons>
</template>

<script setup lang="ts">
import type { TabItem } from '@/components/tabs/types';
import { TabsVariant, TabsTheme } from '@/components/tabs/types';
import BaseIcon from '@/components/baseIcon/BaseIcon.vue';
import TabsButtons from '@/components/tabs/tabsButtons/TabsButtons.vue';
import { Color } from '@/components/types/BaseElementsType';

withDefaults(
  defineProps<{
    tabs: TabItem[];
    modelValue: string | number;
    theme?: TabsTheme;
    color?: Color;
  }>(),
  {
    theme: TabsTheme.Default,
    color: Color.Secondary,
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
  (e: 'change', tab: TabItem): void;
}>();
</script>

<style lang="scss" scoped>
.base-tabs__tab-counter {
  color: var(--fg-muted);
}

.base-tabs--neutral-color {
  :deep(.tab) {
    color: var(--fg-default);
    --tab-icon-color: var(--fg-default);

    &:hover {
      color: var(--primary-hover);
      --tab-icon-color: var(--primary-hover);
    }

    &.active {
      color: var(--secondary-default);
    }

    &.dark {
      color: var(--fg-default-on-accent);
      --tab-icon-color: var(--fg-default-on-accent);

      .base-tabs__tab-counter {
        color: var(--fg-default-on-accent);
      }

      &.active {
        color: var(--fg-default-on-accent);
      }
    }
  }
}
</style>
