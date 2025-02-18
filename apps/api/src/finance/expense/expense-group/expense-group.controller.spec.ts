import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import {
  LIST_EXPENSE_GROUP_FIXTURE,
  PERSONAL_EXPENSE_GROUP_FIXTURE,
} from '@repo/mock/finance/expense-group/fixtures/expenseGroup';

import { CreateExpenseGroupDto } from './dto/create-expense-group.dto';
import { UpdateExpenseGroupDto } from './dto/update-expense-group.dto';

import { ExpenseGroupController } from './expense-group.controller';
import { ExpenseGroupService } from './expense-group.service';

import { ExpenseGroup } from './expense-group.entity';

describe('ExpenseGroupController', () => {
  let controller: ExpenseGroupController;
  let service: ExpenseGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseGroupController],
      providers: [
        {
          provide: ExpenseGroupService,
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

    controller = module.get<ExpenseGroupController>(ExpenseGroupController);
    service = module.get<ExpenseGroupService>(ExpenseGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('Should return an list of expense group', async () => {
      jest.spyOn(service, 'list').mockResolvedValue(LIST_EXPENSE_GROUP_FIXTURE);

      expect(await controller.findAll({})).toEqual(LIST_EXPENSE_GROUP_FIXTURE);
    });
  });

  describe('create', () => {
    it('should create a new expense group and save it', async () => {
      const createDto: CreateExpenseGroupDto = {
        name: PERSONAL_EXPENSE_GROUP_FIXTURE.name,
      };

      jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(PERSONAL_EXPENSE_GROUP_FIXTURE);

      expect(await controller.create(createDto)).toEqual(
        PERSONAL_EXPENSE_GROUP_FIXTURE,
      );
    });
  });

  describe('findOne', () => {
    it('Should return an expense group', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockResolvedValue(PERSONAL_EXPENSE_GROUP_FIXTURE);

      expect(
        await controller.findOne(PERSONAL_EXPENSE_GROUP_FIXTURE.name),
      ).toEqual(PERSONAL_EXPENSE_GROUP_FIXTURE);
    });
  });

  describe('update', () => {
    it('should update a expense group and save it', async () => {
      const updateDto: UpdateExpenseGroupDto = {
        name: `${PERSONAL_EXPENSE_GROUP_FIXTURE.name}2`,
      };

      const expected: ExpenseGroup = {
        ...PERSONAL_EXPENSE_GROUP_FIXTURE,
        ...updateDto,
      };

      jest.spyOn(service, 'update').mockResolvedValueOnce(expected);

      expect(
        await controller.update(PERSONAL_EXPENSE_GROUP_FIXTURE.id, updateDto),
      ).toEqual(expected);
    });
  });

  describe('remove', () => {
    it('should remove expense group when there are no associated expense', async () => {
      jest
        .spyOn(service, 'remove')
        .mockResolvedValueOnce({ message: 'Successfully removed' });

      expect(
        await controller.remove(PERSONAL_EXPENSE_GROUP_FIXTURE.id),
      ).toEqual({ message: 'Successfully removed' });
    });
  });
});
