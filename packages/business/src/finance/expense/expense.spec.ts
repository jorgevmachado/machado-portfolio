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

import Expense from './expense';
import { getCurrentMonth } from './config';

describe('Expense', () => {
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

  const mockExpenseConstructorParams = {
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create an instance with all provided parameters', () => {
    jest
      .spyOn(require('./config'), 'getCurrentMonth')
      .mockReturnValue(EMonth.JANUARY);

    const expense = new Expense(mockExpenseConstructorParams);
    expect(expense).toBeInstanceOf(Expense);
    expect(expense.id).toBe(mockExpenseConstructorParams.id);
    expect(expense.year).toBe(mockExpenseConstructorParams.year);
    expect(expense.type).toBe(mockExpenseConstructorParams.type);
    expect(expense.paid).toBe(mockExpenseConstructorParams.paid);
    expect(expense.value).toBe(mockExpenseConstructorParams.value);
    expect(expense.total).toBe(mockExpenseConstructorParams.total);
    expect(expense.month).toBe(mockExpenseConstructorParams.month);
    expect(expense.active).toBe(mockExpenseConstructorParams.active);
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
    jest
      .spyOn(require('./config'), 'getCurrentMonth')
      .mockReturnValue(EMonth.FEBRUARY);

    const expense = new Expense();

    expect(expense.year).toBe(new Date().getFullYear());
    expect(expense.paid).toBe(false);
    expect(expense.value).toBe(0);
    expect(expense.total).toBe(0);
    expect(expense.month).toBe(EMonth.FEBRUARY);
    expect(expense.active).toBe(true);
    expect(expense.total_paid).toBe(0);
    expect(expense.instalment_number).toBe(1);
  });

  it('should use the current month when `month` is not provided', () => {
    jest
      .spyOn(require('./config'), 'getCurrentMonth')
      .mockReturnValue(EMonth.JULY);

    const params = {
      ...mockExpenseConstructorParams,
      month: undefined,
    };

    const expense = new Expense(params);

    expect(expense.month).toBe(EMonth.JULY);
    expect(getCurrentMonth).toHaveBeenCalled();
  });

  it('should keep optional fields undefined when they are not provided', () => {
    const params = {
      bill: billMock,
      type: mockExpenseConstructorParams.type,
      supplier: mockExpenseConstructorParams.supplier,
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

    expect(expense.active).toBe(false);
    expect(expense.paid).toBe(true);
  });
});