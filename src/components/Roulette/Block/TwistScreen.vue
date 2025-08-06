<template>
  <div class="roulette-content__twist">
    <div class="roulette-title roulette-title_secondary">{{ t('twistTitle') }}</div>
  </div>
</template>

<script setup lang="ts">
import { useText } from '../Composables/texts';

const t = useText;
</script>

<style lang="scss" scoped>
@use '../settings' as *;

/* ============================================
   CONTENT SCREENS
   ============================================ */
.roulette-content__twist {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.roulette-title {
  font-weight: 900;

  &.roulette-title_secondary {
    font-size: var(--rl-space-09);
    line-height: 1em;
  }
}
</style>
