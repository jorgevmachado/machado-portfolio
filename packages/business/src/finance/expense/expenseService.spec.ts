import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { ExpenseService } from './expenseService';

describe('ExpenseService', () => {
  const mockNest = {
    getExpenses: jest.fn(),
    createExpense: jest.fn(),
    deleteExpense: jest.fn(),
  };
  let expenseService: ExpenseService;

  beforeEach(() => {
    expenseService = new ExpenseService(mockNest as any);
  });

  it('should instantiate the service correctly', () => {
    expect(expenseService).toBeInstanceOf(ExpenseService);
    expect(expenseService['nest']).toBe(mockNest);
  });
});