import {test, describe, expect} from 'vitest'
import {buildEncodedQueryFromRouteQuery} from '../utils'
import type {LocationQuery} from "vue-router";

describe('test buildEncodedQueryFromRouteQuery', () => {
  test('builds encoded query string using URLSearchParams', () => {
    const query: LocationQuery = {
      'type[]': ['2', '4', '441'],
      'sort-by[]': 'sum',
    };

    expect(buildEncodedQueryFromRouteQuery(query)).toBe(
      '?type%5B%5D=2&type%5B%5D=4&type%5B%5D=441&sort-by%5B%5D=sum'
    );
  });

  test('returns empty string if query has no params', () => {
    expect(buildEncodedQueryFromRouteQuery({} as any)).toBe('');
  });

  test('skips null/undefined values', () => {
    const query = {
      'type[]': ['2', null, undefined, '4'],
    } as any as LocationQuery;

    expect(buildEncodedQueryFromRouteQuery(query)).toBe('?type%5B%5D=2&type%5B%5D=4');
  });

})
