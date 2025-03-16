import { Test, TestingModule } from '@nestjs/testing';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { USER_FIXTURE } from '@repo/business/auth/fixtures/auth';

import { FinanceController } from './finance.controller';
import { FinanceService } from './finance.service';
import { FINANCE_FIXTURE } from '@repo/business/finance/fixtures/finance';

describe('FinanceController', () => {
  let service: FinanceService;
  let controller: FinanceController;

  beforeEach(async () => {
    jest.clearAllMocks();
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
            initializeFinance: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FinanceService>(FinanceService);
    controller = module.get<FinanceController>(FinanceController);
  });

  afterEach(() => {
    jest.restoreAllMocks();
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

  describe('initialize', () => {
    it('should initialize the database ', async () => {
      jest
        .spyOn(service, 'initializeFinance')
        .mockResolvedValueOnce(FINANCE_FIXTURE);
      expect(await controller.initialize(USER_FIXTURE)).toEqual(
        FINANCE_FIXTURE,
      );
    });
  });
});
