<template>
  <div class="swiper-pagination" :style="swiperStyles">
    <span
      v-for="(item, index) in paginationItems"
      :key="index"
      :class="['pagination-item', { 'pagination-item_active': activePage === index }]"
      :style="bulletStyles"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
interface Props {
  activeSlide?: string | number;
  slides?: any[];
  size?: string | number;
  color?: string;
  inactiveOpacity?: string | number;
  space?: string | number;
  slidesPerPage?: number;
}
const props = withDefaults(defineProps<Props>(), {
  activeSlide: 0,
  slides: () => [],
  size: '5px',
  color: 'rgba(0, 0, 0, 0.8)',
  inactiveOpacity: '0.2',
  space: '8px',
  slidesPerPage: 1,
});
const bulletStyles = computed(() => ({
  '--size': typeof props.size === 'number' ? `${props.size}px` : props.size,
  '--color': props.color,
  '--inactive-opacity': props.inactiveOpacity,
}));
const swiperStyles = computed(() => ({
  '--space': typeof props.space === 'number' ? `${props.space}px` : props.space,
}));
const paginationItems = computed(() => {
  const totalSlides = props.slides.length;
  const totalPages = Math.ceil(totalSlides / props.slidesPerPage);
  return Array.from({ length: totalPages }, (_, index) => index);
});
const activePage = computed(() => {
  return Math.floor(Number(props.activeSlide) / props.slidesPerPage);
});
</script>

<style lang="scss">
.swiper-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: var(--space);
}
.pagination-item {
  width: var(--size);
  height: var(--size);
  background: var(--color);
  opacity: var(--inactive-opacity);
  border-radius: 50%;
  &_active {
    opacity: 1;
  }
}
</style>
