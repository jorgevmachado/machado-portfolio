import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { FinanceController } from './finance.controller';
import { FinanceService } from './finance.service';
import { USER_FIXTURE } from '@repo/mock/auth/fixture';

describe('FinanceController', () => {
  let service: FinanceService;
  let controller: FinanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinanceController],
      providers: [
        {
          provide: FinanceService,
          useValue: {
            list: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            seeds: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FinanceService>(FinanceService);
    controller = module.get<FinanceController>(FinanceController);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
  });

  describe('seeds', () => {
    it('should seed the database ', async () => {
      jest.spyOn(service, 'seeds').mockResolvedValueOnce({
        message: 'Seeds executed successfully',
      });

      expect(await controller.seeds(USER_FIXTURE)).toEqual({
        message: 'Seeds executed successfully',
      });
    });
  });
});
