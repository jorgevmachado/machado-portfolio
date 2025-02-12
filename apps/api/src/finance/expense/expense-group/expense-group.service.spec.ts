import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';

import {
  LIST_EXPENSE_GROUP_FIXTURE,
  PERSONAL_EXPENSE_GROUP_FIXTURE
} from '@repo/mock/finance/fixtures/expense/group/group';
import { NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE } from '@repo/mock/finance/fixtures/expense/expense';

import { CreateExpenseGroupDto } from './dto/create-expense-group.dto';
import { UpdateExpenseGroupDto } from './dto/update-expense-group.dto';

import { ExpenseGroup } from './expense-group.entity';
import { ExpenseGroupService } from './expense-group.service';

describe('ExpenseGroupService', () => {
  let repository: Repository<ExpenseGroup>;
  let service: ExpenseGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpenseGroupService,
        { provide: getRepositoryToken(ExpenseGroup), useClass: Repository },
      ],
    }).compile();

    repository = module.get<Repository<ExpenseGroup>>(
      getRepositoryToken(ExpenseGroup),
    );
    service = module.get<ExpenseGroupService>(ExpenseGroupService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new expense group and save it', async () => {
      const createDto: CreateExpenseGroupDto = {
        name: PERSONAL_EXPENSE_GROUP_FIXTURE.name,
      };

      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(PERSONAL_EXPENSE_GROUP_FIXTURE);

      expect(await service.create(createDto)).toEqual(
        PERSONAL_EXPENSE_GROUP_FIXTURE,
      );
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

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(PERSONAL_EXPENSE_GROUP_FIXTURE),
      } as any);

      jest.spyOn(repository, 'save').mockResolvedValueOnce(expected);

      expect(
        await service.update(PERSONAL_EXPENSE_GROUP_FIXTURE.id, updateDto),
      ).toEqual(expected);
    });
  });

  describe('remove', () => {
    it('should remove expense group when there are no associated expense', async () => {
      const expected: ExpenseGroup = {
        ...PERSONAL_EXPENSE_GROUP_FIXTURE,
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
        deleted_at: PERSONAL_EXPENSE_GROUP_FIXTURE.created_at,
      });

      expect(await service.remove(PERSONAL_EXPENSE_GROUP_FIXTURE.id)).toEqual({
        message: 'Successfully removed',
      });
    });

    it('should throw a ConflictException when expense group is in use', async () => {
      const expected: ExpenseGroup = {
        ...PERSONAL_EXPENSE_GROUP_FIXTURE,
        expenses: [NEOENERGIA_MONTE_CARLO_EXPENSE_FIXTURE],
      };

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(expected),
      } as any);

      await expect(
        service.remove(PERSONAL_EXPENSE_GROUP_FIXTURE.id),
      ).rejects.toThrowError(ConflictException);
    });
  });

  describe('seed', () => {
    it('should seed the database when exist in database', async () => {
      LIST_EXPENSE_GROUP_FIXTURE.forEach((group) => {
        jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
          andWhere: jest.fn(),
          withDeleted: jest.fn(),
          getOne: jest.fn().mockReturnValueOnce(group),
        } as any);
      });

      expect(await service.seed()).toEqual(LIST_EXPENSE_GROUP_FIXTURE);
    });
    it('should seed the database when not exist in database', async () => {
      LIST_EXPENSE_GROUP_FIXTURE.forEach(() => {
        jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
          andWhere: jest.fn(),
          withDeleted: jest.fn(),
          getOne: jest.fn().mockReturnValueOnce(null),
        } as any);
      });

      LIST_EXPENSE_GROUP_FIXTURE.forEach((group) => {
        jest.spyOn(repository, 'save').mockResolvedValueOnce(group);
      });
      expect(await service.seed()).toEqual(LIST_EXPENSE_GROUP_FIXTURE);
    });
  });
});
