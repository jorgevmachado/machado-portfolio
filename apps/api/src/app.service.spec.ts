import { Test, TestingModule } from '@nestjs/testing';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { AuthService } from './auth/auth.service';
import { FinanceService } from './finance/finance.service';
import { AppService } from './app.service';
import { USER_FIXTURE } from '@repo/business/auth/fixtures/auth';

describe('AppService', () => {
  let service: AppService;
  let authService: AuthService;
  let financeService: FinanceService;
  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: AuthService,
          useValue: {
            seed: jest.fn(),
          },
        },
        {
          provide: FinanceService,
          useValue: {
            seeds: jest.fn(),
          },
        },
      ],
    }).compile();
    authService = module.get<AuthService>(AuthService);
    financeService = module.get<FinanceService>(FinanceService);
    service = module.get<AppService>(AppService);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(financeService).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('seed', () => {
    it('should seed the database when key is equal to all ', async () => {
      jest.spyOn(authService, 'seed').mockResolvedValueOnce(USER_FIXTURE);
      jest.spyOn(financeService, 'seeds').mockResolvedValueOnce({
        message: 'Seeds executed successfully',
      });
      expect(await service.seed('all')).toEqual({
        message: 'Seeds executed successfully',
      });
    });

    it('should seed the database when key is equal to finance', async () => {
      jest.spyOn(authService, 'seed').mockResolvedValueOnce(USER_FIXTURE);
      jest.spyOn(financeService, 'seeds').mockResolvedValueOnce({
        message: 'Seeds executed successfully',
      });
      expect(await service.seed('finance')).toEqual({
        message: 'Seeds executed successfully',
      });
    });

    it('should seed the database when key is equal to pokemon', async () => {
      jest.spyOn(authService, 'seed').mockResolvedValueOnce(USER_FIXTURE);
      expect(await service.seed('pokemon')).toEqual({
        message: 'Seeds executed successfully',
      });
    });
  });
});