import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';

import { EXPENSE_LIST_FIXTURE } from '@repo/business/finance/expense/fixtures/expense';

import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import {CreateExpenseDto} from "./dto/create-expense.dto";

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
      jest.spyOn(service, 'list').mockResolvedValue(EXPENSE_LIST_FIXTURE);
      expect(await controller.findAll({})).toEqual(EXPENSE_LIST_FIXTURE);
    });
  });

  describe('findOne', () => {
    it('Should return an expense', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(EXPENSE_LIST_FIXTURE[0]);
      expect(await controller.findOne(EXPENSE_LIST_FIXTURE[0].id)).toEqual(
        EXPENSE_LIST_FIXTURE[0],
      );
    });
  });
  //
  describe('create', () => {
    it('should create a new expense with type equal variable and save it', async () => {
      const createDto: CreateExpenseDto = {
        type: EXPENSE_LIST_FIXTURE[0].type,
        value: EXPENSE_LIST_FIXTURE[0].value,
        month: EXPENSE_LIST_FIXTURE[0].month,
        supplier: EXPENSE_LIST_FIXTURE[0].supplier.name,
        instalment_number:
        EXPENSE_LIST_FIXTURE[0].instalment_number,
      };

      jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(EXPENSE_LIST_FIXTURE[0]);

      expect(
        await controller.create(createDto),
      ).toEqual(EXPENSE_LIST_FIXTURE[0]);
    });
  });
});
