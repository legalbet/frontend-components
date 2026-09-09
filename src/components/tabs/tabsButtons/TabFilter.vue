<template>
  <TabButton :tab="tab" :theme="theme" :active="isActive" :class="['tab-buttons__tab--filter']">
    <template #content>
      <BaseCounter v-if="filterCount !== null" :size="Size.Small" :color="Color.Primary">{{ filterCount }}</BaseCounter>
    </template>
  </TabButton>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Color, Size } from '@fc/components/types/BaseElementsType';
import BaseCounter from '../../counter/BaseCounter.vue';
import TabButton from './TabButton.vue';
import type { TabButtonItem } from '@fc/components/tabs/types';
import { TabsTheme } from '@fc/components/tabs/types';

const props = withDefaults(
  defineProps<{
    tab: TabButtonItem;
    isActive: boolean;
    filterCount?: number | null;
    theme?: TabsTheme;
  }>(),
  {
    theme: TabsTheme.Default,
    filterCount: null,
  }
);

const filterCount = computed(() => props.filterCount);
</script>

<style lang="scss" scoped>
.tab-buttons__tab--filter {
  position: relative;
  .base-counter {
    position: absolute;
    right: -2px;
    top: -2px;
  }
}
</style>
