/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'emoji-mart';

// Nuxt ClientOnly component stub
declare const ClientOnly: any;

// Отключаем JSX проверки для Vue шаблонов
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elem: string]: any;
    }
    interface Element extends Vue.VNode { }
    interface ElementClass extends Vue.ComponentPublicInstance { }
    interface ElementAttributesProperty {
      $props: {};
    }
  }
}

// Импортируем Vue для глобального использования
import type * as Vue from 'vue';
