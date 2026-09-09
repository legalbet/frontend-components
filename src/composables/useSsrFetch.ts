// Заглушка для useSsrFetch из host-проекта
// При использовании в host-проекте (Nuxt) должна быть заменена на реализацию
export async function useSsrFetch<T>(options: {
  url: string;
  key?: string;
  fetchOptions?: RequestInit;
}): Promise<T> {
  const res = await fetch(options.url, options.fetchOptions);
  return res.json() as Promise<T>;
}
