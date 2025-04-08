import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { Nest } from '../../api';

import { VIVO_HOUSING_SUPPLIER_FIXTURE } from './fixtures';
import { SupplierService } from './service';


jest.mock('../../api');

describe('SupplierService', () => {
  let service: SupplierService;
  let mockNest: jest.Mocked<Nest>;
  const mockEntity = VIVO_HOUSING_SUPPLIER_FIXTURE;
  const mockPaginateParams = { page: 1, limit: 10 };
  const mockEntityList = [mockEntity, mockEntity];
  const mockEntityPaginate = {
    skip: 0,
    next: 0,
    prev: 0,
    total: 0,
    pages: 0,
    results: mockEntityList,
    per_page: 0,
    current_page: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    mockNest = {
      finance: {
        supplier: {
          getAll: jest.fn(),
          getOne: jest.fn(),
          create: jest.fn(),
          update: jest.fn(),
          delete: jest.fn(),
        },
      },
    } as unknown as jest.Mocked<Nest>;

    service = new SupplierService(mockNest);
  });

  afterEach(() => {
    jest.resetModules();
  });

  describe('create', () => {
    it('should successfully create an supplier', async () => {
      mockNest.finance.supplier.create.mockResolvedValue(mockEntity);

      const result = await service.create({
        name: mockEntity.name,
        type: mockEntity.type.name,
      });

      expect(mockNest.finance.supplier.create).toHaveBeenCalledWith({
        name: mockEntity.name,
        type: mockEntity.type.name,
      });
      expect(result).toEqual(mockEntity);
    });
  });

  describe('update', () => {
    it('should successfully update an supplier', async () => {
      mockNest.finance.supplier.update.mockResolvedValue(mockEntity);

      const result = await service.update(mockEntity.id, {
        name: mockEntity.name,
        type: mockEntity.type.name,
      });

      expect(mockNest.finance.supplier.update).toHaveBeenCalledWith(
        mockEntity.id,
        {
          name: mockEntity.name,
          type: mockEntity.type.name,
        },
      );
      expect(result).toEqual(mockEntity);
    });
  });

  describe('delete', () => {
    it('should successfully delete an supplier', async () => {
      const mockResponse = { message: 'Successfully removed' };
      mockNest.finance.supplier.delete.mockResolvedValue(mockResponse);
      const result = await service.remove(mockEntity.id);

      expect(mockNest.finance.supplier.delete).toHaveBeenCalledWith(
        mockEntity.id,
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('get', () => {
    it('should successfully get an supplier', async () => {
      mockNest.finance.supplier.getOne.mockResolvedValue(mockEntity);
      const result = await service.get(mockEntity.id);

      expect(mockNest.finance.supplier.getOne).toHaveBeenCalledWith(
        mockEntity.id,
      );
      expect(result).toEqual(mockEntity);
    });
  });

  describe('getAll', () => {
    it('should successfully getAll supplier list', async () => {
      mockNest.finance.supplier.getAll.mockResolvedValue(mockEntityList);
      const result = await service.getAll({});

      expect(mockNest.finance.supplier.getAll).toHaveBeenCalledWith({});
      expect(result).toEqual(mockEntityList);
    });

    it('should successfully getAll supplier list paginate', async () => {
      mockNest.finance.supplier.getAll.mockResolvedValue(mockEntityPaginate);
      const result = await service.getAll(mockPaginateParams);

      expect(mockNest.finance.supplier.getAll).toHaveBeenCalledWith(
        mockPaginateParams,
      );
      expect(result).toEqual(mockEntityPaginate);
    });
  });
});