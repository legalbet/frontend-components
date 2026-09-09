<template>
  <BaseDropdown class="sort-selector" data-test="sort-selector" position="bottom" height="auto">
    <template #active>
      <BaseButton
        data-test="sort-selector-trigger"
        :color="ButtonColor.White"
        :startIconParams="{ iconName: IconNames.ArrowDownUp }"
        :size="$device.isMobile ? Size.Small : Size.Medium"
      >
        <span data-test="sort-selector-label">{{ selectedOption?.text }}</span>
      </BaseButton>
    </template>
    <template #items>
      <BaseDropdownItem
        v-for="option in options"
        :key="option.id"
        :data-test="`sort-selector-option-${option.id || 'default'}`"
        :label="option.text"
        :active="selectedOption?.id === option.id"
        @click="setSelectedOption(option)"
      />
    </template>
  </BaseDropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseButton from '@/components/baseButton/BaseButton.vue';
import BaseDropdown from '@/components/dropdown/BaseDropdown.vue';
import BaseDropdownItem from '@/components/dropdown/BaseDropdownItem.vue';
import { ButtonColor } from '@/components/baseButton/types';
import { IconNames } from '@/components/baseIcon/iconNames';
import type { SortOption } from '@/sorting/types';
import { Size } from '@/components/types/BaseElementsType';

const props = defineProps<{
  modelValue?: string;
  options: SortOption[];
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string | undefined];
}>();

const selectedOption = computed(
  () => props.options.find((option) => option.id === (props.modelValue ?? '')) ?? props.options[0]
);

function setSelectedOption(option: SortOption) {
  emit('update:modelValue', option.id || undefined);
}
</script>

<style lang="scss" scoped>
@use "@/scss/settings" as *;
.sort-selector {
  &__dropdown {
    padding: rem(8px) 0;
  }
}
</style>
