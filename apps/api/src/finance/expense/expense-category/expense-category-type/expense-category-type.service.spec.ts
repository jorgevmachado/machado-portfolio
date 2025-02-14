import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';

import {
  CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE,
  LIST_EXPENSE_CATEGORY_TYPE_FIXTURE,
} from '@repo/mock/finance/fixtures/expense-category-type/expenseCategoryType';

import { PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE } from '@repo/mock/finance/fixtures/expense-category/expenseCategory';

import { SupplierType } from '../../../supplier/supplier-type/supplierType.entity';

import { ExpenseCategoryTypeService } from './expense-category-type.service';
import { ExpenseCategoryType } from './expense-category-type.entity';
import { CreateExpenseCategoryTypeDto } from './dto/create-expense-category-type.dto';
import { UpdateExpenseCategoryTypeDto } from './dto/update-expense-category-type.dto';

describe('ExpenseCategoryTypeService', () => {
  let service: ExpenseCategoryTypeService;
  let repository: Repository<ExpenseCategoryType>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpenseCategoryTypeService,
        {
          provide: getRepositoryToken(ExpenseCategoryType),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ExpenseCategoryTypeService>(
      ExpenseCategoryTypeService,
    );
    repository = module.get<Repository<ExpenseCategoryType>>(
      getRepositoryToken(ExpenseCategoryType),
    );
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new expense category type and save it', async () => {
      const createDto: CreateExpenseCategoryTypeDto = {
        name: CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE.name,
      };

      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE);

      expect(await service.create(createDto)).toEqual(
        CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE,
      );
    });
  });

  describe('update', () => {
    it('should update a expense category type and save it', async () => {
      const updateDto: UpdateExpenseCategoryTypeDto = {
        name: `${CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE.name}2`,
      };

      const expected: SupplierType = {
        ...CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE,
        ...updateDto,
      };

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        getOne: jest
          .fn()
          .mockReturnValueOnce(CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE),
      } as any);

      jest.spyOn(repository, 'save').mockResolvedValueOnce(expected);

      expect(
        await service.update(
          CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE.id,
          updateDto,
        ),
      ).toEqual(expected);
    });
  });

  describe('remove', () => {
    it('should remove expense category type when there are no associated expense category', async () => {
      const expected: ExpenseCategoryType = {
        ...CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE,
        categories: [],
      };

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(expected),
      } as any);

      jest.spyOn(repository, 'softRemove').mockResolvedValueOnce({
        ...expected,
        deleted_at: CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE.created_at,
      });

      expect(
        await service.remove(CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE.id),
      ).toEqual({ message: 'Successfully removed' });
    });

    it('should throw a ConflictException when expense category type is in use', async () => {
      const expected: ExpenseCategoryType = {
        ...CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE,
        categories: [PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE],
      };

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(expected),
      } as any);

      await expect(
        service.remove(CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE.id),
      ).rejects.toThrowError(ConflictException);
    });
  });

  describe('seed', () => {
    it('should seed the database when exist in database', async () => {
      LIST_EXPENSE_CATEGORY_TYPE_FIXTURE.forEach((type) => {
        jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
          andWhere: jest.fn(),
          withDeleted: jest.fn(),
          getOne: jest.fn().mockReturnValueOnce(type),
        } as any);
      });

      expect(await service.seed()).toEqual(LIST_EXPENSE_CATEGORY_TYPE_FIXTURE);
    });
    it('should seed the database when not exist in database', async () => {
      LIST_EXPENSE_CATEGORY_TYPE_FIXTURE.forEach(() => {
        jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
          andWhere: jest.fn(),
          withDeleted: jest.fn(),
          getOne: jest.fn().mockReturnValueOnce(null),
        } as any);
      });

      LIST_EXPENSE_CATEGORY_TYPE_FIXTURE.forEach((type) => {
        jest.spyOn(repository, 'save').mockResolvedValueOnce(type);
      });
      expect(await service.seed()).toEqual(LIST_EXPENSE_CATEGORY_TYPE_FIXTURE);
    });
  });

  describe('treatExpenseCategoryTypeParam', () => {
    it('should return expense category type by category type object', async () => {
      expect(await service.treatExpenseCategoryTypeParam(
          CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE,
      )).toEqual(CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE);
    })
  })
});
