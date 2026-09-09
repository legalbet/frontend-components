<template>
  <div class="filter-checkbox-item" :class="{ 'is-disabled': filter.disabled }">
    <BaseCheckbox
      :id="filter.systemName"
      :data-testid="`filter-${filter.id}-${filter.systemName}`"
      :modelValue="filter.checked"
      :disabled="filter.disabled"
      size="small"
      checkboxClass="filter-checkbox-item__checkbox"
      labelClass="filter-checkbox-item__label"
      @update:model-value="(val) => emitToggle(filter.id, val)"
    >
      <template #label>
        <span class="filter-checkbox-item__label">
          <NuxtImg
            v-if="filter.img"
            class="filter-checkbox-item__img"
            :src="asset(filter.img)"
            :alt="filter.name"
            width="16"
            height="16"
          />
          {{ filter.name }}
        </span>
      </template>
    </BaseCheckbox>

    <span class="filter-checkbox-item__count">
      {{ filter.count }}
    </span>
  </div>
</template>

<script setup lang="ts">
import asset from '@/utils/asset';
import BaseCheckbox from '@/components/baseCheckbox/BaseCheckbox.vue';
import type { UiFilterItem } from '@/filter/types';

defineProps<{
  filter: UiFilterItem;
}>();

const emit = defineEmits<{
  (e: 'toggle', payload: { id: number; checked: boolean }): void;
}>();

function emitToggle(id: number, checked: boolean) {
  emit('toggle', { id, checked });
}
</script>

<style scoped lang="scss">
@use "@/scss/settings" as *;
.filter-checkbox-item {
  display: flex;
  align-items: center;
  gap: rem(8px);

  :deep() {
    .checkbox-wrapper {
      flex-grow: 1;
    }
    .checkbox-container {
      gap: rem(8px);
    }
  }

  &__label {
    display: flex;
    align-items: center;
    gap: rem(8px);
    font-size: rem(14px);
    line-height: rem(16px);
    color: var(--fg-default);
  }

  &__img {
    border-radius: var(--radius-button-24);
  }

  &__count {
    color: var(--fg-soft);
  }

  &.is-disabled {
    pointer-events: none;
    .filter-checkbox-item__count,
    .filter-checkbox-item__label {
      color: var(--disable-fg);
    }
  }
}
</style>
