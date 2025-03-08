import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { ExpenseGroupService } from './expenseGroupService';
import { Nest } from '../../api';

jest.mock('../../api');

describe('ExpenseGroupService', () => {
  let service: ExpenseGroupService;
  let mockNest: jest.Mocked<Nest>;
  const mockEntity = {
    id: '1',
    name: 'Expenses Group',
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
          group: {
            getAll: jest.fn(),
            getOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      },
    } as unknown as jest.Mocked<Nest>;

    service = new ExpenseGroupService(mockNest);
  });

  describe('create', () => {
    it('should successfully create an expense group', async () => {
      mockNest.finance.expense.group.create.mockResolvedValue(
        mockEntity,
      );

      const result = await service.create(mockEntity.name);

      expect(
        mockNest.finance.expense.group.create,
      ).toHaveBeenCalledWith({
        name: mockEntity.name,
      });
      expect(result).toEqual(mockEntity);
    });

    it('should throw an error if the creation fails', async () => {
      const mockError = new Error('Failed to create group');
      mockNest.finance.expense.group.create.mockRejectedValue(
        mockError,
      );

      await expect(service.create(mockEntity.name)).rejects.toThrow(
        'Failed to create group',
      );
    });

    it('should call the create method with correct arguments', async () => {
      mockNest.finance.expense.group.create.mockResolvedValue(
        mockEntity,
      );

      await service.create(mockEntity.name);

      expect(
        mockNest.finance.expense.group.create,
      ).toHaveBeenCalledWith({
        name: mockEntity.name,
      });
      expect(
        mockNest.finance.expense.group.create,
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should successfully update an expense group', async () => {
      mockNest.finance.expense.group.update.mockResolvedValue(
        mockEntity,
      );

      const result = await service.update(mockEntity.id, mockEntity.name);

      expect(
        mockNest.finance.expense.group.update,
      ).toHaveBeenCalledWith(mockEntity.id, {
        name: mockEntity.name,
      });
      expect(result).toEqual(mockEntity);
    });

    it('should throw an error if the update fails', async () => {
      const mockError = new Error('Failed to update group');
      mockNest.finance.expense.group.update.mockRejectedValue(
        mockError,
      );

      await expect(
        service.update(mockEntity.id, mockEntity.name),
      ).rejects.toThrow('Failed to update group');
    });

    it('should call the update method with correct arguments', async () => {
      mockNest.finance.expense.group.update.mockResolvedValue(
        mockEntity,
      );

      await service.update(mockEntity.id, mockEntity.name);

      expect(
        mockNest.finance.expense.group.update,
      ).toHaveBeenCalledWith(mockEntity.id, {
        name: mockEntity.name,
      });
      expect(
        mockNest.finance.expense.group.update,
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('should successfully delete an expense group', async () => {
      const mockResponse = { message: 'Successfully removed' };
      mockNest.finance.expense.group.delete.mockResolvedValue(
        mockResponse,
      );
      const result = await service.remove(mockEntity.id);

      expect(
        mockNest.finance.expense.group.delete,
      ).toHaveBeenCalledWith(mockEntity.id);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('get', () => {
    it('should successfully get an expense group', async () => {
      mockNest.finance.expense.group.getOne.mockResolvedValue(
        mockEntity,
      );
      const result = await service.get(mockEntity.id);

      expect(
        mockNest.finance.expense.group.getOne,
      ).toHaveBeenCalledWith(mockEntity.id);
      expect(result).toEqual(mockEntity);
    });
  });

  describe('getAll', () => {
    it('should successfully getAll expense group list', async () => {
      mockNest.finance.expense.group.getAll.mockResolvedValue(
        mockEntityList,
      );
      const result = await service.getAll({});

      expect(
        mockNest.finance.expense.group.getAll,
      ).toHaveBeenCalledWith({});
      expect(result).toEqual(mockEntityList);
    });

    it('should successfully getAll expense group list paginate', async () => {
      mockNest.finance.expense.group.getAll.mockResolvedValue(
        mockEntityPaginate,
      );
      const result = await service.getAll(mockPaginateParams);

      expect(
        mockNest.finance.expense.group.getAll,
      ).toHaveBeenCalledWith(mockPaginateParams);
      expect(result).toEqual(mockEntityPaginate);
    });
  });
});