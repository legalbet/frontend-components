import { onUnmounted, ref, type Ref } from 'vue';

type Fetcher<T> = (signal: AbortSignal) => Promise<T>;

type FetchWithAbortState<T> = {
  error: Ref<unknown>;
  loading: Ref<boolean>;
  run: (fetcher: Fetcher<T>) => Promise<T | undefined>;
};

// Заглушка для useFetchWithAbort из host-проекта
export function useFetchWithAbort<T>(): FetchWithAbortState<T> {
  const abortController = ref<AbortController | null>(null);
  const loading = ref(false);
  const error = ref<unknown>(null);

  async function run(fetcher: Fetcher<T>): Promise<T | undefined> {
    abortController.value?.abort();
    const controller = new AbortController();
    abortController.value = controller;
    loading.value = true;
    error.value = null;

    try {
      return await fetcher(controller.signal);
    } catch (cause) {
      if (controller.signal.aborted) return undefined;
      error.value = cause;
      return undefined;
    } finally {
      if (abortController.value === controller) loading.value = false;
    }
  }

  onUnmounted(() => abortController.value?.abort());

  return { error, loading, run };
}
