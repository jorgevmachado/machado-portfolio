import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it } from '@jest/globals';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ExpenseGroup } from './expense-group.entity';

import { ExpenseGroupService } from './expense-group.service';

describe('ExpenseGroupService', () => {
  let repository: Repository<ExpenseGroup>;
  let service: ExpenseGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpenseGroupService,
        { provide: getRepositoryToken(ExpenseGroup), useClass: Repository },
      ],
    }).compile();

    repository = module.get<Repository<ExpenseGroup>>(
      getRepositoryToken(ExpenseGroup),
    );
    service = module.get<ExpenseGroupService>(ExpenseGroupService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(service).toBeDefined();
  });
});
