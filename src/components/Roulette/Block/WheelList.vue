<template>
  <div class="scope">
    <ul
      ref="listRef"
      class="roulette-list"
      :class="{ active: isSpinningProxy, finished: isFinished }"
      :style="wheelStyles"
    >
      <li
        v-for="(prize, idx) in extendedPrizes"
        :key="idx + '-' + prize.link"
        class="roulette-list__item"
        :class="{ active: idx === activeIndex }"
      >
        {{ prize.title }}<span class="roulett-icon-star"></span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import { Prize } from '../types';
import { WHEEL_PARAMS } from '../constants';
import { getRandomPrizeIndex } from '../Helpers/getRandomPrizeIndex';

interface Props {
  prizes: Prize[];
  isSpinning: boolean;
}

interface Emits {
  (e: 'spin-complete', prize: Prize): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const listRef = ref<HTMLUListElement | null>(null);
const isFinished = ref(false);
const activeIndex = ref<number>(-1);
const isSpinningProxy = ref(props.isSpinning);

const wheelPosition = ref<{ top: number | null; left: number | null }>({
  top: null,
  left: null,
});
const defaultWheelPosition = ref<{ top: number | null; left: number | null }>({
  top: null,
  left: null,
});
const wheelStyles = computed(() => {
  return {
    top: wheelPosition.value.top ? `${wheelPosition.value.top}px` : '',
    left: wheelPosition.value.left ? `${wheelPosition.value.left}px` : '',
  };
});

onMounted(() => {
  defaultWheelPosition.value = {
    top: parseFloat(getComputedStyle(listRef.value as HTMLElement).top) ?? WHEEL_PARAMS.initialOffset,
    left: parseFloat(getComputedStyle(listRef.value as HTMLElement).left) ?? WHEEL_PARAMS.initialOffset,
  };

  restoreWheel();
});

function roundsCount(itemCnt: number): number {
  if (itemCnt <= WHEEL_PARAMS.itemsForMaxRounds) return WHEEL_PARAMS.maxRounds;
  if (itemCnt <= WHEEL_PARAMS.itemsForMediumRounds) return WHEEL_PARAMS.mediumRounds;
  return WHEEL_PARAMS.minRounds;
}

const extendedPrizes = computed(() => {
  const repeat = roundsCount(props.prizes.length);
  return Array.from({ length: repeat }).flatMap(() => props.prizes);
});

function restoreWheel() {
  isSpinningProxy.value = false;
  isFinished.value = false;
  activeIndex.value = -1;
  wheelPosition.value = {
    ...defaultWheelPosition.value,
  };
}

function performSpin() {
  const ul = listRef.value;
  if (!ul) return;

  isSpinningProxy.value = true;

  // determine random index within extendedPrizes but leaving minRoundsOffset offset
  const baseLen = props.prizes.length;
  const total = extendedPrizes.value.length;
  const randomIndex = getRandomPrizeIndex(baseLen, total);

  // calculate offset
  let offset = 0;
  if (window.innerWidth > WHEEL_PARAMS.maxMobileWidth) {
    const cardHeight = (ul.children[0] as HTMLElement).offsetHeight;
    offset = cardHeight * (randomIndex - 2) + randomIndex * WHEEL_PARAMS.itemMargin + cardHeight / 2;
    wheelPosition.value.top = -offset;
  } else {
    const cardWidth = (ul.children[0] as HTMLElement).offsetWidth;
    offset = cardWidth * randomIndex + randomIndex * WHEEL_PARAMS.itemMargin - window.innerWidth / 2 + cardWidth / 2;
    wheelPosition.value.left = -offset;
  }

  // after animation finish
  setTimeout(() => {
    isFinished.value = true;
    activeIndex.value = randomIndex;

    // Get the prize from our reactive array
    const prize = extendedPrizes.value[randomIndex];
    emit('spin-complete', prize);
  }, 6000);
}

// Watch for spinning state changes
watch(
  () => props.isSpinning,
  async (newValue) => {
    if (newValue) {
      restoreWheel();
      await nextTick();
      performSpin();
    } else {
      isSpinningProxy.value = false;
    }
  }
);
</script>

<style lang="scss" scoped>
@use '../settings' as *;

/* ============================================
   SCOPE (WHEEL CONTAINER)
   ============================================ */
.scope {
  padding-left: 7px;
  padding-bottom: 7px;
  max-height: 100%;

  @media #{$md} {
    mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 1) 20%,
      rgba(0, 0, 0, 1) 80%,
      rgba(0, 0, 0, 0) 100%
    );
  }
}

/* ============================================
   ROULETTE LIST (WHEEL)
   ============================================ */
.roulette-list {
  position: relative;
  display: inline-flex;
  flex-grow: 2;
  margin: 0;
  padding: 0;
  list-style: none;

  &.active {
    transition: 6s cubic-bezier(0.21, 0.53, 0.29, 0.99);
  }

  &.finished > .roulette-list__item:not(.active) {
    opacity: 0;
  }

  @media #{$md} {
    flex-direction: column;
    top: -20px;
  }

  @media #{$md_max} {
    left: -20px;
  }
}

/* ============================================
   ROULETTE LIST ITEMS
   ============================================ */
.roulette-list__item {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 281px;
  padding: 2rem 1.75rem;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.625rem;
  border-radius: 1.125rem;
  transition: 0.1s ease-in-out;

  &:nth-child(1n) {
    background-color: #f4fead;
  }
  &:nth-child(2n) {
    background-color: #ebe8fc;
  }
  &:nth-child(3n) {
    background-color: #ecf9e2;
  }
  &:nth-child(4n) {
    background-color: #d9f2ff;
  }
  &:nth-child(5n) {
    background-color: #ffd9d9;
  }

  @media #{$md} {
    &:not(.active) {
      height: 112px;
    }

    & + .roulette-list__item {
      margin-top: 8px;
    }
  }

  @media #{$md_max} {
    height: 180px;

    & + .roulette-list__item {
      margin-left: 8px;
    }
  }

  /* Active (winning) item styles */
  &.active {
    height: 180px;
    position: relative;
    box-shadow: -6px 7px 1px #0a0a0a;

    &::before,
    &::after {
      content: '';
      position: absolute;
      background: url('~@img/modal-roulette/roulett-icon-star.svg') no-repeat center/contain;
    }

    &::before {
      width: 28px;
      height: 28px;
      top: calc(0px - 14px);
      left: 105px;
    }

    &::after {
      width: 40px;
      height: 40px;
      top: calc(0px - 20px);
      left: 170px;
    }

    .roulett-icon-star {
      content: '';
      width: 42px;
      height: 42px;
      position: absolute;
      top: calc(180px - 21px);
      left: 73px;
      background: url('~@img/modal-roulette/roulett-icon-star.svg') no-repeat center/contain;
    }
  }
}
</style>
