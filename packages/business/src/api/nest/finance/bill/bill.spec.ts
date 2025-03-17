import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { NestModuleAbstract } from '../../nestModuleAbstract';

import { BillCategory } from '../bill-category';

import { Bill } from './bill';

jest.mock('../../nestModuleAbstract');
jest.mock('../bill-category');

describe('Bill', () => {
  const mockBaseUrl = 'http://mock-base-url.com';
  const mockHeaders = { Authorization: 'Bearer test-token' };
  const mockConfig = { baseUrl: mockBaseUrl, headers: mockHeaders };

  let bill: Bill;

  beforeEach(() => {
    jest.clearAllMocks();
    bill = new Bill(mockConfig);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('constructor', () => {
    it('should initialize with the correct path and config bill', () => {
      expect(NestModuleAbstract).toHaveBeenCalledTimes(1);
      expect(NestModuleAbstract).toHaveBeenCalledWith({
        pathUrl: 'finance/bill',
        nestModuleConfig: mockConfig,
      });
    });
  });

  describe('billCategoryModule', () => {
    it('should initialize billCategory module', () => {
      expect(BillCategory).toHaveBeenCalledTimes(1);
      expect(BillCategory).toHaveBeenCalledWith(mockConfig);
    });
    it('should return the instance of billCategory via type getter', () => {
      const categoryModule = bill.category;
      expect(categoryModule).toBeInstanceOf(BillCategory);
      expect(BillCategory).toHaveBeenCalledTimes(1);
    });
  });
});