import type { LocationQuery } from '@fc/types/vue-router';
import type { SelectedFilters } from '@fc/filter/types';

const isFilterKey = (key: string) => key.endsWith('[]');

function toIntSafe(v: unknown): number | null {
  if (typeof v !== 'string') return null;
  // parseInt("21/") -> 21 (safe against trailing junk)
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : null;
}

//Get filters from current route query object
export function parseSelectedFilters(query: LocationQuery): SelectedFilters {
  const res: SelectedFilters = {};

  for (const [key, value] of Object.entries(query)) {
    if (!isFilterKey(key)) continue;

    const section = key.slice(0, -2); // "type[]" -> "type"
    const arr = Array.isArray(value) ? value : value != null ? [value] : [];

    const ids: number[] = [];
    for (const x of arr) {
      const n = toIntSafe(x);
      if (n != null) ids.push(n);
    }

    if (!ids.length) continue;
    res[section] = Array.from(new Set(ids));
  }

  return res;
}

//Build query object from applying filters
export function selectedFiltersToQuery(selected: SelectedFilters): LocationQuery {
  const q: LocationQuery = {};

  for (const [section, ids] of Object.entries(selected)) {
    const cleaned = Array.from(new Set(ids)).filter((n) => Number.isFinite(n));
    if (!cleaned.length) continue;

    q[`${section}[]`] = cleaned.map(String);
  }

  return q;
}

//Handle checkbox checking (filters applying)
export function toggleSelected(
  selected: SelectedFilters,
  section: string,
  id: number,
  checked: boolean
): SelectedFilters {
  const current = new Set(selected[section] ?? []);

  if (checked) current.add(id);
  else current.delete(id);

  const next: SelectedFilters = { ...selected };
  const arr = Array.from(current);

  if (arr.length) next[section] = arr;
  else delete next[section];

  return next;
}

/**
 * Produces encoded query string like:
 * "?type%5B%5D=2&type%5B%5D=461"
 *
 * Vue Router may show "type[]=2", but URLSearchParams encodes [].
 */
export function buildEncodedQueryFromRouteQuery(query: LocationQuery): string {
  const sp = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value == null) continue;

    const values = Array.isArray(value) ? value : [value];
    for (const v of values) {
      if (v == null) continue;
      sp.append(key, String(v));
    }
  }

  const qs = sp.toString();
  return qs ? `?${qs}` : '';
}
