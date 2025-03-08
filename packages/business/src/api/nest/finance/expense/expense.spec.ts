import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { NestModuleAbstract } from '../../nestModuleAbstract';

import { ExpenseGroup } from '../expense-group';
import { ExpenseCategory } from '../expense-category';
import { Expense } from './expense';

jest.mock('../../nestModuleAbstract');
jest.mock('../expense-group');
jest.mock('../expense-category');

describe('Expense', () => {
  const mockBaseUrl = 'http://mock-base-url.com';
  const mockHeaders = { Authorization: 'Bearer test-token' };
  const mockConfig = { baseUrl: mockBaseUrl, headers: mockHeaders };

  let expense: Expense;

  beforeEach(() => {
    jest.clearAllMocks();
    expense = new Expense(mockConfig);
  });

  describe('constructor', () => {
    it('should initialize with the correct path and config expense', () => {
      expect(NestModuleAbstract).toHaveBeenCalledTimes(1);
      expect(NestModuleAbstract).toHaveBeenCalledWith({
        pathUrl: 'finance/expense',
        nestModuleConfig: mockConfig,
      });
    });
  });

  describe('expenseGroupModule', () => {
    it('should initialize ExpenseGroup module', () => {
      expect(ExpenseGroup).toHaveBeenCalledTimes(1);
      expect(ExpenseGroup).toHaveBeenCalledWith(mockConfig);
    });
    it('should return the instance of ExpenseGroup via group getter', () => {
      const expenseGroupModule = expense.group;
      expect(expenseGroupModule).toBeInstanceOf(ExpenseGroup);
    })
  });

  describe('expenseCategoryModule', () => {
      it('should initialize ExpenseCategory module', () => {
        expect(ExpenseCategory).toHaveBeenCalledTimes(1);
        expect(ExpenseCategory).toHaveBeenCalledWith(mockConfig);
      });
      it('should return the instance of ExpenseCategory via category getter', () => {
        const expenseCategoryModule = expense.category;
        expect(expenseCategoryModule).toBeInstanceOf(ExpenseCategory);
      })
  });
});