import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { NestModuleAbstract } from '../../nestModuleAbstract';
import { ExpenseCategoryType } from '../expense-category-type';
import { ExpenseCategory } from './expenseCategory';

jest.mock('../../nestModuleAbstract');
jest.mock('../expense-category-type');

describe('ExpenseCategory', () => {
  const mockBaseUrl = 'http://mock-base-url.com';
  const mockHeaders = { Authorization: 'Bearer test-token' };
  const mockConfig = { baseUrl: mockBaseUrl, headers: mockHeaders };

  let expenseCategory: ExpenseCategory;

  beforeEach(() => {
    jest.clearAllMocks();
    expenseCategory = new ExpenseCategory(mockConfig);
  });

  describe('constructor', () => {
    it('should initialize with the correct path and config expenseCategory', () => {
      expect(NestModuleAbstract).toHaveBeenCalledTimes(1);
      expect(NestModuleAbstract).toHaveBeenCalledWith(
        'finance/expense/category',
        mockConfig,
      );
    });
  });

  describe('expenseCategoryTypeModule', () => {
    it('should initialize expenseCategoryType module', () => {
      expect(ExpenseCategoryType).toHaveBeenCalledTimes(1);
      expect(ExpenseCategoryType).toHaveBeenCalledWith(mockConfig);
    });

    it('should return the instance of expenseCategoryType via type getter', () => {
      const expenseCategoryTypeModule = expenseCategory.type;
      expect(expenseCategoryTypeModule).toBeInstanceOf(ExpenseCategoryType);
      expect(ExpenseCategoryType).toHaveBeenCalledTimes(1);
    });
  });
});