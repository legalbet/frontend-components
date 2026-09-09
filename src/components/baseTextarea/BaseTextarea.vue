<script setup lang="ts">
import { ref computed watch onMounted nextTick } from 'vue';
import BaseEmojiPicker from '@fc/components/baseImojiPicker/BaseEmojiPicker.vue';
import BaseIcon from '@fc/components/baseIcon/BaseIcon.vue';
import { IconNames } from '@fc/components/baseIcon/iconNames';
interface Props {
  label?: string;
  placeholder?: string;
  errors?: string[];
  onBlur?: () => void;
  onFocus?: () => void;
  id?: string;
  name?: string;
  classTextarea?: string;
  height?: string | number;
  initialHeight?: string;
  maxHeight?: string;
  options?: boolean;
  insertBrOnEnter?: boolean;
  labelDescription?: string | null;
}

const isEmojiPickerOpen = ref(false);

function toggleEmojiPicker() {
  isEmojiPickerOpen.value = !isEmojiPickerOpen.value;
}

function closeEmojiPicker() {
  isEmojiPickerOpen.value = false;
}

const props = withDefaults(defineProps<Props>(), {
  height: 'auto',
  initialHeight: undefined,
  maxHeight: undefined,
  label: '',
  placeholder: '',
  onBlur: () => null,
  onFocus: () => null,
  errors: () => [],
  id: '',
  name: '',
  classTextarea: '',
  options: false,
  insertBrOnEnter: false,
  labelDescription: null,
});

const textareaStyles = computed(() => ({
  '--height': typeof props.height === 'number' ? `${props.height}px` : props.height,
}));

const model = defineModel({ required: true, type: String });
const textareaRef = ref<HTMLTextAreaElement | null>(null);
const textareaValue = computed(() =>
  props.insertBrOnEnter ? model.value.replace(/<br\s*\/?\s*>/gi, '\n') : model.value
);

function isEmptyContent(value: string): boolean {
  return value.trim().length === 0;
}

function adjustHeight() {
  nextTick(() => {
    const el = textareaRef.value;
    if (!el) return;

    if (props.initialHeight && isEmptyContent(model.value)) {
      el.style.height = props.initialHeight;
      el.style.overflowY = 'hidden';
      return;
    }

    el.style.height = 'auto';

    const maxHeightNumber = props.maxHeight ? parseInt(props.maxHeight, 10) : undefined;
    const desiredHeight = el.scrollHeight;

    if (maxHeightNumber && desiredHeight > maxHeightNumber) {
      el.style.height = `${maxHeightNumber}px`;
      el.style.overflowY = 'auto';
    } else {
      el.style.height = `${desiredHeight}px`;
      el.style.overflowY = 'hidden';
    }
  });
}

function normalizeTextareaValue(value: string): string {
  return props.insertBrOnEnter ? value.replace(/\r?\n/g, '<br/>') : value;
}

function handleChange(event: Event) {
  const target = event.target as HTMLTextAreaElement;
  model.value = normalizeTextareaValue(target.value);
  adjustHeight();
}

function handleKeydown(event: KeyboardEvent) {
  if (!props.insertBrOnEnter || event.key !== 'Enter') return;

  event.preventDefault();

  const target = event.target as HTMLTextAreaElement;
  const start = target.selectionStart;
  const end = target.selectionEnd;

  model.value = normalizeTextareaValue(`${target.value.slice(0, start)}\n${target.value.slice(end)}`);

  nextTick(() => {
    target.setSelectionRange(start + 1, start + 1);
  });
}

onMounted(adjustHeight);
watch(model, adjustHeight);
</script>

<template>
  <div
    :class="{
      'input-box__container': true,
      'input-box__container--error': errors.length,
    }"
  >
    <label v-if="label" class="input-box__label" :for="id">
      <span class="input-box__label-text"> {{ label }}</span>
      <span v-if="labelDescription" class="text-t14 color-muted input-box__label-description">{{
        labelDescription
      }}</span>
    </label>
    <div class="input-box__textarea-wrapper">
      <textarea
        :id="id"
        ref="textareaRef"
        :class="['input-box__input', classTextarea]"
        placeholder=" "
        :name="name"
        :value="textareaValue"
        :style="textareaStyles"
        @input="handleChange"
        @keydown="handleKeydown"
        @blur="onBlur"
        @focus="onFocus"
      />
      <div class="input-box__placeholder">{{ placeholder }}</div>
      <div v-if="isEmojiPickerOpen" class="emoji-picker-popup">
        <BaseEmojiPicker v-model="model" @select="closeEmojiPicker" />
      </div>
      <div v-if="props?.options" class="input-box__textarea-bottom">
        <BaseIcon
          textColor="var(--black-20)"
          :iconName="IconNames.Emodji"
          size="20px"
          fontSize="20px"
          class="emoji-picker"
          @click="toggleEmojiPicker"
        />
        <span class="count text-t14 color-muted">{{ model.length }}/250</span>
      </div>
    </div>
    <div v-if="errors.length" class="input-box__errors">
      <span v-for="error in errors" :key="error" class="input-box__error">
        {{ error }}
      </span>
    </div>
  </div>
</template>

<style lang="scss">
@use "@fc/scss/settings" as *;
.input-box__container {
  position: relative;

  // &::-webkit-scrollbar-track {
  //   background: transparent;
  // }
  // &::-webkit-scrollbar-thumb {
  //   background: rgba(0, 0, 0, 0.2);
  // }

  // scrollbar-width: thin;
  // scrollbar-color: rgba(0, 0, 0, 0.2) transparent;

  .input-box__textarea-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    border: rem(1px) solid var(--border-outline);
    border-radius: var(--radius-button-40);
    background-color: var(--bg-surface);
    transition: border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      border-color: var(--neutral-hover);
    }
    &:focus-within {
      border-color: var(--neutral-active);
    }
    &:has(.input-box__input:disabled) {
      background: var(--disable-surface);
      border-color: var(--disable-surface);
    }
  }

  .input-box__input {
    height: var(--height);
    resize: none;
    padding: rem(12px);
    border: none;
    background: transparent;
    line-height: rem(18px);
    border-radius: var(--radius-button-40) var(--radius-button-40) 0 0;

    &:disabled {
      color: var(--disable-fg);
    }
  }

  .input-box__textarea-bottom {
    display: flex;
    align-items: center;
    padding: rem(8px) rem(12px);
  }

  .emoji-picker-popup {
    padding: 0 rem(12px) rem(4px);
  }
  .input-box__placeholder {
    top: rem(8px);
    text-align: left;
    background: var(--bg-surface);
  }

  .input-box__input:not(:placeholder-shown) + .input-box__placeholder,
  .input-box__input:focus + .input-box__placeholder {
    display: flex;
    align-items: center;
    height: rem(20px);
    text-align: left;
    top: 0;
    width: 100%;
  }

  .input-box__input:not(:placeholder-shown),
  .input-box__input:focus {
    padding-top: rem(20px);
  }

  &--error {
    .input-box__placeholder {
      color: var(--fg-muted);
    }
    .input-box__textarea-wrapper {
      border-color: var(--error-default);
    }
  }

  .count {
    margin-left: auto;
  }

  .emoji-picker-popup {
    position: absolute;
    z-index: 20;
    left: 0;
  }
}
</style>
