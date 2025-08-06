export interface StorageDriver {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export interface StoreConfig {
  /** Maximum number of spins */
  maxSpins: number;
  /** Interval in milliseconds after which the spins counter resets */
  resetIntervalMs: number;
  /** Key for the storage */
  storeKey: string;
}
