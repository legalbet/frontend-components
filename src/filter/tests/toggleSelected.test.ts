import {test, describe, expect} from 'vitest'
import {type SelectedFilters, toggleSelected} from "../utils";

describe('test toggleSelected', () => {
  test('adds id when checked=true', () => {
    const start: SelectedFilters = { type: [2] };
    const next = toggleSelected(start, 'type', 4, true);

    expect(next).toEqual({ type: [2, 4] });
  });

  test('removes id when checked=false', () => {
    const start: SelectedFilters = { type: [2, 4] };
    const next = toggleSelected(start, 'type', 4, false);

    expect(next).toEqual({ type: [2] });
  });

  test('removes section entirely when last id removed', () => {
    const start: SelectedFilters = { type: [2] };
    const next = toggleSelected(start, 'type', 2, false);

    expect(next).toEqual({});
  });

  test('does not mutate the original selected object', () => {
    const start: SelectedFilters = { type: [2] };
    const next = toggleSelected(start, 'type', 4, true);

    expect(start).toEqual({ type: [2] });
    expect(next).toEqual({ type: [2, 4] });
  });

  test('creates section if it does not exist', () => {
    const start: SelectedFilters = {};
    const next = toggleSelected(start, 'type', 2, true);

    expect(next).toEqual({ type: [2] });
  });
})
