<template>
  <component :is="tagName" :class="['icon', 'icon-' + iconName]" :style="iconStyles" />
</template>

<script setup lang="ts">
import { IconNames } from './iconNames';
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    tagName?: string;
    size?: string;
    iconName: IconNames;
    textColor: string;
    fontSize?: string;
  }>(),
  {
    tagName: 'i',
    size: 'auto',
    textColor: 'white',
    fontSize: '0.875rem',
  }
);

const iconStyles = computed(() => ({
  '--size': props.size,
  '--text-color': props.textColor,
  '--font-size': props.fontSize,
}));
</script>

<style scoped lang="scss">
.icon {
  color: var(--text-color);
  height: var(--size);
  width: var(--size);

  &:before {
    font-size: var(--font-size);
    line-height: var(--font-size);
    height: var(--size);
    width: var(--size);
  }
}
</style>
