import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { getTotalNumberOfPagesIntoPagination } from './config';

describe('getTotalNumberOfPagesIntoPagination', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  afterEach(() => {
    jest.resetModules();
  });
  it('should calculate total pages based on total and limit when limit > 0', () => {
    const total = 50;
    const limit = 10;
    const perPage = 5;
    const result = getTotalNumberOfPagesIntoPagination(total, limit, perPage);

    expect(result).toBe(5);
  });

  it('should calculate total pages based on total and perPage when limit is 0', () => {
    const total = 50;
    const limit = 0;
    const perPage = 5;
    const result = getTotalNumberOfPagesIntoPagination(total, limit, perPage);

    expect(result).toBe(10);
  });

  it('should round up total pages to the nearest integer', () => {
    const total = 55;
    const limit = 9;
    const perPage = 5;
    const result = getTotalNumberOfPagesIntoPagination(total, limit, perPage);

    expect(result).toBe(7);
  });
});