import {test, describe, expect} from 'vitest'
import {type SelectedFilters, selectedFiltersToQuery} from "../utils";

describe('test selectedFiltersToQuery', () => {
  test('converts SelectedFilters to LocationQuery with section[] keys', () => {
    const selected: SelectedFilters = { type: [2, 4], condition: [10] };

    expect(selectedFiltersToQuery(selected)).toEqual({
      'type[]': ['2', '4'],
      'condition[]': ['10'],
    });
  });

  test('deduplicates and filters invalid numbers', () => {
    const selected = { type: [2, 2, NaN, 4, undefined, Infinity] } as any;

    expect(selectedFiltersToQuery(selected)).toEqual({
      'type[]': ['2', '4'],
    });
  });

  test('skips empty sections', () => {
    expect(selectedFiltersToQuery({ type: [], condition: [10] })).toEqual({
      'condition[]': ['10'],
    });
  });
})
