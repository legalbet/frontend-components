import { computed, Ref } from 'vue';
import { StoreConfig } from '../Helpers/types';
import { SpinState } from '../types';

export function useRouletteGetters(config: StoreConfig, state: Ref<SpinState>) {
  const availableSpins = computed(() => Math.max(0, config.maxSpins - state.value.used));
  const rouletteHidden = computed(() => state.value.closed);

  return {
    availableSpins,
    rouletteHidden,
  };
}
