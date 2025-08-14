import { InjectionKey } from 'vue';

// Типизированные ключи для provide/inject
export const TRANSLATION_KEY = Symbol('translation') as InjectionKey<(key: string) => string>;
export const ROUTE_KEY = Symbol('route') as InjectionKey<(name: string, params?: Record<string, any>) => string>;

// Типы для функций
export type TranslationFunction = (key: string) => string;
export type RouteFunction = (name: string, params?: Record<string, any>) => string;
