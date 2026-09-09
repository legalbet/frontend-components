<script lang="ts" setup>
const props = defineProps({
  length: { type: Number },
  active: { type: Number },
});
</script>
<template>
  <div class="swiper-pagination">
    <div class="swiper_prev"></div>
    <div class="swiper-pagination--list">
      <div
        v-for="(_, index) in Array(props.length)"
        :key="index"
        :class="{ 'swiper-pagination--item-active': index === props.active }"
      ></div>
    </div>
    <div class="swiper_next"></div>
  </div>
</template>
