import { computed } from 'vue';
import { navigateTo } from '@/composables/useNuxtShims';
import type { RouteNames } from '@/types/RoutesNames';
import { useFilterDataLoader } from '@/filter/composables/useFilterDataLoader';
import type { NitroFetchOptions } from '@/types/nitropack';
import type { SelectedFilters } from '@/filter/types';
import type { LocationQuery } from '@/types/vue-router';
import { buildEncodedQueryFromRouteQuery } from '@/filter/utils';
import { useFilterController } from '@/filter/composables/useFilterController';
import { useConfigStore } from '@/composables/useConfigStore';

export async function usePageWithFilter<T>(params: {
  route: ReturnType<typeof useRoute>;
  router: ReturnType<typeof useRouter>;
  hubRouteName: RouteNames;
  setRouteName: RouteNames;
  dataFetch: (params?: { filters?: SelectedFilters; options?: NitroFetchOptions<never> }) => Promise<T>;
  //Параметры, которые не относятся к фильтрам, но их нужно сохранять при навигации между хабом и сетом
  preserveQueryKeys?: string[];
}) {
  const { getPathByRoute } = useConfigStore();
  const hubPath = getPathByRoute(params.hubRouteName);

  //Check when we on real set route - when seoName exists in route params
  const isSetRoute = computed(
    () =>
      !!(
        isRouteIn([params.setRouteName]) &&
        typeof params.route.params.seoName === 'string' &&
        params.route.params.seoName
      )
  );

  const areFiltersTakenFromData = ref(false);
  const allowTakeFiltersFromData = ref(true);
  const skipNextSetRouteRefetch = ref(false);

  // controller - Сразу читаем фильтры из урла
  const controller = useFilterController();

  function getPreservedQuery(): LocationQuery {
    const preservedQuery: LocationQuery = {};

    for (const key of params.preserveQueryKeys ?? []) {
      const value = params.route.query[key];

      if (value == null) {
        continue;
      }

      preservedQuery[key] = value;
    }

    return preservedQuery;
  }

  function buildQuery(query: LocationQuery): LocationQuery {
    return {
      ...getPreservedQuery(),
      ...query,
    };
  }

  const dataLoader = await useFilterDataLoader<T>({
    filters: controller.selectedFilters,
    skipDataLoad: areFiltersTakenFromData,
    dataFetch: (signal?) =>
      params.dataFetch({
        filters: controller.selectedFilters.value,
        options: { signal },
      }),
  });

  getFiltersFromSetData();

  // SSR redirect from hub to set if seoName exists in response
  if (import.meta.server) {
    const setSeoName = dataLoader.data.value?.currentSetData?.seoName;

    if (!isSetRoute.value && setSeoName && !params.route.fullPath.includes(setSeoName) && setSeoName !== 'bonus') {
      const nextUrl =
        getPathByRoute(params.setRouteName, { seoName: setSeoName }) + buildEncodedQueryFromRouteQuery(buildQuery({}));
      await navigateTo(nextUrl, { redirectCode: 301 });
    }
  }

  function getFiltersFromSetData() {
    const setData = dataLoader.data.value?.currentSetData;
    const setFilterParams = setData?.filterParams ?? {};
    const hasSelectedFilters = Object.keys(controller.selectedFilters.value).length > 0;
    const hasSetFilterParams = Object.keys(setFilterParams).length > 0;

    if (!isSetRoute.value) return;
    if (!allowTakeFiltersFromData.value) return;
    if (hasSelectedFilters) return;
    if (!hasSetFilterParams) return;

    areFiltersTakenFromData.value = true;
    controller.selectedFilters.value = setFilterParams;
  }

  /**
   * UI actions:
   * - user changes filters => we always go to HUB with query
   */
  async function onSetFilter(section: string, id: number, checked: boolean) {
    const nextQueryObj = buildQuery(controller.applyToggle(section, id, checked));
    const nextUrl = hubPath + buildEncodedQueryFromRouteQuery(nextQueryObj);
    await params.router.push(nextUrl);
  }

  async function onResetAll() {
    allowTakeFiltersFromData.value = false;
    const nextQueryObj = buildQuery(controller.applyReset());
    const nextUrl = hubPath + buildEncodedQueryFromRouteQuery(nextQueryObj);
    await params.router.push(nextUrl);
  }

  // If there is set seoName in response => change browser URL to "/bonus/sets/:seoName/".
  if (import.meta.client) {
    watch(
      () => params.route.params.seoName,
      async (seoName, prevSeoName) => {
        allowTakeFiltersFromData.value = true;
        if (skipNextSetRouteRefetch.value) {
          skipNextSetRouteRefetch.value = false;
          getFiltersFromSetData();
          return;
        }

        if (seoName === prevSeoName) {
          getFiltersFromSetData();
          return;
        }

        if (!isSetRoute.value) {
          getFiltersFromSetData();
          return;
        }

        areFiltersTakenFromData.value = true;
        await nextTick();
        await dataLoader.refetch();
      }
    );

    watch(
      () => dataLoader.data.value,
      async (data) => {
        getFiltersFromSetData();

        const setSeoName = data.currentSetData?.seoName;

        if (typeof setSeoName !== 'string' || !setSeoName || setSeoName === 'bonus') return;
        if (isSetRoute.value) return; // already set route

        const targetPath = getPathByRoute(params.setRouteName, { seoName: setSeoName });
        const nextUrl = targetPath + buildEncodedQueryFromRouteQuery(buildQuery({}));

        if (params.route.fullPath === nextUrl) return;

        skipNextSetRouteRefetch.value = true;

        // replace to set URL
        await params.router.replace(nextUrl);
      }
    );
  }

  return {
    data: dataLoader.data,
    loading: dataLoader.loading,
    onSetFilter,
    onResetAll,
    selectedFilters: controller.selectedFilters,
    isAnyFilterApplied: controller.isAnyFilterApplied,
  };
}
