import { Test, TestingModule } from '@nestjs/testing';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import { USER_FIXTURE } from '@repo/business/auth/fixtures/auth';
import { SUPPLIER_LIST_FIXTURE } from '@repo/business/finance/supplier/fixtures/supplier';
import { BANK_LIST_FIXTURE } from '@repo/business/finance/bank/fixtures/bank';
import { BILL_CATEGORY_LIST_FIXTURE } from '@repo/business/finance/bill-category/fixtures/billCategory';
import { FINANCE_FIXTURE } from '@repo/business/finance/fixtures/finance';
import { EXPENSE_LIST_FIXTURE } from '@repo/business/finance/expense/fixtures/expense';
import { BILL_LIST_FIXTURE } from '@repo/business/finance/bill/fixtures/bill';

import { FinanceService } from './finance.service';
import { SupplierService } from './supplier/supplier.service';
import { BankService } from './bank/bank.service';
import { BillService } from './bill/bill.service';

import { Finance } from './finance.entity';

describe('FinanceService', () => {
  let repository: Repository<Finance>;
  let service: FinanceService;
  let supplierService: SupplierService;
  let bankService: BankService;
  let billService: BillService;

  const mockUser = USER_FIXTURE;
  const mockFinance = FINANCE_FIXTURE;
  const mockBanks = BANK_LIST_FIXTURE;
  const mockSuppliers = SUPPLIER_LIST_FIXTURE;
  const mockBillCategories = BILL_CATEGORY_LIST_FIXTURE;
  const mockExpenses = EXPENSE_LIST_FIXTURE;
  const mockBills = BILL_LIST_FIXTURE;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FinanceService,
        { provide: getRepositoryToken(Finance), useClass: Repository },
        {
          provide: SupplierService,
          useValue: {
            seed: jest.fn(),
          },
        },
        {
          provide: BankService,
          useValue: {
            seed: jest.fn(),
          },
        },
        {
          provide: BillService,
          useValue: {
            seed: jest.fn(),
            expenseSeed: jest.fn(),
            billCategorySeed: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<Repository<Finance>>(getRepositoryToken(Finance));
    supplierService = module.get<SupplierService>(SupplierService);
    bankService = module.get<BankService>(BankService);
    billService = module.get<BillService>(BillService);
    service = module.get<FinanceService>(FinanceService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('constructor', () => {
    it('should be defined', () => {
      expect(supplierService).toBeDefined();
      expect(bankService).toBeDefined();
      expect(billService).toBeDefined();
      expect(service).toBeDefined();
    });
  });

  describe('initializeFinance', () => {
    it('should return existing finance if it already exists', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockReturnValueOnce(mockFinance),
      } as any);

      const result = await service.initializeFinance(mockUser);
      expect(result).toEqual(mockFinance);
    });
    it('should create a new finance if it does not exist', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockReturnValueOnce(null),
      } as any);
      jest.spyOn(repository, 'save').mockResolvedValueOnce(mockFinance);
      expect(await service.initializeFinance(USER_FIXTURE)).toEqual(
        mockFinance,
      );
    });
  });

  describe('seed', () => {
    it('should seed the database when exist finance in database and return object', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(mockFinance),
      } as any);

      expect(await service.seed(mockUser, true)).toEqual(mockFinance);
    });

    it('should seed the database when exist finance in database and return message', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(mockFinance),
      } as any);

      expect(await service.seed(mockUser, false)).toEqual({
        message: `Seeding Finance Completed Successfully!`,
      });
    });

    it('should seed the database when not exist finance in database and return object', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(null),
      } as any);

      jest.spyOn(repository, 'save').mockResolvedValueOnce(mockFinance);

      expect(await service.seed(mockUser, true)).toEqual(mockFinance);
    });
  });

  describe('basicSeeds', () => {
    it('should seed suppliers, banks, and bill categories and return array of objects', async () => {
      jest.spyOn(supplierService, 'seed').mockResolvedValueOnce(mockSuppliers);
      jest.spyOn(bankService, 'seed').mockResolvedValueOnce(mockBanks);
      jest
        .spyOn(billService, 'billCategorySeed')
        .mockResolvedValueOnce(mockBillCategories);

      expect(await service.basicSeeds()).toEqual({
        supplierList: mockSuppliers,
        bankList: mockBanks,
        billCategoryList: mockBillCategories,
      });
    });

    it('should seed suppliers, banks, and bill categories and return message', async () => {
      jest.spyOn(supplierService, 'seed').mockResolvedValueOnce(mockSuppliers);
      jest.spyOn(bankService, 'seed').mockResolvedValueOnce(mockBanks);
      jest
        .spyOn(billService, 'billCategorySeed')
        .mockResolvedValueOnce(mockBillCategories);

      expect(await service.basicSeeds(false)).toEqual({
        message:
          'Seeding suppliers , banks and Bill Categories  Completed Successfully!',
      });
    });
  });
  describe('seeds', () => {
    it('should run all seeds and return completion message', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockReturnValueOnce(null),
      } as any);
      jest.spyOn(repository, 'save').mockResolvedValueOnce(mockFinance);

      jest.spyOn(supplierService, 'seed').mockResolvedValueOnce(mockSuppliers);
      jest.spyOn(bankService, 'seed').mockResolvedValueOnce(mockBanks);
      jest
        .spyOn(billService, 'billCategorySeed')
        .mockResolvedValueOnce(mockBillCategories);
      jest.spyOn(billService, 'expenseSeed').mockResolvedValueOnce(mockExpenses);
      jest.spyOn(billService, 'seed').mockResolvedValueOnce(mockBills);
      expect(await service.seeds(mockUser)).toEqual({
        message: 'Seeds finances executed successfully',
      });
    });

    it('should return error when not seed finance', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockReturnValueOnce(null),
      } as any);

      jest.spyOn(supplierService, 'seed').mockResolvedValueOnce(mockSuppliers);
      jest.spyOn(bankService, 'seed').mockResolvedValueOnce(mockBanks);
      jest
        .spyOn(billService, 'billCategorySeed')
        .mockResolvedValueOnce(mockBillCategories);
      jest.spyOn(billService, 'expenseSeed').mockResolvedValueOnce(mockExpenses);
      jest.spyOn(billService, 'seed').mockResolvedValueOnce(mockBills);
      await expect(service.seeds(mockUser)).rejects.toThrowError();
    });
  });
});
