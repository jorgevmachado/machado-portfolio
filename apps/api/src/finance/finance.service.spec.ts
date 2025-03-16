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

import { EXPENSE_LIST_FIXTURE } from '@repo/business/finance/expense/fixtures/expense';
import { USER_FIXTURE } from '@repo/business/auth/fixtures/auth';

import { FinanceService } from './finance.service';
import { ExpenseService } from './expense/expense.service';
import { SupplierService } from './supplier/supplier.service';
import { BankService } from './bank/bank.service';
import { BillService } from './bill/bill.service';

import { Finance } from './finance.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FINANCE_FIXTURE } from '@repo/business/finance/fixtures/finance';
import { SUPPLIER_LIST_FIXTURE } from '@repo/business/finance/supplier/fixtures/supplier';
import { BANK_LIST_FIXTURE } from '@repo/business/finance/bank/fixtures/bank';
import { BILL_LIST_FIXTURE } from '@repo/business/finance/bill/fixtures/bill';
import { ConflictException } from '@nestjs/common';

describe('FinanceService', () => {
  let repository: Repository<Finance>;
  let service: FinanceService;
  let supplierService: SupplierService;
  let bankService: BankService;
  let billService: BillService;
  let expenseService: ExpenseService;

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
          provide: ExpenseService,
          useValue: {
            seed: jest.fn(),
          },
        },
        {
          provide: BillService,
          useValue: {
            seed: jest.fn(),
            seedUnify: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<Repository<Finance>>(getRepositoryToken(Finance));
    supplierService = module.get<SupplierService>(SupplierService);
    bankService = module.get<BankService>(BankService);
    expenseService = module.get<ExpenseService>(ExpenseService);
    billService = module.get<BillService>(BillService);
    service = module.get<FinanceService>(FinanceService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(supplierService).toBeDefined();
    expect(bankService).toBeDefined();
    expect(expenseService).toBeDefined();
    expect(billService).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('initializeFinance', () => {
    it('should return the finance when exist in database', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockReturnValueOnce(FINANCE_FIXTURE),
      } as any);
      expect(await service.initializeFinance(USER_FIXTURE)).toEqual(
        FINANCE_FIXTURE,
      );
    });
    it('should initialize finance when not exist in database', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockReturnValueOnce(null),
      } as any);

      jest.spyOn(repository, 'save').mockResolvedValueOnce(FINANCE_FIXTURE);

      expect(await service.initializeFinance(USER_FIXTURE)).toEqual(
        FINANCE_FIXTURE,
      );
    });
  });

  describe('seeds', () => {
    it('should seed the database when exist in database', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(FINANCE_FIXTURE),
      } as any);

      jest
        .spyOn(supplierService, 'seed')
        .mockResolvedValueOnce(SUPPLIER_LIST_FIXTURE);
      jest.spyOn(bankService, 'seed').mockResolvedValueOnce(BANK_LIST_FIXTURE);
      jest.spyOn(billService, 'seed').mockResolvedValueOnce(BILL_LIST_FIXTURE);
      jest
        .spyOn(expenseService, 'seed')
        .mockResolvedValueOnce(EXPENSE_LIST_FIXTURE);

      expect(await service.seeds(USER_FIXTURE)).toEqual({
        message: 'Seeds executed successfully',
      });
    });
    it('should seed the database when not exist in database', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(null),
      } as any);

      jest.spyOn(repository, 'save').mockResolvedValueOnce(FINANCE_FIXTURE);

      jest
        .spyOn(supplierService, 'seed')
        .mockResolvedValueOnce(SUPPLIER_LIST_FIXTURE);
      jest.spyOn(bankService, 'seed').mockResolvedValueOnce(BANK_LIST_FIXTURE);
      jest.spyOn(billService, 'seed').mockResolvedValueOnce(BILL_LIST_FIXTURE);
      jest
        .spyOn(expenseService, 'seed')
        .mockResolvedValueOnce(EXPENSE_LIST_FIXTURE);

      expect(await service.seeds(USER_FIXTURE)).toEqual({
        message: 'Seeds executed successfully',
      });
    });

    it('should return error when try to seed the database when not exist in database', async () => {
      await expect(service.seeds(USER_FIXTURE)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('seedFinance', () => {
    it('should seed Finance with user and return the entity', async () => {
      const mockSaveResult = FINANCE_FIXTURE;
      jest.spyOn(repository, 'save').mockResolvedValueOnce(mockSaveResult);

      jest
        .spyOn(service, 'seedEntity')
        .mockImplementation(async ({ createdEntityFn }) => {
          return createdEntityFn(FINANCE_FIXTURE);
        });

      const result = await (service as any).seedFinance(USER_FIXTURE);
      expect(result).toEqual(mockSaveResult);
      expect(service.seedEntity).toHaveBeenCalledWith({
        by: 'id',
        label: 'Finance',
        seed: FINANCE_FIXTURE,
        createdEntityFn: expect.any(Function),
      });
      expect(repository.save).toHaveBeenCalledWith({
        id: FINANCE_FIXTURE.id,
        user: USER_FIXTURE,
        created_at: FINANCE_FIXTURE.created_at,
        updated_at: FINANCE_FIXTURE.updated_at,
        deleted_at: FINANCE_FIXTURE.deleted_at,
      });
    });

    it('should throw an exception if seedEntity fails', async () => {
      jest
        .spyOn(service, 'seedEntity')
        .mockRejectedValueOnce(new ConflictException('Seed Failed'));

      await expect((service as any).seedFinance(USER_FIXTURE)).rejects.toThrow(
        ConflictException,
      );
    });
  });
});
