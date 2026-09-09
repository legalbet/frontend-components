import { ref, type Ref } from 'vue';

// Заглушки для Nuxt auto-imports при standalone сборке библиотеки
// В Nuxt-проекте эти функции предоставляются автоматически

export function useRoute() {
  return {
    path: '/',
    query: {},
    params: {},
    meta: {},
    fullPath: '/',
  };
}

export function useRouter() {
  return {
    push: (_url: string) => {},
    replace: (_url: string) => {},
    beforeEach: (_guard: any) => () => {},
    resolve: (_to: any) => ({ href: '/' }),
  };
}

export function useState<T>(key: string, init?: () => T): Ref<T> {
  return ref(init ? init() : (undefined as unknown as T));
}

export function navigateTo(_url: string, _options?: Record<string, any>): Promise<void> {
  return Promise.resolve();
}
