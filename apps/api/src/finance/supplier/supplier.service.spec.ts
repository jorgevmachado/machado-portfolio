import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';

import {
  HOUSING_SUPPLIER_TYPE_FIXTURE,
  SUPPLIER_TYPE_LIST_FIXTURE,
  TRANSPORT_SUPPLIER_TYPE_FIXTURE,
} from '@repo/business/finance/supplier-type/fixtures/supplierType';
import {
  SUPPLIER_LIST_FIXTURE,
  VIVO_HOUSING_SUPPLIER_FIXTURE,
} from '@repo/business/finance/supplier/fixtures/supplier';
import { INGRID_RESIDENTIAL_LIST_FIXTURE } from '@repo/business/finance/expense/fixtures/expense';

import { SupplierTypeService } from './supplier-type/supplier-type.service';

import { Supplier } from './supplier.entity';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

describe('SupplierService', () => {
  let repository: Repository<Supplier>;
  let service: SupplierService;
  let supplierTypeService: SupplierTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupplierService,
        { provide: getRepositoryToken(Supplier), useClass: Repository },
        {
          provide: SupplierTypeService,
          useValue: {
            findOne: jest.fn(),
            seed: jest.fn(),
            treatEntityParam: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<Repository<Supplier>>(getRepositoryToken(Supplier));
    supplierTypeService = module.get<SupplierTypeService>(SupplierTypeService);
    service = module.get<SupplierService>(SupplierService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(supplierTypeService).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('seed', () => {
    it('should seed the database when exist in database', async () => {
      jest
        .spyOn(supplierTypeService, 'seed')
        .mockResolvedValueOnce(SUPPLIER_TYPE_LIST_FIXTURE);

      jest.spyOn(repository, 'find').mockResolvedValueOnce(SUPPLIER_LIST_FIXTURE);

      expect(await service.seed()).toEqual(SUPPLIER_LIST_FIXTURE);
    });
    it('should seed the database when not exist in database', async () => {
      jest
        .spyOn(supplierTypeService, 'seed')
        .mockResolvedValueOnce(SUPPLIER_TYPE_LIST_FIXTURE);

      jest.spyOn(repository, 'find').mockResolvedValueOnce([]);

      SUPPLIER_LIST_FIXTURE.forEach((supplier) => {
        jest.spyOn(supplierTypeService, 'treatEntityParam').mockResolvedValueOnce(supplier.type);
        jest.spyOn(repository, 'save').mockResolvedValueOnce(supplier);
      });
      expect(await service.seed()).toEqual(SUPPLIER_LIST_FIXTURE);
    });
    it('should return conflict Exception because dont exist one SupplierType in dataBase', async () => {
      jest
        .spyOn(supplierTypeService, 'seed')
        .mockResolvedValueOnce(
          SUPPLIER_TYPE_LIST_FIXTURE.filter(
            (type) => type.id !== HOUSING_SUPPLIER_TYPE_FIXTURE.id,
          ),
        );

      jest.spyOn(repository, 'find').mockResolvedValueOnce([]);

      await expect(service.seed()).rejects.toThrowError(ConflictException);
    });
  });

  describe('create', () => {
    it('should create a new supplier with supplier-type object and save it', async () => {
      const createDto: CreateSupplierDto = {
        name: VIVO_HOUSING_SUPPLIER_FIXTURE.name,
        type: VIVO_HOUSING_SUPPLIER_FIXTURE.type,
      };

      jest
        .spyOn(supplierTypeService, 'treatEntityParam')
        .mockResolvedValueOnce(VIVO_HOUSING_SUPPLIER_FIXTURE.type);

      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(VIVO_HOUSING_SUPPLIER_FIXTURE);

      expect(await service.create(createDto)).toEqual(
        VIVO_HOUSING_SUPPLIER_FIXTURE,
      );
    });

    it('should create a new supplier with supplier-type string and save it', async () => {
      const createDto: CreateSupplierDto = {
        name: VIVO_HOUSING_SUPPLIER_FIXTURE.name,
        type: HOUSING_SUPPLIER_TYPE_FIXTURE.name,
      };

      jest
        .spyOn(supplierTypeService, 'treatEntityParam')
        .mockResolvedValueOnce(HOUSING_SUPPLIER_TYPE_FIXTURE);

      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(VIVO_HOUSING_SUPPLIER_FIXTURE);

      expect(await service.create(createDto)).toEqual(
        VIVO_HOUSING_SUPPLIER_FIXTURE,
      );
    });
  });

  describe('update', () => {
    it('should update a supplier and save it', async () => {
      const updateDto: UpdateSupplierDto = {
        name: `${VIVO_HOUSING_SUPPLIER_FIXTURE.name}2`,
        type: TRANSPORT_SUPPLIER_TYPE_FIXTURE,
      };

      const expected: Supplier = {
        id: VIVO_HOUSING_SUPPLIER_FIXTURE.id,
        name: `${VIVO_HOUSING_SUPPLIER_FIXTURE.name}2`,
        type: TRANSPORT_SUPPLIER_TYPE_FIXTURE,
        name_code: `${VIVO_HOUSING_SUPPLIER_FIXTURE.name.toLowerCase()}_2`,
        created_at: VIVO_HOUSING_SUPPLIER_FIXTURE.created_at,
        updated_at: VIVO_HOUSING_SUPPLIER_FIXTURE.updated_at,
        deleted_at: VIVO_HOUSING_SUPPLIER_FIXTURE.deleted_at,
      };

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(VIVO_HOUSING_SUPPLIER_FIXTURE),
      } as any);

      jest
        .spyOn(supplierTypeService, 'treatEntityParam')
        .mockResolvedValueOnce(TRANSPORT_SUPPLIER_TYPE_FIXTURE);

      jest.spyOn(repository, 'save').mockResolvedValueOnce(expected);

      expect(
        await service.update(VIVO_HOUSING_SUPPLIER_FIXTURE.id, updateDto),
      ).toEqual(expected);
    });
    it('should update a supplier without type in request', async () => {
      const updateDto: UpdateSupplierDto = {
        name: `${VIVO_HOUSING_SUPPLIER_FIXTURE.name}2`,
      };

      const expected: Supplier = {
        id: VIVO_HOUSING_SUPPLIER_FIXTURE.id,
        name: `${VIVO_HOUSING_SUPPLIER_FIXTURE.name}2`,
        type: VIVO_HOUSING_SUPPLIER_FIXTURE.type,
        name_code: `${VIVO_HOUSING_SUPPLIER_FIXTURE.name.toLowerCase()}_2`,
        created_at: VIVO_HOUSING_SUPPLIER_FIXTURE.created_at,
        updated_at: VIVO_HOUSING_SUPPLIER_FIXTURE.updated_at,
        deleted_at: VIVO_HOUSING_SUPPLIER_FIXTURE.deleted_at,
      };

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(VIVO_HOUSING_SUPPLIER_FIXTURE),
      } as any);

      jest.spyOn(repository, 'save').mockResolvedValueOnce(expected);

      expect(
        await service.update(VIVO_HOUSING_SUPPLIER_FIXTURE.id, updateDto),
      ).toEqual(expected);
    });
  });

  describe('remove', () => {
    it('should remove Supplier when there are no associated suppliers', async () => {
      const expected: Supplier = {
        ...VIVO_HOUSING_SUPPLIER_FIXTURE,
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
        deleted_at: VIVO_HOUSING_SUPPLIER_FIXTURE.created_at,
      });

      expect(await service.remove(VIVO_HOUSING_SUPPLIER_FIXTURE.id)).toEqual({
        message: 'Successfully removed',
      });
    });

    it('should throw a ConflictException when Supplier is in use', async () => {
      const expected: Supplier = {
        ...VIVO_HOUSING_SUPPLIER_FIXTURE,
        expenses: [INGRID_RESIDENTIAL_LIST_FIXTURE[0]],
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
});
