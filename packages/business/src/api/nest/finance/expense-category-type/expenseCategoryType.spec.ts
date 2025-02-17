import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { QueryParameters } from '@repo/business/shared/interface';

import { NestModuleAbstract } from '../../nestModuleAbstract';
import { ExpenseCategoryType } from './expenseCategoryType';

jest.mock('../../nestModuleAbstract');

describe('ExpenseCategoryType', () => {
  const mockBaseUrl = 'http://mock-base-url.com';
  const mockHeaders = { Authorization: 'Bearer test-token' };
  const mockConfig = { baseUrl: mockBaseUrl, headers: mockHeaders };

  let expenseCategoryType: ExpenseCategoryType;

  beforeEach(() => {
    jest.clearAllMocks();
    expenseCategoryType = new ExpenseCategoryType(mockConfig);
  });

  describe('constructor', () => {
    it('should initialize with the correct path and config expenseCategoryType', () => {
      expect(NestModuleAbstract).toHaveBeenCalledTimes(1);
      expect(NestModuleAbstract).toHaveBeenCalledWith(
        'finance/expense/category/type',
        mockConfig,
      );
    });

    it('should call inherited methods from NestModuleAbstract about expenseCategoryType', async () => {
      const mockGetAll = jest
        .spyOn(NestModuleAbstract.prototype, 'getAll')
        .mockResolvedValue([]);

      const queryParams: QueryParameters = { name: 'test' };
      const result = await expenseCategoryType.getAll(queryParams);

      expect(mockGetAll).toHaveBeenCalledTimes(1);
      expect(mockGetAll).toHaveBeenCalledWith(queryParams);
      expect(result).toEqual([]);
    });
  });
});