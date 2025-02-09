import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { SupplierService } from './supplier.service';

import { SupplierController } from './supplier.controller';
import { SupplierTypeService } from './supplier-type/supplier-type.service';
import { SupplierCategoryService } from './supplier-category/supplier-category.service';

describe('SupplierController', () => {
  let controller: SupplierController;
  let service: SupplierService;
  let supplierTypeService: SupplierTypeService;
  let supplierCategoryService: SupplierCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplierController],
      providers: [
        {
          provide: SupplierCategoryService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: SupplierTypeService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SupplierController>(SupplierController);
    service = module.get<SupplierService>(SupplierService);
    supplierCategoryService = module.get<SupplierCategoryService>(SupplierCategoryService);
    supplierTypeService = module.get<SupplierTypeService>(SupplierTypeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(supplierCategoryService).toBeDefined();
    expect(supplierTypeService).toBeDefined();
  });
});
