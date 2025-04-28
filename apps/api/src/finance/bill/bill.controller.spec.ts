import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { EMonth } from '@repo/services/month/enum';

import { USER_ENTITY_FIXTURE } from '@repo/business/auth/fixtures/auth';
import { BILL_LIST_FIXTURE } from '@repo/business/finance/bill/fixtures/bill';
import {
  EXPENSE_LIST_FIXTURE,
  INGRID_RESIDENTIAL_LIST_FIXTURE,
} from '@repo/business/finance/expense/fixtures/expense';

import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { Bill } from './bill.entity';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update.bill.dto';
import { CreateExpenseDto } from './expense/dto/create-expense.dto';
import { Expense } from './expense/expense.entity';
import { UpdateExpenseDto } from './expense/dto/update-expense.dto';

describe('BillController', () => {
  const expense: Expense = EXPENSE_LIST_FIXTURE[0];
  const bill: Bill = BILL_LIST_FIXTURE[0];
  let service: BillService;
  let controller: BillController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillController],
      providers: [
        {
          provide: BillService,
          useValue: {
            list: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            findOne: jest.fn(),
            findAllBills: jest.fn(),
            addExpense: jest.fn(),
            updateExpense: jest.fn(),
            removeExpense: jest.fn(),
            findOneExpense: jest.fn(),
            findAllExpense: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BillService>(BillService);
    controller = module.get<BillController>(BillController);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('Should return an list of bills', async () => {
      jest.spyOn(service, 'findAllBills').mockResolvedValue(BILL_LIST_FIXTURE);

      expect(await controller.findAll(USER_ENTITY_FIXTURE, {})).toEqual(
        BILL_LIST_FIXTURE,
      );
    });
  });

  describe('create', () => {
    it('should create a new bill and save it', async () => {
      const bill: Bill = BILL_LIST_FIXTURE[0];
      const createBill: CreateBillDto = {
        type: bill.type,
        year: bill.year,
        bank: bill.bank.name,
        category: bill.category.name,
      };
      jest.spyOn(service, 'create').mockResolvedValue(bill);

      expect(await controller.create(USER_ENTITY_FIXTURE, createBill)).toEqual(
        bill,
      );
    });
  });

  describe('update', () => {
    it('should update a bill and save it', async () => {
      const bill: Bill = {
        ...BILL_LIST_FIXTURE[0],
        expenses: INGRID_RESIDENTIAL_LIST_FIXTURE,
      };
      const updateBill: UpdateBillDto = {
        type: bill.type,
        bank: bill.bank.name,
        category: bill.category.name,
        expenses: INGRID_RESIDENTIAL_LIST_FIXTURE,
      };
      jest.spyOn(service, 'update').mockResolvedValue(bill);

      expect(
        await controller.update(USER_ENTITY_FIXTURE, bill.id, updateBill),
      ).toEqual(bill);
    });
  });

  describe('findOne', () => {
    it('Should return one bill', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(BILL_LIST_FIXTURE[0]);

      expect(await controller.findOne(BILL_LIST_FIXTURE[0].name)).toEqual(
        BILL_LIST_FIXTURE[0],
      );
    });
  });

  describe('remove', () => {
    it('should remove a bill successfully', async () => {
      const bill: Bill = BILL_LIST_FIXTURE[0];
      jest
        .spyOn(service, 'remove')
        .mockResolvedValueOnce({ message: 'Successfully removed' });

      expect(await controller.remove(bill.id)).toEqual({
        message: 'Successfully removed',
      });
    });
  });

  describe('createExpense', () => {
    it('should create a new expense and save it', async () => {
      const createExpense: CreateExpenseDto = {
        type: expense.type,
        value: 100.0,
        month: EMonth.MARCH,
        supplier: expense.supplier.name,
        instalment_number: 1,
      };
      jest.spyOn(service, 'createExpense').mockResolvedValue(expense);

      expect(await controller.addExpense(bill.id, createExpense)).toEqual(
        expense,
      );
    });
  });

  describe('updateExpense', () => {
    it('should update expense and save it', async () => {
      const updateExpense: UpdateExpenseDto = {
        type: expense.type,
        supplier: expense.supplier.name,
      };
      jest.spyOn(service, 'updateExpense').mockResolvedValue(expense);

      expect(
        await controller.updateExpense(bill.id, expense.id, updateExpense),
      ).toEqual(expense);
    });
  });

  describe('findOneExpense', () => {
    it('should find one expense by id', async () => {
      jest.spyOn(service, 'findOneExpense').mockResolvedValue(expense);

      expect(await controller.findOneExpense(bill.id, expense.id)).toEqual(
        expense,
      );
    });
  });

  describe('findAllExpense', () => {
    it('should find a list of expense by bill', async () => {
      jest.spyOn(service, 'findAllExpense').mockResolvedValue([expense]);

      expect(await controller.findAllExpense(bill.id, {})).toEqual([expense]);
    });
  });

  describe('removeExpense', () => {
    it('should remove one expense by id', async () => {
      jest.spyOn(service, 'removeExpense').mockResolvedValue({
        message: 'Successfully removed',
      });

      expect(await controller.removeExpense(bill.id, expense.id)).toEqual({
        message: 'Successfully removed',
      });
    });
  });
});
