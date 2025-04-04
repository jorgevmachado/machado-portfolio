import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import type { TMonth } from '@repo/services/month/interface';
import { EMonth } from '@repo/services/month/enum';
import { MONTHS } from '@repo/services/month/month';

import { EExpenseType } from '../enum';

import ExpenseBusiness from './expenseBusiness';
import { INGRID_RESIDENTIAL_LIST_FIXTURE } from './fixtures';
import { ExpenseConstructorParams } from './interface';

describe('business', () => {
  const business = new ExpenseBusiness();

  const mockExpenseEntity = INGRID_RESIDENTIAL_LIST_FIXTURE[0];
  const mockNewExpenseEntity = INGRID_RESIDENTIAL_LIST_FIXTURE[1];
  const mockNewSupplierEntity = mockNewExpenseEntity.supplier;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('initialize', () => {
    it('should initialize a FIXED expense correctly', () => {
      const value = 93.59;
      const params: ExpenseConstructorParams = {
        ...mockExpenseEntity,
        id: undefined,
        year: 2025,
        name: `${mockExpenseEntity.bill.name} ${mockExpenseEntity.supplier.name}`,
        type: EExpenseType.FIXED,
        paid: true,
        total: 0,
        supplier: mockExpenseEntity.supplier,
        total_paid: 0,
        description: undefined,
        created_at: undefined,
        updated_at: undefined,
        deleted_at: undefined,
        instalment_number: 12,
      };

      const result = business.initialize(params, undefined, value);

      expect(result.nextYear).toBe(2026);
      expect(result.requiresNewBill).toBeFalsy();
      expect(result.expenseForNextYear).toBeUndefined();
      expect(result.expenseForCurrentYear.id).toBeUndefined();
      expect(result.expenseForCurrentYear.name).toEqual(params.name);
      expect(result.expenseForCurrentYear.year).toEqual(params.year);
      expect(result.expenseForCurrentYear.bill).toEqual(mockExpenseEntity.bill);
      expect(result.expenseForCurrentYear.type).toEqual(EExpenseType.FIXED);
      expect(result.expenseForCurrentYear.paid).toBeTruthy();
      expect(result.expenseForCurrentYear.total).toEqual(0);
      expect(result.expenseForCurrentYear.supplier).toEqual(
        mockExpenseEntity.supplier,
      );
      expect(result.expenseForCurrentYear.name_code).toEqual(
        mockExpenseEntity.name_code,
      );
      expect(result.expenseForCurrentYear.total_paid).toEqual(0);
      expect(result.expenseForCurrentYear.january).toEqual(93.59);
      expect(result.expenseForCurrentYear.january_paid).toBeTruthy();
      expect(result.expenseForCurrentYear.february).toEqual(93.59);
      expect(result.expenseForCurrentYear.february_paid).toBeTruthy();
      expect(result.expenseForCurrentYear.march).toEqual(93.59);
      expect(result.expenseForCurrentYear.march_paid).toBeTruthy();
      expect(result.expenseForCurrentYear.april).toEqual(93.59);
      expect(result.expenseForCurrentYear.april_paid).toBeTruthy();
      expect(result.expenseForCurrentYear.may).toEqual(93.59);
      expect(result.expenseForCurrentYear.may_paid).toBeTruthy();
      expect(result.expenseForCurrentYear.june).toEqual(93.59);
      expect(result.expenseForCurrentYear.june_paid).toBeTruthy();
      expect(result.expenseForCurrentYear.july).toEqual(93.59);
      expect(result.expenseForCurrentYear.july_paid).toBeTruthy();
      expect(result.expenseForCurrentYear.august).toEqual(93.59);
      expect(result.expenseForCurrentYear.august_paid).toBeTruthy();
      expect(result.expenseForCurrentYear.september).toEqual(93.59);
      expect(result.expenseForCurrentYear.september_paid).toBeTruthy();
      expect(result.expenseForCurrentYear.october).toEqual(93.59);
      expect(result.expenseForCurrentYear.october_paid).toBeTruthy();
      expect(result.expenseForCurrentYear.november).toEqual(93.59);
      expect(result.expenseForCurrentYear.november_paid).toBeTruthy();
      expect(result.expenseForCurrentYear.december).toEqual(93.59);
      expect(result.expenseForCurrentYear.december_paid).toBeTruthy();
      expect(result.expenseForCurrentYear.description).toBeUndefined();
      expect(result.expenseForCurrentYear.created_at).toBeUndefined();
      expect(result.expenseForCurrentYear.updated_at).toBeUndefined();
      expect(result.expenseForCurrentYear.deleted_at).toBeUndefined();
      expect(result.expenseForCurrentYear.instalment_number).toEqual(12);
    });

    it('should initialize a variable expense correctly with instalment_number equal 2', () => {
      const value = 50;
      const month = EMonth.JANUARY;
      const params: ExpenseConstructorParams = {
        ...mockExpenseEntity,
        id: undefined,
        year: 2025,
        name: `${mockExpenseEntity.bill.name} ${mockExpenseEntity.supplier.name}`,
        type: EExpenseType.VARIABLE,
        paid: true,
        total: 0,
        supplier: mockExpenseEntity.supplier,
        total_paid: 0,
        description: undefined,
        created_at: undefined,
        updated_at: undefined,
        deleted_at: undefined,
        instalment_number: 2,
      };

      const result = business.initialize(params, month, value);

      expect(result.nextYear).toBe(2026);
      expect(result.requiresNewBill).toBeFalsy();
      expect(result.expenseForNextYear).toBeUndefined();
      expect(result.expenseForCurrentYear.id).toBeUndefined();
      expect(result.expenseForCurrentYear.name).toEqual(params.name);
      expect(result.expenseForCurrentYear.year).toEqual(params.year);
      expect(result.expenseForCurrentYear.bill).toEqual(mockExpenseEntity.bill);
      expect(result.expenseForCurrentYear.type).toEqual(EExpenseType.VARIABLE);
      expect(result.expenseForCurrentYear.paid).toBeTruthy();
      expect(result.expenseForCurrentYear.total).toEqual(0);
      expect(result.expenseForCurrentYear.supplier).toEqual(
        mockExpenseEntity.supplier,
      );
      expect(result.expenseForCurrentYear.name_code).toEqual(
        mockExpenseEntity.name_code,
      );
      expect(result.expenseForCurrentYear.total_paid).toEqual(0);
      expect(result.expenseForCurrentYear.january).toEqual(50);
      expect(result.expenseForCurrentYear.january_paid).toBeTruthy();
      expect(result.expenseForCurrentYear.february).toEqual(50);
      expect(result.expenseForCurrentYear.february_paid).toBeTruthy();
      expect(result.expenseForCurrentYear.march).toEqual(0);
      expect(result.expenseForCurrentYear.march_paid).toBeTruthy();
      expect(result.expenseForCurrentYear.april).toEqual(0);
      expect(result.expenseForCurrentYear.april_paid).toBeTruthy();
      expect(result.expenseForCurrentYear.may).toEqual(0);
      expect(result.expenseForCurrentYear.may_paid).toBeTruthy();
      expect(result.expenseForCurrentYear.june).toEqual(0);
      expect(result.expenseForCurrentYear.june_paid).toBeTruthy();
      expect(result.expenseForCurrentYear.july).toEqual(0);
      expect(result.expenseForCurrentYear.july_paid).toBeTruthy();
      expect(result.expenseForCurrentYear.august).toEqual(0);
      expect(result.expenseForCurrentYear.august_paid).toBeTruthy();
      expect(result.expenseForCurrentYear.september).toEqual(0);
      expect(result.expenseForCurrentYear.september_paid).toBeTruthy();
      expect(result.expenseForCurrentYear.october).toEqual(0);
      expect(result.expenseForCurrentYear.october_paid).toBeTruthy();
      expect(result.expenseForCurrentYear.november).toEqual(0);
      expect(result.expenseForCurrentYear.november_paid).toBeTruthy();
      expect(result.expenseForCurrentYear.december).toEqual(0);
      expect(result.expenseForCurrentYear.december_paid).toBeTruthy();
      expect(result.expenseForCurrentYear.description).toBeUndefined();
      expect(result.expenseForCurrentYear.created_at).toBeUndefined();
      expect(result.expenseForCurrentYear.updated_at).toBeUndefined();
      expect(result.expenseForCurrentYear.deleted_at).toBeUndefined();
      expect(result.expenseForCurrentYear.instalment_number).toEqual(2);
    });

    it('should initialize a variable expense correctly with instalment_number equal 12 and expenseForNextYear', () => {
      const value = 20;
      const month = EMonth.MARCH;
      const params: ExpenseConstructorParams = {
        ...mockExpenseEntity,
        id: undefined,
        year: 2025,
        name: `${mockExpenseEntity.bill.name} ${mockExpenseEntity.supplier.name}`,
        type: EExpenseType.VARIABLE,
        paid: false,
        total: 0,
        supplier: mockExpenseEntity.supplier,
        total_paid: 0,
        description: undefined,
        created_at: undefined,
        updated_at: undefined,
        deleted_at: undefined,
        instalment_number: 12,
      };

      const result = business.initialize(params, month, value);

      expect(result.nextYear).toBe(2026);
      expect(result.requiresNewBill).toBeTruthy();
      expect(result.expenseForCurrentYear.id).toBeUndefined();
      expect(result.expenseForCurrentYear.name).toEqual(params.name);
      expect(result.expenseForCurrentYear.year).toEqual(params.year);
      expect(result.expenseForCurrentYear.bill).toEqual(mockExpenseEntity.bill);
      expect(result.expenseForCurrentYear.type).toEqual(EExpenseType.VARIABLE);
      expect(result.expenseForCurrentYear.paid).toBeFalsy();
      expect(result.expenseForCurrentYear.total).toEqual(0);
      expect(result.expenseForCurrentYear.supplier).toEqual(
        mockExpenseEntity.supplier,
      );
      expect(result.expenseForCurrentYear.name_code).toEqual(
        mockExpenseEntity.name_code,
      );
      expect(result.expenseForCurrentYear.total_paid).toEqual(0);
      expect(result.expenseForCurrentYear.january).toEqual(0);
      expect(result.expenseForCurrentYear.january_paid).toBeTruthy();
      expect(result.expenseForCurrentYear.february).toEqual(0);
      expect(result.expenseForCurrentYear.february_paid).toBeTruthy();
      expect(result.expenseForCurrentYear.march).toEqual(20);
      expect(result.expenseForCurrentYear.march_paid).toBeFalsy();
      expect(result.expenseForCurrentYear.april).toEqual(20);
      expect(result.expenseForCurrentYear.april_paid).toBeFalsy();
      expect(result.expenseForCurrentYear.may).toEqual(20);
      expect(result.expenseForCurrentYear.may_paid).toBeFalsy();
      expect(result.expenseForCurrentYear.june).toEqual(20);
      expect(result.expenseForCurrentYear.june_paid).toBeFalsy();
      expect(result.expenseForCurrentYear.july).toEqual(20);
      expect(result.expenseForCurrentYear.july_paid).toBeFalsy();
      expect(result.expenseForCurrentYear.august).toEqual(20);
      expect(result.expenseForCurrentYear.august_paid).toBeFalsy();
      expect(result.expenseForCurrentYear.september).toEqual(20);
      expect(result.expenseForCurrentYear.september_paid).toBeFalsy();
      expect(result.expenseForCurrentYear.october).toEqual(20);
      expect(result.expenseForCurrentYear.october_paid).toBeFalsy();
      expect(result.expenseForCurrentYear.november).toEqual(20);
      expect(result.expenseForCurrentYear.november_paid).toBeFalsy();
      expect(result.expenseForCurrentYear.december).toEqual(20);
      expect(result.expenseForCurrentYear.december_paid).toBeFalsy();
      expect(result.expenseForCurrentYear.description).toBeUndefined();
      expect(result.expenseForCurrentYear.created_at).toBeUndefined();
      expect(result.expenseForCurrentYear.updated_at).toBeUndefined();
      expect(result.expenseForCurrentYear.deleted_at).toBeUndefined();
      expect(result.expenseForCurrentYear.instalment_number).toEqual(10);

      expect(result.expenseForNextYear?.id).toBeUndefined();
      expect(result.expenseForNextYear?.name).toEqual(params.name);
      expect(result.expenseForNextYear?.year).toEqual(2026);
      expect(result.expenseForNextYear?.bill).toEqual(mockExpenseEntity.bill);
      expect(result.expenseForNextYear?.type).toEqual(EExpenseType.VARIABLE);
      expect(result.expenseForNextYear?.paid).toBeFalsy();
      expect(result.expenseForNextYear?.total).toEqual(0);
      expect(result.expenseForNextYear?.supplier).toEqual(
        mockExpenseEntity.supplier,
      );
      expect(result.expenseForNextYear?.name_code).toEqual(
        mockExpenseEntity.name_code,
      );
      expect(result.expenseForNextYear?.total_paid).toEqual(0);
      expect(result.expenseForNextYear?.january).toEqual(20);
      expect(result.expenseForNextYear?.january_paid).toBeFalsy();
      expect(result.expenseForNextYear?.february).toEqual(20);
      expect(result.expenseForNextYear?.february_paid).toBeFalsy();
      expect(result.expenseForNextYear?.march).toEqual(0);
      expect(result.expenseForNextYear?.march_paid).toBeTruthy();
      expect(result.expenseForNextYear?.april).toEqual(0);
      expect(result.expenseForNextYear?.april_paid).toBeTruthy();
      expect(result.expenseForNextYear?.may).toEqual(0);
      expect(result.expenseForNextYear?.may_paid).toBeTruthy();
      expect(result.expenseForNextYear?.june).toEqual(0);
      expect(result.expenseForNextYear?.june_paid).toBeTruthy();
      expect(result.expenseForNextYear?.july).toEqual(0);
      expect(result.expenseForNextYear?.july_paid).toBeTruthy();
      expect(result.expenseForNextYear?.august).toEqual(0);
      expect(result.expenseForNextYear?.august_paid).toBeTruthy();
      expect(result.expenseForNextYear?.september).toEqual(0);
      expect(result.expenseForNextYear?.september_paid).toBeTruthy();
      expect(result.expenseForNextYear?.october).toEqual(0);
      expect(result.expenseForNextYear?.october_paid).toBeTruthy();
      expect(result.expenseForNextYear?.november).toEqual(0);
      expect(result.expenseForNextYear?.november_paid).toBeTruthy();
      expect(result.expenseForNextYear?.december).toEqual(0);
      expect(result.expenseForNextYear?.december_paid).toBeTruthy();
      expect(result.expenseForNextYear?.description).toBeUndefined();
      expect(result.expenseForNextYear?.created_at).toBeUndefined();
      expect(result.expenseForNextYear?.updated_at).toBeUndefined();
      expect(result.expenseForNextYear?.deleted_at).toBeUndefined();
      expect(result.expenseForNextYear?.instalment_number).toEqual(2);
    });
  });

  describe('calculateExpense', () => {
    it('should calculate correctly for a fixed expense', () => {
      const params: ExpenseConstructorParams = {
        ...mockExpenseEntity,
        id: undefined,
        year: 2025,
        name: mockExpenseEntity.name,
        type: EExpenseType.FIXED,
        paid: true,
        total: 0,
        value: 93.59,
        month: EMonth.JANUARY,
        supplier: mockExpenseEntity.supplier,
        total_paid: 0,
        description: undefined,
        created_at: undefined,
        updated_at: undefined,
        deleted_at: undefined,
        instalment_number: 12,
      };

      MONTHS.forEach((month) => {
        params[`${month}_paid`] = true;
        params[`${month}`] = 93.59;
      });

      const result = business.calculateExpense(params);
      expect(result.paid).toBeTruthy();
      expect(result.total).toEqual(1123.08);
      expect(result.total_paid).toEqual(1123.08);
    });

    it('should calculate correctly for a variable expense', () => {
      const params: ExpenseConstructorParams = {
        ...mockExpenseEntity,
        id: undefined,
        year: 2025,
        name: mockExpenseEntity.name,
        type: EExpenseType.VARIABLE,
        paid: false,
        total: 0,
        value: 93.59,
        month: EMonth.JANUARY,
        supplier: mockExpenseEntity.supplier,
        total_paid: 0,
        description: undefined,
        created_at: undefined,
        updated_at: undefined,
        deleted_at: undefined,
        instalment_number: 2,
      };
      MONTHS.forEach((month) => {
        params[`${month}_paid`] = true;
        params[`${month}`] = 0;
      });

      const months: Array<TMonth> = ['january', 'february'];
      months.forEach((month) => {
        params[`${month}_paid`] = false;
        params[`${month}`] = 93.59;
      });

      const result = business.calculateExpense(params);
      expect(result.paid).toBeFalsy();
      expect(result.total).toEqual(187.18);
      expect(result.total_paid).toEqual(0);
    });
  });

  describe('merge', () => {
    it('should merge correctly', () => {
      const params: ExpenseConstructorParams = {
        ...mockExpenseEntity,
        id: undefined,
        year: 2025,
        name: mockExpenseEntity.name,
        type: EExpenseType.FIXED,
        paid: true,
        total: 0,
        value: 93.59,
        month: EMonth.JANUARY,
        supplier: mockExpenseEntity.supplier,
        total_paid: 0,
        description: undefined,
        created_at: undefined,
        updated_at: undefined,
        deleted_at: undefined,
        instalment_number: 12,
      };

      MONTHS.forEach((month) => {
        params[`${month}_paid`] = true;
        params[`${month}`] = 93.59;
      });

      const result = business.merge({
        entity: mockExpenseEntity,
        expenseToMerge: params,
      });

      expect(result.id).toEqual(mockExpenseEntity.id);
      expect(result.name).toEqual(params.name);
      expect(result.year).toEqual(params.year);
      expect(result.bill).toEqual(mockExpenseEntity.bill);
      expect(result.type).toEqual(EExpenseType.FIXED);
      expect(result.paid).toBeTruthy();
      expect(result.total).toEqual(0);
      expect(result.supplier).toEqual(mockExpenseEntity.supplier);
      expect(result.name_code).toEqual(mockExpenseEntity.name_code);
      expect(result.total_paid).toEqual(0);
      expect(result.january).toEqual(93.59);
      expect(result.january_paid).toBeTruthy();
      expect(result.february).toEqual(93.59);
      expect(result.february_paid).toBeTruthy();
      expect(result.march).toEqual(93.59);
      expect(result.march_paid).toBeTruthy();
      expect(result.april).toEqual(93.59);
      expect(result.april_paid).toBeTruthy();
      expect(result.may).toEqual(93.59);
      expect(result.may_paid).toBeTruthy();
      expect(result.june).toEqual(93.59);
      expect(result.june_paid).toBeTruthy();
      expect(result.july).toEqual(93.59);
      expect(result.july_paid).toBeTruthy();
      expect(result.august).toEqual(93.59);
      expect(result.august_paid).toBeTruthy();
      expect(result.september).toEqual(93.59);
      expect(result.september_paid).toBeTruthy();
      expect(result.october).toEqual(93.59);
      expect(result.october_paid).toBeTruthy();
      expect(result.november).toEqual(93.59);
      expect(result.november_paid).toBeTruthy();
      expect(result.december).toEqual(93.59);
      expect(result.december_paid).toBeTruthy();
      expect(result.description).toBeUndefined();
      expect(result.created_at).toEqual(mockExpenseEntity.created_at);
      expect(result.updated_at).toEqual(mockExpenseEntity.updated_at);
      expect(result.deleted_at).toEqual(mockExpenseEntity.deleted_at);
      expect(result.instalment_number).toEqual(12);
    });

    it('should merge correctly only deleted_at', () => {
      const result = business.merge({
        entity: mockExpenseEntity,
        expenseToMerge: {
          deleted_at: new Date('2026-01-01'),
          type: EExpenseType.FIXED,
          supplier: mockNewSupplierEntity,
          name: '',
        },
      });
      expect(result.deleted_at).toEqual(new Date('2026-01-01'));
    });
  });

  describe('calculateAllExpenses', () => {
    it('should calculate two expenses correctly', () => {
      const result = business.calculateAllExpenses([
        mockExpenseEntity,
        mockNewExpenseEntity,
      ]);
      expect(result.total).toEqual(654.26);
      expect(result.allPaid).toBeFalsy();
      expect(result.totalPaid).toEqual(654.26);
      expect(result.totalPending).toEqual(0);
    });
  });
});
