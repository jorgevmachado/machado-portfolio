import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it } from '@jest/globals';

import { ExpenseCategoryTypeService } from './expense-category-type.service';

describe('ExpenseCategoryTypeService', () => {
  let service: ExpenseCategoryTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseCategoryTypeService],
    }).compile();

    service = module.get<ExpenseCategoryTypeService>(
      ExpenseCategoryTypeService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
