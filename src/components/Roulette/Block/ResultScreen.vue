<template>
  <div class="roulette-content__result">
    <div class="roulette-title roulette-title_secondary">{{ t('resultTitle') }}</div>

    <div class="roulette-subtitle roulette-result-text">
      <template v-if="availableSpins > 0">
        {{ t('availableSpinsPrefix') }} <span class="roulette-available-counter">{{ availableSpins }}</span>
      </template>
      <template v-else> {{ t('noSpins') }} </template>
    </div>

    <div class="roulette-control">
      <button
        v-if="availableSpins > 0"
        class="main-btn main-btn_base-01 main-btn_regular-size main-btn_hull-width btn-spin btn-spin-again"
        :disabled="availableSpins === 0"
        @click="onSpin"
      >
        {{ t('spinAgainButton') }}
      </button>
      <a
        v-if="selectedBonus"
        class="main-btn main-btn_purple main-btn_hull-width main-btn_regular-size result-link"
        :href="selectedBonus.link"
        target="_blank"
      >
        {{ t('getBonusButton') }}
      </a>
    </div>

    <TermMark />
  </div>
</template>

<script setup lang="ts">
import TermMark from './TermMark.vue';
import { Prize } from '../types';
import { useText } from '../Composables/texts';

interface Props {
  availableSpins: number;
  selectedBonus: Prize | null;
}

interface Emits {
  (e: 'spin'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const t = useText;

function onSpin() {
  if (props.availableSpins === 0) return;
  emit('spin');
}
</script>

<style lang="scss" scoped>
@use '../settings' as *;

/* ============================================
   CONTENT SCREENS
   ============================================ */
.roulette-content__result {
  padding-top: var(--rl-space-10);
  padding-bottom: var(--rl-space-06);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.roulette-control {
  margin-top: auto;

  > .main-btn + .main-btn {
    margin-top: 8px;
  }
}

/* ============================================
   TYPOGRAPHY
   ============================================ */
.roulette-title {
  font-weight: 900;

  &.roulette-title_secondary {
    font-size: var(--rl-space-09);
    line-height: 1em;
  }
}

.roulette-subtitle {
  margin-top: 16px;
  font-size: var(--rl-space-07);
  font-weight: 600;
  line-height: var(--rl-space-08);
}

.roulette-available-counter {
  font-weight: 700;
}

/* ============================================
   BUTTONS
   ============================================ */
.main-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: normal;
  font-weight: 500;
  text-decoration: none;
  text-align: center;
  border-radius: var(--rl-space-15);
  cursor: pointer;
  border: none;

  &.main-btn_regular-size {
    padding: 0.625rem 1.125rem;
    font-size: 1rem;
    line-height: 1.375rem;
  }

  &.main-btn_hull-width {
    width: 100%;
  }

  &.main-btn_purple {
    border: 1px solid var(--rl-color-purple-button);
    background-color: var(--rl-color-purple-button);
    color: var(--rl-color-base-01);
  }

  &.main-btn_base-01 {
    color: var(--rl-color-base-09);
    background-color: var(--rl-color-base-01);
    border: 1px solid var(--rl-color-base-04);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:not(:disabled):hover {
    opacity: 0.9;
  }
}
</style>
