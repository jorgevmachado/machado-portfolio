import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { Error, ERROR_STATUS_CODE } from '@repo/services/error/error';

import Supplier from './supplier';
import type { SupplierEntity } from './interface';
import { VIVO_HOUSING_SUPPLIER_FIXTURE } from './fixtures';

describe('Supplier', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('Constructor', () => {
    const supplierEntityMock = VIVO_HOUSING_SUPPLIER_FIXTURE;

    const params = {
      id: supplierEntityMock.id,
      name: supplierEntityMock.name,
      type: supplierEntityMock.type,
      active: supplierEntityMock.active,
      created_at: supplierEntityMock.created_at,
      updated_at: supplierEntityMock.updated_at,
      deleted_at: supplierEntityMock.deleted_at,
      description: supplierEntityMock.description,
    };
    it('should create an instance with all parameters when valid data is provided', () => {
      const supplier = new Supplier(params);

      expect(supplier.id).toBe(params.id);
      expect(supplier.name).toBe(params.name);
      expect(supplier.type).toBe(params.type);
      expect(supplier.active).toBe(params.active);
      expect(supplier.created_at).toEqual(params.created_at);
      expect(supplier.updated_at).toEqual(params.updated_at);
      expect(supplier.deleted_at).toBe(params.deleted_at);
      expect(supplier.description).toBe(params.description);
    });

    it('should create an instance with minimal valid data', () => {
      const params = {
        name: supplierEntityMock.name,
        type: supplierEntityMock.type,
      };

      const supplier = new Supplier(params);

      expect(supplier.name).toBe(params.name);
      expect(supplier.type).toBe(params.type);
      expect(supplier.active).toBeUndefined();
      expect(supplier.created_at).toBeUndefined();
      expect(supplier.updated_at).toBeUndefined();
      expect(supplier.deleted_at).toBeUndefined();
      expect(supplier.description).toBeUndefined();
    });

    it('should throw an error when name is missing', () => {
      const params = {
        type: {
          id: '1',
          name: 'Supplier A',
          created_at: new Date('2023-01-01'),
          updated_at: new Date('2023-01-02'),
          deleted_at: undefined,
        },
        active: true,
        created_at: new Date('2023-01-01'),
      };

      expect(() => new Supplier(params as SupplierEntity)).toThrow(
        new Error({
          statusCode: ERROR_STATUS_CODE.CONFLICT_EXCEPTION,
          message: 'name is required',
        }),
      );
    });

    it('should throw an error when type is missing', () => {
      const params = {
        name: 'Supplier C',
        active: true,
        description: 'Handles logistics and transport.',
      };

      expect(() => new Supplier(params as SupplierEntity)).toThrow(
        new Error({
          statusCode: ERROR_STATUS_CODE.CONFLICT_EXCEPTION,
          message: 'type is required',
        }),
      );
    });

    it('should allow instantiation with no parameters', () => {
      const supplier = new Supplier();

      expect(supplier.id).toBeUndefined();
      expect(supplier.name).toBeUndefined();
      expect(supplier.type).toBeUndefined();
      expect(supplier.active).toBeUndefined();
      expect(supplier.created_at).toBeUndefined();
      expect(supplier.updated_at).toBeUndefined();
      expect(supplier.deleted_at).toBeUndefined();
      expect(supplier.description).toBeUndefined();
    });

    it('should fill default values for optional fields if they are undefined', () => {
      const params = {
        name: supplierEntityMock.name,
        type: supplierEntityMock.type,
      };

      const supplier = new Supplier(params);

      expect(supplier.name).toBe(params.name);
      expect(supplier.type).toBe(params.type);
      expect(supplier.created_at).toBeUndefined();
      expect(supplier.updated_at).toBeUndefined();
      expect(supplier.deleted_at).toBeUndefined();
      expect(supplier.description).toBeUndefined();
    });
  });
});