<template>
  <component
    :is="tagName"
    :class="['icon', 'icon-' + iconName, { pointed: pointed }]"
    :style="iconStyles"
    :title="props?.title"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { IconParams } from '@fc/components/baseIcon/types';

const props = withDefaults(defineProps<IconParams>(), {
  tagName: 'i',
  size: 'auto',
  textColor: 'var(--fg-default)',
  fontSize: '0.875rem',
  weight: 'normal',
  title: '',
  pointed: true,
});

const normalizedTextColor = computed(() => {
  const value = props.textColor?.trim();

  if (!value) {
    return value;
  }

  if (value.startsWith('--')) {
    return `var(${value})`;
  }

  return value;
});

const iconStyles = computed(() => ({
  '--size': props.size,
  '--text-color': normalizedTextColor.value,
  '--font-size': props.fontSize,
  '--weight': props?.weight || 'normal',
}));
</script>

<style lang="scss">
.icon {
  color: var(--text-color);
  height: var(--size);
  width: var(--size);
  display: block;

  &.pointed {
    cursor: pointer;
  }

  &:before {
    display: block;
    font-size: var(--font-size);
    line-height: var(--font-size);
    height: var(--size);
    width: var(--size);
    //Не даем менять жирность иконок
    font-weight: var(--weight, normal);
  }
}
</style>
