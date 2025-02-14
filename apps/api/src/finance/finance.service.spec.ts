import { Test, TestingModule } from '@nestjs/testing';
import { FinanceService } from './finance.service';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { SupplierService } from './supplier/supplier.service';
import { ExpenseService } from './expense/expense.service';

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
});
