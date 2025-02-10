import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { ExpenseCategoryController } from './expense-category.controller';
import { ExpenseCategoryService } from './expense-category.service';

describe('ExpenseCategoryController', () => {
  let controller: ExpenseCategoryController;
  let service: ExpenseCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseCategoryController],
      providers: [
        {
          provide: ExpenseCategoryService,
          useValue: {
            findAll: jest.fn() as jest.Mock,
            findOne: jest.fn() as jest.Mock,
            create: jest.fn() as jest.Mock,
            update: jest.fn() as jest.Mock,
            remove: jest.fn() as jest.Mock,
          },
        },
      ],
    }).compile();

    controller = module.get<ExpenseCategoryController>(
      ExpenseCategoryController,
    );
    service = module.get<ExpenseCategoryService>(ExpenseCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
  });
});
