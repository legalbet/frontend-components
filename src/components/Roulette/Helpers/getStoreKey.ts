import { STORE_NAME } from '../constants';

export function getStoreKey(storeKey?: string): string {
  return storeKey ? `${STORE_NAME}_${storeKey}` : STORE_NAME;
}
