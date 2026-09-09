<template>
  <div
    :class="[
      'input-box',
      `input-box--${inputSizeType}`,
      {
        'input-box--error': errors.length,
        'input-box--no-label': !!label,
      },
      {
        'input-box--full-width': fullWidth,
      },
    ]"
  >
    <label v-if="label" class="input-box__label" :for="id">
      <span class="input-box__label-text"> {{ label }}</span>
      <span v-if="labelDescription" class="text-t14 color-muted input-box__label-description">{{
        labelDescription
      }}</span>
    </label>
    <div class="input-box__field">
      <input
        :id="id"
        :class="['input-box__input', classInput]"
        placeholder=" "
        :type="type == InputType.Password && showPassword ? InputType.Text : type"
        :name="name"
        :value="modelValue"
        :disabled="disabled"
        :maxlength="maxlength ?? undefined"
        :inputmode="inputmode ?? undefined"
        :aria-label="ariaLabel || undefined"
        @input="handleChange"
        @blur="onBlur"
        @focus="onFocus"
      />
      <div v-if="placeholder" class="input-box__placeholder">
        {{ placeholder }}
      </div>
      <slot name="endIcon">
        <div v-if="type === InputType.Password" class="icon-end__wrapper">
          <BaseIcon
            :icon-name="showPassword ? IconNames.Eye : IconNames.Eyeinvisible"
            textColor="var(--input-text-default)"
            font-size="20px"
            size="20px"
            @click="showPassword = !showPassword"
          />
        </div>
      </slot>
    </div>

    <div v-if="errors?.length" class="input-box__errors">
      <span v-for="error in errors" :key="error" class="input-box__error">
        {{ error }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IconNames } from '@fc/components/baseIcon/iconNames';
import BaseIcon from '@fc/components/baseIcon/BaseIcon.vue';
import { InputSizeType, InputType } from '@fc/components/baseInput/types';

withDefaults(
  defineProps<{
    label?: string;
    placeholder?: string;
    onBlur?: () => void;
    onFocus?: () => void;
    errors?: string[];
    type?: string;
    id?: string;
    name?: string;
    classInput?: string;
    inputSizeType?: InputSizeType;
    disabled?: boolean;
    fullWidth?: boolean;
    labelDescription?: string | null;
    maxlength?: number | null;
    inputmode?: 'text' | 'numeric' | 'decimal' | 'tel' | 'email' | 'url' | 'search' | null;
    ariaLabel?: string;
  }>(),
  {
    label: '',
    placeholder: '',
    errors: () => [],
    onBlur: () => null,
    onFocus: () => null,
    type: 'text',
    id: '',
    name: '',
    modelValue: '',
    classInput: '',
    inputSizeType: InputSizeType.Base,
    disabled: false,
    fullWidth: false,
    labelDescription: null,
    maxlength: null,
    inputmode: null,
    ariaLabel: '',
  }
);

const model = defineModel({ required: true, type: String });

const showPassword = ref(false);

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement;
  model.value = target.value;
}
</script>
<style lang="scss">
@use "@fc/scss/settings" as *;
.input-box {
  position: relative;
  &--full-width {
    width: 100%;
  }
  &__input {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: rem(1px) solid var(--border-outline);
    border-radius: var(--radius-button-40);
    background-color: var(--bg-surface);
    line-height: rem(20px);
    font-weight: 400;
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:autofill,
    &:autofill:hover,
    &:autofill:focus,
    &:-internal-autofill-selected {
      -webkit-box-shadow: 0 0 0 1000px var(--bg-surface) inset;
      box-shadow: 0 0 0 1000px var(--bg-surface) inset;
      -webkit-text-fill-color: var(--fg-default, inherit);
      caret-color: var(--fg-default, inherit);
    }

    &:hover {
      border: rem(1px) solid var(--neutral-hover);
    }
    &:focus {
      border: rem(1px) solid var(--neutral-active);
    }

    &:disabled {
      background: var(--disable-surface);
      border: none;
      color: var(--disable-fg);
    }
    &.unbordered {
      border: 0px !important;
    }
  }

  &__field {
    position: relative;
  }

  &__placeholder {
    top: rem(14px);
  }

  .icon-end__wrapper {
    cursor: pointer;
    position: absolute;
    top: rem(14px);
    right: rem(12px);
    display: flex;
    justify-content: center;
    align-items: center;
    .icon {
      color: var(--fg-muted);
    }
  }

  &--error {
    .input-box__input {
      border: rem(1px) solid var(--error-default);
    }
  }

  &--base {
    .input-box__input {
      padding: rem(12px);
      height: rem(48px);
    }

    .input-box__placeholder {
      top: rem(14px);
    }

    .input-box__input:not(:placeholder-shown),
    .input-box__input:focus {
      padding-top: rem(20px);
    }

    .input-box__input:not(:placeholder-shown) + .input-box__placeholder,
    .input-box__input:focus + .input-box__placeholder {
      top: rem(8px);
    }
  }

  &--small {
    .input-box__input {
      padding: rem(10px) rem(12px);
      height: rem(40px);
    }

    .input-box__placeholder {
      top: rem(10px);
    }

    .input-box__input:not(:placeholder-shown),
    .input-box__input:focus {
      padding-top: rem(12px);
    }

    .input-box__input:not(:placeholder-shown) + .input-box__placeholder,
    .input-box__input:focus + .input-box__placeholder {
      display: none;
    }

    .icon-end__wrapper {
      top: rem(10px);
    }
  }
}
</style>
