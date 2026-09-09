<template>
  <div
    v-if="getActivePopup.popupName === popupName"
    :class="['base-popup-wrap', customPopupClass]"
    @pointerdown.capture="onWrapPointerDownCapture"
    @pointercancel.capture="onWrapPointerCancelCapture"
    @click.self="onWrapClick"
  >
    <div :class="['base-popup', { 'base-popup--loading': isLoading, 'base-popup--dark': darkMode }]">
      <SmoothHeightTransition>
        <template v-if="isLoading">
          <BaseLoader size="40px" />
        </template>

        <!--     Кнопка без хедера или при загрузке-->
        <BaseIcon
          v-if="!withoutCloseBtn && (isLoading || !hasHeader)"
          :icon-name="IconNames.Cross"
          text-color="var(--grey-300)"
          font-size="24px"
          size="24px"
          class="base-popup__close-btn base-popup__close-btn--absolute"
          @click="handleClose"
        />

        <template v-if="!isLoading">
          <!-- Header -->
          <div
            v-if="hasHeader"
            ref="headerElement"
            :class="['base-popup__header', { 'base-popup__header--fixed': fixedHeader }]"
          >
            <slot name="header">
              <div class="base-popup__header-content">
                <slot name="title" />
                <!--              Кнопка в хедере не абсолютная-->
                <BaseIcon
                  v-if="!withoutCloseBtn"
                  :icon-name="IconNames.Cross"
                  text-color="var(--grey-300)"
                  font-size="24px"
                  size="24px"
                  class="base-popup__close-btn"
                  @click="handleClose"
                />
              </div>
            </slot>
          </div>

          <div ref="contentElement" class="base-popup__content">
            <slot name="content" />
          </div>

          <!-- Footer -->
          <div
            v-if="hasFooter"
            ref="footerElement"
            :class="['base-popup__footer', { 'base-popup__footer--fixed': fixedFooter }]"
          >
            <slot name="footer" />
          </div>
        </template>
      </SmoothHeightTransition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { usePopupStore } from '@/popupsContainer/composables/popupStore/usePopupStore';
import type { PopupName } from '@/popupsContainer/composables/popupStore/types';
// import useVisualViewportDiff from '@/useVisualViewportDiff';
import SmoothHeightTransition from '@/components/smoothTransition/SmoothHeightTransition.vue';
import BaseLoader from '@/components/basePreloader/BaseLoader.vue';
import { IconNames } from '@/components/baseIcon/iconNames';
import BaseIcon from '@/components/baseIcon/BaseIcon.vue';
import { usePerfectScrollbar } from '@/usePerfectScrollbar';

const emit = defineEmits(['close']);

const props = withDefaults(
  defineProps<{
    popupName: PopupName;
    isLoading?: boolean;
    hasHeader?: boolean;
    fixedHeader?: boolean;
    hasFooter?: boolean;
    fixedFooter?: boolean;
    customPopupClass?: string;
    withoutCloseBtn?: boolean;
    withoutCloseByOutsideClick?: boolean;
    darkMode?: boolean;
  }>(),
  {
    isLoading: false,
    hasHeader: true,
    fixedHeader: false,
    hasFooter: false,
    fixedFooter: false,
    customPopupClass: '',
    withoutCloseBtn: false,
    withoutCloseByOutsideClick: false,
    darkMode: false,
  }
);
const { closePopup, getActivePopup } = usePopupStore();

//Считаем и компенсируем отступ мобильной клавиатуры //TODO - только на мобилке (а может только на ios)
// const mobileKeyboardHeight = useVisualViewportDiff();

// Perfect scrollbar для контента
const contentElement = ref<HTMLElement | null>(null);
const isContentVisible = computed(() => {
  return !props.isLoading && getActivePopup.value.popupName === props.popupName;
});
usePerfectScrollbar(contentElement, isContentVisible);

const handleClose = () => {
  if (props.withoutCloseByOutsideClick) return;
  closePopup();
  emit('close');
};

const isPointerDownOnWrapSelf = ref(false);

const onWrapPointerDownCapture = (e: PointerEvent) => {
  isPointerDownOnWrapSelf.value = e.target === e.currentTarget;
};

const onWrapPointerCancelCapture = () => {
  isPointerDownOnWrapSelf.value = false;
};

const onWrapClick = () => {
  if (!isPointerDownOnWrapSelf.value) return;
  isPointerDownOnWrapSelf.value = false;
  handleClose();
};
</script>

<style lang="scss">
@use "@/scss/settings" as *;
.base-popup-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999999;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overscroll-behavior: contain;

  @media #{$md} {
    align-items: center;
    padding: rem(40px) 0;
  }
}

.base-popup {
  position: relative;
  background-color: var(--white-100);
  width: 100%;
  border-radius: var(--radius-popup) var(--radius-popup) 0 0;
  &--dark {
    background-color: #2b2e36;
    .base-popup__header {
      background-color: #2b2e36;
      color: var(--white-100);
    }
  }

  @media #{$md} {
    width: auto;
    min-width: rem(360px);
    max-width: rem(768px);
    border-radius: var(--radius-popup);
  }

  &--loading {
    min-height: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media #{$md} {
      min-height: 320px;
    }
  }

  &__close-btn {
    cursor: pointer;
    flex-shrink: 0;
    margin-left: auto;
    display: block;
    align-self: self-start;
  }

  &__close-btn--absolute {
    position: absolute;
    z-index: 99999;
    top: rem(16px);
    right: rem(16px);
    @media #{$md} {
      top: rem(24px);
      right: rem(24px);
    }
  }

  &__header {
    padding: rem(16px);
    display: flex;
    align-items: center;
    border-bottom: 1px solid transparent;
    flex-shrink: 0;
    min-height: 64px;
    border-radius: var(--radius-popup) var(--radius-popup) 0 0;
    @media #{$md} {
      padding: rem(24px);
    }

    &--fixed {
      border-bottom: 1px solid var(--border-divider);
      position: sticky;
      top: 0;
      background-color: var(--white-100);
      z-index: 10;
    }

    &-content {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-between;
    }
  }

  &__content {
    padding: var(--between-base);
    flex: 1 1 auto;
    overflow-y: auto;
    min-height: 0;
    position: relative;
  }

  &__footer {
    padding: var(--between-base);
    border-top: 1px solid transparent;
    flex-shrink: 0;
    border-radius: 0 0 var(--radius-popup) var(--radius-popup);
    &--fixed {
      border-top: 1px solid var(--grey-200);
      position: sticky;
      bottom: 0;
      background-color: var(--white-100);
      z-index: 10;
    }
  }
}
</style>
