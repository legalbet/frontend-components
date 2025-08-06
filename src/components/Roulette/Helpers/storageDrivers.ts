import { StorageDriver } from './types';

export const defaultDriver: StorageDriver = {
  getItem: (key) => (typeof window !== 'undefined' ? window.localStorage.getItem(key) : null),
  setItem: (key, value) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, value);
    }
  },
};
