import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';

import {
  BILL_CATEGORY_LIST_FIXTURE,
  INGRID_RESIDENTIAL_BILL_CATEGORY_FIXTURE,
} from '@repo/business/finance/bill-category/fixtures/billCategory';
import { BILL_LIST_FIXTURE } from '@repo/business/finance/bill/fixtures/bill';

import { BillCategoryService } from './bill-category.service';
import { BillCategory } from './bill-category.entity';
import { CreateBillCategoryDto } from './dto/create-bill-category.dto';
import { UpdateBillCategoryDto } from './dto/update-bill-category.dto';

describe('BillCategoryService', () => {
  let repository: Repository<BillCategory>;
  let service: BillCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BillCategoryService,
        { provide: getRepositoryToken(BillCategory), useClass: Repository },
      ],
    }).compile();

    service = module.get<BillCategoryService>(BillCategoryService);
    repository = module.get<Repository<BillCategory>>(
      getRepositoryToken(BillCategory),
    );
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new billCategory and save it', async () => {
      const createDto: CreateBillCategoryDto = {
        name: INGRID_RESIDENTIAL_BILL_CATEGORY_FIXTURE.name,
      };

      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(INGRID_RESIDENTIAL_BILL_CATEGORY_FIXTURE);

      expect(await service.create(createDto)).toEqual(
        INGRID_RESIDENTIAL_BILL_CATEGORY_FIXTURE,
      );
    });
  });

  describe('update', () => {
    it('should update a billCategory and save it', async () => {
      const updateDto: UpdateBillCategoryDto = {
        name: `${INGRID_RESIDENTIAL_BILL_CATEGORY_FIXTURE.name}2`,
      };

      const expected: BillCategory = {
        ...INGRID_RESIDENTIAL_BILL_CATEGORY_FIXTURE,
        ...updateDto,
      };

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        getOne: jest
          .fn()
          .mockReturnValueOnce(INGRID_RESIDENTIAL_BILL_CATEGORY_FIXTURE),
      } as any);

      jest.spyOn(repository, 'save').mockResolvedValueOnce(expected);

      expect(
        await service.update(
          INGRID_RESIDENTIAL_BILL_CATEGORY_FIXTURE.id,
          updateDto,
        ),
      ).toEqual(expected);
    });
  });

  describe('remove', () => {
    it('should remove billCategory when there are no associated bills', async () => {
      const expected: BillCategory = {
        ...INGRID_RESIDENTIAL_BILL_CATEGORY_FIXTURE,
        bills: [],
      };

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(expected),
      } as any);

      jest.spyOn(repository, 'softRemove').mockResolvedValueOnce({
        ...expected,
        deleted_at: INGRID_RESIDENTIAL_BILL_CATEGORY_FIXTURE.created_at,
      });

      expect(
        await service.remove(INGRID_RESIDENTIAL_BILL_CATEGORY_FIXTURE.id),
      ).toEqual({
        message: 'Successfully removed',
      });
    });

    it('should throw a ConflictException when billCategory is in use', async () => {
      const expected: BillCategory = {
        ...INGRID_RESIDENTIAL_BILL_CATEGORY_FIXTURE,
        bills: BILL_LIST_FIXTURE,
      };

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(expected),
      } as any);

      await expect(
        service.remove(INGRID_RESIDENTIAL_BILL_CATEGORY_FIXTURE.id),
      ).rejects.toThrowError(ConflictException);
    });
  });

  describe('seed', () => {
    it('should seed the database when exist in database', async () => {
      jest
        .spyOn(repository, 'find')
        .mockResolvedValueOnce(BILL_CATEGORY_LIST_FIXTURE);

      expect(await service.seed()).toEqual(BILL_CATEGORY_LIST_FIXTURE);
    });
    it('should seed the database when not exist in database', async () => {
      jest.spyOn(repository, 'find').mockResolvedValueOnce([]);

      BILL_CATEGORY_LIST_FIXTURE.forEach((type) => {
        jest.spyOn(repository, 'save').mockResolvedValueOnce(type);
      });
      expect(await service.seed()).toEqual(BILL_CATEGORY_LIST_FIXTURE);
    });
  });

  describe('treatBillCategoryParam', () => {
    it('should return bill category by bill object', async () => {
      expect(
        await service.treatBillCategoryParam(
          INGRID_RESIDENTIAL_BILL_CATEGORY_FIXTURE,
        ),
      ).toEqual(INGRID_RESIDENTIAL_BILL_CATEGORY_FIXTURE);
    });
  });
});
