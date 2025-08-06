<template>
  <div class="roulette-terms">
    <div class="roulette-mark roulette-mark_condition legal-cut-item" :class="{ active: open }">
      {{ t('termsContent') }}
    </div>
    <span
      class="roulette-cut-control"
      :class="{ active: open }"
      :data-review-default="t('showTerms')"
      :data-review-active="t('hideTerms')"
      @click="toggle"
    ></span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useText } from '../Composables/texts';

const t = useText;
const open = ref(false);

function toggle() {
  open.value = !open.value;
}
</script>

<style scoped lang="scss">
@use '../settings' as *;

.roulette-mark {
  margin-top: 12px;
  font-size: 0.625rem;
  line-height: 0.875rem;
  color: var(--rl-color-base-05);

  &.roulette-mark_condition {
    &:not(.active) {
      display: none;
    }
  }
}

.roulette-cut-control {
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: normal;
  text-align: center;
  cursor: pointer;

  &:not(.active)::before {
    content: attr(data-review-default);
  }

  &.active::before {
    content: attr(data-review-active);
  }

  &::after {
    content: '\f156';
    font-size: 16px;
    line-height: 16px;
    font-family: var(--rl-font-icons);
  }

  &.active::after {
    transform: rotate(180deg);
  }
}
</style>
