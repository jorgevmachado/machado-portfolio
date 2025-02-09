import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { SupplierTypeController } from './supplier-type.controller';
import { SupplierTypeService } from './supplier-type.service';

describe('SupplierTypeController', () => {
  let controller: SupplierTypeController;
  let service: SupplierTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplierTypeController],
      providers: [
        {
          provide: SupplierTypeService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SupplierTypeController>(SupplierTypeController);
    service = module.get<SupplierTypeService>(SupplierTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
  });
});
