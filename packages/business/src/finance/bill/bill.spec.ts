import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { USER_FIXTURE } from '@repo/mock/auth/fixture';

import { EBillType, EExpenseType, EMonth } from '../../api/nest/finance';

import Bill from './bill';

describe('Bill', () => {
  const bankMock = {
    id: '1',
    name: 'Bank A',
    created_at: new Date('2023-01-01'),
    updated_at: new Date('2023-01-02'),
    deleted_at: undefined,
  };

  const supplierTypeMock = {
    id: '1',
    name: 'Supplier A',
    created_at: new Date('2023-01-01'),
    updated_at: new Date('2023-01-02'),
    deleted_at: undefined,
  };

  const supplierMock = {
    id: '1',
    name: 'Supplier A',
    type: supplierTypeMock,
    active: true,
    created_at: new Date('2023-01-01'),
    updated_at: new Date('2023-01-02'),
    deleted_at: undefined,
    description: 'This supplier delivers raw materials.',
  };

  const financeMock = {
    id: '1',
    user: USER_FIXTURE,
    bills: undefined,
    created_at: new Date('2023-01-01'),
    updated_at: new Date('2023-01-02'),
    deleted_at: undefined,
  };

  const billMock = {
    id: '1',
    name: 'Bill A',
    type: EBillType.CREDIT_CARD,
    bank: bankMock,
    total: 100,
    finance: financeMock,
    expenses: [],
    created_at: new Date('2023-01-01'),
    updated_at: new Date('2023-01-02'),
    deleted_at: undefined,
  };

  const expenseMockOne = {
    id: '123',
    year: 2022,
    bill: billMock,
    type: EExpenseType.FIXED,
    paid: true,
    value: 100,
    total: 100,
    month: EMonth.MARCH,
    active: true,
    supplier: supplierMock,
    total_paid: 100,
    description: 'Test expense',
    instalment_number: 1,
    created_at: new Date('2023-01-01'),
    updated_at: new Date('2023-01-02'),
    deleted_at: undefined,
  };

  const expenseMockTwo = {
    id: '234',
    year: 2022,
    bill: billMock,
    type: EExpenseType.FIXED,
    paid: true,
    value: 100,
    total: 100,
    month: EMonth.MARCH,
    active: true,
    supplier: supplierMock,
    total_paid: 100,
    description: 'Test expense',
    instalment_number: 1,
    created_at: new Date('2023-01-01'),
    updated_at: new Date('2023-01-02'),
    deleted_at: undefined,
  };

  const billEntity = {
    ...billMock,
    expenses: [expenseMockOne, expenseMockTwo],
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
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
        name: billEntity.name,
        type: billEntity.type,
        total: billEntity.total,
        finance: billEntity.finance,
        expenses: billEntity.expenses,
      };

      const bill = new Bill(params);

      expect(bill.bank).toBe(params.bank);
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