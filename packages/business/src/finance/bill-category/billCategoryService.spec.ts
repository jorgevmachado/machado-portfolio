import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { Nest } from '../../api';

import { BillCategoryService } from './billCategoryService';
import { INGRID_RESIDENTIAL_BILL_CATEGORY_FIXTURE } from './fixtures';

jest.mock('../../api');

describe('BillCategoryService', () => {
  let service: BillCategoryService;
  let mockNest: jest.Mocked<Nest>;
  const mockEntity = INGRID_RESIDENTIAL_BILL_CATEGORY_FIXTURE;
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
        bill: {
          category: {
            getAll: jest.fn(),
            getOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      },
    } as unknown as jest.Mocked<Nest>;

    service = new BillCategoryService(mockNest);
  });

  afterEach(() => {
    jest.resetModules();
  });

  describe('create', () => {
    it('should successfully create an bill category', async () => {
      mockNest.finance.bill.category.create.mockResolvedValue(mockEntity);

      const result = await service.create({ name: mockEntity.name });

      expect(mockNest.finance.bill.category.create).toHaveBeenCalledWith({
        name: mockEntity.name,
      });
      expect(result).toEqual(mockEntity);
    });
  });

  describe('update', () => {
    it('should successfully update an bill category', async () => {
      mockNest.finance.bill.category.update.mockResolvedValue(mockEntity);

      const result = await service.update(mockEntity.id, {
        name: mockEntity.name,
      });

      expect(mockNest.finance.bill.category.update).toHaveBeenCalledWith(
        mockEntity.id,
        {
          name: mockEntity.name,
        },
      );
      expect(result).toEqual(mockEntity);
    });

    it('should throw an error if the update fails', async () => {
      const mockError = new Error('Failed to update bill category');
      mockNest.finance.bill.category.update.mockRejectedValue(mockError);

      await expect(
        service.update(mockEntity.id, { name: mockEntity.name }),
      ).rejects.toThrow('Failed to update bill category');
    });

    it('should call the update method with correct arguments', async () => {
      mockNest.finance.bill.category.update.mockResolvedValue(mockEntity);

      await service.update(mockEntity.id, { name: mockEntity.name });

      expect(mockNest.finance.bill.category.update).toHaveBeenCalledWith(
        mockEntity.id,
        {
          name: mockEntity.name,
        },
      );
      expect(mockNest.finance.bill.category.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('should successfully delete an bill category', async () => {
      const mockResponse = { message: 'Successfully removed' };
      mockNest.finance.bill.category.delete.mockResolvedValue(mockResponse);
      const result = await service.remove(mockEntity.id);

      expect(mockNest.finance.bill.category.delete).toHaveBeenCalledWith(
        mockEntity.id,
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('get', () => {
    it('should successfully get an bill category', async () => {
      mockNest.finance.bill.category.getOne.mockResolvedValue(mockEntity);
      const result = await service.get(mockEntity.id);

      expect(mockNest.finance.bill.category.getOne).toHaveBeenCalledWith(
        mockEntity.id,
      );
      expect(result).toEqual(mockEntity);
    });
  });

  describe('getAll', () => {
    it('should successfully getAll bill category list', async () => {
      mockNest.finance.bill.category.getAll.mockResolvedValue(mockEntityList);
      const result = await service.getAll({});

      expect(mockNest.finance.bill.category.getAll).toHaveBeenCalledWith({});
      expect(result).toEqual(mockEntityList);
    });

    it('should successfully getAll bill category list paginate', async () => {
      mockNest.finance.bill.category.getAll.mockResolvedValue(
        mockEntityPaginate,
      );
      const result = await service.getAll(mockPaginateParams);

      expect(mockNest.finance.bill.category.getAll).toHaveBeenCalledWith(
        mockPaginateParams,
      );
      expect(result).toEqual(mockEntityPaginate);
    });
  });
});