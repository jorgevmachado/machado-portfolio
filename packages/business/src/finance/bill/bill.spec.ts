import { describe, expect, it } from '@jest/globals';

import Bill from './bill';
import type { BillEntity } from './interface';
import { EBillType } from '../../api/nest/finance';

describe('Bill', () => {
  const billEntity: BillEntity = {
    id: '1',
    name: 'Bill',
    year: 2025,
    type: EBillType.CREDIT_CARD,
    bank: {
      id: '1',
      name: 'Bank',
      created_at: new Date('2023-01-01'),
      updated_at: new Date('2023-01-02'),
      deleted_at: undefined,
    },
    total: 0,
    expenses: [],
    created_at: new Date('2023-01-01'),
    updated_at: new Date('2023-01-02'),
    deleted_at: undefined,
  };
  describe('Constructor', () => {
    it('should create an instance with all parameters when valid data is provided', () => {
      const bill = new Bill(billEntity);

      expect(bill.id).toBe(billEntity.id);
      expect(bill.name).toBe(billEntity.name);
      expect(bill.bank).toBe(billEntity.bank);
      expect(bill.type).toBe(billEntity.type);
      expect(bill.created_at).toEqual(billEntity.created_at);
      expect(bill.updated_at).toEqual(billEntity.updated_at);
      expect(bill.deleted_at).toBe(billEntity.deleted_at);
    });

    it('should create an instance with minimal valid data', () => {
      const params = {
        bank: billEntity.bank,
        year: billEntity.year,
        name: billEntity.name,
        type: billEntity.type,
        total: billEntity.total,
        expenses: billEntity.expenses,
      };

      const bill = new Bill(params);

      expect(bill.bank).toBe(params.bank);
      expect(bill.year).toBe(params.year);
      expect(bill.name).toBe(params.name);
      expect(bill.type).toBe(params.type);
      expect(bill.total).toBe(params.total);
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