import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { LIST_EXPENSE_CATEGORY_TYPE_FIXTURE } from '@repo/mock/finance/fixtures/expense/category/type/type';
import { LIST_EXPENSE_CATEGORY_FIXTURE } from '@repo/mock/finance/fixtures/expense/category/category';
import { LIST_EXPENSE_GROUP_FIXTURE } from '@repo/mock/finance/fixtures/expense/group/group';

import { ExpenseCategoryService } from './expense-category/expense-category.service';
import { ExpenseGroupService } from './expense-group/expense-group.service';

import { ExpenseService } from './expense.service';
import { Expense } from './expense.entity';


describe('ExpenseService', () => {
  let repository: Repository<Expense>;
  let expenseCategoryService: ExpenseCategoryService;
  let expenseGroupService: ExpenseGroupService;
  let service: ExpenseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpenseService,
        { provide: getRepositoryToken(Expense), useClass: Repository },
        {
          provide: ExpenseCategoryService,
          useValue: {
            seed: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: ExpenseGroupService,
          useValue: {
            seed: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<Repository<Expense>>(getRepositoryToken(Expense));
    expenseCategoryService = module.get<ExpenseCategoryService>(
      ExpenseCategoryService,
    );
    expenseGroupService = module.get<ExpenseGroupService>(ExpenseGroupService);
    service = module.get<ExpenseService>(ExpenseService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(expenseCategoryService).toBeDefined();
    expect(expenseGroupService).toBeDefined();
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
      jest
          .spyOn(expenseGroupService, 'seed')
          .mockResolvedValueOnce(null);

      await expect(service.seed()).rejects.toThrowError(ConflictException);
    });
  });
});
