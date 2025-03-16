import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';


import { INGRID_RESIDENTIAL_BANK_SLIP_NUBANK_BILL_FIXTURE } from './fixtures';
import BillBusiness from './billBusiness';
import type { BillConstructorParams } from './interface';
import Bill from './bill';

describe('billBusiness', () => {
  const business = new BillBusiness();

  const mockBillConstructorParams: BillConstructorParams =
    INGRID_RESIDENTIAL_BANK_SLIP_NUBANK_BILL_FIXTURE;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('initializeBill', () => {
    it('should initialize a bill and process it', () => {
      const bill = business.initialize(mockBillConstructorParams);

      expect(bill).toBeInstanceOf(Bill);
      expect(bill.total).toBe(mockBillConstructorParams.total);
      expect(bill.total_paid).toBe(mockBillConstructorParams.total_paid);
      expect(bill?.expenses?.length).toBe(4);
      expect(bill.all_paid).toBe(mockBillConstructorParams.all_paid);
    });
  });
});