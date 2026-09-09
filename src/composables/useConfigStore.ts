import { inject } from 'vue';
import { TRANSLATION_KEY, ROUTE_KEY } from '@fc/types/injection-keys';

// Заглушка для useConfigStore из host-проекта
// При использовании в host-проекте (Nuxt) эта функция должна быть заменена
// или предоставлена через injection keys
export function useConfigStore() {
  const t = inject(TRANSLATION_KEY, (key: string) => key);
  const getPathByRoute = inject(ROUTE_KEY, (_name: string, _params?: Record<string, any>) => '/');

  return {
    t,
    getPathByRoute,
    set: (_key: string, _value: any) => {},
    get: (_key: string) => undefined,
  };
}
