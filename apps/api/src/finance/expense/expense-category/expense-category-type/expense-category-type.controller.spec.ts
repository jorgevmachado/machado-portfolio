import { Test, TestingModule } from '@nestjs/testing';
import {beforeEach, describe, expect, it, jest} from '@jest/globals';

import {
  CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE,
  LIST_EXPENSE_CATEGORY_TYPE_FIXTURE,
} from '@repo/mock/finance/expense-category-type/fixtures/expenseCategoryType';

import { ExpenseCategoryTypeController } from './expense-category-type.controller';
import { ExpenseCategoryTypeService } from './expense-category-type.service';
import {CreateExpenseCategoryTypeDto} from "./dto/create-expense-category-type.dto";
import {UpdateExpenseCategoryTypeDto} from "./dto/update-expense-category-type.dto";
import {ExpenseCategoryType} from "./expense-category-type.entity";


describe('ExpenseCategoryTypeController', () => {
  let controller: ExpenseCategoryTypeController;
  let service: ExpenseCategoryTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseCategoryTypeController],
      providers: [{
        provide: ExpenseCategoryTypeService,
        useValue: {
          list: jest.fn(),
          findOne: jest.fn(),
          create: jest.fn(),
          update: jest.fn(),
          remove: jest.fn(),
        },
      }],
    }).compile();

    controller = module.get<ExpenseCategoryTypeController>(
      ExpenseCategoryTypeController,
    );
    service = module.get<ExpenseCategoryTypeService>(
      ExpenseCategoryTypeService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('Should return an list of expense category type', async () => {
      jest
          .spyOn(service, 'list')
          .mockResolvedValue(LIST_EXPENSE_CATEGORY_TYPE_FIXTURE);

      expect(await controller.findAll({})).toEqual(LIST_EXPENSE_CATEGORY_TYPE_FIXTURE);
    });
  });

  describe('create', () => {
    it('should create a new expense category type and save it', async () => {
      const createDto: CreateExpenseCategoryTypeDto = {
        name: CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE.name,
      };

      jest
          .spyOn(service, 'create')
          .mockResolvedValueOnce(CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE);

      expect(await controller.create(createDto)).toEqual(
          CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE,
      );
    });
  });

  describe('findOne', () => {
    it('Should return an expense category type', async () => {
      jest
          .spyOn(service, 'findOne')
          .mockResolvedValue(CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE);

      expect(
          await controller.findOne(CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE.name),
      ).toEqual(CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE);
    });
  });

  describe('update', () => {
    it('should update a expense category type and save it', async () => {
      const updateDto: UpdateExpenseCategoryTypeDto = {
        name: `${CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE.name}2`,
      };

      const expected: ExpenseCategoryType = {
        ...CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE,
        ...updateDto,
      };

      jest.spyOn(service, 'update').mockResolvedValueOnce(expected);

      expect(
          await controller.update(CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE.id, updateDto),
      ).toEqual(expected);
    });
  });

  describe('remove', () => {
    it('should remove expense category type when there are no associated expense category', async () => {
      jest
          .spyOn(service, 'remove')
          .mockResolvedValueOnce({ message: 'Successfully removed' });

      expect(await controller.remove(CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE.id)).toEqual(
          { message: 'Successfully removed' },
      );
    });
  });
});
