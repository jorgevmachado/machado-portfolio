import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { NestModuleAbstract } from '../../nestModuleAbstract';
import { Expense } from './expense';

jest.mock('../../nestModuleAbstract');

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
});