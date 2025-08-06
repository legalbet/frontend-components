<template>
  <div class="roulette-content__start-screen">
    <template v-if="availableSpins > 0">
      <div class="roulette-title roulette-title_general">{{ t('titleStart') }}</div>
      <div class="roulette-subtitle">{{ t('subtitleStart') }}</div>
    </template>

    <div class="roulette-subtitle roulette-result-text">
      <template v-if="availableSpins > 0">
        {{ t('availableSpinsPrefix') }} <span class="roulette-available-counter">{{ availableSpins }}</span>
      </template>
      <template v-else> {{ t('noSpins') }} </template>
    </div>

    <div class="roulette-control">
      <template v-if="availableSpins > 0">
        <input id="confirm-roulette" type="checkbox" class="check-slider" v-model="confirmed" />
        <label for="confirm-roulette" class="roulette-confirm-wrap"> {{ t('confirmAgeLabel') }} </label>
        <button
          class="main-btn main-btn_purple main-btn_regular-size main-btn_hull-width btn-spin"
          :disabled="!confirmed"
          @click="onSpin"
        >
          {{ t('spinButton') }}
        </button>
      </template>
    </div>

    <Terms v-if="availableSpins > 0" />
    <TermMark />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useText } from '../Composables/texts';
import Terms from './Terms.vue';
import TermMark from './TermMark.vue';

interface Props {
  availableSpins: number;
}

interface Emits {
  (e: 'spin'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const confirmed = ref(false);
const t = useText;

function onSpin() {
  if (props.availableSpins === 0 || !confirmed.value) return;
  emit('spin');
}
</script>

<style lang="scss" scoped>
@use '../settings' as *;

/* ============================================
   CONTENT SCREENS
   ============================================ */
.roulette-content__start-screen {
  padding-top: var(--rl-space-10);
  padding-bottom: var(--rl-space-06);
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* ============================================
   TYPOGRAPHY
   ============================================ */
.roulette-title {
  font-weight: 900;

  &.roulette-title_general {
    font-size: var(--rl-space-10);
    line-height: var(--rl-space-11);
  }
}

.roulette-subtitle {
  margin-top: 16px;
  font-size: var(--rl-space-07);
  font-weight: 600;
  line-height: var(--rl-space-08);

  .roulette-available-counter {
    font-weight: 700;
  }
}

/* ============================================
   CONTROLS
   ============================================ */
.roulette-control {
  margin-top: auto;
}
.roulette-confirm-wrap {
  display: flex;
  margin-bottom: var(--rl-space-08);
  cursor: pointer;
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

    &[disabled] {
      background-color: var(--rl-color-purple-button-disabled);
      border-color: var(--rl-color-purple-button-disabled);
      cursor: not-allowed;
    }

    &:not([disabled]):hover {
      background-color: var(--rl-color-purple-button-hover);
    }
  }
}

/* ============================================
   CHECKBOX STYLES
   ============================================ */
.check-slider {
  appearance: none;
  width: 20px;
  height: 20px;
  background-color: var(--rl-color-base-01);
  border: 2px solid var(--rl-color-base-04);
  border-radius: 4px;
  margin-right: 12px;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;

  &:checked {
    background-color: var(--rl-color-purple-button);
    border-color: var(--rl-color-purple-button);

    &::after {
      content: '✓';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: var(--rl-color-base-01);
      font-size: 14px;
      font-weight: bold;
    }
  }
}
</style>
