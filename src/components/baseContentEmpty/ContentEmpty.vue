<script setup lang="ts">
import { computed } from 'vue';
import { Lang } from '@fc/types/Lang';
import { ContentEmptyType } from '@fc/components/baseContentEmpty/types';
import { useConfigStore } from '@fc/composables/useConfigStore';

const { t } = useConfigStore();
const props = defineProps<{
  type?: ContentEmptyType;
}>();

const emit = defineEmits<{
  change: [];
  clear: [];
}>();

const text = computed(() => {
  if (props.type === ContentEmptyType.NoBonusesFound) {
    return t(Lang.NoBonusesFound, [
      `<span class="change filter-button" data-action="change">${t(Lang.Change)}</span>`,
      `<a class="clear-filter base-link" data-action="clear">${t(Lang.Clear)}</a>`,
    ]);
  }
  return null;
});

function handleClick(e: MouseEvent) {
  const action = (e.target as HTMLElement).dataset.action;
  if (action === 'change') emit('change');
  if (action === 'clear') emit('clear');
}
</script>
<template>
  <div class="content-empty paragraph-p16">
    <div v-if="text" class="content-empty-text" @click="handleClick" v-html="text" />
    <slot v-else />
  </div>
</template>
<style lang="scss">
.content-empty {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--padding-large);
  border-radius: var(--radius-base, 8px);
  background: var(--bg-surface, #fff);
  &-text {
    display: contents;
    display: flex;
    justify-content: center;
    align-items: center;
    span,
    a {
      cursor: pointer;
      display: contents;
      text-transform: lowercase;
    }
  }
}
</style>
