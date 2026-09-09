import { createPopper } from '@popperjs/core/lib/popper-lite';
import arrow from '@popperjs/core/lib/modifiers/arrow';
import flip from '@popperjs/core/lib/modifiers/flip';
import offset from '@popperjs/core/lib/modifiers/offset';
import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow';
import { placements } from '@popperjs/core/lib/enums';
import type { Instance, Placement } from '@popperjs/core';
import type { Ref } from 'vue';
import { nextTick, onBeforeUnmount, reactive, toRefs, watch } from 'vue';

type PopperEmit = (event: 'open:popper' | 'close:popper') => void;

type PopperStrategy = 'fixed' | 'absolute';

export type UsePopperArgs = {
  arrowPadding: Ref<number | string>;
  arrowEl?: Ref<HTMLElement | null>;
  emit: PopperEmit;
  locked: Ref<boolean>;
  offsetDistance: Ref<number | string>;
  offsetSkid: Ref<number | string>;
  placement: Ref<Placement>;
  strategy?: Ref<PopperStrategy>;
  onUpdate?: (instance: Instance) => void;
  popperNode: Ref<HTMLElement | null>;
  triggerNode: Ref<HTMLElement | null>;
};

const toInt = (x: number | string) => Number.parseInt(String(x), 10);

// Popper падает с TypeError, если placement не входит в его enum, поэтому подстраховываемся дефолтом.
const toPlacement = (value: Placement): Placement => {
  if (placements.includes(value)) {
    return value;
  }

  console.warn(`[usePopper] invalid placement "${value}", fallback to "bottom"`);

  return 'bottom';
};

export default function usePopper({
  arrowPadding,
  arrowEl,
  emit,
  locked,
  offsetDistance,
  offsetSkid,
  placement,
  strategy,
  onUpdate,
  popperNode,
  triggerNode,
}: UsePopperArgs) {
  const state = reactive<{ isOpen: boolean; popperInstance: Instance | null }>({
    isOpen: false,
    popperInstance: null,
  });

  // Enable or disable event listeners to optimize performance.
  const setPopperEventListeners = (enabled: boolean) => {
    state.popperInstance?.setOptions((options) => {
      const modifiers = (options.modifiers ?? []).filter((m) => m.name !== 'eventListeners');

      return {
        ...options,
        modifiers: [...modifiers, { name: 'eventListeners', enabled }],
      };
    });
  };

  const enablePopperEventListeners = () => setPopperEventListeners(true);
  const disablePopperEventListeners = () => setPopperEventListeners(false);

  const close = (): void => {
    if (!state.isOpen) {
      return;
    }

    state.isOpen = false;
    emit('close:popper');
  };

  const open = (): void => {
    if (state.isOpen) {
      return;
    }

    state.isOpen = true;
    emit('open:popper');
  };

  // When isOpen or placement change
  watch([() => state.isOpen, placement], async ([isOpen]) => {
    if (isOpen) {
      await initializePopper();
      enablePopperEventListeners();
    } else {
      disablePopperEventListeners();
    }
  });

  const initializePopper = async (): Promise<void> => {
    await nextTick();
    const referenceEl = triggerNode.value;
    const popperEl = popperNode.value;

    if (!referenceEl || !popperEl) {
      return;
    }

    state.popperInstance?.destroy();
    state.popperInstance = createPopper(referenceEl, popperEl, {
      strategy: strategy?.value ?? 'fixed',
      placement: toPlacement(placement.value),
      modifiers: [
        {
          ...preventOverflow,
          options: {
            ...(preventOverflow.options ?? {}),
            padding: 8,
            altAxis: true,
          },
        },
        {
          ...flip,
          enabled: !locked.value,
          options: {
            ...(flip.options ?? {}),
            padding: 8,
          },
        },
        {
          ...arrow,
          options: {
            element: arrowEl?.value ?? undefined,
            padding: toInt(arrowPadding.value),
          },
        },
        {
          ...offset,
          options: {
            offset: [toInt(offsetSkid.value), toInt(offsetDistance.value)],
          },
        },
        {
          name: 'vueStyleSync',
          enabled: Boolean(onUpdate),
          phase: 'write',
          fn: () => {
            if (state.popperInstance && onUpdate) onUpdate(state.popperInstance);
          },
        },
      ],
    });

    // Update its position
    state.popperInstance.update();
    if (onUpdate) onUpdate(state.popperInstance);
  };

  onBeforeUnmount(() => {
    state.popperInstance?.destroy();
  });

  return {
    ...toRefs(state),
    open,
    close,
  };
}
