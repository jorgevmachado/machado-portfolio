import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { Nest } from '../../api';

import { SupplierTypeService } from './supplierTypeService';
import { HOUSING_SUPPLIER_TYPE_FIXTURE } from './fixtures';

jest.mock('../../api');

describe('SupplierTypeService', () => {
  let service: SupplierTypeService;
  let mockNest: jest.Mocked<Nest>;
  const mockEntity = HOUSING_SUPPLIER_TYPE_FIXTURE;
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
    mockNest = {
      finance: {
        supplier: {
          type: {
            getAll: jest.fn(),
            getOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      },
    } as unknown as jest.Mocked<Nest>;

    service = new SupplierTypeService(mockNest);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('create', () => {
    it('should successfully create an supplier type', async () => {
      mockNest.finance.supplier.type.create.mockResolvedValue(mockEntity);

      const result = await service.create({ name: mockEntity.name });

      expect(mockNest.finance.supplier.type.create).toHaveBeenCalledWith({
        name: mockEntity.name,
      });
      expect(result).toEqual(mockEntity);
    });
  });

  describe('update', () => {
    it('should successfully update an supplier type', async () => {
      mockNest.finance.supplier.type.update.mockResolvedValue(mockEntity);

      const result = await service.update(mockEntity.id, {
        name: mockEntity.name,
      });

      expect(mockNest.finance.supplier.type.update).toHaveBeenCalledWith(
        mockEntity.id,
        {
          name: mockEntity.name,
        },
      );
      expect(result).toEqual(mockEntity);
    });

    it('should throw an error if the update fails', async () => {
      const mockError = new Error('Failed to update supplier type');
      mockNest.finance.supplier.type.update.mockRejectedValue(mockError);

      await expect(
        service.update(mockEntity.id, { name: mockEntity.name }),
      ).rejects.toThrow('Failed to update supplier type');
    });

    it('should call the update method with correct arguments', async () => {
      mockNest.finance.supplier.type.update.mockResolvedValue(mockEntity);

      await service.update(mockEntity.id, { name: mockEntity.name });

      expect(mockNest.finance.supplier.type.update).toHaveBeenCalledWith(
        mockEntity.id,
        {
          name: mockEntity.name,
        },
      );
      expect(mockNest.finance.supplier.type.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('should successfully delete an supplier type', async () => {
      const mockResponse = { message: 'Successfully removed' };
      mockNest.finance.supplier.type.delete.mockResolvedValue(mockResponse);
      const result = await service.remove(mockEntity.id);

      expect(mockNest.finance.supplier.type.delete).toHaveBeenCalledWith(
        mockEntity.id,
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('get', () => {
    it('should successfully get an supplier type', async () => {
      mockNest.finance.supplier.type.getOne.mockResolvedValue(mockEntity);
      const result = await service.get(mockEntity.id);

      expect(mockNest.finance.supplier.type.getOne).toHaveBeenCalledWith(
        mockEntity.id,
      );
      expect(result).toEqual(mockEntity);
    });
  });

  describe('getAll', () => {
    it('should successfully getAll supplier type list', async () => {
      mockNest.finance.supplier.type.getAll.mockResolvedValue(mockEntityList);
      const result = await service.getAll({});

      expect(mockNest.finance.supplier.type.getAll).toHaveBeenCalledWith({});
      expect(result).toEqual(mockEntityList);
    });

    it('should successfully getAll supplier type list paginate', async () => {
      mockNest.finance.supplier.type.getAll.mockResolvedValue(
        mockEntityPaginate,
      );
      const result = await service.getAll(mockPaginateParams);

      expect(mockNest.finance.supplier.type.getAll).toHaveBeenCalledWith(
        mockPaginateParams,
      );
      expect(result).toEqual(mockEntityPaginate);
    });
  });
});