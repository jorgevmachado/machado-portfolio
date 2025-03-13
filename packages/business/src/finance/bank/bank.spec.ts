import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import Bank from './bank';

describe('Bank', () => {
  const bankMock = {
    id: '1',
    name: 'Bank A',
    created_at: new Date('2023-01-01'),
    updated_at: new Date('2023-01-02'),
    deleted_at: undefined,
  };
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
      expect(bank.created_at).toEqual(params.created_at);
      expect(bank.updated_at).toEqual(params.updated_at);
      expect(bank.deleted_at).toBe(params.deleted_at);
    });

    it('should create an instance with minimal valid data', () => {
      const params = {
        name: bankMock.name,
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