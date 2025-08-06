<template>
  <Teleport to="body">
    <div
      id="roulette-modal"
      v-if="!rouletteHidden"
      class="legal-oops-background legal-modal-background roulette-modal legal-active"
    >
      <div class="legal-oops">
        <div class="roulette-wrapper">
          <span class="legal-modal-close roulette-close" @click="close"></span>

          <!-- spinning scope (wheel) -->
          <WheelList
            :prizes="bonuses || defaultPrizes"
            :is-spinning="state === 'twist'"
            @spin-complete="onSpinComplete"
          />

          <!-- content (start / twist / result screens) -->
          <div class="roulette-content">
            <!-- start screen -->
            <StartScreen v-if="state === 'start'" :available-spins="availableSpins" @spin="spin" />

            <!-- twist screen -->
            <TwistScreen v-if="state === 'twist'" />

            <!-- result screen -->
            <ResultScreen
              v-if="state === 'result'"
              :available-spins="availableSpins"
              :selected-bonus="selectedBonus"
              @spin="spin"
            />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { prizes as defaultPrizes } from './data';
import { useRouletteStore } from './Composables/store';
import StartScreen from './Block/StartScreen.vue';
import TwistScreen from './Block/TwistScreen.vue';
import ResultScreen from './Block/ResultScreen.vue';
import WheelList from './Block/WheelList.vue';
import { Prize, RouletteState, RouletteProps } from './types';

const { maxSpins, resetHours, bonuses } = withDefaults(defineProps<RouletteProps>(), {
  maxSpins: 2,
  resetHours: 24,
  storeKey: 'store',
  bonuses: () => defaultPrizes,
});

console.log('bonuses', bonuses);

const rouletteStore = useRouletteStore({
  maxSpins,
  resetIntervalMs: resetHours * 60 * 60 * 1000,
});

const { availableSpins, rouletteHidden, decreaseSpin, hideRoulette } = rouletteStore;
const selectedBonus = ref<Prize | null>(null);
const state = ref<RouletteState>('start');
const openModal = ref(!rouletteHidden.value);

function close() {
  openModal.value = false;
  hideRoulette();
}

function open() {
  openModal.value = true;
}

function spin() {
  if (availableSpins.value === 0) return;
  state.value = 'twist';
}

function onSpinComplete(prize: Prize) {
  selectedBonus.value = prize;
  decreaseSpin();
  state.value = 'result';
}

defineExpose({
  open,
  close,
});
</script>

<style lang="scss" scoped>
@use './settings' as *;

/* ============================================
   CSS VARIABLES
   ============================================ */
.roulette-modal {
  --rl-font-primary: 'Wix Madefor', sans-serif;
  --rl-font-icons: legalbet-iconfont;
  --rl-width-desktop: 1218px;
  --rl-space-15: 3.75rem;
  --rl-space-11: 2.75rem;
  --rl-space-10: 2.5rem;
  --rl-space-09: 2rem;
  --rl-space-08: 1.75rem;
  --rl-space-07: 1.5rem;
  --rl-space-06: 1.125rem;
  --rl-color-base-01: #fff;
  --rl-color-base-04: #c8c8c8;
  --rl-color-base-05: #939393;
  --rl-color-base-07: #353535;
  --rl-color-base-08: #1d1d1d;
  --rl-color-base-09: #0a0a0a;
  --rl-color-purple-button: #6f56ff;
  --rl-color-purple-button-hover: #5f37ff;
  --rl-color-purple-button-disabled: #c7bdff;
  --rl-color-blue-40: #d9f2ff;
  --rl-color-green-40: #ecf9e2;
  --rl-color-purple-20: #f7f5ff;
  --rl-color-purple-40: #ebe8fc;
  --rl-color-red-40: #ffd9d9;
  --rl-color-yellow-40: #f4fead;
  --rl-white-20: rgba(255, 255, 255, 0.2);
  --rl-logo-background: #e3e3e3;

  /* ============================================
     CLOSE BUTTON
     ============================================ */
  .roulette-close {
    position: absolute;
    top: 5%;
    right: 5%;
    cursor: pointer;

    &:before {
      content: '\f148';
      font-family: var(--rl-font-icons);
      display: block;
      color: var(--rl-color-base-04);
      font-size: 24px;
      line-height: 24px;
    }
  }

  /* ============================================
     MAIN MODAL CONTAINER
     ============================================ */
  .legal-oops {
    padding: 0;
    overflow: hidden;
    position: relative;
    height: 100vh;
    background: none;
    border: none;
    border-radius: 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media #{$md} {
      width: 100%;
      align-items: center;
      justify-content: center;
    }

    @media #{$md_max} {
      align-self: flex-end;
      justify-content: flex-end;
    }
  }

  @media #{$md_max} {
    margin-left: -15px;
    margin-right: -15px;
  }
}

/* Additional .legal-oops styles outside of .roulette-modal */
@media #{$md} {
  .legal-oops {
    width: calc(438px - (16px * 2) - 4px);
  }
}

@media #{$md_max} {
  .legal-oops {
    width: inherit;
  }

  .oops-item {
    column-gap: 16px;
  }
}

/* ============================================
   MODAL BACKGROUND & OVERLAY
   ============================================ */
.legal-oops-background {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  height: 100vh;
  background-color: #323232cc;
  display: flex;
  align-items: center;
  justify-content: center;

  &:not(.legal-active) {
    display: none;
  }

  @media #{$md_max} {
    padding: 0 15px;
  }

  @media #{$md} {
    width: 100%;
  }
}

/* ============================================
   ROULETTE WRAPPER
   ============================================ */
.roulette-wrapper {
  display: flex;
  align-items: flex-start;
  gap: var(--rl-space-10);
  overflow: hidden;
  font-family: var(--rl-font-primary);

  * {
    box-sizing: border-box;
  }

  @media #{$md} {
    width: 711px;
    max-height: 522px;

    &:has(.roulette-list__item.active) {
      justify-content: center;
      width: 900px;
    }
  }

  @media #{$md_max} {
    width: 100vw;
    height: 100vh;
    flex-direction: column;
    justify-content: flex-end;

    &:has(.roulette-mark_condition.active) {
      gap: var(--rl-space-06);
    }

    &:has(.roulette-list__item.active) {
      padding-top: 60px;
      background-position: 50% 0;
      background-size: 355px;
    }
  }

  &:has(.roulette-list__item.active) {
    background: url('~@img/modal-roulette/roulette-star-win.svg') no-repeat 0 16px;
  }

  @media #{$md} and #{$lg_max} {
    &:has(.roulette-list__item.active) {
      background-position-y: 60px;
      background-size: 400px;
    }
  }
}

/* ============================================
   CONTENT AREA
   ============================================ */
.roulette-content {
  position: relative;
  padding-inline: var(--rl-space-10);
  background-color: var(--rl-color-purple-20);
  border-radius: var(--rl-space-06);

  &::before {
    content: '';
    position: absolute;
    background: url('~@img/modal-roulette/roulette-arrow-2.svg') no-repeat center/contain;
    display: block;
  }

  > * {
    height: 100%;
  }

  @media #{$md} {
    max-width: 382px;
    height: 522px;
    flex-grow: 2;

    &::before {
      width: 60px;
      height: 47px;
      left: 0;
      top: 50%;
      transform: translate(-50%, -50%);
      filter: drop-shadow(0 3px 0 #000);
    }
  }

  @media #{$md_max} {
    width: 100vw;
    height: 55vh;
    max-height: 438px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;

    &:has(.roulette-mark_condition.active) {
      height: 65vh;
    }

    &::before {
      width: 46px;
      height: 36px;
      left: 50%;
      top: 0;
      transform: translate(-50%, -50%) rotate(90deg);
      filter: drop-shadow(3px 0 0 #000);
    }
  }
}
</style>
