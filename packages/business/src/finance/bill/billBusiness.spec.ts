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

import BillBusiness from './billBusiness';
import type { BillConstructorParams } from './interface';
import Bill from './bill';

describe('billBusiness', () => {
  const business = new BillBusiness();

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

  const mockBillConstructorParams: BillConstructorParams = {
    ...billMock,
    expenses: [expenseMockOne, expenseMockTwo],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('initializeBill', () => {
    it('should initialize a bill and process it', () => {
      const bill = business.initialize(mockBillConstructorParams);

      expect(bill).toBeInstanceOf(Bill);
      expect(bill.total).toBe(2400);
      expect(bill.total_paid).toBe(2400);
      expect(bill?.expenses?.length).toBe(2);
      expect(bill.all_paid).toBe(true);
    });
  });
});