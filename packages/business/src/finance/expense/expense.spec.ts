import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import Expense from './expense';

import { INGRID_RESIDENTIAL_LIST_FIXTURE } from './fixtures';

describe('Expense', () => {
  const mockExpenseConstructorParams = INGRID_RESIDENTIAL_LIST_FIXTURE[0];

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('should create an instance with all provided parameters', () => {
    const expense = new Expense(mockExpenseConstructorParams);
    expect(expense).toBeInstanceOf(Expense);
    expect(expense.id).toBe(mockExpenseConstructorParams.id);
    expect(expense.year).toBe(mockExpenseConstructorParams.year);
    expect(expense.type).toBe(mockExpenseConstructorParams.type);
    expect(expense.paid).toBe(mockExpenseConstructorParams.paid);
    expect(expense.total).toBe(mockExpenseConstructorParams.total);
    expect(expense.supplier).toBe(mockExpenseConstructorParams.supplier);
    expect(expense.total_paid).toBe(mockExpenseConstructorParams.total_paid);
    expect(expense.description).toBe(mockExpenseConstructorParams.description);
    expect(expense.instalment_number).toBe(
      mockExpenseConstructorParams.instalment_number,
    );
    expect(expense.created_at).toBe(mockExpenseConstructorParams.created_at);
    expect(expense.updated_at).toBe(mockExpenseConstructorParams.updated_at);
    expect(expense.deleted_at).toBe(mockExpenseConstructorParams.deleted_at);
  });

  it('should initialize fields with default values when no parameters are provided', () => {
    const expense = new Expense();

    expect(expense.year).toBe(new Date().getFullYear());
    expect(expense.paid).toBe(false);
    expect(expense.total).toBe(0);
    expect(expense.total_paid).toBe(0);
    expect(expense.instalment_number).toBe(1);
  });

  it('should keep optional fields undefined when they are not provided', () => {
    const params = {
      bill: mockExpenseConstructorParams.bill,
      type: mockExpenseConstructorParams.type,
      supplier: mockExpenseConstructorParams.supplier,
      name: mockExpenseConstructorParams.name,
    };

    const expense = new Expense(params);

    expect(expense.created_at).toBeUndefined();
    expect(expense.updated_at).toBeUndefined();
    expect(expense.deleted_at).toBeUndefined();
    expect(expense.description).toBeUndefined();
  });

  it('should override default values when provided in parameters', () => {
    const params = {
      ...mockExpenseConstructorParams,
      active: false,
      paid: true,
    };

    const expense = new Expense(params);
    expect(expense.paid).toBe(true);
  });
});