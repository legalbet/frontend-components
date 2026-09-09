<script setup lang="ts">
import { ref computed watch onBeforeUnmount } from 'vue';
import DefaultPopover from '@/components/basePopover/DefaultPopover.vue';
import { Position, Side } from '@/components/types/BaseElementsType';

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
    closeDelay?: number | null;
    disabled?: boolean;
    teleport?: boolean;
    zIndex?: number;
    arrow?: boolean;
    closeOnClickOutside?: boolean;
    closeOnEsc?: boolean;
    interactive?: boolean;
    fullWidth?: boolean;
    dark?: boolean;
    strategy?: 'fixed' | 'absolute';
  }>(),
  {
    text: '',
    open: undefined,
    defaultOpen: false,
    trigger: 'hover',
    placement: Position.Top,
    align: Side.Center,
    offset: 8,
    closeDelay: null,
    disabled: false,
    teleport: true,
    zIndex: 10000,
    arrow: true,
    closeOnClickOutside: true,
    closeOnEsc: true,
    interactive: true,
    fullWidth: false,
    dark: true,
    strategy: 'absolute',
  }
);

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void;
  (e: 'open' | 'close'): void;
}>();

const localIsOpen = ref(Boolean(props.defaultOpen));

const resolvedPlacement = ref(props.placement);

let autoCloseTimer: number | undefined;

function clearAutoCloseTimer() {
  if (autoCloseTimer) window.clearTimeout(autoCloseTimer);
  autoCloseTimer = undefined;
}

function onUpdateOpen(value: boolean) {
  localIsOpen.value = value;
  emit('update:open', value);
}

watch(
  () => localIsOpen.value,
  (isOpen) => {
    clearAutoCloseTimer();

    if (!isOpen) return;
    if (typeof props.closeDelay !== 'number') return;
    if (props.closeDelay <= 0) return;

    autoCloseTimer = window.setTimeout(() => {
      onUpdateOpen(false);
    }, props.closeDelay);
  }
);

onBeforeUnmount(() => {
  clearAutoCloseTimer();
});

watch(
  () => props.open,
  (value) => {
    if (typeof value === 'boolean') localIsOpen.value = value;
  }
);

const tooltipClass = computed(() => {
  return [
    'base-tooltip__popup',
    `base-tooltip__popup--${resolvedPlacement.value}`,
    {
      'base-tooltip__popup--arrow': props.arrow,
      'base-tooltip__popup--open': localIsOpen.value,
      'base-tooltip__popup--dark': props.dark,
    },
  ];
});
</script>

<template>
  <DefaultPopover
    tag="span"
    class="base-tooltip"
    :class="{ fullWidth: props?.fullWidth }"
    v-bind="props"
    :open="localIsOpen"
    :strategy="props?.strategy"
    @update:open="onUpdateOpen"
    @open="emit('open')"
    @close="emit('close')"
    @placement-resolved="resolvedPlacement = $event"
  >
    <template #trigger="{ isOpen: slotIsOpen, setOpen, onMouseenter, onMouseleave, onClick, setRef }">
      <span
        :ref="setRef"
        class="base-tooltip__trigger"
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
      #content="{ isOpen: slotIsOpen, setOpen, onMouseenter, onMouseleave, floatingStyle, setRef, setArrowRef }"
    >
      <div
        v-if="slotIsOpen"
        :ref="setRef"
        :class="tooltipClass"
        :style="floatingStyle"
        role="tooltip"
        @mouseenter="onMouseenter"
        @mouseleave="onMouseleave"
      >
        <div class="base-tooltip__content">
          <slot name="content" :open="slotIsOpen" :set-open="setOpen">
            {{ text }}
          </slot>
        </div>
        <div v-if="arrow" :ref="setArrowRef" class="base-tooltip__arrow">
          <div class="base-tooltip__arrow-inner" />
        </div>
      </div>
    </template>
  </DefaultPopover>
</template>

<style lang="scss">
@use "@/scss/settings" as *;
.base-tooltip {
  display: inline-flex;

  &.fullWidth {
    width: 100%;

    .base-tooltip__trigger {
      width: 100%;
    }
  }
}

.base-tooltip__trigger {
  display: inline-flex;
}

.base-tooltip__popup {
  pointer-events: auto;
  background: var(--white-100);
  color: var(--black-100);
  border-radius: 6px;
  padding: rem(8px) rem(10px);
  position: relative;
  max-width: min(320px, calc(100vw - 16px));
  box-sizing: border-box;
  box-shadow: 0 rem(8px) rem(20px) rgba(0, 0, 0, 0.1);
}

.base-tooltip__popup--dark {
  background: color-mix(in srgb, black 80%, white);
  color: var(--white-100);

  .base-tooltip__arrow-inner {
    background: color-mix(in srgb, black 80%, white);
  }
}

.base-tooltip__content {
  white-space: normal;
  overflow-wrap: anywhere;
}

.base-tooltip__arrow {
  position: absolute;
  width: 14px;
  height: 8px;
}

.base-tooltip__arrow-inner {
  width: 100%;
  height: 100%;
  background: var(--white-100);
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}

.base-tooltip__popup--top {
  .base-tooltip__arrow {
    bottom: -6px;
  }

  .base-tooltip__arrow-inner {
    transform: rotate(180deg);
  }
}

.base-tooltip__popup--bottom {
  .base-tooltip__arrow {
    top: -6px;
  }

  .base-tooltip__arrow-inner {
    transform: rotate(0deg);
  }
}

.base-tooltip__popup--left {
  .base-tooltip__arrow {
    right: -6px;
  }

  .base-tooltip__arrow-inner {
    transform: rotate(90deg);
  }
}

.base-tooltip__popup--right {
  .base-tooltip__arrow {
    left: -6px;
  }

  .base-tooltip__arrow-inner {
    transform: rotate(-90deg);
  }
}
</style>
