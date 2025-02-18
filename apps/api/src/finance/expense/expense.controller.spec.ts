import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';

import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';

import { NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE } from '@repo/mock/finance/expense/fixtures/expense';

describe('ExpenseController', () => {
  let service: ExpenseService;
  let controller: ExpenseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseController],
      providers: [
        {
          provide: ExpenseService,
          useValue: {
            list: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ExpenseService>(ExpenseService);
    controller = module.get<ExpenseController>(ExpenseController);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('Should return an list of expense', async () => {
      jest
        .spyOn(service, 'list')
        .mockResolvedValue([NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE]);
      expect(await controller.findAll({})).toEqual([
        NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE,
      ]);
    });
  });

  describe('findOne', () => {
    it('Should return an expense', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockResolvedValue(NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE);
      expect(
        await controller.findOne(NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.id),
      ).toEqual(NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE);
    });
  });

  describe('create', () => {
    it('should create a new expense with type equal variable and save it', async () => {
      const createDto: CreateExpenseDto = {
        type: NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.type,
        value: NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.value,
        month: NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.month,
        group: NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.group.name,
        supplier: NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.supplier.name,
        category: NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.category.name,
        user: NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.user,
        instalment_number:
          NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.instalment_number,
      };

      jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE);

      expect(
        await controller.create(
          NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE.user,
          createDto,
        ),
      ).toEqual(NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE);
    });
  });
});
