<template>
  <ClientOnly>
    <div class="base-emoji-picker">
      <div ref="containerEl" />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
type EmojiMartEmoji = {
  native?: string;
} & Record<string, unknown>;

const emit = defineEmits<{
  (e: 'select', emoji: EmojiMartEmoji): void;
  (e: 'update:modelValue', value: string): void;
}>();

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    locale?: string;
    theme?: 'light' | 'dark' | 'auto';
    searchPosition?: 'sticky' | 'static' | 'none';
    previewPosition?: 'sticky' | 'static' | 'none';
  }>(),
  {
    modelValue: '',
    locale: 'ru',
    theme: 'auto',
    searchPosition: 'sticky',
    previewPosition: 'static',
  }
);

const containerEl = ref<HTMLElement | null>(null);
const pickerEl = ref<HTMLElement | null>(null);

const locale = computed(() => props.locale);
const theme = computed(() => props.theme);
const searchPosition = computed(() => props.searchPosition);
const previewPosition = computed(() => props.previewPosition);

onMounted(async () => {
  const { Picker } = await import('emoji-mart');

  const picker = new Picker({
    data: async () => {
      const res = await fetch('https://cdn.jsdelivr.net/npm/@emoji-mart/data@1.2.1');
      return res.json();
    },
    locale: locale.value,
    theme: theme.value,
    searchPosition: searchPosition.value,
    previewPosition: previewPosition.value,
    onEmojiSelect: (emoji: EmojiMartEmoji) => {
      emit('select', emoji);

      const native = emoji?.native;
      if (typeof native === 'string' && native.length) {
        emit('update:modelValue', (props.modelValue || '') + native);
      }
    },
  });

  const root = containerEl.value;
  if (!root) return;

  const pickerNode = picker as unknown as HTMLElement;
  pickerEl.value = pickerNode;
  root.replaceChildren(pickerNode);
});

onBeforeUnmount(() => {
  const root = containerEl.value;
  if (root) root.replaceChildren();
  pickerEl.value = null;
});
</script>

<style lang="scss">
.base-emoji-picker {
  display: inline-block;
}
</style>
