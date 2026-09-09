import { computed, watch } from 'vue';
import { useRoute } from '@fc/composables/useNuxtShims';
import { parseSelectedFilters, selectedFiltersToQuery, toggleSelected } from '@fc/filter/utils';
import type { SelectedFilters } from '@fc/filter/types';

/**
 * Controller = single source of truth for selected filters in UI.
 * It does:
 * - keeps active filters UI state
 * - produces next query object for the page to navigate with
 */
export function useFilterController() {
  const route = useRoute();

  //TODO а что если будут какие то левые параметры?
  // UI state updates BEFORE next api call
  const selectedFilters = ref<SelectedFilters>(parseSelectedFilters(route.query));

  //Для back/forward браузера, когда меняются гет параметры
  watch(
    () => route.query,
    (query) => {
      const nextSelectedFilters = parseSelectedFilters(query);

      if (
        JSON.stringify(selectedFiltersToQuery(selectedFilters.value)) ===
        JSON.stringify(selectedFiltersToQuery(nextSelectedFilters))
      ) {
        return;
      }

      selectedFilters.value = nextSelectedFilters;
    },
    { deep: true }
  );

  const isAnyFilterApplied = computed(() => Object.keys(selectedFilters.value).length > 0);

  // Create next query object for the page to navigate with
  function applyToggle(sectionSystemName: string, filterId: number, checked: boolean) {
    selectedFilters.value = toggleSelected(selectedFilters.value, sectionSystemName, filterId, checked);
    return selectedFiltersToQuery(selectedFilters.value);
  }

  function applyReset() {
    selectedFilters.value = {};
    return {};
  }

  return {
    selectedFilters,
    isAnyFilterApplied,
    applyToggle,
    applyReset,
  };
}
