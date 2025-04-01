import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';

import { EXPENSE_LIST_FIXTURE } from '@repo/business/finance/expense/fixtures/expense';

import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { EMonth } from '@repo/business/finance/enum';
import { USER_ENTITY_FIXTURE } from '@repo/business/auth/fixtures/auth';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { BILL_LIST_FIXTURE } from '@repo/business/finance/bill/fixtures/bill';
import { User } from '../../../auth/users/user.entity';
import { Expense } from './expense.entity';
import { ConflictException } from '@nestjs/common';

describe('ExpenseController', () => {
  let service: ExpenseService;
  let controller: ExpenseController;

  const user: User = {
    ...USER_ENTITY_FIXTURE,
    finance: {
      ...USER_ENTITY_FIXTURE.finance,
      bills: BILL_LIST_FIXTURE,
    },
  };
  const expense: Expense = EXPENSE_LIST_FIXTURE[0];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseController],
      providers: [
        {
          provide: ExpenseService,
          useValue: {
            findAll: jest.fn(),
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
      jest.spyOn(service, 'findAll').mockResolvedValue(EXPENSE_LIST_FIXTURE);
      expect(await controller.findAll({})).toEqual(EXPENSE_LIST_FIXTURE);
    });
  });

  describe('create', () => {
    it('should create a new expense with type equal variable and save it', async () => {
      const createDto: CreateExpenseDto = {
        type: expense.type,
        bill: expense.bill.id,
        value: 100,
        month: EMonth.FEBRUARY,
        supplier: expense.supplier.name,
        description: expense.description,
        instalment_number: expense.instalment_number,
      };

      jest.spyOn(service, 'create').mockResolvedValueOnce(expense);

      expect(await controller.create(user, createDto)).toEqual(expense);
    });
  });

  describe('update', () => {
    it('should update a expense with type equal variable and save it', async () => {
      const updateDto: UpdateExpenseDto = {
        type: expense.type,
        paid: expense.paid,
        january: expense.january,
        january_paid: expense.january_paid,
        february: expense.february,
        february_paid: expense.february_paid,
        march: expense.march,
        march_paid: expense.march_paid,
        april: expense.april,
        april_paid: expense.april_paid,
        may: expense.may,
        may_paid: expense.may_paid,
        june: expense.june,
        june_paid: expense.june_paid,
        july: expense.july,
        july_paid: expense.july_paid,
        august: expense.august,
        august_paid: expense.august_paid,
        september: expense.september,
        september_paid: expense.september_paid,
        october: expense.october,
        october_paid: expense.october_paid,
        november: expense.november,
        november_paid: expense.november_paid,
        december: expense.december,
        december_paid: expense.december_paid,
        description: expense.description,
        instalment_number: expense.instalment_number,
      };

      jest.spyOn(service, 'update').mockResolvedValueOnce(expense);

      expect(await controller.update(user, expense.id, updateDto)).toEqual(
          expense,
      );
    });
  });

  describe('findOne', () => {
    it('Should return an expense', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(expense);
      expect(await controller.findOne(expense.id)).toEqual(expense);
    });
  });

  describe('remove', () => {
    it('should remove a bill successfully', async () => {
      jest
          .spyOn(service, 'remove')
          .mockResolvedValueOnce({ message: 'Successfully removed' });

      expect(await controller.remove(expense.id)).toEqual({
        message: 'Successfully removed',
      });
    });
  });

  describe('validateFinanceAndBills', () => {
    it('should throw ConflictException when "user.finance" is undefined', () => {
      const user: User = {
        ...USER_ENTITY_FIXTURE,
        finance: undefined,
      };

      expect(() => controller['validateFinanceAndBills'](user)).toThrow(
          ConflictException,
      );
      expect(() => controller['validateFinanceAndBills'](user)).toThrow(
          'Finance is not initialized, please start it to access this feature.',
      );
    });

    it('should throw ConflictException when "user.finance.bills" is undefined', () => {
      const user: User = {
        ...USER_ENTITY_FIXTURE,
      };

      expect(() => controller['validateFinanceAndBills'](user)).toThrow(
          ConflictException,
      );
      expect(() => controller['validateFinanceAndBills'](user)).toThrow(
          'No Bill has been created for this finance item. Please create one to access this feature.',
      );
    });

    it('should not throw any exception when "user.finance" is set', () => {
      expect(() => controller['validateFinanceAndBills'](user)).not.toThrow();
    });
  });
});
