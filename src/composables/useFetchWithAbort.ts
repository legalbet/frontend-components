import { ref, onUnmounted } from 'vue';

// Заглушка для useFetchWithAbort из host-проекта
export function useFetchWithAbort<T>() {
  const abortController = ref<AbortController | null>(null);

  async function fetchWithAbort(url: string, options: RequestInit = {}): Promise<T> {
    if (abortController.value) {
      abortController.value.abort();
    }
    abortController.value = new AbortController();
    const res = await fetch(url, { ...options, signal: abortController.value.signal });
    return res.json() as Promise<T>;
  }

  onUnmounted(() => {
    if (abortController.value) {
      abortController.value.abort();
    }
  });

  return { fetchWithAbort };
}
