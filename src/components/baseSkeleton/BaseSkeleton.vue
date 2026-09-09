<script setup lang="ts">
import { computed } from 'vue';
const props = withDefaults(
  defineProps<{
    width?: string;
    height?: string;
    radius?: string;
    variant?: string;
  }>(),
  {
    width: '100%',
    height: '100%',
    radius: '8px',
    variant: '',
  }
);

const skeletonStyle = computed(() => {
  const styles: Record<string, string> = {};

  if (props.width) styles.width = props.width;
  if (props.height) styles.height = props.height;
  if (props.radius) styles.borderRadius = props.radius;

  return styles;
});
</script>
<template>
  <div :class="['skeleton', props.variant]" :style="skeletonStyle"></div>
</template>

<style>
:root {
  --skeleton-text-size: 15px;
  --skeleton-title-size: 25px;
  --skeleton-title-weight: 700;
  --skeleton-block-height: 25px;
  --skeleton-block-xs-height: 35px;
  --skeleton-block-md-height: 45px;
  --skeleton-block-lg-height: 55px;
  --skeleton-block-xl-height: 65px;
  --skeleton-block-xxl-height: 75px;

  --skeleton-circle-height: 55px;
  --skeleton-circle-xs-height: 10px;
  --skeleton-circle-md-height: 15px;
  --skeleton-circle-lg-height: 25px;
  --skeleton-circle-xl-height: 35px;
  --skeleton-circle-xxl-height: 45px;
  --skeleton-circle-radius: 50%;

  --skeleton-h1-height: 10px;
  --skeleton-h2-height: 20px;
  --skeleton-h3-height: 30px;
  --skeleton-h4-height: 40px;
  --skeleton-h5-height: 50px;
  --skeleton-line-size: 2px;
}

.skeleton {
  background-color: var(--black-10);
  border-radius: var(--radius-button-40, 8px);
  margin-bottom: 4px;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
.skeleton.block {
  height: var(--skeleton-block-height);
  width: 100%;
}

.skeleton.h1 {
  height: var(--heading-h28-line-height-rem);
  width: 100%;
}

.skeleton.h2 {
  height: var(--heading-h25-line-height-rem);
  width: 100%;
}
.skeleton.h3 {
  height: var(--heading-h22-line-height-rem);
  width: 100%;
}
.skeleton.h4 {
  height: var(--heading-h20-line-height-rem);
  width: 100%;
}
.skeleton.h5 {
  height: var(--heading-h18-line-height-rem);
  width: 100%;
}

.skeleton.block-xs {
  height: var(--skeleton-block-xs-height);
  width: 100%;
}

.skeleton.block-md {
  height: var(--skeleton-block-md-height);
  width: 100%;
}

.skeleton.block-lg {
  height: var(--skeleton-block-lg-height);
  width: 100%;
}

.skeleton.block-xl {
  height: var(--skeleton-block-xl-height);
  width: 100%;
}

.skeleton.block-xxl {
  height: var(--skeleton-block-xxl-height);
  width: 100%;
}

.skeleton.circle {
  height: var(--skeleton-circle-height);
  width: var(--skeleton-circle-height);
  border-radius: var(--skeleton-circle-radius);
}

.skeleton.circle-xs {
  height: var(--skeleton-circle-xs-height);
  width: var(--skeleton-circle-xs-height);
  border-radius: var(--skeleton-circle-radius);
}

.skeleton.circle-md {
  height: var(--skeleton-circle-md-height);
  width: var(--skeleton-circle-md-height);
  border-radius: var(--skeleton-circle-radius);
}

.skeleton.circle-lg {
  height: var(--skeleton-circle-lg-height);
  width: var(--skeleton-circle-lg-height);
  border-radius: var(--skeleton-circle-radius);
}

.skeleton.circle-xl {
  height: var(--skeleton-circle-xl-height);
  width: var(--skeleton-circle-xl-height);
  border-radius: var(--skeleton-circle-radius);
}

.skeleton.circle-xxl {
  height: var(--skeleton-circle-xxl-height);
  width: var(--skeleton-circle-xxl-height);
  border-radius: var(--skeleton-circle-radius);
}

.skeleton.title {
  height: var(--heading-h16-line-height-rem);
  margin-bottom: 16px;
  width: 100%;
}

.skeleton.text {
  height: var(--pharagrapth-p16-line-height-rem);
  border-radius: 20px;
  width: 100%;
}

.skeleton.line {
  height: var(--skeleton-line-size);
  width: 100%;
  /* border-radius: 20px; */
}

.skeleton.width-100 {
  width: 100%;
}

.skeleton.width-50 {
  width: 50%;
}

.skeleton.profile-circle {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}

/* animation */
@keyframes pulse {
  50% {
    background-color: var(--black-5);
  }
}
</style>
