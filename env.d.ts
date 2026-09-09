/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'emoji-mart';

// Host-project components are provided by the consuming Nuxt application.
declare module '~/*' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '@fc/types/external-types*' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '*/*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// Nuxt ClientOnly component stub
declare const ClientOnly: any;

// Отключаем JSX проверки для Vue шаблонов
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elem: string]: any;
    }
    interface Element extends Vue.VNode {}
    interface ElementClass extends Vue.ComponentPublicInstance {}
    interface ElementAttributesProperty {
      $props: {};
    }
  }
}

// Импортируем Vue для глобального использования
import type * as Vue from 'vue';
