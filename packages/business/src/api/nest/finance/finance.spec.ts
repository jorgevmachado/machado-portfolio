import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { FINANCE_FIXTURE } from '../../../finance';

import { NestModuleAbstract } from '../nestModuleAbstract';

import { Supplier } from './supplier';
import { Expense } from './expense';
import { Bank } from './bank';
import { Bill } from './bill';

import { Finance } from './finance';

jest.mock('../nestModuleAbstract');

jest.mock('./supplier');
jest.mock('./expense');
jest.mock('./bank');
jest.mock('./bill');

describe('Finance', () => {
  const mockBaseUrl = 'http://mock-base-url.com';
  const mockHeaders = { Authorization: 'Bearer test-token' };
  const mockConfig = { baseUrl: mockBaseUrl, headers: mockHeaders };

  let finance: Finance;

  beforeEach(() => {
    jest.clearAllMocks();
    finance = new Finance(mockConfig);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('supplierModule', () => {
    it('should initialize Supplier module', () => {
      expect(Supplier).toHaveBeenCalledTimes(1);
      expect(Supplier).toHaveBeenCalledWith(mockConfig);
    });

    it('should return the instance of Supplier via supplier getter', () => {
      const supplierModule = finance.supplier;
      expect(supplierModule).toBeInstanceOf(Supplier);
      expect(Supplier).toHaveBeenCalledTimes(1);
    });
  });

  describe('expenseModule', () => {
    it('should initialize Expense module', () => {
      expect(Expense).toHaveBeenCalledTimes(1);
      expect(Expense).toHaveBeenCalledWith(mockConfig);
    });

    it('should return the instance of Expense via expense getter', () => {
      const expenseModule = finance.expense;
      expect(expenseModule).toBeInstanceOf(Expense);
      expect(Expense).toHaveBeenCalledTimes(1);
    });
  });

  describe('bank Module', () => {
    it('should initialize Bank module', () => {
      expect(Bank).toHaveBeenCalledTimes(1);
      expect(Bank).toHaveBeenCalledWith(mockConfig);
    });

    it('should return the instance of Bank via bank getter', () => {
      const bankModule = finance.bank;
      expect(bankModule).toBeInstanceOf(Bank);
      expect(Bank).toHaveBeenCalledTimes(1);
    });
  });

  describe('bill Module', () => {
    it('should initialize Bill module', () => {
      expect(Expense).toHaveBeenCalledTimes(1);
      expect(Expense).toHaveBeenCalledWith(mockConfig);
    });

    it('should return the instance of Bill via bill getter', () => {
      const billModule = finance.bill;
      expect(billModule).toBeInstanceOf(Bill);
      expect(Bill).toHaveBeenCalledTimes(1);
    });
  });

  describe('initialize', () => {
    const financeEntity = FINANCE_FIXTURE;
    it('should request service initialize', async () => {
      const mockPost = jest
        .spyOn(NestModuleAbstract.prototype, 'post')
        .mockResolvedValue(financeEntity);

      const result = await finance.initialize();
      expect(mockPost).toHaveBeenCalledTimes(1);
      expect(mockPost).toHaveBeenCalledWith('finance/initialize');
      expect(result).toEqual(financeEntity);
    });
  });
});