<template>
  <div class="roulette-mark">{{ t('termMark') }}</div>
</template>

<script setup lang="ts">
import { useText } from '../Composables/texts';

const t = useText;
</script>

<style scoped lang="scss">
@use '../settings' as *;

.roulette-mark {
  margin-top: 12px;
  font-size: 0.625rem;
  line-height: 0.875rem;
  color: var(--rl-color-base-05);
}
</style>
