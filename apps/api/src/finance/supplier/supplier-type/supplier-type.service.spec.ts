import { Test, TestingModule } from '@nestjs/testing';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';

import {
  HOUSING_SUPPLIER_TYPE_FIXTURE,
  SUPPLIER_TYPE_LIST_FIXTURE,
} from '@repo/business/finance/supplier-type/fixtures/supplierType';

import { VIVO_HOUSING_SUPPLIER_FIXTURE } from '@repo/business/finance/supplier/fixtures/supplier';

import { CreateSupplierTypeDto } from './dto/create-supplier-type.dto';

import { SupplierTypeService } from './supplier-type.service';
import { SupplierType } from './supplierType.entity';
import { UpdateSupplierTypeDto } from './dto/update-supplier-type.dto';

describe('SupplierTypeService', () => {
  let service: SupplierTypeService;
  let repository: Repository<SupplierType>;

  beforeEach(async () => {
    jest.restoreAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupplierTypeService,
        { provide: getRepositoryToken(SupplierType), useClass: Repository },
      ],
    }).compile();

    service = module.get<SupplierTypeService>(SupplierTypeService);
    repository = module.get<Repository<SupplierType>>(
      getRepositoryToken(SupplierType),
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a new supplierType and save it', async () => {
      const createDto: CreateSupplierTypeDto = {
        name: HOUSING_SUPPLIER_TYPE_FIXTURE.name,
      };

      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(HOUSING_SUPPLIER_TYPE_FIXTURE);

      expect(await service.create(createDto)).toEqual(
        HOUSING_SUPPLIER_TYPE_FIXTURE,
      );
    });
  });

  describe('update', () => {
    it('should update a supplierType and save it', async () => {
      const updateDto: UpdateSupplierTypeDto = {
        name: `${HOUSING_SUPPLIER_TYPE_FIXTURE.name}2`,
      };

      const expected: SupplierType = {
        ...HOUSING_SUPPLIER_TYPE_FIXTURE,
        ...updateDto,
      };

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(HOUSING_SUPPLIER_TYPE_FIXTURE),
      } as any);

      jest.spyOn(repository, 'save').mockResolvedValueOnce(expected);

      expect(
        await service.update(HOUSING_SUPPLIER_TYPE_FIXTURE.id, updateDto),
      ).toEqual(expected);
    });
  });

  describe('remove', () => {
    it('should remove SupplierType when there are no associated suppliers', async () => {
      const expected: SupplierType = {
        ...HOUSING_SUPPLIER_TYPE_FIXTURE,
        suppliers: [],
      };

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(expected),
      } as any);

      jest.spyOn(repository, 'softRemove').mockResolvedValueOnce({
        ...expected,
        deleted_at: HOUSING_SUPPLIER_TYPE_FIXTURE.created_at,
      });

      expect(await service.remove(HOUSING_SUPPLIER_TYPE_FIXTURE.id)).toEqual({
        message: 'Successfully removed',
      });
    });

    it('should throw a ConflictException when SupplierType is in use', async () => {
      const expected: SupplierType = {
        ...HOUSING_SUPPLIER_TYPE_FIXTURE,
        suppliers: [VIVO_HOUSING_SUPPLIER_FIXTURE],
      };

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(expected),
      } as any);

      await expect(
        service.remove(HOUSING_SUPPLIER_TYPE_FIXTURE.id),
      ).rejects.toThrowError(ConflictException);
    });
  });

  describe('seed', () => {
    it('should seed the database when exist in database', async () => {
      jest
        .spyOn(repository, 'find')
        .mockResolvedValueOnce(SUPPLIER_TYPE_LIST_FIXTURE);

      expect(await service.seed()).toEqual(SUPPLIER_TYPE_LIST_FIXTURE);
    });
    it('should seed the database when not exist in database', async () => {
      jest.spyOn(repository, 'find').mockResolvedValueOnce([]);

      SUPPLIER_TYPE_LIST_FIXTURE.forEach((type) => {
        jest.spyOn(repository, 'save').mockResolvedValueOnce(type);
      });
      expect(await service.seed()).toEqual(SUPPLIER_TYPE_LIST_FIXTURE);
    });
  });
});
