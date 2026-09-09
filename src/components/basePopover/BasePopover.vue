<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import DefaultPopover from '@fc/components/basePopover/DefaultPopover.vue';
import { Position, Side } from '@fc/components/types/BaseElementsType';
import BaseIcon from '@fc/components/baseIcon/BaseIcon.vue';
import { IconNames } from '@fc/components/baseIcon';

type TooltipTrigger = 'hover' | 'click' | 'manual';
type TooltipPlacement = Position;
type TooltipAlign = Side;

const props = withDefaults(
  defineProps<{
    text?: string;
    open?: boolean;
    defaultOpen?: boolean;
    trigger?: TooltipTrigger;
    placement?: TooltipPlacement;
    align?: TooltipAlign;
    offset?: number;
    openDelay?: number;
    closeDelay?: number;
    disabled?: boolean;
    teleport?: boolean;
    zIndex?: number;
    arrow?: boolean;
    closeOnClickOutside?: boolean;
    closeOnEsc?: boolean;
    interactive?: boolean;
    fullWidth?: boolean;
    closeIcon?: boolean;
    autoPlacement?: boolean;
  }>(),
  {
    text: '',
    open: undefined,
    defaultOpen: false,
    trigger: 'hover',
    placement: Position.Top,
    align: Side.Center,
    offset: 8,
    openDelay: 100,
    closeDelay: 100,
    disabled: false,
    teleport: true,
    zIndex: 10000,
    arrow: true,
    closeOnClickOutside: true,
    closeOnEsc: true,
    interactive: true,
    fullWidth: false,
    closeIcon: true,
    autoPlacement: false,
  }
);

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void;
  (e: 'open' | 'close'): void;
}>();

const localIsOpen = ref(Boolean(props.defaultOpen));

function onUpdateOpen(value: boolean) {
  localIsOpen.value = value;
  emit('update:open', value);
}

watch(
  () => props.open,
  (value) => {
    if (typeof value === 'boolean') localIsOpen.value = value;
  }
);

const tooltipClass = computed(() => {
  return [
    'base-popover__popup',
    `base-popover__popup--${props.placement}`,
    {
      'base-popover__popup--arrow': props.arrow,
      'base-popover__popup--open': localIsOpen.value,
      // 'base-popover__popup--dark': props.dark,
    },
  ];
});
</script>

<template>
  <DefaultPopover
    tag="span"
    class="base-popover"
    :class="{ fullWidth: props?.fullWidth }"
    v-bind="props"
    @update:open="onUpdateOpen"
    @open="emit('open')"
    @close="emit('close')"
  >
    <template #trigger="{ isOpen: slotIsOpen, setOpen, onMouseenter, onMouseleave, onClick, setRef }">
      <span
        :ref="setRef"
        class="base-popover__trigger"
        @mouseenter="onMouseenter"
        @mouseleave="onMouseleave"
        @click="onClick"
      >
        <slot name="trigger" :open="slotIsOpen" :set-open="setOpen">
          <slot :open="slotIsOpen" :set-open="setOpen" />
        </slot>
      </span>
    </template>

    <template
      #content="{
        isOpen: slotIsOpen,
        setOpen,
        onMouseenter,
        onMouseleave,
        floatingStyle,
        arrowStyle,
        setRef,
        setArrowRef,
      }"
    >
      <div
        v-show="slotIsOpen"
        :ref="setRef"
        :class="tooltipClass"
        :style="floatingStyle"
        role="tooltip"
        @mouseenter="onMouseenter"
        @mouseleave="onMouseleave"
      >
        <div class="base-popover__content">
          <BaseIcon
            v-if="closeIcon"
            fontSize="12px"
            :iconName="IconNames.Close"
            textColor="--fg-muted"
            class="base-popover__close-icon"
            @click="emit('close')"
          />
          <slot name="content" :open="slotIsOpen" :set-open="setOpen">
            {{ text }}
          </slot>
        </div>
        <div v-if="arrow" :ref="setArrowRef" class="base-popover__arrow" :style="arrowStyle" />
      </div>
    </template>
  </DefaultPopover>
</template>

<style lang="scss">
@use "@fc/scss/settings" as *;
.base-popover {
  display: inline-flex;

  &.fullWidth {
    width: 100%;
    .base-popover__trigger {
      width: 100%;
    }
  }
}
.base-popover__trigger {
  display: inline-flex;
}

.base-popover__popup {
  pointer-events: auto;
  background: var(--white-100);
  color: var(--black-100);
  border-radius: 6px;
  padding: rem(12px);
  max-width: 320px;
  box-shadow: 0 rem(8px) rem(20px) rgba(0, 0, 0, 0.1);
  position: relative;
}

.base-popover__popup--dark {
  background: color-mix(in srgb, black 80%, white);
  color: var(--white-100);

  .base-popover__arrow {
    background: color-mix(in srgb, black 80%, white);
  }
}

.base-popover__content {
  white-space: normal;
  // min-height: 62px;
  position: relative;
  z-index: 1;
  background: var(--white-100);
  border-radius: inherit;
}

.base-popover__arrow {
  position: absolute;
  width: 8px;
  height: 8px;
  z-index: 0;
  pointer-events: none;

  &::before {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    background: var(--white-100);
    transform: rotate(45deg);
  }
}

.base-popover__popup--top {
  .base-popover__arrow {
    bottom: -4px;
  }
}

.base-popover__popup--bottom {
  .base-popover__arrow {
    top: -4px;
  }
}

.base-popover__popup--left {
  .base-popover__arrow {
    right: -4px;
  }
}

.base-popover__popup--right {
  .base-popover__arrow {
    left: -4px;
  }
}

.base-popover__close-icon {
  position: absolute;
  padding: rem(12px);
  top: 0px;
  right: 0px;
  cursor: pointer;
}
</style>
