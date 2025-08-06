import { ref, reactive } from 'vue';
import { SpinState } from '../types';
import { DEFAULT_RESET_INTERVAL_MS, DEFAULT_STORE_KEY, MAX_SPINS } from '../constants';
import { StoreConfig } from '../Helpers/types';
import { loadPersistedState } from '../Helpers/getPersistedState';

export function useRouletteState(options?: Partial<StoreConfig>) {
  const config = reactive<StoreConfig>({
    maxSpins: MAX_SPINS,
    resetIntervalMs: DEFAULT_RESET_INTERVAL_MS,
    storeKey: DEFAULT_STORE_KEY,
  });

  const state = ref<SpinState>(loadPersistedState(config.storeKey, config.resetIntervalMs));

  if (options) {
    if (options.maxSpins !== undefined) {
      config.maxSpins = options.maxSpins;
    }

    if (options.resetIntervalMs !== undefined && options.resetIntervalMs !== config.resetIntervalMs) {
      config.resetIntervalMs = options.resetIntervalMs;
      state.value = loadPersistedState(config.storeKey, config.resetIntervalMs);
    }

    if (options.storeKey !== undefined && options.storeKey !== config.storeKey) {
      config.storeKey = options.storeKey;
      state.value = loadPersistedState(config.storeKey, config.resetIntervalMs);
    }
  }

  return {
    config,
    state,
  };
}
