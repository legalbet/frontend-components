import {test, describe, expect} from 'vitest'
import {parseSelectedFilters} from '../utils'
import type {LocationQuery} from "vue-router";
describe('test parseSelectedFilters', () => {
  test('parse only keys ending with [] and ignores other', () => {
    const query: LocationQuery = {
      'type[]': ['2', '4'],
      foo: 'bar',
      'condition[]': '10',
      'sort-by': 'sum'
    }

    expect(parseSelectedFilters(query)).toEqual({
      type: [2, 4],
      condition: [10]
    })
  })

  test('supports both string and string[] values', () => {
    const query: LocationQuery = {
      'type[]': '2',
      'condition[]': ['9', '10'],
    };

    expect(parseSelectedFilters(query)).toEqual({
      type: [2],
      condition: [9, 10],
    });
  });

  test('deduplicates ids inside one section', () => {
    const query: LocationQuery = {
      'type[]': ['2', '2', '4', '4'],
    };

    expect(parseSelectedFilters(query)).toEqual({
      type: [2, 4],
    });
  });

  test('handle trailing junk: "21/" -> 21', () => {
    const query: LocationQuery = {
      'sport[]': ['56', '21/'],
    };

    expect(parseSelectedFilters(query)).toEqual({
      sport: [56, 21],
    });
  });

  test('ignores non-string values', () => {
    const query = {
      'type[]': [2 as any, '4'],
      'cond[]': null,
    } as unknown as LocationQuery;

    expect(parseSelectedFilters(query)).toEqual({
      type: [4],
    });
  });

  test('returns empty object if no filter keys exist', () => {
    const query: LocationQuery = { foo: 'bar' };
    expect(parseSelectedFilters(query)).toEqual({});
  });
})
