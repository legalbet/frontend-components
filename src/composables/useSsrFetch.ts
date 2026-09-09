type SsrFetchOptions<T> = {
  url?: string;
  key?: string;
  fetchOptions?: RequestInit;
  promise?: () => Promise<T>;
};

// Заглушка для useSsrFetch из host-проекта
// При использовании в host-проекте (Nuxt) должна быть заменена на реализацию
export async function useSsrFetch<T>(options: SsrFetchOptions<T>): Promise<T> {
  if (options.promise) return options.promise();
  if (!options.url) throw new Error('useSsrFetch requires either url or promise');

  const res = await fetch(options.url, options.fetchOptions);
  return res.json() as Promise<T>;
}
