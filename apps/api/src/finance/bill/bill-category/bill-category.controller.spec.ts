import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import {
  BILL_CATEGORY_LIST_FIXTURE,
  INGRID_RESIDENTIAL_BILL_CATEGORY_FIXTURE,
} from '@repo/business/finance/bill-category/fixtures/billCategory';

import { BillCategoryController } from './bill-category.controller';
import { BillCategoryService } from './bill-category.service';
import { CreateBillCategoryDto } from './dto/create-bill-category.dto';
import { UpdateBillCategoryDto } from './dto/update-bill-category.dto';
import { BillCategory } from './bill-category.entity';

describe('BillCategoryController', () => {
  let controller: BillCategoryController;
  let service: BillCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillCategoryController],
      providers: [
        {
          provide: BillCategoryService,
          useValue: {
            seed: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BillCategoryController>(BillCategoryController);
    service = module.get<BillCategoryService>(BillCategoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('Should return an list of bill categories', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockResolvedValue(BILL_CATEGORY_LIST_FIXTURE);

      expect(await controller.findAll({})).toEqual(BILL_CATEGORY_LIST_FIXTURE);
    });
  });

  describe('create', () => {
    it('should create a new supplierType and save it', async () => {
      const createDto: CreateBillCategoryDto = {
        name: INGRID_RESIDENTIAL_BILL_CATEGORY_FIXTURE.name,
      };

      jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(INGRID_RESIDENTIAL_BILL_CATEGORY_FIXTURE);

      expect(await controller.create(createDto)).toEqual(
        INGRID_RESIDENTIAL_BILL_CATEGORY_FIXTURE,
      );
    });
  });

  describe('findOne', () => {
    it('Should return a bill category', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockResolvedValue(INGRID_RESIDENTIAL_BILL_CATEGORY_FIXTURE);

      expect(
        await controller.findOne(INGRID_RESIDENTIAL_BILL_CATEGORY_FIXTURE.name),
      ).toEqual(INGRID_RESIDENTIAL_BILL_CATEGORY_FIXTURE);
    });
  });

  describe('update', () => {
    it('should update a bill category and save it', async () => {
      const updateDto: UpdateBillCategoryDto = {
        name: `${INGRID_RESIDENTIAL_BILL_CATEGORY_FIXTURE.name}2`,
      };

      const expected: BillCategory = {
        ...INGRID_RESIDENTIAL_BILL_CATEGORY_FIXTURE,
        ...updateDto,
      };

      jest.spyOn(service, 'update').mockResolvedValueOnce(expected);

      expect(
        await controller.update(
          INGRID_RESIDENTIAL_BILL_CATEGORY_FIXTURE.id,
          updateDto,
        ),
      ).toEqual(expected);
    });
  });

  describe('remove', () => {
    it('should remove a bill category when there are no associated bills', async () => {
      jest
        .spyOn(service, 'remove')
        .mockResolvedValueOnce({ message: 'Successfully removed' });

      expect(
        await controller.remove(INGRID_RESIDENTIAL_BILL_CATEGORY_FIXTURE.id),
      ).toEqual({ message: 'Successfully removed' });
    });
  });

  describe('seed', () => {
    it('should seed a list of bill categories', async () => {
      jest
        .spyOn(service, 'seed')
        .mockResolvedValueOnce(BILL_CATEGORY_LIST_FIXTURE);
      expect(await controller.seed()).toEqual(BILL_CATEGORY_LIST_FIXTURE);
    });
  });
});
