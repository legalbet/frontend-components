<template>
  <BaseIcon
    :tag-name="'div'"
    :icon-name="IconNames.Right"
    :text-color="'rgba(0, 0, 0, 0.8)'"
    font-size="20px"
    size="20px"
    class="arrow-slider"
  />
</template>

<script setup lang="ts">
import { IconNames } from '@/components/baseIcon/iconNames';
import BaseIcon from '@/components/baseIcon/BaseIcon.vue';
</script>

<style lang="scss">
.arrow-slider {
  color: var(--black-80);
  transition: color 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: var(--primary-default);
  }
}
.left {
  transform: rotate(180deg);
}
</style>
