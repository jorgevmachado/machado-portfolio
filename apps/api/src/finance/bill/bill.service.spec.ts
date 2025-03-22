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
import { BILL_CATEGORY_LIST_FIXTURE } from '@repo/business/finance/bill-category/fixtures/billCategory';
import { INGRID_RESIDENTIAL_LIST_FIXTURE } from '@repo/business/finance/expense/fixtures/expense';
import { FINANCE_FIXTURE } from '@repo/business/finance/fixtures/finance';

import { Bill } from './bill.entity';
import { BillService } from './bill.service';
import { BillCategoryService } from './bill-category/bill-category.service';
import { BankService } from '../bank/bank.service';
import { ExpenseService } from '../expense/expense.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update.bill.dto';


describe('BillService', () => {
  let repository: Repository<Bill>;
  let service: BillService;
  let bankService: BankService;
  let expenseService: ExpenseService;
  let billCategoryService: BillCategoryService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BillService,
        BillBusiness,
        { provide: getRepositoryToken(Bill), useClass: Repository },
        {
          provide: BankService,
          useValue: {
            treatEntityParam: jest.fn(),
          },
        },
        {
          provide: BillCategoryService,
          useValue: {
            seed: jest.fn(),
            treatEntityParam: jest.fn(),
          },
        },
        {
          provide: ExpenseService,
          useValue: {
            treatEntitiesParams: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<Repository<Bill>>(getRepositoryToken(Bill));
    billCategoryService = module.get<BillCategoryService>(BillCategoryService);
    bankService = module.get<BankService>(BankService);
    expenseService = module.get<ExpenseService>(ExpenseService);
    service = module.get<BillService>(BillService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(billCategoryService).toBeDefined();
    expect(bankService).toBeDefined();
    expect(expenseService).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a bill successfully without expenses list', async () => {
      const bill: Bill = BILL_LIST_FIXTURE[0];
      const createBill: CreateBillDto = {
        type: bill.type,
        year: bill.year,
        bank: bill.bank.name,
        category: bill.category.name,
      };
      jest
        .spyOn(bankService, 'treatEntityParam')
        .mockResolvedValueOnce(bill.bank);

      jest
        .spyOn(billCategoryService, 'treatEntityParam')
        .mockResolvedValueOnce(bill.category);

      jest
        .spyOn(expenseService, 'treatEntitiesParams')
        .mockResolvedValueOnce([]);

      jest.spyOn(repository, 'save').mockResolvedValueOnce(bill);

      expect(await service.create(FINANCE_FIXTURE, createBill)).toEqual(bill);
    });
  });

  describe('update', () => {
    it('should update a bill successfully without year', async () => {
      const bill: Bill = {
        ...BILL_LIST_FIXTURE[0],
        expenses: INGRID_RESIDENTIAL_LIST_FIXTURE,
      };
      const updateBill: UpdateBillDto = {
        type: bill.type,
        bank: bill.bank.name,
        category: bill.category.name,
        expenses: INGRID_RESIDENTIAL_LIST_FIXTURE,
      };

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(bill),
      } as any);

      jest
        .spyOn(bankService, 'treatEntityParam')
        .mockResolvedValueOnce(bill.bank);

      jest
        .spyOn(billCategoryService, 'treatEntityParam')
        .mockResolvedValueOnce(bill.category);

      jest
        .spyOn(expenseService, 'treatEntitiesParams')
        .mockResolvedValueOnce(INGRID_RESIDENTIAL_LIST_FIXTURE);

      jest.spyOn(repository, 'save').mockResolvedValueOnce(bill);

      expect(
        await service.update(FINANCE_FIXTURE, bill.id, updateBill),
      ).toEqual(bill);
    });

    it('should update a bill successfully with only year', async () => {
      const bill: Bill = {
        ...BILL_LIST_FIXTURE[0],
        expenses: INGRID_RESIDENTIAL_LIST_FIXTURE,
      };
      const updateBill: UpdateBillDto = {
        year: bill.year,
      };

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(bill),
      } as any);

      jest.spyOn(repository, 'save').mockResolvedValueOnce(bill);

      expect(
        await service.update(FINANCE_FIXTURE, bill.id, updateBill),
      ).toEqual(bill);
    });
  });

  describe('findAllBills', () => {
    it('Should return an list of bills', async () => {
      const expected: Array<Bill> = BILL_LIST_FIXTURE.filter(
        (bill) => bill.finance.id === FINANCE_FIXTURE.id,
      );
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getMany: jest.fn().mockReturnValueOnce(expected),
      } as any);

      expect(await service.findAllBills(FINANCE_FIXTURE, {})).toEqual(
        BILL_LIST_FIXTURE,
      );
    });
  });

  describe('remove', () => {
    it('should remove bill when there are no associated expenses', async () => {
      const expected: Bill = {
        ...BILL_LIST_FIXTURE[0],
        expenses: [],
      };
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(expected),
      } as any);
      jest.spyOn(repository, 'softRemove').mockResolvedValueOnce({
        ...expected,
        deleted_at: BILL_LIST_FIXTURE[0].created_at,
      });
      expect(await service.remove(BILL_LIST_FIXTURE[0].id)).toEqual({
        message: 'Successfully removed',
      });
    });

    it('should throw a ConflictException when bill is in use', async () => {
      const expected: Bill = BILL_LIST_FIXTURE[0];

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(expected),
      } as any);

      await expect(
        service.remove(BILL_LIST_FIXTURE[0].id),
      ).rejects.toThrowError(ConflictException);
    });
  });

  describe('seed', () => {
    it('should seed the database when exist in database', async () => {
      jest
        .spyOn(billCategoryService, 'seed')
        .mockResolvedValueOnce(BILL_CATEGORY_LIST_FIXTURE);
      jest.spyOn(repository, 'find').mockResolvedValueOnce(BILL_LIST_FIXTURE);
      expect(
        await service.seed({
          finance: FINANCE_FIXTURE,
          bankList: BANK_LIST_FIXTURE,
        }),
      ).toEqual(BILL_LIST_FIXTURE);
    });

    it('should seed the database when not exist in database', async () => {
      jest
        .spyOn(billCategoryService, 'seed')
        .mockResolvedValueOnce(BILL_CATEGORY_LIST_FIXTURE);
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
      jest
        .spyOn(billCategoryService, 'seed')
        .mockResolvedValueOnce(BILL_CATEGORY_LIST_FIXTURE);
      jest.spyOn(repository, 'find').mockResolvedValueOnce([]);
      await expect(
        service.seed({
          finance: FINANCE_FIXTURE,
          bankList: [],
        }),
      ).rejects.toThrowError(ConflictException);
    });
  });

  describe('billCategorySeed', () => {
    it('should return list of bill categories when received', async () => {
      expect(
        await service.billCategorySeed(BILL_CATEGORY_LIST_FIXTURE),
      ).toEqual(BILL_CATEGORY_LIST_FIXTURE);
    });

    it('should seed list of bill categories when not received', async () => {
      jest
        .spyOn(billCategoryService, 'seed')
        .mockResolvedValueOnce(BILL_CATEGORY_LIST_FIXTURE);
      expect(await service.billCategorySeed()).toEqual(
        BILL_CATEGORY_LIST_FIXTURE,
      );
    });
  });
});
