import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { QueryParameters } from '@repo/business/shared/interface';

import { NestModuleAbstract } from '../../nestModuleAbstract';

import { SupplierType } from './supplierType';

jest.mock('../../nestModuleAbstract');

describe('SupplierType', () => {
  const mockBaseUrl = 'http://mock-base-url.com';
  const mockHeaders = { Authorization: 'Bearer test-token' };
  const mockConfig = { baseUrl: mockBaseUrl, headers: mockHeaders };

  let supplierType: SupplierType;

  beforeEach(() => {
    jest.clearAllMocks();
    supplierType = new SupplierType(mockConfig);
  });

  describe('constructor', () => {
    it('should initialize with the correct path and config supplierType', () => {
      expect(NestModuleAbstract).toHaveBeenCalledTimes(1);
      expect(NestModuleAbstract).toHaveBeenCalledWith(
        'finance/supplier/type',
        mockConfig,
      );
    });

    it('should call inherited methods from NestModuleAbstract about supplierType', async () => {
      const mockGetAll = jest
        .spyOn(NestModuleAbstract.prototype, 'getAll')
        .mockResolvedValue([]);

      const queryParams: QueryParameters = { name: 'test' };
      const result = await supplierType.getAll(queryParams);

      expect(mockGetAll).toHaveBeenCalledTimes(1);
      expect(mockGetAll).toHaveBeenCalledWith(queryParams);
      expect(result).toEqual([]);
    });
  });
});