import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { Nest } from '../../api';

import { ExpenseService } from './service';
import { INGRID_RESIDENTIAL_LIST_FIXTURE } from './fixtures';
import { ExpenseCreateParams, ExpenseUpdateParams } from './interface';
import { EMonth } from '../../api/nest/finance';

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
    jest.restoreAllMocks();
    mockNest = {
      finance: {
        bill: {
          expense: {
            getAllByBill: jest.fn(),
            getOneByBill: jest.fn(),
            createByBill: jest.fn(),
            updateByBill: jest.fn(),
            deleteByBill: jest.fn(),
          },
        },
      },
    } as unknown as jest.Mocked<Nest>;
    service = new ExpenseService(mockNest as any);
  });

  afterEach(() => {
    jest.resetModules();
  });

  describe('constructor', () => {
    it('should instantiate the service correctly', () => {
      expect(service).toBeInstanceOf(ExpenseService);
      expect(service['nest']).toBe(mockNest);
    });
  });

  describe('create', () => {
    it('should successfully create an supplier', async () => {
      mockNest.finance.bill.expense.createByBill.mockResolvedValue(mockEntity);

      const mockExpenseCreateParams: ExpenseCreateParams = {
        type: mockEntity.type,
        paid: mockEntity.paid,
        value: 100,
        month: EMonth.MARCH,
        supplier: mockEntity.supplier.name,
        description: mockEntity.description,
        instalment_number: mockEntity.instalment_number,
      };

      const result = await service.create(
        mockEntity.bill.id,
        mockExpenseCreateParams,
      );

      expect(mockNest.finance.bill.expense.createByBill).toHaveBeenCalledWith(
        mockEntity.bill.id,
        mockExpenseCreateParams,
      );
      expect(result).toEqual(mockEntity);
    });
  });

  describe('update', () => {
    it('should successfully update an expense', async () => {
      mockNest.finance.bill.expense.updateByBill.mockResolvedValue(mockEntity);
      const mockExpenseUpdateParams: ExpenseUpdateParams = {
        ...mockEntity,
      };

      const result = await service.update(
        mockEntity.bill.id,
        mockEntity.id,
        mockExpenseUpdateParams,
      );

      expect(mockNest.finance.bill.expense.updateByBill).toHaveBeenCalledWith(
        mockEntity.bill.id,
        mockEntity.id,
        mockExpenseUpdateParams,
      );
      expect(result).toEqual(mockEntity);
    });
  });

  describe('delete', () => {
    it('should successfully delete an expense', async () => {
      const mockResponse = { message: 'Successfully removed' };
      mockNest.finance.bill.expense.deleteByBill.mockResolvedValue(
        mockResponse,
      );
      const result = await service.remove(mockEntity.bill.id, mockEntity.id);

      expect(mockNest.finance.bill.expense.deleteByBill).toHaveBeenCalledWith(
        mockEntity.bill.id,
        mockEntity.id,
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('get', () => {
    it('should successfully get an expense', async () => {
      mockNest.finance.bill.expense.getOneByBill.mockResolvedValue(mockEntity);
      const result = await service.get(mockEntity.bill.id, mockEntity.id);

      expect(mockNest.finance.bill.expense.getOneByBill).toHaveBeenCalledWith(
        mockEntity.bill.id,
        mockEntity.id,
      );
      expect(result).toEqual(mockEntity);
    });
  });

  describe('getAll', () => {
    it('should successfully getAll supplier list', async () => {
      mockNest.finance.bill.expense.getAllByBill.mockResolvedValue(
        mockEntityList,
      );
      const result = await service.getAll(mockEntity.bill.id, {});

      expect(mockNest.finance.bill.expense.getAllByBill).toHaveBeenCalledWith(
        mockEntity.bill.id,
        {},
      );
      expect(result).toEqual(mockEntityList);
    });

    it('should successfully getAll supplier list paginate', async () => {
      mockNest.finance.bill.expense.getAllByBill.mockResolvedValue(
        mockEntityPaginate,
      );
      const result = await service.getAll(
        mockEntity.bill.id,
        mockPaginateParams,
      );

      expect(mockNest.finance.bill.expense.getAllByBill).toHaveBeenCalledWith(
        mockEntity.bill.id,
        mockPaginateParams,
      );
      expect(result).toEqual(mockEntityPaginate);
    });
  });
});