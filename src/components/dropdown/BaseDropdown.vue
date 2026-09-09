<template>
  <DefaultPopover
    :class="['dropdown', positionClass, { 'dropdown--show': showDropdown }]"
    trigger="click"
    :close-on-esc="false"
    :placement="position"
    :auto-placement="autoPosition"
    @open="showDropdown = true"
    @close="showDropdown = false"
    @placement-resolved="resolvedPosition = $event"
  >
    <template #trigger="{ onClick }">
      <div class="dropdown__active" :style="activeStyle" @click="onClick">
        <slot name="active">
          <BaseIcon
            class="dropdown__active__icon"
            tagName="div"
            :iconName="IconNames.Down"
            textColor="red"
            fontSize="16px"
            size="16px"
          />
        </slot>
      </div>
    </template>
    <template #content="{ isOpen, setOpen, setRef }">
      <div v-if="isOpen" :ref="setRef" :class="['dropdown__inner']" :style="dropdownStyles">
        <div class="dropdown__items" @click="setOpen(false)">
          <slot name="items"> </slot>
        </div>
      </div>
    </template>
  </DefaultPopover>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
// TODO: больше пропсов на стили сделать
import BaseIcon from '@fc/components/baseIcon/BaseIcon.vue';
import { IconNames } from '@fc/components/baseIcon/iconNames';
import DefaultPopover from '@fc/components/basePopover/DefaultPopover.vue';

type DropdownPosition = 'top' | 'bottom' | 'left' | 'right';

const props = withDefaults(
  defineProps<{
    height?: string | number;
    width?: string | number;
    activeStyle?: string;
    position?: DropdownPosition;
    autoPosition?: boolean;
  }>(),
  {
    height: '120px',
    width: '160px',
    activeStyle: '',
    position: 'top',
    autoPosition: false,
  }
);

const showDropdown = ref(false);
const resolvedPosition = ref<DropdownPosition>(props.position);

const positionClass = computed(() => `dropdown--pos-${resolvedPosition.value}`);

const dropdownStyles = computed(() => ({
  '--height': typeof props.height === 'number' ? `${props.height}px` : props.height,
  '--width': typeof props.width === 'number' ? `${props.width}px` : props.width,
  '--opacity': showDropdown.value ? 1 : 0,
}));
</script>
<style lang="scss">
@use "@fc/scss/settings" as *;
.dropdown {
  position: relative;
  &__inner {
    position: absolute;
    width: var(--width);
    background: var(--white-100);
    border-radius: 4px;
    transition: opacity 0.6s;

    height: 0;
    padding: 0;

    left: 50%;
    transform: translateX(-50%);
    ::-webkit-scrollbar {
      width: rem(3px);
      position: relative;
    }
    ::-webkit-scrollbar-thumb {
      background: var(--grey-200);
      border-radius: 4px;
    }
  }

  &--pos-top {
    .dropdown__inner {
      bottom: calc(100% + 8px);
    }
  }

  &--pos-bottom {
    .dropdown__inner {
      top: calc(100% + 8px);
    }
  }

  &--pos-left {
    .dropdown__inner {
      right: calc(100% + 8px);
      left: auto;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  &--pos-right {
    .dropdown__inner {
      left: calc(100% + 8px);
      top: 50%;
      transform: translateY(-50%);
    }
  }

  &__items {
    overflow-y: auto; /* Добавлено свойство overflow-y */
    height: 100%; /* Убедитесь, что высота установлена */
  }
  .dropdown__active {
    cursor: pointer;
    .dropdown__active__icon {
      transition: all 0.2s;
    }
  }
  &--show {
    .dropdown__active__icon {
      transform: rotate(180deg);
    }
    .dropdown__inner {
      height: var(--height);
      padding: rem(8px) 0;
      color: var(--black-60);
      z-index: 10000;
      border-radius: 8px;
      background: #fff;
      box-shadow: 0 8px 14px 0 var(--effects-shadow, rgba(0, 0, 0, 0.1));
    }
  }
}
</style>
