import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { cpfFormatter } from './document';

describe('document formatter methods', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.resetModules();
  });
  describe('cpfFormatter', () => {
    it('should return a formatted cpf when the string is received', () => {
      expect(cpfFormatter('00000000000')).toEqual('000.000.000-00');
    });

    it('should return an empty string cpf when string is not received', () => {
      expect(cpfFormatter()).toEqual('');
    });
  });
});
