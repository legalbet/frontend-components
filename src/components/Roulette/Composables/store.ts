import { useRouletteState } from './useRouletteState';
import { useRouletteGetters } from './useRouletteGetters';
import { useRouletteActions } from './useRouletteActions';
import { usePersistence } from './usePersistence';
import { StoreConfig } from '../Helpers/types';

// --------------------------------------------------------------------------------
// Main store composable
// --------------------------------------------------------------------------------

export function useRouletteStore(options?: Partial<StoreConfig>) {
  const { state, config } = useRouletteState(options);
  const { availableSpins, rouletteHidden } = useRouletteGetters(config, state);
  const { decreaseSpin, resetSpins, hideRoulette, showRoulette } = useRouletteActions(state, availableSpins);

  usePersistence(state, config, availableSpins);

  return {
    // State
    state,
    // Getters
    availableSpins,
    rouletteHidden,
    // Actions
    decreaseSpin,
    resetSpins,
    hideRoulette,
    showRoulette,
  };
}
