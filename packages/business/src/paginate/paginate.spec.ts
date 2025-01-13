import { describe, expect, it } from '@jest/globals';

import { Paginate } from './paginate';

describe('paginate', () => {
  it('You must build the pagination', () => {
    expect(new Paginate(0, 1302, 1302, [])).toEqual({
      skip: 0,
      next: 2,
      prev: 0,
      total: 1302,
      pages: 14,
      results: [],
      per_page: 100,
      current_page: 1,
    });
  });

  it('You must build the pagination starting from page 2', () => {
    expect(new Paginate(2, 1302, 1302, [])).toEqual({
      skip: 100,
      next: 3,
      prev: 1,
      total: 1302,
      pages: 14,
      results: [],
      per_page: 100,
      current_page: 2,
    });
  });

  it('You must build the pagination with pages above 2', () => {
    expect(new Paginate(3, 95, 1302, [])).toEqual({
      skip: 285,
      next: 4,
      prev: 2,
      total: 1302,
      pages: 14,
      results: [],
      per_page: 95,
      current_page: 3,
    });
  });

  it('You must build the pagination with the page equal to the last page', () => {
    expect(new Paginate(14, 95, 1302, [])).toEqual({
      skip: 1302,
      next: 0,
      prev: 13,
      total: 1302,
      pages: 14,
      results: [],
      per_page: 95,
      current_page: 14,
    });
  });

  it('Must build pagination without limit', () => {
    expect(new Paginate(0, 0, 1302, [])).toEqual({
      skip: 0,
      next: 0,
      prev: 0,
      total: 1302,
      pages: 1,
      results: [],
      per_page: 1302,
      current_page: 1,
    });
  });
});
