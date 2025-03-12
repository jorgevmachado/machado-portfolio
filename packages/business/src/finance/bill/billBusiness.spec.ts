import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { EGender, ERole, EStatus } from '../../shared';

import { EBillType, EExpenseType, EMonth } from '../../api/nest/finance';

import BillBusiness from './billBusiness';
import type { BillConstructorParams } from './interface';
import Bill from './bill';

describe('billBusiness', () => {
  const business = new BillBusiness();
  const mockBillConstructorParams: BillConstructorParams = {
    id: '1',
    name: 'Bill A',
    total: 100,
    expenses: [
      {
        id: '123',
        year: 2022,
        type: EExpenseType.FIXED,
        paid: true,
        value: 100,
        total: 100,
        month: EMonth.MARCH,
        active: true,
        supplier: {
          id: '1',
          name: 'Supplier A',
          type: {
            id: '1',
            name: 'Supplier A',
            created_at: new Date('2023-01-01'),
            updated_at: new Date('2023-01-02'),
            deleted_at: undefined,
          },
          active: true,
          created_at: new Date('2023-01-01'),
          updated_at: new Date('2023-01-02'),
          deleted_at: undefined,
          description: 'This supplier delivers raw materials.',
        },
        total_paid: 100,
        description: 'Test expense',
        instalment_number: 1,
        created_at: new Date('2023-01-01'),
        updated_at: new Date('2023-01-02'),
        deleted_at: undefined,
      },
      {
        id: '234',
        year: 2022,
        type: EExpenseType.FIXED,
        paid: true,
        value: 100,
        total: 100,
        month: EMonth.MARCH,
        active: true,
        supplier: {
          id: '1',
          name: 'Supplier A',
          type: {
            id: '1',
            name: 'Supplier A',
            created_at: new Date('2023-01-01'),
            updated_at: new Date('2023-01-02'),
            deleted_at: undefined,
          },
          active: true,
          created_at: new Date('2023-01-01'),
          updated_at: new Date('2023-01-02'),
          deleted_at: undefined,
          description: 'This supplier delivers raw materials.',
        },
        total_paid: 100,
        description: 'Test expense',
        instalment_number: 1,
        created_at: new Date('2023-01-01'),
        updated_at: new Date('2023-01-02'),
        deleted_at: undefined,
      },
    ],
    type: EBillType.CREDIT_CARD,
    bank: {
      id: '1',
      name: 'Bank A',
      created_at: new Date('2023-01-01'),
      updated_at: new Date('2023-01-02'),
      deleted_at: undefined,
    },
    user: {
      id: '1',
      name: 'User A',
      cpf: '12345678901',
      role: ERole.USER,
      email: 'usera@example.com',
      gender: EGender.MALE,
      created_at: new Date('2023-01-01'),
      updated_at: new Date('2023-01-02'),
      deleted_at: undefined,
      status: EStatus.ACTIVE,
      whatsapp: '1234567890',
      date_of_birth: new Date('1990-01-01'),
    },
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

  describe('initializeBill', () => {
    it('should initialize a bill and process it', () => {
      const bill = business.initialize(mockBillConstructorParams);

      expect(bill).toBeInstanceOf(Bill);
      expect(bill.total).toBe(2400);
      expect(bill.total_paid).toBe(2400);
      expect(bill.expenses.length).toBe(2);
      expect(bill.all_paid).toBe(true);
    });
  });
});