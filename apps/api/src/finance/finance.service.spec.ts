import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { EXPENSE_LIST_FIXTURE } from '@repo/mock/finance/expense/fixtures/expense';
import { USER_FIXTURE } from '@repo/mock/auth/fixture';

import { FinanceService } from './finance.service';
import { ExpenseService } from './expense/expense.service';

describe('FinanceService', () => {
  let service: FinanceService;
  let expenseService: ExpenseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FinanceService,
        {
          provide: ExpenseService,
          useValue: {
            seed: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    expenseService = module.get<ExpenseService>(ExpenseService);
    service = module.get<FinanceService>(FinanceService);
  });

  it('should be defined', () => {
    expect(expenseService).toBeDefined();
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
