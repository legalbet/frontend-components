<template>
  <BaseDropdown class="sort-selector" data-test="sort-selector" position="bottom" height="auto">
    <template #active>
      <BaseButton
        data-test="sort-selector-trigger"
        :color="ButtonColor.White"
        :startIconParams="{ iconName: IconNames.ArrowDownUp }"
        :size="isMobile ? Size.Small : Size.Medium"
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
import BaseButton from '@fc/components/baseButton/BaseButton.vue';
import BaseDropdown from '@fc/components/dropdown/BaseDropdown.vue';
import BaseDropdownItem from '@fc/components/dropdown/BaseDropdownItem.vue';
import { ButtonColor } from '@fc/components/baseButton/types';
import { IconNames } from '@fc/components/baseIcon/iconNames';
import type { SortOption } from '@fc/sorting/types';
import { Size } from '@fc/components/types/BaseElementsType';
import { useDevice } from '@fc/composables/useNuxtShims';

const { isMobile } = useDevice();

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
@use '@fc/scss/settings' as *;
.sort-selector {
  &__dropdown {
    padding: rem(8px) 0;
  }
}
</style>
