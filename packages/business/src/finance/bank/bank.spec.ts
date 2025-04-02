import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import Bank from './bank';
import { CAIXA_BANK_FIXTURE } from './fixtures';

describe('Bank', () => {
  const bankMock = CAIXA_BANK_FIXTURE;
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('Constructor', () => {
    it('should create an instance with all parameters when valid data is provided', () => {
      const params = bankMock;

      const bank = new Bank(params);

      expect(bank.id).toBe(params.id);
      expect(bank.name).toBe(params.name);
      expect(bank.name_code).toBe(params.name_code);
      expect(bank.created_at).toEqual(params.created_at);
      expect(bank.updated_at).toEqual(params.updated_at);
      expect(bank.deleted_at).toBe(params.deleted_at);
    });

    it('should create an instance with minimal valid data', () => {
      const params = {
        name: bankMock.name,
        name_code: bankMock.name_code,
      };

      const bank = new Bank(params);

      expect(bank.id).toBeUndefined();
      expect(bank.name).toBe(params.name);
      expect(bank.created_at).toBeUndefined();
      expect(bank.updated_at).toBeUndefined();
      expect(bank.deleted_at).toBeUndefined();
    });

    it('should allow instantiation with no parameters', () => {
      const bank = new Bank();

      expect(bank.id).toBeUndefined();
      expect(bank.name).toBeUndefined();
      expect(bank.created_at).toBeUndefined();
      expect(bank.updated_at).toBeUndefined();
      expect(bank.deleted_at).toBeUndefined();
    });
  });
});