import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it } from '@jest/globals';

import { ExpenseCategoryService } from './expense-category.service';

describe('ExpenseCategoryService', () => {
  let service: ExpenseCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseCategoryService],
    }).compile();

    service = module.get<ExpenseCategoryService>(ExpenseCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
