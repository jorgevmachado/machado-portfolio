import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { EXPENSE_LIST_FIXTURE } from '@repo/mock/finance/expense/fixtures/expense';
import { USER_FIXTURE } from '@repo/mock/auth/fixture';

import { FinanceService } from './finance.service';
import { ExpenseService } from './expense/expense.service';
import { SupplierService } from './supplier/supplier.service';
import { BankService } from './bank/bank.service';
import { BillService } from './bill/bill.service';

describe('FinanceService', () => {
  let service: FinanceService;
  let supplierService: SupplierService;
  let bankService: BankService;
  let billService: BillService;
  let expenseService: ExpenseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FinanceService,
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
          },
        },
      ],
    }).compile();

    supplierService = module.get<SupplierService>(SupplierService);
    bankService = module.get<BankService>(BankService);
    expenseService = module.get<ExpenseService>(ExpenseService);
    billService = module.get<BillService>(BillService);
    service = module.get<FinanceService>(FinanceService);
  });

  it('should be defined', () => {
    expect(supplierService).toBeDefined();
    expect(bankService).toBeDefined();
    expect(expenseService).toBeDefined();
    expect(billService).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('seeds', () => {
    it('should seed the database ', async () => {
      jest
        .spyOn(expenseService, 'seed')
        .mockResolvedValueOnce(EXPENSE_LIST_FIXTURE);

      expect(await service.seeds(USER_FIXTURE)).toEqual({
        message: 'Seeds executed successfully',
      });
    });
  });
});
