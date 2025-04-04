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

import { MONTHS } from '@repo/services/month/month';

import { EExpenseType } from '@repo/business/finance/enum';
import ExpenseBusiness from '@repo/business/finance/expense/expenseBusiness';

import { SUPPLIER_LIST_FIXTURE } from '@repo/business/finance/supplier/fixtures/supplier';

import { EXPENSE_LIST_FIXTURE } from '@repo/business/finance/expense/fixtures/expense';

import { BILL_LIST_FIXTURE } from '@repo/business/finance/bill/fixtures/bill';

import { SupplierService } from '../../supplier/supplier.service';

import { CreateExpenseDto } from './dto/create-expense.dto';

import { Expense } from './expense.entity';

import { ExpenseService } from './expense.service';
import { Supplier } from '../../supplier/supplier.entity';
import { Bill } from '../bill.entity';

import { UpdateExpenseDto } from './dto/update-expense.dto';

describe('ExpenseService', () => {
  const bill: Bill = BILL_LIST_FIXTURE[0];
  const expense: Expense = EXPENSE_LIST_FIXTURE[0];
  const supplier: Supplier = expense.supplier;
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

  describe('buildCreation', () => {
    it('should build a creation expense.', async () => {
      const createDto: CreateExpenseDto = {
        type: EExpenseType.FIXED,
        paid: true,
        value: 93.59,
        supplier: supplier.name,
        instalment_number: 1,
      };

      jest
        .spyOn(supplierService, 'treatEntityParam')
        .mockResolvedValueOnce(supplier);

      const mockExpenseBuildCreation = {
        ...expense,
        id: undefined,
        bill,
        paid: createDto.paid,
        type: createDto.type,
        name: `${bill.name} ${supplier.name}`,
        total: 0,
        supplier,
        total_paid: 0,
        created_at: undefined,
        updated_at: undefined,
        deleted_at: undefined,
        description: undefined,
        instalment_number: createDto.instalment_number,
      };

      MONTHS.forEach((month) => {
        mockExpenseBuildCreation[month] = 0;
        mockExpenseBuildCreation[`${month}_paid`] = false;
      });

      expect(await service.buildCreation(bill, createDto)).toEqual(
        mockExpenseBuildCreation,
      );
    });
  });

  describe('buildUpdate', () => {
    it('should build a update expense only type.', async () => {
      const updateDto: UpdateExpenseDto = {
        type: EExpenseType.FIXED,
      };

      const mockExpenseBuildUpdate = {
        ...expense,
        bill,
        type: updateDto.type,
        total: 0,
        supplier,
        total_paid: 0,
      };

      MONTHS.forEach((month) => {
        mockExpenseBuildUpdate[month] = 0;
        mockExpenseBuildUpdate[`${month}_paid`] = false;
      });
      const result = await service.buildUpdate(expense, updateDto);
      expect(result.id).toEqual(mockExpenseBuildUpdate.id);
      expect(result.name).toEqual(mockExpenseBuildUpdate.name);
      expect(result.year).toEqual(mockExpenseBuildUpdate.year);
      expect(result.bill.id).toEqual(mockExpenseBuildUpdate.bill.id);
      expect(result.type).toEqual(mockExpenseBuildUpdate.type);
      expect(result.paid).toEqual(mockExpenseBuildUpdate.paid);
      expect(result.total).toEqual(expense.total);
      expect(result.supplier.id).toEqual(mockExpenseBuildUpdate.supplier.id);
      expect(result.name_code).toEqual(mockExpenseBuildUpdate.name_code);
      expect(result.total_paid).toEqual(expense.total_paid);
    });

    it('should build a update expense only supplier.', async () => {
      const updateDto: UpdateExpenseDto = {
        supplier: supplier.name,
      };

      jest
        .spyOn(supplierService, 'treatEntityParam')
        .mockResolvedValueOnce(supplier);

      const mockExpenseBuildUpdate = {
        ...expense,
        bill,
        type: updateDto.type,
        total: 0,
        supplier,
        total_paid: 0,
      };

      MONTHS.forEach((month) => {
        mockExpenseBuildUpdate[month] = 0;
        mockExpenseBuildUpdate[`${month}_paid`] = false;
      });
      const result = await service.buildUpdate(expense, updateDto);
      expect(result.id).toEqual(mockExpenseBuildUpdate.id);
      expect(result.name).toEqual(mockExpenseBuildUpdate.name);
      expect(result.year).toEqual(mockExpenseBuildUpdate.year);
      expect(result.bill.id).toEqual(mockExpenseBuildUpdate.bill.id);
      expect(result.type).toEqual(expense.type);
      expect(result.paid).toEqual(mockExpenseBuildUpdate.paid);
      expect(result.total).toEqual(expense.total);
      expect(result.supplier.id).toEqual(mockExpenseBuildUpdate.supplier.id);
      expect(result.name_code).toEqual(mockExpenseBuildUpdate.name_code);
      expect(result.total_paid).toEqual(expense.total_paid);
    });
  });

  describe('saveExpense', () => {
    it('should save an expense', async () => {
      jest.spyOn(repository, 'save').mockResolvedValueOnce(expense);
      expect(await service.saveExpense(expense)).toEqual(expense);
    });
  });
});
