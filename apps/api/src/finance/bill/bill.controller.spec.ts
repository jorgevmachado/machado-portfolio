import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { ConflictException } from '@nestjs/common';

import { USER_ENTITY_FIXTURE } from '@repo/business/auth/fixtures/auth';
import { BILL_LIST_FIXTURE } from '@repo/business/finance/bill/fixtures/bill';
import { INGRID_RESIDENTIAL_LIST_FIXTURE } from '@repo/business/finance/expense/fixtures/expense';

import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { Bill } from './bill.entity';
import { User } from '../../auth/users/user.entity';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update.bill.dto';

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
            findAllBills: jest.fn(),
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
      jest.spyOn(service, 'findAllBills').mockResolvedValue(BILL_LIST_FIXTURE);

      expect(await controller.findAll(USER_ENTITY_FIXTURE, {})).toEqual(
        BILL_LIST_FIXTURE,
      );
    });
  });

  describe('create', () => {
    it('should create a new bill and save it', async () => {
      const bill: Bill = BILL_LIST_FIXTURE[0];
      const createBill: CreateBillDto = {
        type: bill.type,
        year: bill.year,
        bank: bill.bank.name,
        category: bill.category.name,
      };
      jest.spyOn(service, 'create').mockResolvedValue(bill);

      expect(await controller.create(USER_ENTITY_FIXTURE, createBill)).toEqual(
        bill,
      );
    });
  });

  describe('update', () => {
    it('should update a bill and save it', async () => {
      const bill: Bill = {
        ...BILL_LIST_FIXTURE[0],
        expenses: INGRID_RESIDENTIAL_LIST_FIXTURE,
      };
      const updateBill: UpdateBillDto = {
        type: bill.type,
        bank: bill.bank.name,
        category: bill.category.name,
        expenses: INGRID_RESIDENTIAL_LIST_FIXTURE,
      };
      jest.spyOn(service, 'update').mockResolvedValue(bill);

      expect(
        await controller.update(USER_ENTITY_FIXTURE, bill.id, updateBill),
      ).toEqual(bill);
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

  describe('remove', () => {
    it('should remove a bill successfully', async () => {
      const bill: Bill = BILL_LIST_FIXTURE[0];
      jest
        .spyOn(service, 'remove')
        .mockResolvedValueOnce({ message: 'Successfully removed' });

      expect(await controller.remove(bill.id)).toEqual({
        message: 'Successfully removed',
      });
    });
  });

  describe('validateFinance', () => {
    it('should throw ConflictException when "user.finance" is undefined.', () => {
      const user: User = {
        ...USER_ENTITY_FIXTURE,
        finance: undefined,
      };

      expect(() => controller['validateFinance'](user)).toThrow(
        ConflictException,
      );
      expect(() => controller['validateFinance'](user)).toThrow(
        'Finance is not initialized, please start it to access this feature.',
      );
    });

    it('should not throw any exception when "user.finance" is set.', () => {
      const user: User = USER_ENTITY_FIXTURE;

      expect(() => controller['validateFinance'](user)).not.toThrow();
    });
  });
});
