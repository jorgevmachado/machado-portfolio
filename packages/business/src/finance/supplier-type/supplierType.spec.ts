import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import SupplierType from './supplierType';

describe('SupplierType', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('Constructor', () => {
    it('should create an instance with all parameters when valid data is provided', () => {
      const params = {
        id: '1',
        name: 'Supplier A',
        created_at: new Date('2023-01-01'),
        updated_at: new Date('2023-01-02'),
        deleted_at: undefined,
      };

      const supplierType = new SupplierType(params);

      expect(supplierType.id).toBe(params.id);
      expect(supplierType.name).toBe(params.name);
      expect(supplierType.created_at).toEqual(params.created_at);
      expect(supplierType.updated_at).toEqual(params.updated_at);
      expect(supplierType.deleted_at).toBe(params.deleted_at);
    });

    it('should create an instance with minimal valid data', () => {
      const params = {
        name: 'Supplier B',
      };

      const supplierType = new SupplierType(params);

      expect(supplierType.name).toBe(params.name);
      expect(supplierType.id).toBeUndefined(); // ID was not provided
      expect(supplierType.created_at).toBeUndefined(); // Defaults to undefined
      expect(supplierType.updated_at).toBeUndefined();
      expect(supplierType.deleted_at).toBeUndefined();
    });

    it('should allow instantiation with no parameters', () => {
      const supplierType = new SupplierType();

      expect(supplierType.id).toBeUndefined();
      expect(supplierType.name).toBeUndefined();
      expect(supplierType.created_at).toBeUndefined();
      expect(supplierType.updated_at).toBeUndefined();
      expect(supplierType.deleted_at).toBeUndefined();
    });
  });
});