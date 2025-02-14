import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { EMonth } from '@repo/business/finance/enum';

import { LIST_EXPENSE_CATEGORY_TYPE_FIXTURE } from '@repo/mock/finance/fixtures/expense-category-type/expenseCategoryType';
import { LIST_EXPENSE_CATEGORY_FIXTURE } from '@repo/mock/finance/fixtures/expense-category/expenseCategory';
import { LIST_EXPENSE_GROUP_FIXTURE } from '@repo/mock/finance/fixtures/expense-group/expenseGroup';
import {
  GARAGE_MONTE_CARLO_EXPENSE_FIXTURE,
  NEOENERGIA_ALL_PAYMENT_FIXTURE,
  NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE,
  OLD_BIKERS_EXPENSE_FIXTURE,
} from '@repo/mock/finance/fixtures/expense/expense';

import { ExpenseCategoryService } from './expense-category/expense-category.service';
import { ExpenseGroupService } from './expense-group/expense-group.service';

import { ExpenseService } from './expense.service';
import { Expense } from './expense.entity';
import { SupplierService } from '../supplier/supplier.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import ExpenseBusiness from '@repo/business/finance/expense/expenseBusiness';
import { UpdateExpenseDto } from './dto/update-expense.dto';

describe('ExpenseService', () => {
  let repository: Repository<Expense>;
  let expenseCategoryService: ExpenseCategoryService;
  let expenseGroupService: ExpenseGroupService;
  let supplierService: SupplierService;
  let service: ExpenseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpenseService,
        ExpenseBusiness,
        { provide: getRepositoryToken(Expense), useClass: Repository },
        {
          provide: ExpenseCategoryService,
          useValue: {
            seed: jest.fn(),
            findOne: jest.fn(),
            treatExpenseCategoryParam: jest.fn(),
          },
        },
        {
          provide: ExpenseGroupService,
          useValue: {
            seed: jest.fn(),
            findOne: jest.fn(),
            treatExpenseGroupParam: jest.fn(),
          },
        },
        {
          provide: SupplierService,
          useValue: {
            seed: jest.fn(),
            findOne: jest.fn(),
            treatSupplierParam: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<Repository<Expense>>(getRepositoryToken(Expense));
    expenseCategoryService = module.get<ExpenseCategoryService>(
      ExpenseCategoryService,
    );
    expenseGroupService = module.get<ExpenseGroupService>(ExpenseGroupService);
    supplierService = module.get<SupplierService>(SupplierService);
    service = module.get<ExpenseService>(ExpenseService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(expenseCategoryService).toBeDefined();
    expect(expenseGroupService).toBeDefined();
    expect(supplierService).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('seed', () => {
    it('should seed the database when exist in database', async () => {
      jest.spyOn(expenseCategoryService, 'seed').mockResolvedValueOnce({
        expenseCategoryTypes: LIST_EXPENSE_CATEGORY_TYPE_FIXTURE,
        expenseCategories: LIST_EXPENSE_CATEGORY_FIXTURE,
      });
      jest
        .spyOn(expenseGroupService, 'seed')
        .mockResolvedValueOnce(LIST_EXPENSE_GROUP_FIXTURE);

      expect(await service.seed()).toEqual({
        expenseCategoryTypes: LIST_EXPENSE_CATEGORY_TYPE_FIXTURE,
        expenseCategories: LIST_EXPENSE_CATEGORY_FIXTURE,
        expenseGroups: LIST_EXPENSE_GROUP_FIXTURE,
      });
    });
    it('should return conflict exception when seed expense category', async () => {
      jest.spyOn(expenseCategoryService, 'seed').mockResolvedValueOnce(null);
      jest
        .spyOn(expenseGroupService, 'seed')
        .mockResolvedValueOnce(LIST_EXPENSE_GROUP_FIXTURE);

      await expect(service.seed()).rejects.toThrowError(ConflictException);
    });
    it('should return conflict exception when seed expense group', async () => {
      jest.spyOn(expenseCategoryService, 'seed').mockResolvedValueOnce({
        expenseCategoryTypes: LIST_EXPENSE_CATEGORY_TYPE_FIXTURE,
        expenseCategories: LIST_EXPENSE_CATEGORY_FIXTURE,
      });
      jest.spyOn(expenseGroupService, 'seed').mockResolvedValueOnce(null);

      await expect(service.seed()).rejects.toThrowError(ConflictException);
    });
  });

  describe('create', () => {
    it('should create a new expense with type equal variable and save it', async () => {
      const createDto: CreateExpenseDto = {
        type: NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.type,
        value: NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.value,
        month: EMonth.FEBRUARY,
        group: NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.group.name,
        supplier: NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.supplier.name,
        category: NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.category.name,
        user: NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.user,
        instalment_number:
          NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.instalment_number,
      };

      jest
        .spyOn(expenseGroupService, 'treatExpenseGroupParam')
        .mockResolvedValueOnce(NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.group);

      jest
        .spyOn(supplierService, 'treatSupplierParam')
        .mockResolvedValueOnce(NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.supplier);

      jest.spyOn(repository, 'findOne').mockReturnValueOnce(null);

      jest
        .spyOn(expenseCategoryService, 'treatExpenseCategoryParam')
        .mockResolvedValueOnce(NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.category);

      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE);

      expect(await service.create(createDto)).toEqual(
        NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE,
      );
    });
    it('should create a new expense with type equal fixed and save it', async () => {
      const createDto: CreateExpenseDto = {
        type: GARAGE_MONTE_CARLO_EXPENSE_FIXTURE.type,
        value: GARAGE_MONTE_CARLO_EXPENSE_FIXTURE.value,
        group: GARAGE_MONTE_CARLO_EXPENSE_FIXTURE.group.name,
        supplier: GARAGE_MONTE_CARLO_EXPENSE_FIXTURE.supplier.name,
        category: GARAGE_MONTE_CARLO_EXPENSE_FIXTURE.category.name,
        user: GARAGE_MONTE_CARLO_EXPENSE_FIXTURE.user,
        instalment_number: GARAGE_MONTE_CARLO_EXPENSE_FIXTURE.instalment_number,
      };

      jest
        .spyOn(expenseGroupService, 'treatExpenseGroupParam')
        .mockResolvedValueOnce(GARAGE_MONTE_CARLO_EXPENSE_FIXTURE.group);

      jest
        .spyOn(supplierService, 'treatSupplierParam')
        .mockResolvedValueOnce(GARAGE_MONTE_CARLO_EXPENSE_FIXTURE.supplier);

      jest.spyOn(repository, 'findOne').mockReturnValueOnce(null);

      jest
        .spyOn(expenseCategoryService, 'treatExpenseCategoryParam')
        .mockResolvedValueOnce(GARAGE_MONTE_CARLO_EXPENSE_FIXTURE.category);

      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(GARAGE_MONTE_CARLO_EXPENSE_FIXTURE);

      expect(await service.create(createDto)).toEqual(
        GARAGE_MONTE_CARLO_EXPENSE_FIXTURE,
      );
    });
    it('should create a new expense with instalment number', async () => {
      const createDto: CreateExpenseDto = {
        type: OLD_BIKERS_EXPENSE_FIXTURE.type,
        value: OLD_BIKERS_EXPENSE_FIXTURE.value,
        month: EMonth.JANUARY,
        group: OLD_BIKERS_EXPENSE_FIXTURE.group.name,
        supplier: OLD_BIKERS_EXPENSE_FIXTURE.supplier.name,
        category: OLD_BIKERS_EXPENSE_FIXTURE.category.name,
        user: OLD_BIKERS_EXPENSE_FIXTURE.user,
        instalment_number: OLD_BIKERS_EXPENSE_FIXTURE.instalment_number,
      };

      jest
        .spyOn(expenseGroupService, 'treatExpenseGroupParam')
        .mockResolvedValueOnce(OLD_BIKERS_EXPENSE_FIXTURE.group);

      jest
        .spyOn(supplierService, 'treatSupplierParam')
        .mockResolvedValueOnce(OLD_BIKERS_EXPENSE_FIXTURE.supplier);

      jest.spyOn(repository, 'findOne').mockReturnValueOnce(null);

      jest
        .spyOn(expenseCategoryService, 'treatExpenseCategoryParam')
        .mockResolvedValueOnce(OLD_BIKERS_EXPENSE_FIXTURE.category);

      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(OLD_BIKERS_EXPENSE_FIXTURE);

      expect(await service.create(createDto)).toEqual(
        OLD_BIKERS_EXPENSE_FIXTURE,
      );
    });
    it('must update expense values if expense exists in database', async () => {
      const createDto: CreateExpenseDto = {
        type: NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.type,
        value: NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.value,
        month: EMonth.FEBRUARY,
        group: NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.group.name,
        supplier: NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.supplier.name,
        category: NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.category.name,
        user: NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.user,
        instalment_number:
          NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.instalment_number,
      };

      jest
        .spyOn(expenseGroupService, 'treatExpenseGroupParam')
        .mockResolvedValueOnce(NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.group);

      jest
        .spyOn(supplierService, 'treatSupplierParam')
        .mockResolvedValueOnce(NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.supplier);

      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValueOnce(NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE);

      const expected: Expense = {
        ...NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE,
        february:
          NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.february +
          NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.february,
        total:
          NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.total +
          NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.february,
      };
      jest.spyOn(repository, 'save').mockResolvedValueOnce(expected);

      expect(await service.create(createDto)).toEqual(expected);
    });
  });

  describe('update', () => {
    const updateDto: UpdateExpenseDto = {
      year: NEOENERGIA_ALL_PAYMENT_FIXTURE.year,
      type: NEOENERGIA_ALL_PAYMENT_FIXTURE.type,
      january: NEOENERGIA_ALL_PAYMENT_FIXTURE.january,
      january_paid: NEOENERGIA_ALL_PAYMENT_FIXTURE.january_paid,
      february: NEOENERGIA_ALL_PAYMENT_FIXTURE.february,
      february_paid: NEOENERGIA_ALL_PAYMENT_FIXTURE.february_paid,
      march: NEOENERGIA_ALL_PAYMENT_FIXTURE.march,
      march_paid: NEOENERGIA_ALL_PAYMENT_FIXTURE.march_paid,
      april: NEOENERGIA_ALL_PAYMENT_FIXTURE.april,
      april_paid: NEOENERGIA_ALL_PAYMENT_FIXTURE.april_paid,
      may: NEOENERGIA_ALL_PAYMENT_FIXTURE.may,
      may_paid: NEOENERGIA_ALL_PAYMENT_FIXTURE.may_paid,
      june: NEOENERGIA_ALL_PAYMENT_FIXTURE.june,
      june_paid: NEOENERGIA_ALL_PAYMENT_FIXTURE.june_paid,
      july: NEOENERGIA_ALL_PAYMENT_FIXTURE.july,
      july_paid: NEOENERGIA_ALL_PAYMENT_FIXTURE.july_paid,
      august: NEOENERGIA_ALL_PAYMENT_FIXTURE.august,
      august_paid: NEOENERGIA_ALL_PAYMENT_FIXTURE.august_paid,
      september: NEOENERGIA_ALL_PAYMENT_FIXTURE.september,
      september_paid: NEOENERGIA_ALL_PAYMENT_FIXTURE.september_paid,
      october: NEOENERGIA_ALL_PAYMENT_FIXTURE.october,
      october_paid: NEOENERGIA_ALL_PAYMENT_FIXTURE.october_paid,
      november: NEOENERGIA_ALL_PAYMENT_FIXTURE.november,
      november_paid: NEOENERGIA_ALL_PAYMENT_FIXTURE.november_paid,
      december: NEOENERGIA_ALL_PAYMENT_FIXTURE.december,
      december_paid: NEOENERGIA_ALL_PAYMENT_FIXTURE.december_paid,
      description: NEOENERGIA_ALL_PAYMENT_FIXTURE.description,
      instalment_number: NEOENERGIA_ALL_PAYMENT_FIXTURE.instalment_number,
    };
    it('should update a expense with all fields and save it', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest
          .fn()
          .mockReturnValueOnce(NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE),
      } as any);

      jest
        .spyOn(expenseGroupService, 'treatExpenseGroupParam')
        .mockResolvedValueOnce(OLD_BIKERS_EXPENSE_FIXTURE.group);

      jest
        .spyOn(supplierService, 'treatSupplierParam')
        .mockResolvedValueOnce(NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.supplier);

      jest
        .spyOn(expenseCategoryService, 'treatExpenseCategoryParam')
        .mockResolvedValueOnce(OLD_BIKERS_EXPENSE_FIXTURE.category);

      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(NEOENERGIA_ALL_PAYMENT_FIXTURE);

      expect(
        await service.update(NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.id, {
          ...updateDto,
          user: NEOENERGIA_ALL_PAYMENT_FIXTURE.user,
          group: NEOENERGIA_ALL_PAYMENT_FIXTURE.group.name,
          supplier: NEOENERGIA_ALL_PAYMENT_FIXTURE.supplier.name,
          category: NEOENERGIA_ALL_PAYMENT_FIXTURE.category.name,
        }),
      ).toEqual(NEOENERGIA_ALL_PAYMENT_FIXTURE);
    });

    it('should update a expense without relations fields and save it', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest
          .fn()
          .mockReturnValueOnce(NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE),
      } as any);

      const expected = {
        ...NEOENERGIA_ALL_PAYMENT_FIXTURE,
        group: NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.group,
        category: NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.category,
        supplier: NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.supplier,
        user: NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.user,
      };

      jest.spyOn(repository, 'save').mockResolvedValueOnce(expected);

      expect(
        await service.update(
          NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.id,
          updateDto,
        ),
      ).toEqual(expected);
    });

    it('should return conflict exception because the id is not uuid', async () => {
      await expect(
        service.update(
          NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.group.name,
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
        getOne: jest
          .fn()
          .mockReturnValueOnce(NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE),
      } as any);

      jest.spyOn(repository, 'softRemove').mockResolvedValueOnce({
        ...NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE,
        deleted_at: NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.created_at,
      });

      expect(
        await service.remove(NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.id),
      ).toEqual({
        message: 'Successfully removed',
      });
    });
    it('should return conflict exception because the id is not uuid', async () => {
      await expect(
        service.remove(NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.group.name),
      ).rejects.toThrow(ConflictException);
    });
  });
});
