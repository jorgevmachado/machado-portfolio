import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { ExpenseGroupController } from './expense-group.controller';
import { ExpenseGroupService } from './expense-group.service';

describe('ExpenseGroupController', () => {
  let controller: ExpenseGroupController;
  let service: ExpenseGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseGroupController],
      providers: [
        {
          provide: ExpenseGroupService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ExpenseGroupController>(ExpenseGroupController);
    service = module.get<ExpenseGroupService>(ExpenseGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
  });
});
