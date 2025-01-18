import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import { PokemonExternalBusiness } from '@repo/business/pokemon/external/pokemonExternalBusiness';

import {
  POKEMON_ENTITY_BASIC_BULBASAUR_FIXTURE,
  POKEMON_ENTITY_BASIC_IVYSAUR_FIXTURE,
  POKEMON_ENTITY_BASIC_LIST_FIXTURE,
  POKEMON_ENTITY_BASIC_VENUSAUR_FIXTURE,
  POKEMON_ENTITY_COMPLETE_BULBASAUR_FIXTURE,
} from '@repo/business/pokemon/modules/entity/fixture';
import { TYPE_ENTITY_LIST_FIXTURE } from '@repo/business/pokemon/modules/type/fixture';

import { Pokemon } from './entities/pokemon.entity';

import { AbilityService } from './ability/ability.service';
import { MoveService } from './move/move.service';
import { TypeService } from './type/type.service';

import { PokemonService } from './pokemon.service';

describe('PokemonsService', () => {
  let service: PokemonService;
  let repository: Repository<Pokemon>;
  let typeService: TypeService;
  let moveService: MoveService;
  let abilityService: AbilityService;
  let businessExternal: PokemonExternalBusiness;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        { provide: getRepositoryToken(Pokemon), useClass: Repository },
        {
          provide: PokemonExternalBusiness,
          useValue: {
            limit: 1302,
            getAll: jest.fn(),
            getOne: jest.fn(),
            getEvolutions: jest.fn(),
          },
        },
        {
          provide: TypeService,
          useValue: {
            findList: jest.fn(),
          },
        },
        {
          provide: MoveService,
          useValue: {
            findList: jest.fn(),
          },
        },
        {
          provide: AbilityService,
          useValue: {
            findList: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
    repository = module.get<Repository<Pokemon>>(getRepositoryToken(Pokemon));
    typeService = module.get<TypeService>(TypeService);
    moveService = module.get<MoveService>(MoveService);
    abilityService = module.get<AbilityService>(AbilityService);
    businessExternal = module.get<PokemonExternalBusiness>(
      PokemonExternalBusiness,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(typeService).toBeDefined();
    expect(moveService).toBeDefined();
    expect(abilityService).toBeDefined();
    expect(businessExternal).toBeDefined();
  });

  describe('findAll()', () => {
    it('Must return all pokemons from an external api since the database is empty', async () => {
      jest.spyOn(repository, 'count').mockResolvedValueOnce(0);

      jest
        .spyOn(businessExternal, 'getAll')
        .mockResolvedValueOnce(POKEMON_ENTITY_BASIC_LIST_FIXTURE);

      POKEMON_ENTITY_BASIC_LIST_FIXTURE.forEach((pokemon) => {
        jest.spyOn(repository, 'save').mockResolvedValueOnce(pokemon);
      });

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        orderBy: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getMany: jest
          .fn()
          .mockReturnValueOnce(POKEMON_ENTITY_BASIC_LIST_FIXTURE),
      } as any);

      expect(await service.findAll({})).toEqual(
        POKEMON_ENTITY_BASIC_LIST_FIXTURE,
      );
    });

    it('Must return all pokemons saving the difference between the external api and the database', async () => {
      jest.spyOn(repository, 'count').mockResolvedValueOnce(1301);

      jest
        .spyOn(businessExternal, 'getAll')
        .mockResolvedValueOnce(POKEMON_ENTITY_BASIC_LIST_FIXTURE);

      jest
        .spyOn(repository, 'find')
        .mockResolvedValueOnce([
          POKEMON_ENTITY_BASIC_IVYSAUR_FIXTURE,
          POKEMON_ENTITY_BASIC_VENUSAUR_FIXTURE,
        ]);

      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(POKEMON_ENTITY_BASIC_BULBASAUR_FIXTURE);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        orderBy: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getMany: jest
          .fn()
          .mockReturnValueOnce(POKEMON_ENTITY_BASIC_LIST_FIXTURE),
      } as any);

      expect(await service.findAll({})).toEqual(
        POKEMON_ENTITY_BASIC_LIST_FIXTURE,
      );
    });

    it('should return all pokemons from the database', async () => {
      jest.spyOn(repository, 'count').mockResolvedValueOnce(1302);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        orderBy: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getMany: jest
          .fn()
          .mockReturnValueOnce(POKEMON_ENTITY_BASIC_LIST_FIXTURE),
      } as any);

      expect(await service.findAll({})).toEqual(
        POKEMON_ENTITY_BASIC_LIST_FIXTURE,
      );
    });
  });

  describe('findOne(value)', () => {
    it('must return a complete pokemon from the database', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest
          .fn()
          .mockReturnValueOnce(POKEMON_ENTITY_COMPLETE_BULBASAUR_FIXTURE),
      } as any);

      expect(await service.findOne('bulbasaur')).toEqual(
        POKEMON_ENTITY_COMPLETE_BULBASAUR_FIXTURE,
      );
    });

    it('must return a pokemon from the database even if it is not in complete status', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest
          .fn()
          .mockReturnValueOnce(POKEMON_ENTITY_BASIC_BULBASAUR_FIXTURE),
      } as any);

      expect(await service.findOne('bulbasaur', false)).toEqual(
        POKEMON_ENTITY_BASIC_BULBASAUR_FIXTURE,
      );
    });

    it('must complete the data of a pokemon from the database through external api', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest
          .fn()
          .mockReturnValueOnce(POKEMON_ENTITY_BASIC_BULBASAUR_FIXTURE),
      } as any);

      jest
        .spyOn(businessExternal, 'getOne')
        .mockResolvedValueOnce(POKEMON_ENTITY_COMPLETE_BULBASAUR_FIXTURE);

      jest
        .spyOn(typeService, 'findList')
        .mockResolvedValueOnce(TYPE_ENTITY_LIST_FIXTURE);

      jest
        .spyOn(businessExternal, 'getEvolutions')
        .mockResolvedValueOnce(['bulbasaur', 'ivysaur', 'venusaur']);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest
          .fn()
          .mockReturnValueOnce(POKEMON_ENTITY_BASIC_BULBASAUR_FIXTURE),
      } as any);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest
          .fn()
          .mockReturnValueOnce(POKEMON_ENTITY_BASIC_IVYSAUR_FIXTURE),
      } as any);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest
          .fn()
          .mockReturnValueOnce(POKEMON_ENTITY_BASIC_VENUSAUR_FIXTURE),
      } as any);

      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(POKEMON_ENTITY_COMPLETE_BULBASAUR_FIXTURE);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest
          .fn()
          .mockReturnValueOnce(POKEMON_ENTITY_COMPLETE_BULBASAUR_FIXTURE),
      } as any);

      expect(await service.findOne('bulbasaur')).toEqual(
        POKEMON_ENTITY_COMPLETE_BULBASAUR_FIXTURE,
      );
    });
  });
});
