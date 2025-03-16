import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException } from '@nestjs/common';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import { Repository } from 'typeorm';

import BillBusiness from '@repo/business/finance/bill/billBusiness';
import { BANK_LIST_FIXTURE } from '@repo/business/finance/bank/fixtures/bank';
import { BILL_LIST_FIXTURE } from '@repo/business/finance/bill/fixtures/bill';

import { Bill } from './bill.entity';
import { BillService } from './bill.service';
import { FINANCE_FIXTURE } from '@repo/business/finance/fixtures/finance';

describe('BillService', () => {
  let repository: Repository<Bill>;
  let service: BillService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BillService,
        BillBusiness,
        { provide: getRepositoryToken(Bill), useClass: Repository },
      ],
    }).compile();

    repository = module.get<Repository<Bill>>(getRepositoryToken(Bill));
    service = module.get<BillService>(BillService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('seed', () => {
    it('should seed the database when exist in database', async () => {
      jest.spyOn(repository, 'find').mockResolvedValueOnce(BILL_LIST_FIXTURE);
      expect(
        await service.seed({
          finance: FINANCE_FIXTURE,
          bankList: BANK_LIST_FIXTURE,
        }),
      ).toEqual(BILL_LIST_FIXTURE);
    });

    it('should seed the database when not exist in database', async () => {
      jest.spyOn(repository, 'find').mockResolvedValueOnce([]);

      BILL_LIST_FIXTURE.forEach((bill) => {
        jest.spyOn(repository, 'save').mockResolvedValueOnce(bill);
      });

      expect(
        await service.seed({
          finance: FINANCE_FIXTURE,
          bankList: BANK_LIST_FIXTURE,
        }),
      ).toEqual(BILL_LIST_FIXTURE);
    });

    it('should return conflict exception when seed bank', async () => {
      jest.spyOn(repository, 'find').mockResolvedValueOnce([]);
      await expect(
        service.seed({
          finance: FINANCE_FIXTURE,
          bankList: [],
        }),
      ).rejects.toThrowError(ConflictException);
    });
  });
});
