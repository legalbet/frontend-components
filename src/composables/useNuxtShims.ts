import { ref, computed, type Ref } from 'vue';

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
    push: (_url: string) => { },
    replace: (_url: string) => { },
    beforeEach: (_guard: any) => () => { },
    resolve: (_to: any) => ({ href: '/' }),
  };
}

export function useState<T>(key: string, init?: () => T) {
  return ref(init ? init() : (undefined as unknown as T));
}

export function navigateTo(_url: string, _options?: Record<string, any>): Promise<void> {
  return Promise.resolve();
}

export function useDevice() {
  return {
    isMobile: computed(() => typeof window !== 'undefined' && window.innerWidth < 744),
    isDesktop: computed(() => typeof window !== 'undefined' && window.innerWidth >= 984),
    isTablet: computed(() => typeof window !== 'undefined' && window.innerWidth >= 744 && window.innerWidth < 984),
  };
}

export const $fetch = async (url: string, options?: any) => {
  const res = await fetch(url, options);
  return res.json();
};
