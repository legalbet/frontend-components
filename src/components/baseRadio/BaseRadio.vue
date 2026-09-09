<template>
  <div>
    <div class="radio-container">
      <input
        :id="id"
        :class="[radioClass, 'input-radio', `input-radio--${size}`, { 'input-radio--error': errors.length }]"
        type="radio"
        :checked="modelValue"
        :disabled="disabled"
        :value="modelValue"
        @change="handleChange"
        @blur="onBlur"
        @focus="onFocus"
      />
      <label v-if="labelHtml" :for="id" :class="[labelClass, 'radio-label']" v-html="labelHtml" />
    </div>

    <div v-if="errors.length" class="errors">
      <span v-for="error in errors" :key="error" class="text-error">
        {{ error }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Size } from '@/components/types/BaseElementsType';

withDefaults(
  defineProps<{
    id: string;
    onBlur?: () => void;
    onFocus?: () => void;
    radioClass?: string;
    labelHtml?: string;
    labelClass?: string;
    errors?: string[];
    disabled?: boolean;
    size?: Size;
  }>(),
  {
    onBlur: () => null,
    onFocus: () => null,
    errors: () => [],
    radioClass: '',
    labelHtml: '',
    labelClass: '',
    disabled: false,
    size: Size.Small,
  }
);

const model = defineModel({ required: true, type: Boolean });

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement;
  model.value = target.checked;
}
</script>

<style lang="scss">
@use "@/scss/settings" as *;
.radio-container {
  display: flex;
  gap: rem(8px);
  align-items: center;
  cursor: pointer;
}

.input-radio {
  appearance: none;
  position: relative;
  cursor: pointer;
  margin: 0;
  border: rem(1px) solid var(--border-outline);
  border-radius: 50%;
  background-color: var(--bg-surface);
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &--error {
    border-color: var(--error-default);
  }

  &:hover {
    border-color: var(--tertiary-hover);
  }

  &:checked {
    border-color: var(--tertiary-default);
    background-color: var(--tertiary-default);
  }

  &:checked {
    &:after {
      content: '';
      display: block;
      border-radius: 50%;
      background-color: var(--tertiary-fg);
      transition: all 0.2s ease;
    }
  }

  &:disabled {
    background-color: var(--disable-surface);
    border-color: var(--border-outline);
    &:after {
      background-color: var(--disable-fg);
    }
  }

  &--large {
    min-width: rem(24px);
    height: rem(24px);

    &::after {
      min-width: rem(12px);
      height: rem(12px);
    }
  }

  &--medium {
    min-width: rem(20px);
    height: rem(20px);

    &::after {
      width: rem(10px);
      height: rem(10px);
    }
  }

  &--small {
    min-width: rem(16px);
    height: rem(16px);

    &::after {
      width: rem(8px);
      height: rem(8px);
    }
  }
}

.checkbox-label,
.radio-label {
  cursor: pointer;
}
</style>
