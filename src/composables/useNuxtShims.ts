import { computed, ref, type Ref } from 'vue';
import type { LocationQuery } from '@fc/types/vue-router';

type NuxtRoute = {
  path: string;
  query: LocationQuery;
  params: Record<string, string | string[] | undefined>;
  meta: Record<string, unknown>;
  fullPath: string;
};

// Заглушки для Nuxt auto-imports при standalone сборке библиотеки
// В Nuxt-проекте эти функции предоставляются автоматически

export function useRoute(): NuxtRoute {
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
  return ref(init ? init() : (undefined as unknown as T)) as unknown as Ref<T>;
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
