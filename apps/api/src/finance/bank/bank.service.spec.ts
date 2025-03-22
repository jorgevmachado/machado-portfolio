import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Repository } from 'typeorm';

import {
  BANK_LIST_FIXTURE,
  CAIXA_BANK_FIXTURE,
} from '@repo/business/finance/bank/fixtures/bank';

import { CreateBankDto } from './dto/create-bank.dto';

import { Bank } from './bank.entity';
import { BankService } from './bank.service';
import { UpdateBankDto } from './dto/update-bank.dto';
import { ConflictException } from '@nestjs/common';

describe('BankService', () => {
  let repository: Repository<Bank>;
  let service: BankService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BankService,
        { provide: getRepositoryToken(Bank), useClass: Repository },
      ],
    }).compile();

    repository = module.get<Repository<Bank>>(getRepositoryToken(Bank));
    service = module.get<BankService>(BankService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('seed', () => {
    it('should seed the database when exist in database', async () => {
      jest.spyOn(repository, 'find').mockResolvedValueOnce(BANK_LIST_FIXTURE);

      expect(await service.seed()).toEqual(BANK_LIST_FIXTURE);
    });
    it('should seed the database when not exist in database', async () => {
      jest.spyOn(repository, 'find').mockResolvedValueOnce([]);

      BANK_LIST_FIXTURE.forEach((type) => {
        jest.spyOn(repository, 'save').mockResolvedValueOnce(type);
      });
      expect(await service.seed()).toEqual(BANK_LIST_FIXTURE);
    });
  });

  describe('create', () => {
    it('should create a new bank and save it', async () => {
      const createDto: CreateBankDto = {
        name: CAIXA_BANK_FIXTURE.name,
      };

      jest.spyOn(repository, 'save').mockResolvedValueOnce(CAIXA_BANK_FIXTURE);

      expect(await service.create(createDto)).toEqual(CAIXA_BANK_FIXTURE);
    });

    it('should return conflict exception when try to create a new bank', async () => {
      const createDto: CreateBankDto = {
        name: CAIXA_BANK_FIXTURE.name,
      };

      jest
        .spyOn(repository, 'save')
        .mockRejectedValueOnce(new ConflictException());

      await expect(service.create(createDto)).rejects.toThrowError(
        ConflictException,
      );
    });
  });

  describe('update', () => {
    it('should update a bank and save it', async () => {
      const updateDto: UpdateBankDto = {
        name: `${CAIXA_BANK_FIXTURE.name}2`,
      };

      const expected: Bank = {
        ...CAIXA_BANK_FIXTURE,
        ...updateDto,
      };

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(CAIXA_BANK_FIXTURE),
      } as any);

      jest.spyOn(repository, 'save').mockResolvedValueOnce(expected);

      expect(await service.update(CAIXA_BANK_FIXTURE.id, updateDto)).toEqual(
        expected,
      );
    });
  });

  describe('findAll', () => {
    it('Should return an list of banks', async () => {
      const expected: Array<Bank> = BANK_LIST_FIXTURE;
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getMany: jest.fn().mockReturnValueOnce(expected),
      } as any);

      expect(await service.findAll({})).toEqual(expected);
    });
  });

  describe('treatEntityParam', () => {
    it('should return a bank when receive object', async () => {
      const expected: Bank = BANK_LIST_FIXTURE[0];
      expect(await service.treatEntityParam(expected)).toEqual(expected);
    });
    it('should return a bank when receive string', async () => {
      const expected: Bank = BANK_LIST_FIXTURE[0];
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(expected),
      } as any);
      expect(await service.treatEntityParam(expected.name)).toEqual(expected);
    });
  });

  describe('treatEntitiesParams', () => {
    it('should return a list of bank when receive a list of banks', async () => {
      const expected: Array<Bank> = BANK_LIST_FIXTURE;
      expect(await service.treatEntitiesParams(expected)).toEqual(expected);
    });

    it('should return a list empty when receive undefined', async () => {
      expect(await service.treatEntitiesParams(undefined)).toEqual([]);
    });

    it('should return a list of bank when receive a list of string', async () => {
      const expected: Array<Bank> = BANK_LIST_FIXTURE;
      const received: Array<string> = expected.map((bank) => bank.name);
      expected.forEach((bank) => {
        jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
          andWhere: jest.fn(),
          withDeleted: jest.fn(),
          leftJoinAndSelect: jest.fn(),
          getOne: jest.fn().mockReturnValueOnce(bank),
        } as any);
      });

      expect(await service.treatEntitiesParams(received)).toEqual(expected);
    });
  });
});
