import { Ref } from 'vue';
import { SpinState } from '../types';
import { getDefaultState } from '../Helpers/getPersistedState';

export function useRouletteActions(state: Ref<SpinState>, availableSpins: Ref<number>) {
  /** Decrease spins counter */
  function decreaseSpin(): number {
    if (availableSpins.value === 0) return 0;
    state.value.used += 1;
    return availableSpins.value;
  }

  /** Reset spins counter */
  function resetSpins(): void {
    Object.assign(state.value, { ...getDefaultState(), closed: state.value.closed });
  }

  /** Make roulette modal hidden */
  function hideRoulette(): void {
    state.value.closed = true;
  }

  /** Make roulette modal visible */
  function showRoulette(): void {
    state.value.closed = false;
  }

  return {
    decreaseSpin,
    resetSpins,
    hideRoulette,
    showRoulette,
  };
}
