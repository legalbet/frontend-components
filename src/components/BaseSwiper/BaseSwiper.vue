<template>
  <ClientOnly>
    <div ref="rootEl" :class="['base-swiper']" :style="rootStyle">
      <BaseButton
        v-if="withNav && !isMobile"
        :id="prevBtnId"
        :class="['base-swiper__btn', 'base-swiper__btn--prev', `base-swiper__btn--${navStyle}`]"
        v-bind="navStyleComputed"
        aria-label="Previous"
      >
        <slot name="prevIcon">
          <BaseIcon :iconName="IconNames.Left" fontSize="18px" :textColor="iconColor" />
        </slot>
      </BaseButton>
      <Swiper
        class="base-swiper__swiper"
        :modules="modules"
        v-bind="sliderOptions"
        @swiper="onSwiperInit"
        @slideChange="onSlideChange"
        @reachEnd="onReachEnd"
      >
        <SwiperSlide v-for="(item, i) in items" :key="getKey(item, i)" :class="['base-swiper__slide']">
          <slot name="slide" :item="item" :index="i" />
        </SwiperSlide>
        <div v-if="showDefaultPagination" class="swiper-pagination"></div>
      </Swiper>
      <BaseButton
        v-if="withNav && !isMobile"
        :id="nextBtnId"
        class="base-swiper__btn base-swiper__btn--next"
        v-bind="navStyleComputed"
        aria-label="Next"
      >
        <slot name="nextIcon">
          <BaseIcon :iconName="IconNames.Right" fontSize="18px" :textColor="iconColor" />
        </slot>
      </BaseButton>
    </div>

    <template #fallback>
      <div class="base-swiper--ssr d-flex">
        <div v-for="(item, i) in items" :key="getKey(item, i)" :class="['base-swiper__slide']">
          <slot name="slide" :item="item" :index="i" />
        </div>
      </div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from "vue";
import { useDevice } from "@fc/composables/useNuxtShims";
import { computed, watch, nextTick } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import type { Swiper as SwiperClass, SwiperOptions } from 'swiper/types';
import { FreeMode, Navigation, Pagination, Autoplay, Zoom } from 'swiper/modules';
import BaseIcon from '@fc/components/baseIcon/BaseIcon.vue';
import { IconNames } from '@fc/components/baseIcon/iconNames';
import BaseButton from '@fc/components/baseButton/BaseButton.vue';
import { ButtonShape, ButtonVariant, ButtonColor } from '@fc/components/baseButton/types';
import { ScreenSize } from '@fc/ScreenSize';
import 'swiper/css/pagination';
import 'swiper/css/zoom';
const { isMobile } = useDevice();
type NavStyle = 'light' | 'dark';
type SwiperItem = Record<string, unknown>;

const emit = defineEmits<{
  (e: 'reachEnd' | 'slideChange', swiper: SwiperClass): void;
}>();

const props = withDefaults(
  defineProps<{
    items?: SwiperItem[];
    withNav?: boolean;
    navStyle?: NavStyle;
    slideWidth?: string; // "fit-content" | "240px"
    activeSlideId?: string | number | null;
    activeSlideIndex?: number | null;
    options?: SwiperOptions;
  }>(),
  {
    items: () => [],
    withNav: true,
    navStyle: 'light',
    options: () => ({}),
    slideWidth: 'fit-content',
    activeSlideId: null,
    activeSlideIndex: null,
  }
);

const navStyleComputed = computed(() => {
  if (typeof props?.navStyle !== 'string') {
    return props?.navStyle;
  }

  if (props?.navStyle === 'light') {
    return {
      variant: ButtonVariant.Solid,
      color: ButtonColor.White,
      shape: ButtonShape.Rounded,
      class: 'base-swiper__btn base-swiper__btn--light',
    };
  }

  if (props?.navStyle === 'dark') {
    return {
      variant: ButtonVariant.Outlined,
      color: ButtonColor.White,
      shape: ButtonShape.Rounded,
      class: 'base-swiper__btn base-swiper__btn--dark',
    };
  }

  return {
    shape: ButtonShape.Rounded,
    class: props?.navStyle,
  };
});

const rootEl = ref<HTMLElement | null>(null);
const swiperRef = ref<SwiperClass | null>(null);
const rootStyle = computed(() => ({
  '--slide-width': props.slideWidth,
}));
const showDefaultPagination = computed(() => {
  if (!props.options?.pagination || typeof props.options.pagination === 'boolean') {
    return Boolean(props.options?.pagination);
  }

  return !props.options.pagination.el;
});

const { prevBtnId, nextBtnId } = createSwiperIds();

const modules = [FreeMode];

if (props.withNav && !isMobile) {
  modules.push(Navigation);
}
if (props.options?.pagination) {
  modules.push(Pagination);
}
if (props.options?.autoplay) {
  modules.push(Autoplay);
}
if (props.options?.zoom) {
  modules.push(Zoom);
}

const sliderOptions = computed<SwiperOptions>(() => {
  return {
    navigation: props.withNav
      ? {
          prevEl: `#${prevBtnId}`,
          nextEl: `#${nextBtnId}`,
        }
      : false,
    slidesPerView: 'auto',
    speed: 600,
    spaceBetween: 16,
    freeMode: true,
    observer: true,
    observeParents: true,
    preventInteractionOnTransition: true,
    breakpoints: {
      [ScreenSize.MD]: {
        slidesPerView: 'auto',
        spaceBetween: 24,
        loop: false,
      },
      [ScreenSize.LG]: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      [ScreenSize.XL]: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
    ...props.options,
  };
});

const iconColor = computed(() => (props.navStyle === 'dark' ? 'var(--secondary-fg)' : 'var(--fg-default)'));

function onSwiperInit(swiper: SwiperClass) {
  swiperRef.value = swiper;
  rootEl.value?.classList.add('base-swiper--swiper-initialized');

  scrollToActiveSlide();
}

function onReachEnd(swiper: SwiperClass) {
  emit('reachEnd', swiper);
}

function onSlideChange(swiper: SwiperClass) {
  emit('slideChange', swiper);
}

function getKey(item: SwiperItem, index: number) {
  if (item && typeof item === 'object' && 'id' in item) {
    const withId = item as { id?: string | number };
    if (withId.id !== undefined) return withId.id;
  }
  return index;
}

function createSwiperIds(prefix = 'base-swiper') {
  const uid = getCurrentInstance()?.uid ?? 0;
  const base = `${prefix}-${uid}`;
  return {
    rootId: base,
    prevBtnId: `${base}-prev`,
    nextBtnId: `${base}-next`,
  };
}

function getActiveSlideIndex(): number {
  if (typeof props.activeSlideIndex === 'number' && props.activeSlideIndex >= 0) {
    return props.activeSlideIndex;
  }

  if (props.activeSlideId === null || props.activeSlideId === undefined) {
    return -1;
  }

  return props.items.findIndex((item) => {
    if (!('id' in item)) {
      return false;
    }

    return item.id === props.activeSlideId;
  });
}

function scrollToActiveSlide() {
  const swiper = swiperRef.value;

  if (!swiper) return;

  const index = getActiveSlideIndex();

  if (index < 0) return;

  nextTick(() => {
    const lastSlideIndex = swiper.slides.length - 1;
    let targetIndex: number;

    //Если цель не первый и не последний слайды, ставим целью предыдущий слайд,
    // так как кнопки навигации находятся по краям, и так активный слайд будет максимально виден
    if (index === 0) {
      targetIndex = 0;
    } else if (index >= lastSlideIndex) {
      targetIndex = lastSlideIndex;
    } else {
      targetIndex = index - 1;
    }

    swiper.slideTo(targetIndex, 600);
  });
}

watch([() => props.items.length, () => props.activeSlideId, () => props.activeSlideIndex], () => {
  scrollToActiveSlide();
});
</script>

<style lang="scss">
@use "@fc/scss/settings" as *;
.base-swiper {
  position: relative;
  //Обрезаем краем экрана на мобилке
  margin-right: calc(var(--container-padding) * -1);
  margin-left: calc(var(--container-padding) * -1);

  @media #{$lg} {
    margin-right: 0;
    margin-left: 0;
  }

  &--ssr {
    opacity: 0;
  }

  .base-swiper__slide--auto {
    width: auto;
  }

  .base-swiper__btn {
    display: none;
    pointer-events: auto;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    width: rem(40px);
    height: rem(40px);
    transition: none;
    box-shadow: 2px 4px 12px 0 var(--effects-shadow, rgba(0, 0, 0, 0.1));
    border: none;
    &:hover {
      height: rem(44px) !important;
      width: rem(44px) !important;
    }

    @media #{$md} {
      display: block;
    }

    &.base-swiper__btn--prev {
      left: rem(-8px);
      &:hover {
        transform: translateY(-50%) translateX(rem(-2px));
      }
    }

    &.base-swiper__btn--next {
      right: rem(-8px);
      &:hover {
        transform: translateY(-50%) translateX(rem(2px));
      }
    }

    &.swiper-button-disabled {
      visibility: hidden;
      pointer-events: none;
    }

    &.base-swiper__btn--light {
      background-color: var(--white-100);
      color: var(--fg-default);
      &:hover {
        background-color: var(--white-100) !important;
        color: var(--fg-default) !important;
      }
    }

    &.base-swiper__btn--dark {
      background-color: var(--secondary-default);
      color: var(--secondary-fg);

      &:hover {
        background-color: var(--secondary-default) !important;
        color: var(--secondary-fg) !important;
      }
    }
  }

  .swiper-slide {
    height: auto;
    width: var(--slide-width, auto);
  }

  .swiper-slide,
  .base-swiper__btn {
    opacity: 0;
  }
}

.base-swiper__swiper {
  padding-right: var(--container-padding);
  padding-left: var(--container-padding);

  @media #{$lg} {
    padding-right: 0;
    padding-left: 0;
  }
}

.base-swiper--swiper-initialized {
  .swiper-slide,
  .base-swiper__btn {
    opacity: 1;
  }
}
</style>
