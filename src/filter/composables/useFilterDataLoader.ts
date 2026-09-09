import { ref, watch, type Ref } from 'vue';

type FilterDataLoaderResult<T> = {
  data: Ref<T | null>;
  loading: Ref<boolean>;
  error: Ref<unknown>;
  refetch: () => Promise<void>;
};
import { debounce } from '@fc/utils/debounce';
import { useFetchWithAbort } from '@fc/composables/useFetchWithAbort';
import { useSsrFetch } from '@fc/composables/useSsrFetch';
import type { SelectedFilters } from '@fc/filter/types';
export async function useFilterDataLoader<T>(options: {
  filters: Ref<SelectedFilters>;
  skipDataLoad?: Ref<boolean>;
  dataFetch: (signal?: AbortSignal) => Promise<T>;
  debounceMs?: number;
}): Promise<FilterDataLoaderResult<T>> {
  return useFilterDataLoaderImpl(options);
}

async function useFilterDataLoaderImpl<T>(options: {
  filters: Ref<SelectedFilters>;
  skipDataLoad?: Ref<boolean>;
  dataFetch: (signal?: AbortSignal) => Promise<T>;
  debounceMs?: number;
}): Promise<FilterDataLoaderResult<T>> {
  const debounceMs = options.debounceMs ?? 250;

  // SSR fetch
  const data = ref<T | null>(
    await useSsrFetch<T>({
      key: 'bonus-page-initial-data',
      promise: () => options.dataFetch(),
    })
  ) as unknown as Ref<T | null>;

  //Client: refetch on key changes (debounce + abort)
  const fetchWithAbort = useFetchWithAbort<T>();

  const run = async () => {
    const res = await fetchWithAbort.run((signal) => options.dataFetch(signal));
    if (!res) return; // ignore aborted/outdated

    data.value = res;
  };

  if (typeof window !== 'undefined') {
    const debounced = debounce(run, debounceMs);

    watch(
      () => [options.filters.value],
      () => {
        if (options.skipDataLoad?.value) {
          options.skipDataLoad.value = false;
          return;
        }
        debounced();
      }
    );
  }

  return {
    data,
    loading: fetchWithAbort.loading,
    error: fetchWithAbort.error,
    refetch: run,
  };
}
