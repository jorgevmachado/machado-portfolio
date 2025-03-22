import { Test, TestingModule } from '@nestjs/testing';
import {afterEach, beforeEach, describe, expect, it, jest} from '@jest/globals';
import {
  HOUSING_SUPPLIER_TYPE_FIXTURE,
  SUPPLIER_TYPE_LIST_FIXTURE,
} from '@repo/business/finance/supplier-type/fixtures/supplierType';

import { SupplierTypeController } from './supplier-type.controller';
import { SupplierTypeService } from './supplier-type.service';
import { CreateSupplierTypeDto } from './dto/create-supplier-type.dto';
import { UpdateSupplierTypeDto } from './dto/update-supplier-type.dto';
import { SupplierType } from './supplierType.entity';

describe('SupplierTypeController', () => {
  let controller: SupplierTypeController;
  let service: SupplierTypeService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplierTypeController],
      providers: [
        {
          provide: SupplierTypeService,
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            findOne: jest.fn(),
            seed: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SupplierTypeController>(SupplierTypeController);
    service = module.get<SupplierTypeService>(SupplierTypeService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('Should return an list of suppliers type', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockResolvedValue(SUPPLIER_TYPE_LIST_FIXTURE);

      expect(await controller.findAll({})).toEqual(SUPPLIER_TYPE_LIST_FIXTURE);
    });
  });

  describe('create', () => {
    it('should create a new supplierType and save it', async () => {
      const createDto: CreateSupplierTypeDto = {
        name: HOUSING_SUPPLIER_TYPE_FIXTURE.name,
      };

      jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(HOUSING_SUPPLIER_TYPE_FIXTURE);

      expect(await controller.create(createDto)).toEqual(
        HOUSING_SUPPLIER_TYPE_FIXTURE,
      );
    });
  });

  describe('findOne', () => {
    it('Should return  suppliers type', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockResolvedValue(HOUSING_SUPPLIER_TYPE_FIXTURE);

      expect(
        await controller.findOne(HOUSING_SUPPLIER_TYPE_FIXTURE.name),
      ).toEqual(HOUSING_SUPPLIER_TYPE_FIXTURE);
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

      jest.spyOn(service, 'update').mockResolvedValueOnce(expected);

      expect(
        await controller.update(HOUSING_SUPPLIER_TYPE_FIXTURE.id, updateDto),
      ).toEqual(expected);
    });
  });

  describe('remove', () => {
    it('should remove SupplierType when there are no associated suppliers', async () => {
      jest
        .spyOn(service, 'remove')
        .mockResolvedValueOnce({ message: 'Successfully removed' });

      expect(await controller.remove(HOUSING_SUPPLIER_TYPE_FIXTURE.id)).toEqual(
        { message: 'Successfully removed' },
      );
    });
  });

  describe('seed', () => {
    it('Should seed an list of suppliers type', async () => {
      jest
          .spyOn(service, 'seed')
          .mockResolvedValue(SUPPLIER_TYPE_LIST_FIXTURE);

      expect(await controller.seed()).toEqual(SUPPLIER_TYPE_LIST_FIXTURE);
    });
  });
});
