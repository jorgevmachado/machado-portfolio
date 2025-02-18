import { Test, TestingModule } from '@nestjs/testing';
import { FinanceService } from './finance.service';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { SupplierService } from './supplier/supplier.service';
import { ExpenseService } from './expense/expense.service';

import { LIST_SUPPLIER_TYPE_FIXTURE } from '@repo/mock/finance/supplier-type/fixtures/supplierType';

import { LIST_SUPPLIER_FIXTURE } from '@repo/mock/finance/supplier/fixtures/supplier';

import { LIST_EXPENSE_CATEGORY_TYPE_FIXTURE } from '@repo/mock/finance/expense-category-type/fixtures/expenseCategoryType';

import { LIST_EXPENSE_CATEGORY_FIXTURE } from '@repo/mock/finance/expense-category/fixtures/expenseCategory';

import { LIST_EXPENSE_GROUP_FIXTURE } from '@repo/mock/finance/expense-group/fixtures/expenseGroup';

describe('FinanceService', () => {
  let service: FinanceService;
  let supplierService: SupplierService;
  let expenseService: ExpenseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FinanceService,
        {
          provide: SupplierService,
          useValue: {
            seed: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: ExpenseService,
          useValue: {
            seed: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    supplierService = module.get<SupplierService>(SupplierService);
    expenseService = module.get<ExpenseService>(ExpenseService);
    service = module.get<FinanceService>(FinanceService);
  });

  it('should be defined', () => {
    expect(supplierService).toBeDefined();
    expect(expenseService).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('seeds', () => {
    it('should seed the database ', async () => {
      jest.spyOn(supplierService, 'seed').mockResolvedValueOnce({
        supplierTypes: LIST_SUPPLIER_TYPE_FIXTURE,
        suppliers: LIST_SUPPLIER_FIXTURE,
      });

      jest.spyOn(expenseService, 'seed').mockResolvedValueOnce({
        expenseCategoryTypes: LIST_EXPENSE_CATEGORY_TYPE_FIXTURE,
        expenseCategories: LIST_EXPENSE_CATEGORY_FIXTURE,
        expenseGroups: LIST_EXPENSE_GROUP_FIXTURE,
      });

      expect(await service.seeds()).toEqual({
        message: 'Seeds executed successfully',
      });
    });
  });
});
