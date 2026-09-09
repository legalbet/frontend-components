<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick, type ComponentPublicInstance } from 'vue';
import type { Placement } from '@popperjs/core';
import usePopper from '@fc/usePoper';

type PopoverTrigger = 'hover' | 'click' | 'manual';
type FloatingPlacement = 'top' | 'bottom' | 'left' | 'right';
type FloatingAlign = 'start' | 'center' | 'end';
type FloatingStrategy = 'fixed' | 'absolute';

const props = withDefaults(
  defineProps<{
    tag?: string;
    trigger?: PopoverTrigger;
    open?: boolean;
    defaultOpen?: boolean;
    disabled?: boolean;
    openDelay?: number;
    closeDelay?: number;
    closeOnClickOutside?: boolean;
    closeOnEsc?: boolean;
    interactive?: boolean;
    placement?: FloatingPlacement;
    align?: FloatingAlign;
    offset?: number;
    zIndex?: number;
    autoPlacement?: boolean;
    teleport?: boolean;
    teleportTo?: string;
    /**
     * 'fixed' — позиция считается в координатах viewport и пересчитывается на каждый скролл (нужен, когда поповер должен «прилипать» к экрану).
     * 'absolute' — позиция привязана к документу (через scrollX/scrollY), поповер едет вместе со страницей без пересчёта на скролле. Использовать по умолчанию, если поповер не в оверлее.
     */
    strategy?: FloatingStrategy;
  }>(),
  {
    tag: 'div',
    trigger: 'click',
    open: undefined,
    defaultOpen: false,
    disabled: false,
    openDelay: 0,
    closeDelay: 0,
    closeOnClickOutside: true,
    closeOnEsc: false,
    interactive: false,
    align: 'end',
    offset: 8,
    zIndex: 10000,
    autoPlacement: false,
    teleport: false,
    teleportTo: 'body',
    strategy: 'fixed',
  }
);

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void;
  (e: 'open' | 'close' | 'reposition'): void;
  (e: 'placement-resolved', placement: FloatingPlacement): void;
}>();

// --- open state ---
const rootEl = ref<HTMLElement | null>(null);
const uncontrolledOpen = ref(Boolean(props.defaultOpen));
const isControlled = computed(() => typeof props.open === 'boolean');
const isOpen = computed<boolean>(() => (isControlled.value ? Boolean(props.open) : uncontrolledOpen.value));

function setOpen(value: boolean) {
  if (props.disabled) return;
  if (!isControlled.value) uncontrolledOpen.value = value;
  emit('update:open', value);
  if (value) emit('open');
  else emit('close');
}

function toggle() {
  setOpen(!isOpen.value);
}

// --- timers ---
let openTimer: number | undefined;
let closeTimer: number | undefined;

function clearTimers() {
  if (openTimer) window.clearTimeout(openTimer);
  if (closeTimer) window.clearTimeout(closeTimer);
  openTimer = undefined;
  closeTimer = undefined;
}

function scheduleOpen() {
  if (props.disabled) return;
  clearTimers();
  openTimer = window.setTimeout(() => setOpen(true), props.openDelay);
}

function scheduleClose() {
  clearTimers();
  closeTimer = window.setTimeout(() => setOpen(false), props.closeDelay);
}

// --- trigger handlers ---
function onTriggerMouseEnter() {
  if (props.trigger !== 'hover') return;
  scheduleOpen();
}

function onTriggerMouseLeave() {
  if (props.trigger !== 'hover') return;
  scheduleClose();
}

function onTriggerClick() {
  if (props.trigger !== 'click') return;
  clearTimers();
  toggle();
}

function onContentMouseEnter() {
  if (props.trigger !== 'hover' || !props.interactive) return;
  clearTimers();
}

function onContentMouseLeave() {
  if (props.trigger !== 'hover' || !props.interactive) return;
  scheduleClose();
}

// --- click outside ---
const clickOutsideListener = (event: MouseEvent) => {
  if (!props.closeOnClickOutside || !isOpen.value || props.trigger === 'manual') return;
  if (event.target === rootEl.value || event.composedPath().includes(rootEl.value as HTMLElement)) return;
  setOpen(false);
};

// --- ESC key ---
function onKeydown(event: KeyboardEvent) {
  if (!props.closeOnEsc || event.key !== 'Escape' || !isOpen.value || props.trigger === 'manual') return;
  setOpen(false);
}

// --- scroll/resize reposition ---
function repositionHandler() {
  if (!isOpen.value) return;
  popperInstance.value?.update();
  emit('reposition');
}

watch(
  () => isOpen.value,
  (value) => {
    if (value) {
      //Для absolute-стратегии поповер едет вместе со страницей — scroll-listener только дёргает зря.
      if (props.strategy === 'fixed') {
        window?.addEventListener('scroll', repositionHandler, true);
      }
      window?.addEventListener('resize', repositionHandler);
    } else {
      window?.removeEventListener('scroll', repositionHandler, true);
      window?.removeEventListener('resize', repositionHandler);
    }
  },
  { immediate: true }
);

onMounted(() => {
  window?.addEventListener('keydown', onKeydown);
  window?.addEventListener('click', clickOutsideListener);
});

onBeforeUnmount(() => {
  window?.removeEventListener('keydown', onKeydown);
  window?.removeEventListener('click', clickOutsideListener);
  window?.removeEventListener('scroll', repositionHandler, true);
  window?.removeEventListener('resize', repositionHandler);
  clearTimers();
});

const triggerElRef = ref<HTMLElement | null>(null);
const contentElRef = ref<HTMLElement | null>(null);
const arrowElRef = ref<HTMLElement | null>(null);

function setTriggerRef(el: Element | ComponentPublicInstance | null) {
  triggerElRef.value = el as HTMLElement | null;
}

function setContentRef(el: Element | ComponentPublicInstance | null) {
  contentElRef.value = el as HTMLElement | null;
}

function setArrowRef(el: Element | ComponentPublicInstance | null) {
  arrowElRef.value = el as HTMLElement | null;
}

const floatingStyle = ref<Record<string, string>>({
  position: 'fixed',
  top: '0px',
  left: '0px',
  opacity: '0',
  pointerEvents: 'none',
  visibility: 'hidden',
  zIndex: String(props.zIndex),
});

const arrowStyle = ref<Record<string, string>>({});

const resolvedPlacement = ref<FloatingPlacement | undefined>(props.placement);

const popperPlacement = computed<Placement>(() => {
  const base: FloatingPlacement = resolvedPlacement.value ?? props.placement ?? 'bottom';

  if (base === 'top' || base === 'bottom') {
    if (props.align === 'start') return `${base}-start`;
    if (props.align === 'end') return `${base}-end`;
    return base;
  }

  if (props.align === 'start') return `${base}-start`;
  if (props.align === 'end') return `${base}-end`;
  return base;
});

const popperPlacementRef = popperPlacement;
const lockedRef = computed(() => !props.autoPlacement);
const offsetDistanceRef = computed(() => props.offset);
const offsetSkidRef = computed(() => 0);
const arrowPaddingRef = computed(() => 0);
const strategyRef = computed(() => props.strategy);

const {
  open: popperOpen,
  close: popperClose,
  popperInstance,
} = usePopper({
  arrowPadding: arrowPaddingRef,
  arrowEl: arrowElRef,
  emit: () => {},
  locked: lockedRef,
  offsetDistance: offsetDistanceRef,
  offsetSkid: offsetSkidRef,
  placement: popperPlacementRef,
  strategy: strategyRef,
  popperNode: contentElRef,
  triggerNode: triggerElRef,
  onUpdate: (instance) => {
    const popperStyles = instance.state.styles.popper ?? {};
    const basePlacement = (instance.state.placement.split('-')[0] ?? 'bottom') as FloatingPlacement;

    if (basePlacement !== resolvedPlacement.value) {
      resolvedPlacement.value = basePlacement;
      emit('placement-resolved', basePlacement);
    }

    floatingStyle.value = {
      position: String(popperStyles.position ?? (props.strategy === 'absolute' ? 'absolute' : 'fixed')),
      top: String(popperStyles.top ?? ''),
      left: String(popperStyles.left ?? ''),
      transform: String(popperStyles.transform ?? ''),
      zIndex: String(props.zIndex),
      opacity: isOpen.value ? '1' : '0',
      pointerEvents: isOpen.value ? 'auto' : 'none',
      visibility: isOpen.value ? 'visible' : 'hidden',
    };

    const arrowStyles = instance.state.styles.arrow ?? {};
    arrowStyle.value = {
      top: arrowStyles.top !== undefined ? String(arrowStyles.top) : '',
      left: arrowStyles.left !== undefined ? String(arrowStyles.left) : '',
    };
  },
});

watch(
  () => props.placement,
  (val) => {
    if (!props.autoPlacement) resolvedPlacement.value = val;
  }
);

watch(
  () => isOpen.value,
  (value) => {
    if (!value) {
      floatingStyle.value = {
        ...floatingStyle.value,
        zIndex: String(props.zIndex),
        opacity: '0',
        pointerEvents: 'none',
        visibility: 'hidden',
      };
      popperClose();
      return;
    }

    popperOpen();
  }
);

watch(
  () => [props.align, props.offset, props.zIndex, props.strategy, props.autoPlacement] as const,
  async () => {
    if (!isOpen.value) return;
    await nextTick();
    popperInstance.value?.update();
  }
);

defineExpose({ rootEl, isOpen, setOpen, toggle, floatingStyle, arrowStyle, resolvedPlacement });
</script>

<template>
  <component :is="tag" ref="rootEl">
    <slot
      name="trigger"
      :is-open="isOpen"
      :set-open="setOpen"
      :toggle="toggle"
      :on-mouseenter="onTriggerMouseEnter"
      :on-mouseleave="onTriggerMouseLeave"
      :on-click="onTriggerClick"
      :set-ref="setTriggerRef"
    />
    <Teleport v-if="teleport" :to="teleportTo">
      <slot
        name="content"
        :is-open="isOpen"
        :set-open="setOpen"
        :toggle="toggle"
        :on-mouseenter="onContentMouseEnter"
        :on-mouseleave="onContentMouseLeave"
        :floating-style="floatingStyle"
        :arrow-style="arrowStyle"
        :set-ref="setContentRef"
        :set-arrow-ref="setArrowRef"
      />
    </Teleport>
    <slot
      v-else
      name="content"
      :is-open="isOpen"
      :set-open="setOpen"
      :toggle="toggle"
      :on-mouseenter="onContentMouseEnter"
      :on-mouseleave="onContentMouseLeave"
      :floating-style="floatingStyle"
      :arrow-style="arrowStyle"
      :set-ref="setContentRef"
      :set-arrow-ref="setArrowRef"
    />
  </component>
</template>
