import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { EExpenseType, EMonth } from '../enum';

import ExpenseBusiness from './expenseBusiness';
import Expense from './expense';
import { INGRID_RESIDENTIAL_LIST_FIXTURE } from './fixtures';

jest.mock('./config', () => ({
  getCurrentMonth: jest.fn(),
  getMonthByIndex: jest.fn(),
  getMonthIndex: jest.fn(),
  validateMonth: jest.fn(),
  MONTH_KEYS: [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
  ],
}));

describe('ExpenseBusiness', () => {
  const business = new ExpenseBusiness();

  const mockExpenseConstructorParams = INGRID_RESIDENTIAL_LIST_FIXTURE[0];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('initializeExpense', () => {
    it('should initialize an expense and process it', () => {
      const params = {
        ...mockExpenseConstructorParams,
        type: EExpenseType.VARIABLE,
        value: 100,
        month: EMonth.MARCH,
      };

      const expense = business.initializeExpense(params);

      expect(expense).toBeInstanceOf(Expense);
      expect(expense.value).toBe(100);
      expect(expense.total).toBeGreaterThanOrEqual(0); // Verificar que processAllCalculate foi chamado.
    });
  });

  describe('merge', () => {
    it('should merge expenses correctly, overriding with expenseToMerge values', () => {
      const entity = new Expense(mockExpenseConstructorParams);
      const expenseToMerge = {
        ...mockExpenseConstructorParams,
        value: 200,
        month: EMonth.FEBRUARY,
        total_paid: 50,
      };

      const mergedExpense = business.merge({ entity, expenseToMerge });

      expect(mergedExpense.value).toBe(200);
      expect(mergedExpense.month).toBe(EMonth.FEBRUARY);
      expect(mergedExpense.total_paid).toBe(50);
    });

    it('should trigger full calculations when withAllCalculations is true', () => {
      const entity = new Expense({
        ...mockExpenseConstructorParams,
        value: 100,
      });
      const expenseToMerge = { ...mockExpenseConstructorParams, value: 200 };

      const mergedExpense = business.merge({
        entity,
        expenseToMerge,
        withAllCalculations: true,
      });

      expect(mergedExpense.total).toBeGreaterThan(0);
    });
  });

  describe('processValues', () => {
    it('should process installment-based expenses', () => {
      const params = new Expense({
        ...mockExpenseConstructorParams,
        value: 1200,
        instalment_number: 4,
        month: EMonth.JANUARY,
      });
      const spy = jest.spyOn(business as any, 'processValuesMonthsInstallment');

      business.processValues(params);

      expect(spy).toHaveBeenCalled();
    });

    it('should process fixed expenses', () => {
      const params = new Expense({
        ...mockExpenseConstructorParams,
        value: 500,
        type: EExpenseType.FIXED,
      });
      const spy = jest.spyOn(business as any, 'processValuesFixed');

      business.processValues(params);

      expect(spy).toHaveBeenCalled();
    });

    it('should process variable expenses', () => {
      const params = new Expense({
        ...mockExpenseConstructorParams,
        value: 300,
        type: EExpenseType.VARIABLE,
        month: EMonth.JUNE,
      });
      const spy = jest.spyOn(business as any, 'processValuesVariables');

      business.processValues(params);

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('processAllCalculate', () => {
    it('should calculate total and total_paid correctly', () => {
      const expense = new Expense({
        ...mockExpenseConstructorParams,
        january: 200,
        february: 300,
        march_paid: true,
        march: 300,
      });

      const result = business.processAllCalculate(expense);

      expect(result.total).toBe(800);
      expect(result.total_paid).toBe(800);
      expect(result.paid).toBe(false);
    });
  });

  describe('calculateTotal', () => {
    it('should calculate total and total_paid', () => {
      const expense = new Expense({
        ...mockExpenseConstructorParams,
        january: 100,
        january_paid: false,
        february: 100,
        february_paid: true,
      });

      const result = business.calculateTotal(expense);

      expect(result.total).toBe(200);
      expect(result.total_paid).toBe(100);
    });
  });

  describe('validateAllPaid', () => {
    it('should return true when all months are fully paid', () => {
      const expense = new Expense({
        ...mockExpenseConstructorParams,
        january_paid: true,
        february_paid: true,
        march_paid: true,
        april_paid: true,
        may_paid: true,
        june_paid: true,
        july_paid: true,
        august_paid: true,
        september_paid: true,
        october_paid: true,
        november_paid: true,
        december_paid: true,
      });

      const isFullyPaid = business.validateAllPaid(expense);

      expect(isFullyPaid).toBe(true);
    });

    it('should return false if any month is not fully paid', () => {
      const expense = new Expense({
        ...mockExpenseConstructorParams,
        january_paid: true,
        february_paid: false,
      });

      const isFullyPaid = business.validateAllPaid(expense);

      expect(isFullyPaid).toBe(false);
    });
  });
});