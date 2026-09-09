import { ref, watch } from 'vue';
import type { LocationQuery } from '@/types/vue-router';
import { buildEncodedQueryFromRouteQuery } from '@/filter/utils';

export function useSorting<TSort extends string>(params: {
  route: ReturnType<typeof useRoute>;
  router: ReturnType<typeof useRouter>;
  queryKey: string;
  values: readonly TSort[];
}) {
  const allowedValues = new Set<TSort>(params.values);
  const selectedSort = ref<TSort | undefined>(parseSort(params.route.query));

  watch(
    () => params.route.query,
    (query) => {
      const nextSort = parseSort(query);

      if (selectedSort.value === nextSort) {
        return;
      }

      selectedSort.value = nextSort;
    },
    { deep: true }
  );

  function parseSort(query: LocationQuery): TSort | undefined {
    const rawValue = query[params.queryKey];
    const value = Array.isArray(rawValue) ? rawValue[0] : rawValue;

    if (typeof value !== 'string') {
      return undefined;
    }

    return allowedValues.has(value as TSort) ? (value as TSort) : undefined;
  }

  function getSortQuery(sortBy: TSort | undefined = selectedSort.value): LocationQuery {
    if (!sortBy) {
      return {};
    }

    return {
      [params.queryKey]: sortBy,
    };
  }

  async function setSort(sortBy?: TSort, navigation?: { path?: string; query?: LocationQuery }) {
    // Обновляем локальное состояние сразу, чтобы другие части страницы могли прочитать новый sort до завершения навигации.
    selectedSort.value = sortBy;

    const nextPath = navigation?.path ?? params.route.path;
    const nextQuery = {
      ...(navigation?.query ?? {}),
      ...getSortQuery(sortBy),
    };

    await params.router.push(nextPath + buildEncodedQueryFromRouteQuery(nextQuery));
  }

  return {
    selectedSort,
    getSortQuery,
    setSort,
  };
}
