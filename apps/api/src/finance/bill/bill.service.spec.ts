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

import { USER_FIXTURE } from '@repo/mock/auth/fixture';
import { BANK_LIST_FIXTURE } from '@repo/mock/finance/bank/fixtures/bank';
import { EXPENSE_LIST_FIXTURE } from '@repo/mock/finance/expense/fixtures/expense';
import { BILL_LIST_FIXTURE } from '@repo/mock/finance/bill/fixtures/bill';

import { Bill } from './bill.entity';
import { BillService } from './bill.service';

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
          user: USER_FIXTURE,
          bankList: BANK_LIST_FIXTURE,
          expenseList: EXPENSE_LIST_FIXTURE,
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
          user: USER_FIXTURE,
          bankList: BANK_LIST_FIXTURE,
          expenseList: EXPENSE_LIST_FIXTURE,
        }),
      ).toEqual(BILL_LIST_FIXTURE);
    });

    it('should return conflict exception when seed bank', async () => {
      jest.spyOn(repository, 'find').mockResolvedValueOnce([]);
      await expect(
        service.seed({
          user: USER_FIXTURE,
          bankList: [],
          expenseList: EXPENSE_LIST_FIXTURE,
        }),
      ).rejects.toThrowError(ConflictException);
    });
  });

  describe('getRelations', () => {
    const relation = 'Expense';

    it('should return an empty array when entityList is undefined or empty', () => {
      const result = service['getRelations']([], relation, undefined);
      expect(result).toEqual([]);

      const result2 = service['getRelations']([], relation, []);
      expect(result2).toEqual([]);
    });

    it('should throw ConflictException when no matching relations are found', () => {
      const list = [{ id: '1' }];
      const entityList = [{ id: '2' }]; // IDs não coincidem

      expect(() => {
        service['getRelations'](list, relation, entityList);
      }).toThrow(
          new ConflictException(
              `No matching ${relation} found between the provided lists.`,
          ),
      );
    });

    it('should return matching relations when entityList has matches', () => {
      const list = [{ id: '1' }, { id: '2' }];
      const entityList = [{ id: '1' }]; // ID coincidente

      const result = service['getRelations'](list, relation, entityList);
      expect(result).toEqual([{ id: '1' }]); // Relação correspondente
    });
  });

});
