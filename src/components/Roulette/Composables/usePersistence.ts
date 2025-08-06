import { Ref, watch } from 'vue';
import { SpinState } from '../types';
import { StoreConfig } from '../Helpers/types';
import { setPersistedState } from '../Helpers/getPersistedState';

export function usePersistence(state: Ref<SpinState>, config: StoreConfig, availableSpins: Ref<number>) {
  watch(
    state,
    (newState) => {
      setPersistedState(config.storeKey, {
        ...newState,
        closed: !newState.closed && availableSpins.value === 0 ? true : newState.closed,
      });
    },
    { deep: true }
  );
}
