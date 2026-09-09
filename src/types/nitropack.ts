// Заглушки типов для nitropack
// При использовании в Nuxt-проекте эти типы предоставляются самим Nuxt

export type $Fetch<T = any> = (url: string, options?: any) => Promise<T>;

export type NitroFetchOptions<T = any> = {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
  query?: Record<string, any>;
  [key: string]: any;
};
