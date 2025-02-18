import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import {
  LIST_EXPENSE_CATEGORY_FIXTURE,
  PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE,
} from '@repo/mock/finance/expense-category/fixtures/expenseCategory';

import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { UpdateExpenseCategoryDto } from './dto/update-expense-category.dto';

import { ExpenseCategoryController } from './expense-category.controller';
import { ExpenseCategoryService } from './expense-category.service';
import { ExpenseCategory } from './expense-category.entity';

describe('ExpenseCategoryController', () => {
  let controller: ExpenseCategoryController;
  let service: ExpenseCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseCategoryController],
      providers: [
        {
          provide: ExpenseCategoryService,
          useValue: {
            list: jest.fn() as jest.Mock,
            findOne: jest.fn() as jest.Mock,
            create: jest.fn() as jest.Mock,
            update: jest.fn() as jest.Mock,
            remove: jest.fn() as jest.Mock,
          },
        },
      ],
    }).compile();

    controller = module.get<ExpenseCategoryController>(
      ExpenseCategoryController,
    );
    service = module.get<ExpenseCategoryService>(ExpenseCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('Should return an list of expense category', async () => {
      jest
        .spyOn(service, 'list')
        .mockResolvedValue(LIST_EXPENSE_CATEGORY_FIXTURE);

      expect(await controller.findAll({})).toEqual(
        LIST_EXPENSE_CATEGORY_FIXTURE,
      );
    });
  });

  describe('create', () => {
    it('should create a new expense category and save it', async () => {
      const createDto: CreateExpenseCategoryDto = {
        name: PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE.name,
        type: PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE.type,
      };

      jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE);

      expect(await controller.create(createDto)).toEqual(
        PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE,
      );
    });
  });

  describe('findOne', () => {
    it('Should return one expense category', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockResolvedValue(PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE);

      expect(
        await controller.findOne(
          PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE.name,
        ),
      ).toEqual(PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE);
    });
  });

  describe('update', () => {
    it('should update a supplier and save it', async () => {
      const updateDto: UpdateExpenseCategoryDto = {
        name: `${PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE.name}2`,
      };

      const expected: ExpenseCategory = {
        id: PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE.id,
        name: `${PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE.name}2`,
        type: PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE.type,
        created_at: PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE.created_at,
        updated_at: PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE.updated_at,
        deleted_at: PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE.deleted_at,
      };

      jest.spyOn(service, 'update').mockResolvedValueOnce(expected);

      expect(
        await controller.update(
          PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE.id,
          updateDto,
        ),
      ).toEqual(expected);
    });
  });

  describe('remove', () => {
    it('should remove Expense Category when there are no associated expenses', async () => {
      jest
        .spyOn(service, 'remove')
        .mockResolvedValueOnce({ message: 'Successfully removed' });

      expect(
        await controller.remove(
          PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE.id,
        ),
      ).toEqual({ message: 'Successfully removed' });
    });
  });
});
