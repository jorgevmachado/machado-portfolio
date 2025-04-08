import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { EMonth } from '@repo/services/month/enum';

import { EExpenseType } from '../../api/nest/finance';

import { INGRID_RESIDENTIAL_LIST_FIXTURE } from '../expense/fixtures';

import { ExpenseConstructorParams } from '../expense';

import {
  BILL_LIST_FIXTURE,
  INGRID_RESIDENTIAL_BANK_SLIP_NUBANK_BILL_FIXTURE,
} from './fixtures';

import BillBusiness from './business';
import type { BillConstructorParams } from './interface';
import Bill from './bill';

describe('billBusiness', () => {
  const business = new BillBusiness();

  const mockBillConstructorParams: BillConstructorParams =
    INGRID_RESIDENTIAL_BANK_SLIP_NUBANK_BILL_FIXTURE;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.resetModules();
  });

  describe('initialize', () => {
    it('should initialize a bill and process it', () => {
      const bill = business.initialize(mockBillConstructorParams);

      expect(bill).toBeInstanceOf(Bill);
      expect(bill.total).toBe(mockBillConstructorParams.total);
      expect(bill.total_paid).toBe(mockBillConstructorParams.total_paid);
      expect(bill?.expenses?.length).toBe(4);
      expect(bill.all_paid).toBe(mockBillConstructorParams.all_paid);
    });
  });

  describe('initialize expense', () => {
    const mockExpenseEntity = INGRID_RESIDENTIAL_LIST_FIXTURE[0];
    it('should initialize a expense.', () => {
      const value = 93.59;
      const month = EMonth.JANUARY;
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
      const result = business.initializeExpense(params, month, value);
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
  });

  describe('mapBillListByItem', () => {
    const mockBillList = BILL_LIST_FIXTURE;
    it('should map bill list type by item', () => {
      const result = business.mapBillListByItem(mockBillList, 'type');
      expect(result.length).toEqual(4);
    });

    it('should map bill list bank by item', () => {
      const result = business.mapBillListByItem(mockBillList, 'bank');
      expect(result.length).toEqual(4);
    });

    it('should map bill list category by item', () => {
      const result = business.mapBillListByItem(mockBillList, 'category');
      expect(result.length).toEqual(4);
    });
  });

  describe('calculateAllBill', () => {
    const mockBill = BILL_LIST_FIXTURE[0] as Bill;
    it('should calculate all bill correctly', () => {
      const result = business.calculateAllBill(mockBill);
      expect(result.total).toEqual(4109.68);
      expect(result.allPaid).toBeFalsy();
      expect(result.totalPaid).toEqual(2609.68);
      expect(result.totalPending).toEqual(1500);
    });

    it('should calculate all bill correctly with total anda all_paid undefined', () => {
      const result = business.calculateAllBill({
        ...mockBill,
        total: undefined,
        all_paid: undefined,
        total_paid: undefined,
      });
      expect(result.total).toEqual(0);
      expect(result.allPaid).toBeFalsy();
      expect(result.totalPaid).toEqual(0);
      expect(result.totalPending).toEqual(0);
    });
  });
});