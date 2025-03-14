import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { ExpenseCategoryTypeService } from './expenseCategoryTypeService';
import { Nest } from '../../api';

jest.mock('../../api');

describe('ExpenseCategoryTypeService', () => {
  let service: ExpenseCategoryTypeService;
  let mockNest: jest.Mocked<Nest>;
  const mockEntity = {
    id: '1',
    name: 'Expenses Category Type',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: undefined,
  };
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
    mockNest = {
      finance: {
        expense: {
          category: {
            type: {
              getAll: jest.fn(),
              getOne: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      },
    } as unknown as jest.Mocked<Nest>;

    service = new ExpenseCategoryTypeService(mockNest);
  });

  describe('create', () => {
    it('should successfully create an expense category type', async () => {
      mockNest.finance.expense.category.type.create.mockResolvedValue(
        mockEntity,
      );

      const result = await service.create(mockEntity.name);

      expect(
        mockNest.finance.expense.category.type.create,
      ).toHaveBeenCalledWith({
        name: mockEntity.name,
      });
      expect(result).toEqual(mockEntity);
    });

    it('should throw an error if the creation fails', async () => {
      const mockError = new Error('Failed to create category type');
      mockNest.finance.expense.category.type.create.mockRejectedValue(
        mockError,
      );

      await expect(service.create(mockEntity.name)).rejects.toThrow(
        'Failed to create category type',
      );
    });

    it('should call the create method with correct arguments', async () => {
      mockNest.finance.expense.category.type.create.mockResolvedValue(
        mockEntity,
      );

      await service.create(mockEntity.name);

      expect(
        mockNest.finance.expense.category.type.create,
      ).toHaveBeenCalledWith({
        name: mockEntity.name,
      });
      expect(
        mockNest.finance.expense.category.type.create,
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should successfully update an expense category type', async () => {
      mockNest.finance.expense.category.type.update.mockResolvedValue(
        mockEntity,
      );

      const result = await service.update(mockEntity.id, mockEntity.name);

      expect(
        mockNest.finance.expense.category.type.update,
      ).toHaveBeenCalledWith(mockEntity.id, {
        name: mockEntity.name,
      });
      expect(result).toEqual(mockEntity);
    });

    it('should throw an error if the update fails', async () => {
      const mockError = new Error('Failed to update category type');
      mockNest.finance.expense.category.type.update.mockRejectedValue(
        mockError,
      );

      await expect(
        service.update(mockEntity.id, mockEntity.name),
      ).rejects.toThrow('Failed to update category type');
    });

    it('should call the update method with correct arguments', async () => {
      mockNest.finance.expense.category.type.update.mockResolvedValue(
        mockEntity,
      );

      await service.update(mockEntity.id, mockEntity.name);

      expect(
        mockNest.finance.expense.category.type.update,
      ).toHaveBeenCalledWith(mockEntity.id, {
        name: mockEntity.name,
      });
      expect(
        mockNest.finance.expense.category.type.update,
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('should successfully delete an expense category type', async () => {
      const mockResponse = { message: 'Successfully removed' };
      mockNest.finance.expense.category.type.delete.mockResolvedValue(
        mockResponse,
      );
      const result = await service.remove(mockEntity.id);

      expect(
        mockNest.finance.expense.category.type.delete,
      ).toHaveBeenCalledWith(mockEntity.id);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('get', () => {
    it('should successfully get an expense category type', async () => {
      mockNest.finance.expense.category.type.getOne.mockResolvedValue(
        mockEntity,
      );
      const result = await service.get(mockEntity.id);

      expect(
        mockNest.finance.expense.category.type.getOne,
      ).toHaveBeenCalledWith(mockEntity.id);
      expect(result).toEqual(mockEntity);
    });
  });

  describe('getAll', () => {
    it('should successfully getAll expense category type list', async () => {
      mockNest.finance.expense.category.type.getAll.mockResolvedValue(
        mockEntityList,
      );
      const result = await service.getAll({});

      expect(
        mockNest.finance.expense.category.type.getAll,
      ).toHaveBeenCalledWith({});
      expect(result).toEqual(mockEntityList);
    });

    it('should successfully getAll expense category type list paginate', async () => {
      mockNest.finance.expense.category.type.getAll.mockResolvedValue(
        mockEntityPaginate,
      );
      const result = await service.getAll(mockPaginateParams);

      expect(
        mockNest.finance.expense.category.type.getAll,
      ).toHaveBeenCalledWith(mockPaginateParams);
      expect(result).toEqual(mockEntityPaginate);
    });
  });
});