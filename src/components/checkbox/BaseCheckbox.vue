<template>
  <div>
    <div class="checkbox-container">
      <input
        :id="id"
        :class="[checkboxClass, { 'icon icon-check input-checkbox': true, 'input-checkbox--error': errors.length }]"
        type="checkbox"
        :checked="modelValue"
        @change="handleChange"
        @blur="onBlur"
        @focus="onFocus"
      />
      <label v-if="labelHtml" :for="id" :class="[labelClass, 'checkbox-label']" v-html="labelHtml" />
    </div>

    <div v-if="errors.length" class="errors">
      <span v-for="error in errors" :key="error" class="text-error">
        {{ error }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    onBlur?: () => void;
    onFocus?: () => void;
    checkboxClass?: string;
    labelHtml?: string;
    labelClass?: string;
    id: string;
    errors?: string[];
  }>(),
  {
    onBlur: () => null,
    onFocus: () => null,
    checkboxClass: '',
    labelHtml: '',
    labelClass: '',
    errors: () => [],
  }
);

const model = defineModel({ required: true, type: Boolean });
function handleChange(event: Event) {
  const target = event.target as HTMLInputElement;
  model.value = target.checked;
}
</script>

<style scoped lang="scss">
//TODO: disable, blocked возможно нужно будет добавить
@use '@/scss/settings' as *;

.checkbox-container {
  display: flex;
  gap: rem(8px);
  align-items: flex-start;
  cursor: pointer;
}

.input-checkbox {
  position: relative;
  cursor: pointer;
  width: 1rem;
  height: 1rem;
  appearance: none;
  display: block;
  border: none;
  box-shadow: none;
  &:before {
    border-radius: $elem-br;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 1rem;
    height: 1rem;
    font-family: 'legalbet-iconfont', sans-serif;
    font-size: 12px;
    line-height: 16px;
    box-shadow: none;
    color: white;
    border: 1px solid color(black-10);
  }
  &--error {
    &:before {
      border: 1px solid color(red);
    }
  }
  &:checked {
    &:before {
      border: none;
      background-color: color(blue);
      color: color(white);
    }
  }
  &:not(.input-checkbox--error) {
    content: none;
  }
}
.checkbox-label {
  cursor: pointer;
  padding-left: 0 !important;
  font-size: 14px !important;
  line-height: 16px !important;
  &:after,
  &:before {
    display: none !important;
  }
}
</style>
