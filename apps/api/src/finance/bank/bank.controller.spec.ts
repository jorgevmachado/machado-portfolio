import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import {
  BANK_LIST_FIXTURE,
  CAIXA_BANK_FIXTURE,
} from '@repo/business/finance/bank/fixtures/bank';

import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

import { Bank } from './bank.entity';
import { BankService } from './bank.service';
import { BankController } from './bank.controller';

describe('BankController', () => {
  let service: BankService;
  let controller: BankController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankController],
      providers: [
        {
          provide: BankService,
          useValue: {
            seed: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BankService>(BankService);
    controller = module.get<BankController>(BankController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('Should return an list of bank type', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(BANK_LIST_FIXTURE);

      expect(await controller.findAll({})).toEqual(BANK_LIST_FIXTURE);
    });
  });

  describe('create', () => {
    it('should create a new bank and save it', async () => {
      const createDto: CreateBankDto = {
        name: CAIXA_BANK_FIXTURE.name,
      };

      jest.spyOn(service, 'create').mockResolvedValueOnce(CAIXA_BANK_FIXTURE);

      expect(await controller.create(createDto)).toEqual(CAIXA_BANK_FIXTURE);
    });
  });

  describe('findOne', () => {
    it('Should return  bank type', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(CAIXA_BANK_FIXTURE);

      expect(await controller.findOne(CAIXA_BANK_FIXTURE.name)).toEqual(
        CAIXA_BANK_FIXTURE,
      );
    });
  });

  describe('update', () => {
    it('should update a supplierType and save it', async () => {
      const updateDto: UpdateBankDto = {
        name: `${CAIXA_BANK_FIXTURE.name}2`,
      };

      const expected: Bank = {
        ...CAIXA_BANK_FIXTURE,
        ...updateDto,
      };

      jest.spyOn(service, 'update').mockResolvedValueOnce(expected);

      expect(await controller.update(CAIXA_BANK_FIXTURE.id, updateDto)).toEqual(
        expected,
      );
    });
  });

  describe('remove', () => {
    it('should remove SupplierType when there are no associated bank', async () => {
      jest
        .spyOn(service, 'remove')
        .mockResolvedValueOnce({ message: 'Successfully removed' });

      expect(await controller.remove(CAIXA_BANK_FIXTURE.id)).toEqual({
        message: 'Successfully removed',
      });
    });
  });
});
