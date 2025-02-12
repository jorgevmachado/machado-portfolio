import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
        { provide: ExpenseCategoryService, useValue: { findOne: jest.fn() } },
        { provide: ExpenseGroupService, useValue: { findOne: jest.fn() } },
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
});
