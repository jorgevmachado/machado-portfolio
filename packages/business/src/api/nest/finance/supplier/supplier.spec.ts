import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { NestModuleAbstract } from '../../nestModuleAbstract';

import { SupplierType } from '../supplier-type';
import { Supplier } from './supplier';

jest.mock('../../nestModuleAbstract');
jest.mock('../supplier-type');

describe('Supplier', () => {
  const mockBaseUrl = 'http://mock-base-url.com';
  const mockHeaders = { Authorization: 'Bearer test-token' };
  const mockConfig = { baseUrl: mockBaseUrl, headers: mockHeaders };

  let supplier: Supplier;

  beforeEach(() => {
    jest.clearAllMocks();
    supplier = new Supplier(mockConfig);
  });

  describe('constructor', () => {
    it('should initialize with the correct path and config supplier', () => {
      expect(NestModuleAbstract).toHaveBeenCalledTimes(1);
      expect(NestModuleAbstract).toHaveBeenCalledWith({
        pathUrl: 'finance/supplier',
        nestModuleConfig: mockConfig,
      });
    });
  });

  describe('supplierTypeModule', () => {
    it('should initialize SupplierType module', () => {
      expect(SupplierType).toHaveBeenCalledTimes(1);
      expect(SupplierType).toHaveBeenCalledWith(mockConfig);
    });
    it('should return the instance of SupplierType via type getter', () => {
      const typeModule = supplier.type;
      expect(typeModule).toBeInstanceOf(SupplierType);
      expect(SupplierType).toHaveBeenCalledTimes(1);
    });
  });
});