import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { currencyFormatter, removeCurrencyFormatter } from './currency';

describe('currency formatter methods', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.resetModules();
  });
  describe('currencyFormatter', () => {
    it('should return formatted currency when currency is received', () => {
      expect(currencyFormatter(9.99)).toEqual('R$ 9,99');
    });
  });

  describe('removeCurrencyFormatter', () => {
    it('should return number when received currency', () => {
      expect(removeCurrencyFormatter('R$ 900')).toEqual(900);
    });
  });
});
