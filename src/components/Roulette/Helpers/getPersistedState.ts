import { SpinState } from '../types';
import { getStoreKey } from './getStoreKey';
import { defaultDriver } from './storageDrivers';
import { StorageDriver } from './types';

export function getDefaultState(): SpinState {
  return { lastReset: Date.now(), used: 0, closed: false };
}

/**
 * Load persisted state (if any) or provide defaults.
 * @param storeKey Name of the storage to load the state from.
 * @param resetIntervalMs Interval (in milliseconds) after which spins should be reset.
 * @param driver Driver to use for storage.
 * @returns Spin state.
 */
export function loadPersistedState(
  storeKey: string,
  resetIntervalMs: number,
  driver: StorageDriver = defaultDriver
): SpinState {
  try {
    const raw = driver.getItem(getStoreKey(storeKey));
    if (raw) {
      const parsed = JSON.parse(raw) as SpinState;

      // Check if stored spins are still valid within the reset interval
      if (parsed.lastReset && Date.now() - parsed.lastReset < resetIntervalMs) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading roulette spins state', e);
  }
  return getDefaultState();
}

/**
 * Set persisted state.
 * @param storeKey Name of the storage to set the state to.
 * @param state State to set.
 * @param driver Driver to use for storage.
 */
export function setPersistedState(storeKey: string, state: SpinState, driver: StorageDriver = defaultDriver) {
  driver.setItem(getStoreKey(storeKey), JSON.stringify(state));
}
