import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { NestModuleAbstract } from '../../nestModuleAbstract';
import { Bill } from './bill';

jest.mock('../../nestModuleAbstract');

describe('Bill', () => {
  const mockBaseUrl = 'http://mock-base-url.com';
  const mockHeaders = { Authorization: 'Bearer test-token' };
  const mockConfig = { baseUrl: mockBaseUrl, headers: mockHeaders };

  let bill: Bill;

  beforeEach(() => {
    jest.clearAllMocks();
    bill = new Bill(mockConfig);
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
});