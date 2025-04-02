import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { Nest } from '../../api';

import { ExpenseService } from './expenseService';
import { INGRID_RESIDENTIAL_LIST_FIXTURE } from './fixtures';

describe('ExpenseService', () => {
  let mockNest: jest.Mocked<Nest>;
  let service: ExpenseService;

  const mockEntity = INGRID_RESIDENTIAL_LIST_FIXTURE[0];
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
        expense: {
          getAll: jest.fn(),
          getOne: jest.fn(),
          create: jest.fn(),
          update: jest.fn(),
          delete: jest.fn(),
        },
      },
    } as unknown as jest.Mocked<Nest>;
    service = new ExpenseService(mockNest as any);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('constructor', () => {
    it('should instantiate the service correctly', () => {
      expect(service).toBeInstanceOf(ExpenseService);
      expect(service['nest']).toBe(mockNest);
    });
  });

  describe('create', () => {
    it('should successfully create an supplier', async () => {
      mockNest.finance.expense.create.mockResolvedValue(mockEntity);

      const result = await service.create(mockEntity);

      expect(mockNest.finance.expense.create).toHaveBeenCalledWith({
        id: mockEntity.id,
        bill: mockEntity.bill,
        year: mockEntity.year,
        type: mockEntity.type,
        paid: mockEntity.paid,
        name: mockEntity.name,
        total: mockEntity.total,
        supplier: mockEntity.supplier,
        name_code: mockEntity.name_code,
        total_paid: mockEntity.total_paid,
        january: mockEntity.january,
        january_paid: mockEntity.january_paid,
        february: mockEntity.february,
        february_paid: mockEntity.february_paid,
        march: mockEntity.march,
        march_paid: mockEntity.march_paid,
        april: mockEntity.april,
        april_paid: mockEntity.april_paid,
        may: mockEntity.may,
        may_paid: mockEntity.may_paid,
        june: mockEntity.june,
        june_paid: mockEntity.june_paid,
        july: mockEntity.july,
        july_paid: mockEntity.july_paid,
        august: mockEntity.august,
        august_paid: mockEntity.august_paid,
        september: mockEntity.september,
        september_paid: mockEntity.september_paid,
        october: mockEntity.october,
        october_paid: mockEntity.october_paid,
        november: mockEntity.november,
        november_paid: mockEntity.november_paid,
        december: mockEntity.december,
        december_paid: mockEntity.december_paid,
        created_at: mockEntity.created_at,
        updated_at: mockEntity.updated_at,
        deleted_at: mockEntity.deleted_at,
        instalment_number: mockEntity.instalment_number,
        description: mockEntity.description,
      });
      expect(result).toEqual(mockEntity);
    });
  });

  describe('update', () => {
    it('should successfully update an expense', async () => {
      mockNest.finance.expense.update.mockResolvedValue(mockEntity);

      const result = await service.update(mockEntity.id, mockEntity);

      expect(mockNest.finance.expense.update).toHaveBeenCalledWith(
        mockEntity.id,
        {
          id: mockEntity.id,
          bill: mockEntity.bill,
          year: mockEntity.year,
          type: mockEntity.type,
          paid: mockEntity.paid,
          name: mockEntity.name,
          total: mockEntity.total,
          supplier: mockEntity.supplier,
          name_code: mockEntity.name_code,
          total_paid: mockEntity.total_paid,
          january: mockEntity.january,
          january_paid: mockEntity.january_paid,
          february: mockEntity.february,
          february_paid: mockEntity.february_paid,
          march: mockEntity.march,
          march_paid: mockEntity.march_paid,
          april: mockEntity.april,
          april_paid: mockEntity.april_paid,
          may: mockEntity.may,
          may_paid: mockEntity.may_paid,
          june: mockEntity.june,
          june_paid: mockEntity.june_paid,
          july: mockEntity.july,
          july_paid: mockEntity.july_paid,
          august: mockEntity.august,
          august_paid: mockEntity.august_paid,
          september: mockEntity.september,
          september_paid: mockEntity.september_paid,
          october: mockEntity.october,
          october_paid: mockEntity.october_paid,
          november: mockEntity.november,
          november_paid: mockEntity.november_paid,
          december: mockEntity.december,
          december_paid: mockEntity.december_paid,
          created_at: mockEntity.created_at,
          updated_at: mockEntity.updated_at,
          deleted_at: mockEntity.deleted_at,
          instalment_number: mockEntity.instalment_number,
          description: mockEntity.description,
        },
      );
      expect(result).toEqual(mockEntity);
    });
  });

  describe('delete', () => {
    it('should successfully delete an expense', async () => {
      const mockResponse = { message: 'Successfully removed' };
      mockNest.finance.expense.delete.mockResolvedValue(mockResponse);
      const result = await service.remove(mockEntity.id);

      expect(mockNest.finance.expense.delete).toHaveBeenCalledWith(
        mockEntity.id,
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('get', () => {
    it('should successfully get an expense', async () => {
      mockNest.finance.expense.getOne.mockResolvedValue(mockEntity);
      const result = await service.get(mockEntity.id);

      expect(mockNest.finance.expense.getOne).toHaveBeenCalledWith(
        mockEntity.id,
      );
      expect(result).toEqual(mockEntity);
    });
  });

  describe('getAll', () => {
    it('should successfully getAll supplier list', async () => {
      mockNest.finance.expense.getAll.mockResolvedValue(mockEntityList);
      const result = await service.getAll({});

      expect(mockNest.finance.expense.getAll).toHaveBeenCalledWith({});
      expect(result).toEqual(mockEntityList);
    });

    it('should successfully getAll supplier list paginate', async () => {
      mockNest.finance.expense.getAll.mockResolvedValue(mockEntityPaginate);
      const result = await service.getAll(mockPaginateParams);

      expect(mockNest.finance.expense.getAll).toHaveBeenCalledWith(
        mockPaginateParams,
      );
      expect(result).toEqual(mockEntityPaginate);
    });
  });
});