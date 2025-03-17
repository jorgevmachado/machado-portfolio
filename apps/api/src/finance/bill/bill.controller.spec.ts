import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { USER_ENTITY_FIXTURE } from '@repo/business/auth/fixtures/auth';
import { BILL_LIST_FIXTURE } from '@repo/business/finance/bill/fixtures/bill';

import { BillService } from './bill.service';
import { BillController } from './bill.controller';

describe('BillController', () => {
  let service: BillService;
  let controller: BillController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillController],
      providers: [
        {
          provide: BillService,
          useValue: {
            list: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BillService>(BillService);
    controller = module.get<BillController>(BillController);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('Should return an list of bills', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(BILL_LIST_FIXTURE);

      expect(await controller.findAll(USER_ENTITY_FIXTURE, {})).toEqual(
        BILL_LIST_FIXTURE,
      );
    });
  });

  describe('findOne', () => {
    it('Should return one bill', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(BILL_LIST_FIXTURE[0]);

      expect(await controller.findOne(BILL_LIST_FIXTURE[0].name)).toEqual(
        BILL_LIST_FIXTURE[0],
      );
    });
  });
});
