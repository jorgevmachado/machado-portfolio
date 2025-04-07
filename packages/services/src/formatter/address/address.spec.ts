import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { cepFormatter } from './address';

describe('address formatter methods', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.resetModules();
  });
  describe('cepFormatter', () => {
    it('should return a formatted cep when the string is received', () => {
      expect(cepFormatter('00000000')).toEqual('00000-000');
    });

    it('should return an empty string cep when string is not received', () => {
      expect(cepFormatter()).toEqual('');
    });
  });
});
