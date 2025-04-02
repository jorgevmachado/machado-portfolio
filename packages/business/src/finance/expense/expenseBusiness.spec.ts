import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { MONTHS } from '@repo/services/month/month';

import { EExpenseType, EMonth } from '../enum';

import ExpenseBusiness from './expenseBusiness';
import Expense from './expense';
import { INGRID_RESIDENTIAL_LIST_FIXTURE } from './fixtures';
import {ExpenseConstructorParams, ExpenseEntity} from './interface';

describe('business', () => {
  const business = new ExpenseBusiness();

  const mockExpenseConstructorParams = INGRID_RESIDENTIAL_LIST_FIXTURE[0];
  const mockExpenseConstructorParams2 = INGRID_RESIDENTIAL_LIST_FIXTURE[1];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('initialize', () => {
    it('should initialize a FIXED expense correctly', () => {
      const params: ExpenseConstructorParams = {
        value: 100,
        name: mockExpenseConstructorParams.name,
        supplier: mockExpenseConstructorParams.supplier,
        month: EMonth.JANUARY,
        type: EExpenseType.FIXED,
        year: 2023,
      };

      const result = business.initialize(params);

      expect(result.requiresNewBill).toBe(false);
      expect(result.expenseForNextYear).toBeUndefined();
      expect(result.expenseForCurrentYear).toBeInstanceOf(Expense);
      expect(result.expenseForCurrentYear.total).toBeDefined();
    });

    it('should initialize a VARIABLE expense correctly', () => {
      const params: ExpenseConstructorParams = {
        name: mockExpenseConstructorParams.name,
        value: 100,
        supplier: mockExpenseConstructorParams.supplier,
        month: EMonth.FEBRUARY,
        instalment_number: 12,
        type: EExpenseType.VARIABLE,
        year: 2023,
      };

      const result = business.initialize(params);

      expect(result.requiresNewBill).toBe(true);
      expect(result.expenseForNextYear).not.toBeUndefined();
      expect(result.expenseForCurrentYear).toBeInstanceOf(Expense);
      expect(result.expenseForCurrentYear.total).toEqual(0);
    });

    it('should throw an error if the month is invalid', () => {
      const params: any = {
        name: mockExpenseConstructorParams.name,
        value: 100,
        month: 'INVALID_MONTH',
        supplier: mockExpenseConstructorParams.supplier,
        instalment_number: 5,
        type: EExpenseType.VARIABLE,
        year: 2023,
      };

      expect(() => {
        business.initialize(params);
      }).toThrowError('The month provided is invalid: INVALID_MONTH');
    });
  });

  describe('calculateExpense', () => {
    it('should calculate totals for a paid expense', () => {
      const params: ExpenseConstructorParams = {
        name: mockExpenseConstructorParams.name,
        value: 100,
        paid: true,
        supplier: mockExpenseConstructorParams.supplier,
        instalment_number: 3,
        month: EMonth.JANUARY,
        type: EExpenseType.FIXED,
        year: 2023,
      };

      const result = business.calculateExpense(params);

      expect(result.paid).toBe(true);
      expect(result.total).toBe(0);
      MONTHS.forEach((month) => {
        expect(result[`${month}_paid`]).toBe(true);
      });
    });

    it('should calculate totals for an unpaid expense', () => {
      const params: ExpenseConstructorParams = {
        name: mockExpenseConstructorParams.name,
        value: 50,
        paid: true,
        supplier: mockExpenseConstructorParams.supplier,
        instalment_number: 3,
        month: EMonth.FEBRUARY,
        type: EExpenseType.FIXED,
        year: 2023,
      };

      const result = business.calculateExpense(params);

      expect(result.paid).toBe(true);
      expect(result.total).toEqual(0);
      MONTHS.forEach((month) => {
        if (result[month] === 0) {
          expect(result[`${month}_paid`]).toBe(true);
        }
      });
    });
  });

  describe('processValuesVariable', () => {
    it('should split values correctly across months if they span multiple years', () => {
      const params: any = {
        name: mockExpenseConstructorParams.name,
        supplier: mockExpenseConstructorParams.supplier,
        value: 200,
        year: 2023,
        instalment_number: 12,
        type: EExpenseType.VARIABLE,
        paid: false,
        total: 0,
      };

      const result = business['processValuesVariable'](params, params.value, EMonth.NOVEMBER);

      expect(result.nextYear).toBe(2024);
      expect(result.requiresNewBill).toBe(true);
      expect(result.expenseForCurrentYear).not.toBeUndefined();
      expect(result.expenseForNextYear).not.toBeUndefined();
    });
  });

  describe('processesMonthsOfExpense', () => {
    it('should correctly apply values to the specified months', () => {
      const expense = new Expense({
        name: mockExpenseConstructorParams.name,
        supplier: mockExpenseConstructorParams.supplier,
        year: 2023,
        value: 100,
        paid: false,
        instalment_number: 2,
        month: EMonth.JANUARY,
        type: EExpenseType.FIXED,
      });

      const updatedExpense = business['processesMonthsOfExpense'](expense, ['JANUARY', 'FEBRUARY'], 100, false);

      expect(updatedExpense.january).toBe(0);
      expect(updatedExpense.february).toBe(0);
      expect(updatedExpense.january_paid).toBe(true);
      expect(updatedExpense.march_paid).toBe(true);
    });
  });

  describe('calculateTotal', () => {
    it('should calculate correctly for an expense with some paid months', () => {
      const expense = new Expense({
        name: mockExpenseConstructorParams.name,
        supplier: mockExpenseConstructorParams.supplier,
        year: 2023,
        value: 50,
        paid: false,
        instalment_number: 3,
        month: EMonth.JANUARY,
        type: EExpenseType.FIXED,
      });

      // Ajuste prévio do estado
      expense['january'] = 50;
      expense['february'] = 50;
      expense['march'] = 50;

      expense['january_paid'] = true;
      expense['february_paid'] = false;
      expense['march_paid'] = true;

      const totals = business['calculateTotal'](expense);

      expect(totals.total).toBe(150);
      expect(totals.total_paid).toBe(100);
      expect(totals.total - totals.total_paid).toBe(50);
    });
  });

  describe('validateHaveBeenPaid', () => {
    it('should return true if all months are paid', () => {
      const expense = new Expense({
        name: mockExpenseConstructorParams.name,
        supplier: mockExpenseConstructorParams.supplier,
        year: 2023,
        value: 0,
        paid: false,
        instalment_number: 12,
        month: EMonth.JANUARY,
        type: EExpenseType.FIXED,
      });

      MONTHS.forEach((month) => {
        expense[`${month}_paid`] = true;
      });

      const result = business['validateHaveBeenPaid'](expense);

      expect(result).toBe(true);
    });

    it('should return false if not all months are paid', () => {
      const expense = new Expense({
        name: mockExpenseConstructorParams.name,
        supplier: mockExpenseConstructorParams.supplier,
        year: 2023,
        value: 0,
        paid: false,
        instalment_number: 12,
        month: EMonth.JANUARY,
        type: EExpenseType.FIXED,
      });

      MONTHS.forEach((month, index) => {
        expense[`${month}_paid`] = index !== 0; // Deixa "JANUARY" não pago
      });

      const result = business['validateHaveBeenPaid'](expense);

      expect(result).toBe(false);
    });
  });

  describe('merge', () => {
    it('should merge two expenses with no conflicts', () => {
      const expense1: ExpenseEntity = mockExpenseConstructorParams;
      const expense2: ExpenseConstructorParams = {
        april: 100,
        may: 100,
        supplier: mockExpenseConstructorParams.supplier,
        name: 'Merged Expense',
        type: EExpenseType.FIXED,
      };

      const result = business.merge({ entity: expense1, expenseToMerge: expense2});
      expect(result.april).toEqual(expense2.april);
      expect(result.may).toEqual(expense2.may);
      expect(result.type).toEqual(expense2.type);
      expect(result.supplier).toEqual(expense2.supplier);
      expect(result.name).toEqual(expense2.name);
    });

    it('should merge expenses and override existing values', () => {
      const expense1: ExpenseEntity = mockExpenseConstructorParams;
      const expense2: ExpenseConstructorParams = {
        year: 2023,
        type: EExpenseType.FIXED,
        supplier: mockExpenseConstructorParams.supplier,
        name: 'Expense2',
        paid: false,
        instalment_number: 0,
        february: 200,
        march: 100,
      };

      const result = business.merge({ entity: expense1, expenseToMerge: expense2});

      expect(result.year).toEqual(expense2.year);
      expect(result.type).toEqual(expense2.type);
      expect(result.supplier).toEqual(expense2.supplier);
      expect(result.name).toEqual(expense2.name);
      expect(result.paid).toEqual(expense2.paid);
      expect(result.instalment_number).toEqual(expense2.instalment_number);
      expect(result.february).toEqual(expense2.february);
      expect(result.march).toEqual(expense2.march);
    });

    it('should merge expenses with paid status correctly', () => {
      const expense1: ExpenseEntity = mockExpenseConstructorParams;
      const expense2: ExpenseConstructorParams = {
        year: 2023,
        type: EExpenseType.FIXED,
        supplier: mockExpenseConstructorParams.supplier,
        name: 'Example Expense',
        february: 100,
        february_paid: true,
      };

      const result = business.merge({ entity: expense1, expenseToMerge: expense2});

      expect(result.year).toEqual(expense2.year);
      expect(result.type).toEqual(expense2.type);
      expect(result.supplier).toEqual(expense2.supplier);
      expect(result.name).toEqual(expense2.name);
      expect(result.february).toEqual(expense2.february);
      expect(result.february_paid).toEqual(expense2.february_paid);
    });
  });

  describe('calculateAllExpenses', () => {
    it('should calculate all expenses correctly', () => {
      const expenses = [
        mockExpenseConstructorParams,
        mockExpenseConstructorParams2
      ];

      const result = business.calculateAllExpenses(expenses);

      expect(result.total).toEqual(654.26);
      expect(result.allPaid).toEqual(false);
      expect(result.totalPaid).toEqual(654.26);
      expect(result.totalPending).toEqual(0);
    })
  })
});
