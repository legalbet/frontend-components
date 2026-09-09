<template>
  <div :class="['dropdown__item', computedClasses]">
    <BaseIcon v-if="hasIcon && props.icon?.iconName" v-bind="props.icon" :textColor="active ? 'white' : undefined" />
    {{ label }}
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { IconPosition } from '@fc/components/types/BaseElementsType';
import BaseIcon from '@fc/components/baseIcon/BaseIcon.vue';
import type { IconParams } from '@fc/components/baseIcon/types';

const props = withDefaults(
  defineProps<{
    label: string;
    iconPosition?: IconPosition;
    disabled?: boolean;
    active?: boolean;
    icon?: IconParams;
  }>(),
  {
    iconPosition: IconPosition.NoIcon,
    disabled: false,
    active: false,
  }
);

const hasIcon = computed(() => props.iconPosition !== IconPosition.NoIcon);

const computedClasses = computed(() => ({
  'dropdown__item--active': props.active,
  'dropdown__item--disabled': props.disabled,
  'dropdown__item--left-icon': props.iconPosition === IconPosition.LeftIcon,
  'dropdown__item--right-icon': props.iconPosition === IconPosition.RightIcon,
}));
</script>
<style lang="scss">
@use '@fc/scss/settings' as *;
.dropdown__item {
  display: flex;
  align-items: center;
  gap: rem(8px);
  cursor: pointer;
  padding: 8px 12px;
  min-height: 32px;
  color: var(--grey-800);
  &--active {
    background: var(--bg-level);
    cursor: pointer;
    color: var(--fg-default);
    .select-option__count {
      color: white;
    }
  }
  &:hover {
    color: var(--white-100);
    background: var(--primary-default);
  }
  &--disabled {
    pointer-events: none;
    color: var(--grey-400);
  }

  &--left-icon {
    justify-content: flex-start;
  }

  &--right-icon {
    justify-content: space-between;
    flex-direction: row-reverse;
  }
}
</style>
