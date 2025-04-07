import { Test, TestingModule } from '@nestjs/testing';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SanitizeUserInterceptor } from './interceptors/sanitize-user.interceptor';

describe('AppController', () => {
  let controller: AppController;
  let service: AppService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            seed: jest.fn(),
          },
        },
        { provide: APP_INTERCEPTOR, useClass: SanitizeUserInterceptor },
      ],
    }).compile();

    service = app.get<AppService>(AppService);
    controller = app.get<AppController>(AppController);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('seed', () => {
    it('should initialize seed', async () => {
      jest.spyOn(service, 'seed').mockResolvedValueOnce({
        message: 'Seeds executed successfully',
      });
      expect(await controller.seed({})).toEqual(
        expect.objectContaining({
          message: 'Seeds executed successfully',
        }),
      );
    });
  });
});
