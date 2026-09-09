<script setup lang="ts">
import { computed } from 'vue';
import BaseTooltip from '@/components/baseTooltip/baseTooltip.vue';
import BaseIcon from '@/components/baseIcon/BaseIcon.vue';
import { useConfigStore } from '@/composables/useConfigStore';
import { Position, Side } from '@/components/types/BaseElementsType';
import type { IconParams } from '@/components/baseIcon/types';

const { t } = useConfigStore();

type RatingTooltip = {
  text?: string;
  placement?: Position;
  align?: Side;
  [key: string]: unknown;
};

const DEFAULT_RATING_TOOLTIP_HTML = t(
  '<p>Legalbet is completely honest with its users. Paid ratings will always have a "Top paid" mark on them.</p><p>If you see a "Not for sale" mark it means that it is a guaranteed fair rating.</p>'
);

const defaultNotPaid = t(
  'Legalbet ratings are compiled from a mixture of data analysis combined with our experts independent judgment using empirical experience. You cannot buy a position in these ratings.'
);

const props = withDefaults(
  defineProps<{
    variant?: 'paid' | 'paid-soft' | 'free' | 'free-soft';
    text?: string;
    tooltip?: RatingTooltip;
    rounded?: boolean;
    icon?: IconParams | null;
  }>(),
  {
    variant: 'paid',
    text: '',
    tooltip: undefined,
    rounded: false,
    icon: null,
  }
);

const text = computed(() => {
  if (props.text) return props.text;
  if (props.variant === 'paid' || props.variant === 'paid-soft') return 'Top is paid';
  if (props.variant === 'free' || props.variant === 'free-soft') return 'Not selling';
  return '';
});

const ratingTooltipHtml = computed(() => {
  if (typeof props.tooltip?.text === 'string' && props.tooltip.text.length) return props.tooltip.text;
  if (props.variant === 'free' || props.variant === 'free-soft') return defaultNotPaid;
  return DEFAULT_RATING_TOOLTIP_HTML;
});

const tooltipProps = computed(
  (): RatingTooltip => ({
    placement: Position.Top,
    align: Side.Center,
    text: '',
    ...(props.tooltip ?? {}),
  })
);

const rootClass = computed(() => [
  'base-status',
  'base-status--category-rating',
  `base-status--variant-${props.variant}`,
  {
    'base-status--with-tooltip': true,
    'base-status--rounded': props.rounded,
  },
]);
</script>
<template>
  <div class="base-status-wrapper--rating">
    <div :class="rootClass">
      <BaseTooltip v-bind="tooltipProps" trigger="hover" :dark="false">
        <template #content>
          <div v-html="ratingTooltipHtml" />
        </template>
        <template #trigger>
          <span>
            <span class="base-status__text">
              <BaseIcon v-if="props?.icon" v-bind="props?.icon" />
              <slot>{{ t(text) }}</slot>
            </span>
          </span>
        </template>
      </BaseTooltip>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/scss/settings" as *;
.base-status {
  border-radius: rem(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: rem(12px);
  font-style: normal;
  font-weight: 500;
  line-height: 14px;
  width: fit-content;

  &__text {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &.base-status--rounded {
    border-radius: rem(12px) !important;
  }

  &.base-status--category-rating {
    min-width: 9rem;
    cursor: pointer;
    z-index: 2;
    transform: rotate(30deg);
    font-size: 10px;
    font-style: normal;
    font-weight: 700;
    line-height: 10px;
    letter-spacing: 0.2px;
    padding: 0.35rem 2.3rem 0.35rem 2.6rem;
    text-align: center;

    &.base-status--variant-paid-soft {
      background: color-mix(in srgb, var(--yellow-500) 20%, transparent);
      color: var(--yellow-500);
    }
    &.base-status--variant-paid {
      background: var(--yellow-500);
      color: var(--white-100);
    }
    &.base-status--variant-free {
      background: var(--mint-500);
      color: var(--white-100);
      &-soft {
        background: var(--mint-200);
        color: var(--mint-500);
      }
    }
  }
}

.base-status-wrapper--rating {
  position: relative;
  width: 6.5rem;
  height: 4rem;
  overflow: hidden;
  position: absolute;
  top: 0;
  right: 0;
  text-transform: uppercase;
}
</style>
