import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { Nest } from '../api';

import { FinanceService } from './financeService';
import { FINANCE_FIXTURE } from './fixtures';

jest.mock('../api');

describe('FinanceService', () => {
  const financeEntity = FINANCE_FIXTURE;
  let service: FinanceService;
  let mockNest: jest.Mocked<Nest>;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    mockNest = {
      finance: {
        initialize: jest.fn(),
      }
    } as unknown as jest.Mocked<Nest>;

    service = new FinanceService(mockNest);
  });

  afterEach(() => {
    jest.resetModules();
  });

  describe('constructor', () => {
    it('should be instantiated correctly', () => {
      expect(service).toBeDefined();
    });

    it('should receive the Nest dependency in the constructor', () => {
      expect(service['nest']).toBe(mockNest);
    });
  });

  describe('initialize', () => {
    it('should initialize the finance', async () => {
      mockNest.finance.initialize.mockResolvedValue(financeEntity);
      const result = await service.initialize();
      expect(mockNest.finance.initialize).toHaveBeenCalled();
      expect(result).toEqual(financeEntity);
    });
  });
});