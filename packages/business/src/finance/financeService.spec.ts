import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { Nest } from '../api';

import { FinanceService } from './financeService';

describe('FinanceService', () => {
  let financeService: FinanceService;
  let nestMock: jest.Mocked<Nest>;

  beforeEach(() => {
    nestMock = {} as jest.Mocked<Nest>;

    financeService = new FinanceService(nestMock);
  });

  it('should be instantiated correctly', () => {
    expect(financeService).toBeDefined();
  });

  it('should receive the Nest dependency in the constructor\n', () => {
    expect(financeService['nest']).toBe(nestMock);
  });
});