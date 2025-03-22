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
import { ConflictException, NotFoundException } from '@nestjs/common';

import { EMonth } from '@repo/business/finance/enum';
import ExpenseBusiness from '@repo/business/finance/expense/expenseBusiness';

import { SUPPLIER_LIST_FIXTURE } from '@repo/business/finance/supplier/fixtures/supplier';

import { EXPENSE_LIST_FIXTURE } from '@repo/business/finance/expense/fixtures/expense';

import { BILL_LIST_FIXTURE } from '@repo/business/finance/bill/fixtures/bill';

import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

import { Expense } from './expense.entity';
import { ExpenseService } from './expense.service';
import { SupplierService } from '../supplier/supplier.service';

describe('ExpenseService', () => {
  let repository: Repository<Expense>;
  let supplierService: SupplierService;
  let service: ExpenseService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpenseService,
        ExpenseBusiness,
        { provide: getRepositoryToken(Expense), useClass: Repository },
        {
          provide: SupplierService,
          useValue: {
            seed: jest.fn(),
            findOne: jest.fn(),
            treatEntityParam: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<Repository<Expense>>(getRepositoryToken(Expense));
    supplierService = module.get<SupplierService>(SupplierService);
    service = module.get<ExpenseService>(ExpenseService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(supplierService).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('seed', () => {
    it('should seed the database when exist in database', async () => {
      jest
        .spyOn(repository, 'find')
        .mockResolvedValueOnce(EXPENSE_LIST_FIXTURE);

      expect(
        await service.seed(SUPPLIER_LIST_FIXTURE, BILL_LIST_FIXTURE),
      ).toEqual(EXPENSE_LIST_FIXTURE);
    });

    it('should seed the database when not exist in database', async () => {
      jest.spyOn(repository, 'find').mockResolvedValueOnce([]);

      EXPENSE_LIST_FIXTURE.forEach((expense) => {
        jest.spyOn(repository, 'save').mockResolvedValueOnce(expense);
      });

      expect(
        await service.seed(SUPPLIER_LIST_FIXTURE, BILL_LIST_FIXTURE),
      ).toEqual(EXPENSE_LIST_FIXTURE);
    });
  });

  describe('create', () => {
    it('should create a new expense with type equal variable and save it', async () => {
      const createDto: CreateExpenseDto = {
        type: EXPENSE_LIST_FIXTURE[0].type,
        bill: EXPENSE_LIST_FIXTURE[0].bill.id,
        value: 100,
        month: EMonth.FEBRUARY,
        supplier: EXPENSE_LIST_FIXTURE[0].supplier.name,
        description: EXPENSE_LIST_FIXTURE[0].description,
        instalment_number: EXPENSE_LIST_FIXTURE[0].instalment_number,
      };

      jest
        .spyOn(supplierService, 'treatEntityParam')
        .mockResolvedValueOnce(EXPENSE_LIST_FIXTURE[0].supplier);

      jest.spyOn(repository, 'findOne').mockReturnValueOnce(null);

      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(EXPENSE_LIST_FIXTURE[0]);

      expect(await service.create(BILL_LIST_FIXTURE, createDto)).toEqual(
        EXPENSE_LIST_FIXTURE[0],
      );
    });
  });

  describe('update', () => {
    const updateDto: UpdateExpenseDto = {
      type: EXPENSE_LIST_FIXTURE[0].type,
      paid: EXPENSE_LIST_FIXTURE[0].paid,
      january: EXPENSE_LIST_FIXTURE[0].january,
      january_paid: EXPENSE_LIST_FIXTURE[0].january_paid,
      february: EXPENSE_LIST_FIXTURE[0].february,
      february_paid: EXPENSE_LIST_FIXTURE[0].february_paid,
      march: EXPENSE_LIST_FIXTURE[0].march,
      march_paid: EXPENSE_LIST_FIXTURE[0].march_paid,
      april: EXPENSE_LIST_FIXTURE[0].april,
      april_paid: EXPENSE_LIST_FIXTURE[0].april_paid,
      may: EXPENSE_LIST_FIXTURE[0].may,
      may_paid: EXPENSE_LIST_FIXTURE[0].may_paid,
      june: EXPENSE_LIST_FIXTURE[0].june,
      june_paid: EXPENSE_LIST_FIXTURE[0].june_paid,
      july: EXPENSE_LIST_FIXTURE[0].july,
      july_paid: EXPENSE_LIST_FIXTURE[0].july_paid,
      august: EXPENSE_LIST_FIXTURE[0].august,
      august_paid: EXPENSE_LIST_FIXTURE[0].august_paid,
      september: EXPENSE_LIST_FIXTURE[0].september,
      september_paid: EXPENSE_LIST_FIXTURE[0].september_paid,
      october: EXPENSE_LIST_FIXTURE[0].october,
      october_paid: EXPENSE_LIST_FIXTURE[0].october_paid,
      november: EXPENSE_LIST_FIXTURE[0].november,
      november_paid: EXPENSE_LIST_FIXTURE[0].november_paid,
      december: EXPENSE_LIST_FIXTURE[0].december,
      december_paid: EXPENSE_LIST_FIXTURE[0].december_paid,
      description: EXPENSE_LIST_FIXTURE[0].description,
      instalment_number: EXPENSE_LIST_FIXTURE[0].instalment_number,
    };
    it('should update a expense with all fields and save it', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(EXPENSE_LIST_FIXTURE[0]),
      } as any);

      jest
        .spyOn(supplierService, 'treatEntityParam')
        .mockResolvedValueOnce(EXPENSE_LIST_FIXTURE[0].supplier);

      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(EXPENSE_LIST_FIXTURE[0]);

      expect(
        await service.update(EXPENSE_LIST_FIXTURE[0].id, BILL_LIST_FIXTURE, {
          ...updateDto,
          supplier: EXPENSE_LIST_FIXTURE[0].supplier.name,
        }),
      ).toEqual(EXPENSE_LIST_FIXTURE[0]);
    });

    it('should update a expense without relations fields and save it', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(EXPENSE_LIST_FIXTURE[0]),
      } as any);

      const expected = {
        ...EXPENSE_LIST_FIXTURE[0],
        supplier: EXPENSE_LIST_FIXTURE[0].supplier,
      };

      jest.spyOn(repository, 'save').mockResolvedValueOnce(expected);

      expect(
        await service.update(EXPENSE_LIST_FIXTURE[0].id, BILL_LIST_FIXTURE, {
          ...updateDto,
          bill: EXPENSE_LIST_FIXTURE[0].bill,
        }),
      ).toEqual(expected);
    });

    it('should return conflict exception because the id is not uuid', async () => {
      await expect(
        service.update(
          EXPENSE_LIST_FIXTURE[0].supplier.name,
          BILL_LIST_FIXTURE,
          updateDto,
        ),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('remove', () => {
    it('should remove expense', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(EXPENSE_LIST_FIXTURE[0]),
      } as any);

      jest.spyOn(repository, 'softRemove').mockResolvedValueOnce({
        ...EXPENSE_LIST_FIXTURE[0],
        deleted_at: EXPENSE_LIST_FIXTURE[0].created_at,
      });

      expect(await service.remove(EXPENSE_LIST_FIXTURE[0].id)).toEqual({
        message: 'Successfully removed',
      });
    });
    it('should return conflict exception because the id is not uuid', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(null),
      } as any);
      await expect(
        service.remove(EXPENSE_LIST_FIXTURE[0].supplier.name),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
