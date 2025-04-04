import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { INGRID_RESIDENTIAL_LIST_FIXTURE } from '../../../../finance/expense/fixtures';

import { NestModuleAbstract } from '../../nestModuleAbstract';
import { Expense } from './expense';
import type { QueryParameters } from '../../../../shared';
import { EMonth } from '../enum';
import {IExpenseCreateParams, IExpenseUpdateParams} from "./interface";

jest.mock('../../nestModuleAbstract');

describe('Expense', () => {
  const mockBaseUrl = 'http://mock-base-url.com';
  const mockHeaders = { Authorization: 'Bearer test-token' };
  const mockConfig = { baseUrl: mockBaseUrl, headers: mockHeaders };
  const mockEntity = INGRID_RESIDENTIAL_LIST_FIXTURE[0];
  const mockPaginateParams: QueryParameters = { page: 1, limit: 10 };
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

  let expense: Expense;

  beforeEach(() => {
    jest.clearAllMocks();
    expense = new Expense(mockConfig);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('constructor', () => {
    it('should initialize with the correct path and config expense', () => {
      expect(NestModuleAbstract).toHaveBeenCalledTimes(1);
      expect(NestModuleAbstract).toHaveBeenCalledWith({
        pathUrl: 'finance/bill',
        nestModuleConfig: mockConfig,
      });
    });
  });

  describe('getAllByBill', () => {
    it('should call get with correct URL and parameters for getAllByBill', async () => {
      const mockGetAllByBill = jest
        .spyOn(NestModuleAbstract.prototype, 'get')
        .mockResolvedValue(mockEntityPaginate);
      const result = await expense.getAllByBill(
        mockEntity.bill.id,
        mockPaginateParams,
      );

      expect(mockGetAllByBill).toHaveBeenCalledTimes(1);
      expect(mockGetAllByBill).toHaveBeenCalledWith(
        `finance/bill/${mockEntity.bill.id}/list/expense`,
        { params: mockPaginateParams },
      );
      expect(result).toEqual(mockEntityPaginate);
    });
  });

  describe('getOneByBill', () => {
    it('should call get with correct URL and parameters for getOneByBill', async () => {
      const mockGetOneByBill = jest
        .spyOn(NestModuleAbstract.prototype, 'get')
        .mockResolvedValue(mockEntity);
      const result = await expense.getOneByBill(
        mockEntity.bill.id,
        mockEntity.id,
      );

      expect(mockGetOneByBill).toHaveBeenCalledTimes(1);
      expect(mockGetOneByBill).toHaveBeenCalledWith(
        `finance/bill/${mockEntity.bill.id}/expense/${mockEntity.id}`,
      );
      expect(result).toEqual(mockEntity);
    });
  });

  describe('deleteByBill', () => {
    it('should call delete with correct URL and parameters for deleteByBill', async () => {
      const mockDeleteByBill = jest
        .spyOn(NestModuleAbstract.prototype, 'remove')
        .mockResolvedValue({ message: 'Successfully removed' });
      const result = await expense.deleteByBill(
        mockEntity.bill.id,
        mockEntity.id,
      );
      expect(mockDeleteByBill).toHaveBeenCalledTimes(1);
      expect(mockDeleteByBill).toHaveBeenCalledWith(
        `finance/bill/${mockEntity.bill.id}/expense/${mockEntity.id}`,
      );
      expect(result).toEqual({ message: 'Successfully removed' });
    });
  });

  describe('createByBill', () => {
    it('should call create with correct URL and parameters for createByBill', async () => {
      const mockCreateByBill = jest
        .spyOn(NestModuleAbstract.prototype, 'post')
        .mockResolvedValue(mockEntity);
      const mockExpenseCreateParams: IExpenseCreateParams = {
        type: mockEntity.type,
        paid: mockEntity.paid,
        value: 100,
        month: EMonth.MARCH,
        supplier: mockEntity.supplier.name,
        description: mockEntity.description,
        instalment_number: mockEntity.instalment_number,
      }
      const result = await expense.createByBill(mockEntity.bill.id, mockExpenseCreateParams);
      expect(mockCreateByBill).toHaveBeenCalledTimes(1);
      expect(mockCreateByBill).toHaveBeenCalledWith(
        `finance/bill/${mockEntity.bill.id}/expense`,
          { body: mockExpenseCreateParams }
      );
      expect(result).toEqual(mockEntity);
    });
  });

  describe('updateByBill', () => {
    it('should call update with correct URL and parameters for updateByBill', async () => {
      const mockCreateByBill = jest
          .spyOn(NestModuleAbstract.prototype, 'path')
          .mockResolvedValue(mockEntity);
      const mockExpenseUpdateParams: IExpenseUpdateParams = {
        ...mockEntity,
      }
      const result = await expense.updateByBill(mockEntity.bill.id, mockEntity.id, mockExpenseUpdateParams);
      expect(mockCreateByBill).toHaveBeenCalledTimes(1);
      expect(mockCreateByBill).toHaveBeenCalledWith(
          `finance/bill/${mockEntity.bill.id}/expense/${mockEntity.id}`,
          { body: mockExpenseUpdateParams }
      );
      expect(result).toEqual(mockEntity);
    });
  });
});