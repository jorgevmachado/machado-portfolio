import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import Finance from './finance';
import { FINANCE_FIXTURE } from '@repo/business/finance/fixtures/finance';

describe('Finance', () => {
  const mockFinanceConstructorParams = FINANCE_FIXTURE;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Constructor', () => {
    it('should create an instance with all provided parameters', () => {
      const finance = new Finance(mockFinanceConstructorParams);
      expect(finance).toBeInstanceOf(Finance);
      expect(finance.id).toBe(mockFinanceConstructorParams.id);
      expect(finance.user).toBe(mockFinanceConstructorParams.user);
      expect(finance.bills).toBe(mockFinanceConstructorParams.bills);
      expect(finance.created_at).toEqual(
        mockFinanceConstructorParams.created_at,
      );
      expect(finance.updated_at).toEqual(
        mockFinanceConstructorParams.updated_at,
      );
      expect(finance.deleted_at).toBe(mockFinanceConstructorParams.deleted_at);
    });
    it('should initialize fields with default values when no parameters are provided', () => {
      const finance = new Finance();
      expect(finance.id).toBeUndefined();
      expect(finance.user).toBeUndefined();
      expect(finance.bills).toBeUndefined();
      expect(finance.created_at).toBeUndefined();
      expect(finance.updated_at).toBeUndefined();
      expect(finance.deleted_at).toBeUndefined();
    });
  });
});