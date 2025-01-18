import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Repository } from 'typeorm';

import { getRepositoryToken } from '@nestjs/typeorm';

import { PokemonExternalBusiness } from '@repo/business/pokemon/external/pokemonExternalBusiness';

import {
  MOVE_ENTITY_CUT_FIXTURE,
  MOVE_ENTITY_LIST_FIXTURE,
  MOVE_ENTITY_RAZOR_WIND_FIXTURE,
  MOVE_ENTITY_SWORDS_DANCE_FIXTURE,
} from '@repo/business/pokemon/modules/move/fixture';

import { Move } from '../entities/move.entity';

import { MoveService } from './move.service';

describe('MoveService', () => {
  let service: MoveService;
  let repository: Repository<Move>;
  let businessExternal: PokemonExternalBusiness;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoveService,
        { provide: getRepositoryToken(Move), useClass: Repository },
        {
          provide: PokemonExternalBusiness,
          useValue: {
            getMove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MoveService>(MoveService);
    repository = module.get<Repository<Move>>(getRepositoryToken(Move));
    businessExternal = module.get<PokemonExternalBusiness>(
      PokemonExternalBusiness,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(businessExternal).toBeDefined();
  });

  describe('findList(responseMove)', () => {
    it('should return a list of Pokémon moves from the database', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(MOVE_ENTITY_RAZOR_WIND_FIXTURE),
      } as any);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(MOVE_ENTITY_SWORDS_DANCE_FIXTURE),
      } as any);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(MOVE_ENTITY_CUT_FIXTURE),
      } as any);

      expect(await service.findList(MOVE_ENTITY_LIST_FIXTURE)).toEqual(
        MOVE_ENTITY_LIST_FIXTURE,
      );
    });

    it('must save a list of pokemon moves in the database when none exist', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(null),
      } as any);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(null),
      } as any);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(null),
      } as any);

      jest
        .spyOn(businessExternal, 'getMove')
        .mockResolvedValueOnce(MOVE_ENTITY_RAZOR_WIND_FIXTURE);

      jest
        .spyOn(businessExternal, 'getMove')
        .mockResolvedValueOnce(MOVE_ENTITY_SWORDS_DANCE_FIXTURE);

      jest
        .spyOn(businessExternal, 'getMove')
        .mockResolvedValueOnce(MOVE_ENTITY_CUT_FIXTURE);

      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(MOVE_ENTITY_RAZOR_WIND_FIXTURE);

      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(MOVE_ENTITY_SWORDS_DANCE_FIXTURE);

      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(MOVE_ENTITY_CUT_FIXTURE);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(MOVE_ENTITY_RAZOR_WIND_FIXTURE),
      } as any);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(MOVE_ENTITY_SWORDS_DANCE_FIXTURE),
      } as any);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(MOVE_ENTITY_CUT_FIXTURE),
      } as any);

      expect(await service.findList(MOVE_ENTITY_LIST_FIXTURE)).toEqual(
        MOVE_ENTITY_LIST_FIXTURE,
      );
    });
  });
});
