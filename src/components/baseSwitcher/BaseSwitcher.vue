<template>
  <div class="switcher-container">
    <label :class="['switcher', size]" :for="id">
      <input
        :id="id"
        class="switcher-input"
        :class="['switcher-input', { 'switcher-input--error': errors.length }]"
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        @change="handleChange"
      />
      <span class="slider round"></span>
      <span class="switcher-label">{{ label }}</span>
    </label>

    <div v-if="errors.length" class="errors">
      <span v-for="error in errors" :key="error" class="text-error">
        {{ error }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Size } from '@/components/types/BaseElementsType';

interface Props {
  label?: string;
  id?: string;
  name?: string;
  size?: Size;
  disabled?: boolean;
  modelValue: boolean;
  errors?: string[];
}
withDefaults(defineProps<Props>(), {
  label: '',
  id: '',
  name: '',
  size: Size.Medium,
  disabled: false,
  errors: () => [],
});

const model = defineModel({ required: true, type: Boolean });

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement;
  model.value = target.checked;
}
</script>

<style lang="scss">
@use "@/scss/settings" as *;
.switcher-container {
  .switcher {
    display: inline-flex;
    align-items: center;
    gap: rem(8px);
    cursor: pointer;
    position: relative;
    user-select: none;

    &-input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      margin: 0;
      cursor: pointer;
      z-index: 2;
    }

    .switcher-input--error + .slider {
      border-color: var(--error-default);
    }

    .slider {
      position: relative;
      display: inline-block;
      width: rem(32px);
      height: rem(18px);
      background-color: var(--bg-surface);
      border: rem(1px) solid var(--border-outline);
      border-radius: rem(34px);
      box-sizing: border-box;
      transition:
        background-color 0.25s ease,
        border-color 0.25s ease;

      &::before {
        position: absolute;
        content: '';
        height: rem(14px);
        width: rem(14px);
        left: rem(1px);
        bottom: rem(1px);
        background-color: var(--tertiary-default);
        border-radius: 50%;
        transition:
          transform 0.25s ease,
          background-color 0.25s ease;
      }
    }

    input:checked + .slider {
      background-color: var(--tertiary-default);
      border-color: var(--tertiary-default);
    }

    input:checked + .slider::before {
      background-color: var(--white-100);
      transform: translateX(rem(14px));
    }

    &:hover {
      input:checked:not(:disabled) + .slider {
        background-color: var(--tertiary-hover);
        border-color: var(--tertiary-hover);
      }
    }

    &:hover .slider {
      border-color: var(--tertiary-hover);
      &:before {
        background-color: var(--tertiary-hover);
      }
    }

    &-label {
      font-size: rem(14px);
      color: var(--fg-default);
    }

    input:disabled + .slider {
      border-color: transparent;
      background-color: var(--disable-surface);
    }

    input:disabled + .slider::before {
      background-color: var(--disable-fg);
    }

    input:disabled:is(:checked) + .slider {
      background-color: var(--tertiary-container);
      &:before {
        background-color: var(--tertiary-container-fg);
      }
    }

    &.small .slider {
      width: rem(28px);
      height: rem(16px);
    }

    &.small .slider::before {
      height: rem(12px);
      width: rem(12px);
      left: rem(1px);
      bottom: rem(1px);
    }

    &.small input:checked + .slider::before {
      transform: translateX(rem(12px));
    }

    &.medium .slider {
      width: rem(36px);
      height: rem(20px);
    }

    &.medium .slider::before {
      height: rem(16px);
      width: rem(16px);
      left: rem(1px);
      bottom: rem(1px);
    }

    &.medium input:checked + .slider::before {
      transform: translateX(rem(16px));
    }

    &.large .slider {
      width: rem(44px);
      height: rem(24px);
    }

    &.large .slider::before {
      height: rem(20px);
      width: rem(20px);
      left: rem(1px);
      bottom: rem(1px);
    }

    &.large input:checked + .slider::before {
      transform: translateX(rem(20px));
    }
  }
}
</style>
