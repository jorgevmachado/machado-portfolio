import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { INGRID_RESIDENTIAL_BILL_CATEGORY_FIXTURE } from './fixtures';
import BillCategory from './billCategory';

describe('BillCategory', () => {
  const billCategoryMock = INGRID_RESIDENTIAL_BILL_CATEGORY_FIXTURE;
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  afterEach(() => {
    jest.resetModules();
  });

  describe('constructor', () => {
    it('should create an instance with all parameters when valid data is provided', () => {
      const params = billCategoryMock;

      const billCategory = new BillCategory(params);

      expect(billCategory.id).toBe(params.id);
      expect(billCategory.name).toBe(params.name);
      expect(billCategory.created_at).toEqual(params.created_at);
      expect(billCategory.updated_at).toEqual(params.updated_at);
      expect(billCategory.deleted_at).toBeUndefined();
    });

    it('should create an instance with minimal valid data', () => {
      const params = {
        name: 'Bill B',
      };

      const billCategory = new BillCategory(params);

      expect(billCategory.id).toBeUndefined();
      expect(billCategory.name).toBe(params.name);
      expect(billCategory.created_at).toBeUndefined();
      expect(billCategory.updated_at).toBeUndefined();
      expect(billCategory.deleted_at).toBeUndefined();
    });

    it('should allow instantiation with no parameters', () => {
      const billCategory = new BillCategory();

      expect(billCategory.id).toBeUndefined();
      expect(billCategory.name).toBeUndefined();
      expect(billCategory.created_at).toBeUndefined();
      expect(billCategory.updated_at).toBeUndefined();
      expect(billCategory.deleted_at).toBeUndefined();
    });
  });
});
