<template>
  <div v-if="normalizedTabs.length" :class="['tabs-buttons', variant, theme]">
    <TabButton
      v-for="tab in normalizedTabs"
      :key="tab.id"
      :tab="tab"
      :active="tab.id === modelValue"
      :variant="variant"
      :theme="theme"
      @click="setActive(tab.id)"
    >
      <template v-if="slots.tab" #default="slotProps">
        <slot name="tab" v-bind="slotProps" />
      </template>
    </TabButton>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue';
import type { TabButtonItem } from '@/components/tabs/types';
import { TabsVariant, TabsTheme } from '@/components/tabs/types';
import { useTabs } from '@/components/tabs/useTabs';
import TabButton from '@/components/tabs/tabsButtons/TabButton.vue';

const props = withDefaults(
  defineProps<{
    tabs: TabButtonItem[];
    modelValue: string | number;
    variant?: TabsVariant;
    theme?: TabsTheme;
  }>(),
  {
    variant: TabsVariant.Tab,
    theme: TabsTheme.Default,
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
  (e: 'change', tab: TabButtonItem): void;
}>();

const slots = useSlots();

const { normalizedTabs, setActive } = useTabs({
  tabs: () => props.tabs,
  modelValue: () => props.modelValue,
  emit,
});
</script>

<style lang="scss" scoped>
@use "@/scss/settings" as *;
.tabs-buttons {
  display: flex;
  align-items: center;
  gap: rem(8px);

  &.segmented {
    border-radius: var(--radius-button-40);
    background: var(--bg-surface);
    gap: rem(2px);
    padding: rem(2px);
    width: fit-content;
    &.dark {
      background: var(--bg-level-accent);
    }
    &.white {
      background: var(--bg-page);
    }
  }
  &.line {
    gap: rem(12px);
    border-bottom: 1px solid var(--border-divider, rgba(0, 0, 0, 0.1));
  }
}
</style>
