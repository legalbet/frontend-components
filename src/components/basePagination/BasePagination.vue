<script setup lang="ts">
import { computed } from 'vue';
import BaseButton from '@/components/baseButton/BaseButton.vue';
import { ButtonColor, ButtonShape, ButtonVariant } from '@/components/baseButton/types';
import { Size } from '@/components/types/BaseElementsType';
import { IconNames } from '@/components/baseIcon/iconNames';
type PaginationItem = number | 'ellipsis';

const props = withDefaults(
  defineProps<{
    modelValue: number;
    pages: number;
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>();

const currentPage = computed(() => {
  const normalizedPages = Math.max(0, Math.floor(props.pages));
  if (normalizedPages <= 0) return 0;

  const normalizedCurrent = Math.floor(props.modelValue);
  return Math.min(Math.max(normalizedCurrent, 1), normalizedPages);
});

const items = computed<PaginationItem[]>(() => {
  const total = Math.max(0, Math.floor(props.pages));
  if (total <= 0) return [];
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const current = currentPage.value;

  if (current <= 4) {
    return [1, 2, 3, 4, 5, 'ellipsis', total];
  }

  if (current >= total - 3) {
    return [1, 'ellipsis', total - 4, total - 3, total - 2, total - 1, total];
  }

  return [1, 'ellipsis', current - 1, current, current + 1, 'ellipsis', total];
});

function setPage(page: number) {
  if (props.disabled) return;

  const total = Math.max(0, Math.floor(props.pages));
  if (total <= 0) return;

  const next = Math.min(Math.max(Math.floor(page), 1), total);
  if (next === currentPage.value) return;

  emit('update:modelValue', next);
}
</script>

<template>
  <div class="base-pagination">
    <BaseButton
      :startIconParams="{ iconName: IconNames.Left }"
      :shape="ButtonShape.Rounded"
      :size="Size.Small"
      :variant="ButtonVariant.Soft"
      :color="ButtonColor.Secondary"
      :disabled="currentPage === 1"
      @click="setPage(currentPage - 1)"
    />
    <nav v-if="items.length" class="base-pagination__nav" aria-label="Pagination">
      <button
        v-for="(item, idx) in items"
        :key="`${item}-${idx}`"
        class="base-pagination__item"
        :class="{
          'base-pagination__item--active': item === currentPage,
          'base-pagination__item--ellipsis': item === 'ellipsis',
          'text-t14-semi': true,
        }"
        type="button"
        :disabled="disabled || item === 'ellipsis'"
        @click="typeof item === 'number' ? setPage(item) : undefined"
      >
        {{ item === 'ellipsis' ? '…' : item }}
      </button>
    </nav>
    <BaseButton
      :startIconParams="{ iconName: IconNames.Right }"
      :shape="ButtonShape.Rounded"
      :size="Size.Small"
      :variant="ButtonVariant.Soft"
      :color="ButtonColor.Secondary"
      :disabled="currentPage === pages"
      @click="setPage(currentPage + 1)"
    />
  </div>
</template>

<style lang="scss">
@use "@/scss/settings" as *;
.base-pagination {
  display: inline-flex;
  align-items: center;
  gap: rem(24px);
  width: 100%;
  &__nav {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.base-pagination__item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: rem(32px);
  height: rem(32px);
  padding: 0 rem(8px);
  border: 1px solid var(--color-neutral-border, var(--color-neutral-default));
  border-radius: rem(8px);
  background: transparent;
  color: var(--fg-linked);
  cursor: pointer;
  &:hover {
    color: var(--fg-hover);
  }
}

.base-pagination__item:disabled {
  opacity: 0.6;
  cursor: default;
}

.base-pagination__item--active {
  background: var(--color-neutral-default);
  color: var(--fg-default) !important;
}

.base-pagination__item--ellipsis {
  border-color: transparent;
}
</style>
