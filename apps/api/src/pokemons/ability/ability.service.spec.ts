import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import {
  ABILITY_ENTITY_CHLOROPHYLL_FIXTURE,
  ABILITY_ENTITY_LIST_FIXTURE,
  ABILITY_ENTITY_OVERGROW_FIXTURE,
} from '@repo/business/pokemon/modules/ability/fixture';

import { Ability } from '../entities/ability.entity';

import { AbilityService } from './ability.service';

describe('TypeService', () => {
  let service: AbilityService;
  let repository: Repository<Ability>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AbilityService,
        { provide: getRepositoryToken(Ability), useClass: Repository },
      ],
    }).compile();

    service = module.get<AbilityService>(AbilityService);
    repository = module.get<Repository<Ability>>(getRepositoryToken(Ability));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('findList(entityType)', () => {
    it('should return a list of Pokémon types from the database', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(ABILITY_ENTITY_OVERGROW_FIXTURE),
      } as any);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        getOne: jest
          .fn()
          .mockReturnValueOnce(ABILITY_ENTITY_CHLOROPHYLL_FIXTURE),
      } as any);

      expect(await service.findList(ABILITY_ENTITY_LIST_FIXTURE)).toEqual(
        ABILITY_ENTITY_LIST_FIXTURE,
      );
    });

    it('must save a list of pokemon types in the database when none exist', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(null),
      } as any);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(null),
      } as any);

      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(ABILITY_ENTITY_OVERGROW_FIXTURE);

      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(ABILITY_ENTITY_CHLOROPHYLL_FIXTURE);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(ABILITY_ENTITY_OVERGROW_FIXTURE),
      } as any);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        getOne: jest
          .fn()
          .mockReturnValueOnce(ABILITY_ENTITY_CHLOROPHYLL_FIXTURE),
      } as any);

      expect(await service.findList(ABILITY_ENTITY_LIST_FIXTURE)).toEqual(
        ABILITY_ENTITY_LIST_FIXTURE,
      );
    });
  });
});
