import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import {
  BILL_LIST_FIXTURE,
  INGRID_RESIDENTIAL_BANK_SLIP_NUBANK_BILL_FIXTURE,
} from './fixtures';

import BillBusiness from './business';
import type { BillConstructorParams } from './interface';
import Bill from './bill';

describe('billBusiness', () => {
  const business = new BillBusiness();

  const mockBillConstructorParams: BillConstructorParams =
    INGRID_RESIDENTIAL_BANK_SLIP_NUBANK_BILL_FIXTURE;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.resetModules();
  });

  describe('initialize', () => {
    it('should initialize a bill and process it', () => {
      const bill = business.initialize(mockBillConstructorParams);

      expect(bill).toBeInstanceOf(Bill);
      expect(bill.total).toBe(mockBillConstructorParams.total);
      expect(bill.total_paid).toBe(mockBillConstructorParams.total_paid);
      expect(bill?.expenses?.length).toBe(4);
      expect(bill.all_paid).toBe(mockBillConstructorParams.all_paid);
    });
  });

  describe('mapBillListByItem', () => {
    const mockBillList = BILL_LIST_FIXTURE;
    it('should map bill list type by item', () => {
      const result = business.mapBillListByItem(mockBillList, 'type');
      expect(result.length).toEqual(4);
    });

    it('should map bill list bank by item', () => {
      const result = business.mapBillListByItem(mockBillList, 'bank');
      expect(result.length).toEqual(4);
    });

    it('should map bill list category by item', () => {
      const result = business.mapBillListByItem(mockBillList, 'category');
      expect(result.length).toEqual(4);
    });
  });

  describe('calculateAllBill', () => {
    const mockBill = BILL_LIST_FIXTURE[0] as Bill;
    it('should calculate all bill correctly', () => {
      const result = business.calculateAllBill(mockBill);
      expect(result.total).toEqual(4109.68);
      expect(result.allPaid).toBeFalsy();
      expect(result.totalPaid).toEqual(2609.68);
      expect(result.totalPending).toEqual(1500);
    });

    it('should calculate all bill correctly with total anda all_paid undefined', () => {
      const result = business.calculateAllBill({
        ...mockBill,
        total: undefined,
        all_paid: undefined,
        total_paid: undefined,
      });
      expect(result.total).toEqual(0);
      expect(result.allPaid).toBeFalsy();
      expect(result.totalPaid).toEqual(0);
      expect(result.totalPending).toEqual(0);
    });
  });
});