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
            seed: jest.fn(),
            seeds: jest.fn(),
            basicSeeds: jest.fn(),
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

  describe('seed', () => {
    it('should seed the database finance', async () => {
      jest.spyOn(service, 'seed').mockResolvedValueOnce({
        message: `Seeding Finance Completed Successfully!`,
      });

      expect(await controller.seed(USER_FIXTURE)).toEqual({
        message: `Seeding Finance Completed Successfully!`,
      });
    });
  });

  describe('seeds', () => {
    it('should seeds the database finance, suppliers, supplier types, banks, bill categories, bills and expenses', async () => {
      jest.spyOn(service, 'seeds').mockResolvedValueOnce({
        message: 'Seeds executed successfully',
      });

      expect(await controller.seeds(USER_FIXTURE)).toEqual({
        message: 'Seeds executed successfully',
      });
    });
  });

  describe('seedsBasic', () => {
    it('should seeds the database suppliers, supplier types, banks and bill categories', async () => {
      jest.spyOn(service, 'basicSeeds').mockResolvedValueOnce({
        message:
          'Seeding suppliers , banks and Bill Categories  Completed Successfully!',
      });

      expect(await controller.seedBasic(USER_FIXTURE)).toEqual({
        message:
          'Seeding suppliers , banks and Bill Categories  Completed Successfully!',
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
