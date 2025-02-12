import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';

import {
  LIST_EXPENSE_CATEGORY_FIXTURE,
  PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE,
} from '@repo/mock/finance/fixtures/expense/category/category';

import {
  CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE,
  LIST_EXPENSE_CATEGORY_TYPE_FIXTURE,
} from '@repo/mock/finance/fixtures/expense/category/type/type';

import { NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE } from '@repo/mock/finance/fixtures/expense/expense';

import { ExpenseCategoryTypeService } from './expense-category-type/expense-category-type.service';

import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';

import { ExpenseCategoryService } from './expense-category.service';
import { ExpenseCategory } from './expense-category.entity';
import { UpdateSupplierDto } from '../../supplier/dto/update-supplier.dto';
import { Supplier } from '../../supplier/supplier.entity';

describe('ExpenseCategoryService', () => {
  let repository: Repository<ExpenseCategory>;
  let expenseCategoryTypeService: ExpenseCategoryTypeService;
  let service: ExpenseCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpenseCategoryService,
        { provide: getRepositoryToken(ExpenseCategory), useClass: Repository },
        {
          provide: ExpenseCategoryTypeService,
          useValue: {
            findOne: jest.fn(),
            seed: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<Repository<ExpenseCategory>>(
      getRepositoryToken(ExpenseCategory),
    );
    expenseCategoryTypeService = module.get<ExpenseCategoryTypeService>(
      ExpenseCategoryTypeService,
    );
    service = module.get<ExpenseCategoryService>(ExpenseCategoryService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(expenseCategoryTypeService).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new expense category with expense category type object and save it', async () => {
      const createDto: CreateExpenseCategoryDto = {
        name: PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE.name,
        type: PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE.type,
      };

      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE);

      expect(await service.create(createDto)).toEqual(
        PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE,
      );
    });

    it('should create a new expense category with expense category type string and save it', async () => {
      const createDto: CreateExpenseCategoryDto = {
        name: PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE.name,
        type: PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE.type.name,
      };

      jest
        .spyOn(expenseCategoryTypeService, 'findOne')
        .mockResolvedValueOnce(
          PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE.type,
        );

      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE);

      expect(await service.create(createDto)).toEqual(
        PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE,
      );
    });

    it('should return error with supplier-type undefined', async () => {
      const createDto: CreateExpenseCategoryDto = {
        name: PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE.name,
        type: undefined,
      };

      await expect(service.create(createDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('update', () => {
    it('should update a expense category and save it', async () => {
      const updateDto: UpdateSupplierDto = {
        name: `${PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE.name}2`,
        type: PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE.type,
      };

      const expected: ExpenseCategory = {
        id: PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE.id,
        name: `${PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE.name}2`,
        type: PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE.type,
        created_at: PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE.created_at,
        updated_at: PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE.updated_at,
        deleted_at: PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE.deleted_at,
      };

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest
          .fn()
          .mockReturnValueOnce(PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE),
      } as any);

      jest.spyOn(repository, 'save').mockResolvedValueOnce(expected);

      expect(
        await service.update(
          PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE.id,
          updateDto,
        ),
      ).toEqual(expected);
    });
    it('should update a expense category without type in request', async () => {
      const updateDto: UpdateSupplierDto = {
        name: `${PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE.name}2`,
      };

      const expected: Supplier = {
        id: PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE.id,
        name: `${PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE.name}2`,
        type: PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE.type,
        created_at: PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE.created_at,
        updated_at: PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE.updated_at,
        deleted_at: PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE.deleted_at,
      };

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest
          .fn()
          .mockReturnValueOnce(PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE),
      } as any);

      jest.spyOn(repository, 'save').mockResolvedValueOnce(expected);

      expect(
        await service.update(
          PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE.id,
          updateDto,
        ),
      ).toEqual(expected);
    });
  });

  describe('remove', () => {
    it('should remove expense category when there are no associated expenses', async () => {
      const expected: Supplier = {
        ...PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE,
        expenses: [],
      };

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(expected),
      } as any);

      jest.spyOn(repository, 'softRemove').mockResolvedValueOnce({
        ...expected,
        deleted_at: PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE.created_at,
      });

      expect(
        await service.remove(PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE.id),
      ).toEqual({
        message: 'Successfully removed',
      });
    });

    it('should throw a ConflictException when Expense Category is in use', async () => {
      const expected: Supplier = {
        ...PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE,
        expenses: [NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE],
      };
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(expected),
      } as any);

      await expect(
        service.remove(PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE.id),
      ).rejects.toThrowError(ConflictException);
    });
  });

  describe('seed', () => {
    it('should seed the database when exist in database', async () => {
      jest
        .spyOn(expenseCategoryTypeService, 'seed')
        .mockResolvedValueOnce(LIST_EXPENSE_CATEGORY_TYPE_FIXTURE);

      LIST_EXPENSE_CATEGORY_FIXTURE.forEach((category) => {
        jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
          andWhere: jest.fn(),
          withDeleted: jest.fn(),
          leftJoinAndSelect: jest.fn(),
          getOne: jest.fn().mockReturnValueOnce(category),
        } as any);
      });

      expect(await service.seed()).toEqual({
        expenseCategoryTypes: LIST_EXPENSE_CATEGORY_TYPE_FIXTURE,
        expenseCategories: LIST_EXPENSE_CATEGORY_FIXTURE,
      });
    });
    it('should seed the database when not exist in database', async () => {
      jest
        .spyOn(expenseCategoryTypeService, 'seed')
        .mockResolvedValueOnce(LIST_EXPENSE_CATEGORY_TYPE_FIXTURE);

      LIST_EXPENSE_CATEGORY_FIXTURE.forEach(() => {
        jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
          andWhere: jest.fn(),
          withDeleted: jest.fn(),
          leftJoinAndSelect: jest.fn(),
          getOne: jest.fn().mockReturnValueOnce(null),
        } as any);
      });

      LIST_EXPENSE_CATEGORY_FIXTURE.forEach((category) => {
        jest.spyOn(repository, 'save').mockResolvedValueOnce(category);
      });
      expect(await service.seed()).toEqual({
        expenseCategoryTypes: LIST_EXPENSE_CATEGORY_TYPE_FIXTURE,
        expenseCategories: LIST_EXPENSE_CATEGORY_FIXTURE,
      });
    });
    it('should return conflict Exception because dont exist one Expense Category type in dataBase', async () => {
      jest
        .spyOn(expenseCategoryTypeService, 'seed')
        .mockResolvedValueOnce(
          LIST_EXPENSE_CATEGORY_TYPE_FIXTURE.filter(
            (type) => type.id !== CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE.id,
          ),
        );

      LIST_EXPENSE_CATEGORY_FIXTURE.forEach(() => {
        jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
          andWhere: jest.fn(),
          withDeleted: jest.fn(),
          leftJoinAndSelect: jest.fn(),
          getOne: jest.fn().mockReturnValueOnce(null),
        } as any);
      });

      await expect(service.seed()).rejects.toThrowError(ConflictException);
    });

    it('should return conflict Exception because dont exist Expense Category type in dataBase', async () => {
      jest
        .spyOn(expenseCategoryTypeService, 'seed')
        .mockResolvedValueOnce(null);

      await expect(service.seed()).rejects.toThrowError(ConflictException);
    });
  });
});
