<template>
  <div class="checkbox-wrapper">
    <div class="checkbox-container">
      <input
        :id="id"
        :class="[
          checkboxClass,
          'input-checkbox',
          `input-checkbox--${size}`,
          { 'input-checkbox--error': errors.length },
          { 'icon icon-check': modelValue },
        ]"
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        @change="handleChange"
        @blur="onBlur"
        @focus="onFocus"
      />
      <label v-if="hasLabel" :for="id" :class="[labelClass, 'checkbox-label']">
        <slot name="label"></slot>
        <span v-if="labelHtml" v-html="labelHtml"></span>
      </label>
    </div>

    <div v-if="errors.length" class="errors">
      <span v-for="error in errors" :key="error" class="text-error">
        {{ error }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed useSlots } from 'vue';
type CheckboxSize = 'large' | 'medium' | 'small';

const props = withDefaults(
  defineProps<{
    onBlur?: () => void;
    onFocus?: () => void;
    checkboxClass?: string;
    labelHtml?: string;
    labelClass?: string;
    id: string;
    errors?: string[];
    disabled?: boolean;
    size?: CheckboxSize;
  }>(),
  {
    onBlur: () => null,
    errors: () => [],
    onFocus: () => null,
    checkboxClass: '',
    labelHtml: '',
    labelClass: '',
    disabled: false,
    size: 'small',
  }
);

const model = defineModel({ required: true, type: Boolean });

const hasLabel = computed(() => !!(props.labelHtml || useSlots().label));

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement;
  model.value = target.checked;
}
</script>

<style lang="scss">
@use "@/scss/settings" as *;
.checkbox-container {
  display: flex;
  gap: rem(8px);
  align-items: flex-start;
  cursor: pointer;
}

.input-checkbox {
  appearance: none;
  position: relative;
  cursor: pointer;
  margin: 0;
  border: rem(1px) solid var(--border-outline);
  border-radius: var(--radius-badge);
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  color: var(--tertiary-fg);
  background-color: var(--white-100);

  &--error {
    border-color: var(--error-default);
  }

  &:hover {
    border-color: var(--tertiary-hover);
  }

  &:checked {
    background-color: var(--tertiary-default);
    border-color: var(--tertiary-default);
    color: var(--tertiary-fg);
  }

  &:disabled {
    background-color: var(--disable-surface);
    border-color: var(--border-outline);
    color: var(--disable-fg);
  }

  &--large {
    min-width: rem(24px);
    min-height: rem(24px);
    font-size: rem(16px);
  }

  &--medium {
    min-width: rem(20px);
    min-height: rem(20px);
    font-size: rem(16px);
  }

  &--small {
    min-width: rem(16px);
    min-height: rem(16px);
    font-size: rem(12px);
  }

  &.icon.icon-check {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.checkbox-label {
  cursor: pointer;
  font-size: rem(14px);
  font-weight: 400;
  line-height: rem(16px);
}
</style>
