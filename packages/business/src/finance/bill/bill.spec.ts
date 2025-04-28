import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import Bill from './bill';
import { INGRID_RESIDENTIAL_BANK_SLIP_NUBANK_BILL_FIXTURE } from './fixtures';

describe('Bill', () => {
  const billEntity = INGRID_RESIDENTIAL_BANK_SLIP_NUBANK_BILL_FIXTURE;
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  afterEach(() => {
    jest.resetModules();
  });
  describe('Constructor', () => {
    it('should create an instance with all parameters when valid data is provided', () => {
      const bill = new Bill(billEntity);

      expect(bill.id).toBe(billEntity.id);
      expect(bill.name).toBe(billEntity.name);
      expect(bill.bank).toBe(billEntity.bank);
      expect(bill.type).toBe(billEntity.type);
      expect(bill.category).toBe(billEntity.category);
      expect(bill.created_at).toEqual(billEntity.created_at);
      expect(bill.updated_at).toEqual(billEntity.updated_at);
      expect(bill.deleted_at).toBe(billEntity.deleted_at);
    });

    it('should create an instance with minimal valid data', () => {
      const params = {
        bank: billEntity.bank,
        name: billEntity.name,
        type: billEntity.type,
        finance: billEntity.finance,
        category: billEntity.category,
      };

      const bill = new Bill(params);

      expect(bill.bank).toBe(params.bank);
      expect(bill.name).toBe(params.name);
      expect(bill.type).toBe(params.type);
      expect(bill.category).toBe(params.category);
      expect(bill.created_at).toBeUndefined();
      expect(bill.updated_at).toBeUndefined();
      expect(bill.deleted_at).toBeUndefined();
    });

    it('should allow instantiation with no parameters', () => {
      const bill = new Bill();

      expect(bill.id).toBeUndefined();
      expect(bill.name).toBeUndefined();
      expect(bill.created_at).toBeUndefined();
      expect(bill.updated_at).toBeUndefined();
      expect(bill.deleted_at).toBeUndefined();
    });
  });
});