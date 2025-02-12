import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import {
  LIST_SUPPLIER_FIXTURE,
  VIVO_HOUSING_SUPPLIER_FIXTURE,
} from '@repo/mock/finance/fixtures/supplier/supplier';

import { SupplierService } from './supplier.service';

import { SupplierController } from './supplier.controller';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from './supplier.entity';

describe('SupplierController', () => {
  let controller: SupplierController;
  let service: SupplierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplierController],
      providers: [
        {
          provide: SupplierService,
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

    controller = module.get<SupplierController>(SupplierController);
    service = module.get<SupplierService>(SupplierService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('Should return an list of suppliers', async () => {
      jest.spyOn(service, 'list').mockResolvedValue(LIST_SUPPLIER_FIXTURE);

      expect(await controller.findAll({})).toEqual(LIST_SUPPLIER_FIXTURE);
    });
  });

  describe('create', () => {
    it('should create a new supplier and save it', async () => {
      const createDto: CreateSupplierDto = {
        name: VIVO_HOUSING_SUPPLIER_FIXTURE.name,
        type: VIVO_HOUSING_SUPPLIER_FIXTURE.type,
      };

      jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(VIVO_HOUSING_SUPPLIER_FIXTURE);

      expect(await controller.create(createDto)).toEqual(
        VIVO_HOUSING_SUPPLIER_FIXTURE,
      );
    });
  });

  describe('findOne', () => {
    it('Should return one supplier', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockResolvedValue(VIVO_HOUSING_SUPPLIER_FIXTURE);

      expect(
        await controller.findOne(VIVO_HOUSING_SUPPLIER_FIXTURE.name),
      ).toEqual(VIVO_HOUSING_SUPPLIER_FIXTURE);
    });
  });

  describe('update', () => {
    it('should update a supplier and save it', async () => {
      const updateDto: UpdateSupplierDto = {
        name: `${VIVO_HOUSING_SUPPLIER_FIXTURE.name}2`,
      };

      const expected: Supplier = {
        id: VIVO_HOUSING_SUPPLIER_FIXTURE.id,
        name: `${VIVO_HOUSING_SUPPLIER_FIXTURE.name}2`,
        type: VIVO_HOUSING_SUPPLIER_FIXTURE.type,
        created_at: VIVO_HOUSING_SUPPLIER_FIXTURE.created_at,
        updated_at: VIVO_HOUSING_SUPPLIER_FIXTURE.updated_at,
        deleted_at: VIVO_HOUSING_SUPPLIER_FIXTURE.deleted_at,
      };

      jest.spyOn(service, 'update').mockResolvedValueOnce(expected);

      expect(
        await controller.update(VIVO_HOUSING_SUPPLIER_FIXTURE.id, updateDto),
      ).toEqual(expected);
    });
  });

  describe('remove', () => {
    it('should remove Supplier when there are no associated expenses', async () => {
      jest
          .spyOn(service, 'remove')
          .mockResolvedValueOnce({ message: 'Successfully removed' });

      expect(await controller.remove(VIVO_HOUSING_SUPPLIER_FIXTURE.id)).toEqual(
          { message: 'Successfully removed' },
      );
    });
  });
});
