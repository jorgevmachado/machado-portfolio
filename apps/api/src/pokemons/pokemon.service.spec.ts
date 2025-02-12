import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { ExternalPokemonService } from '@repo/business/pokemon/externalPokemonService';

import {
  BULBASAUR_ENTITY_INCOMPLETE_POKEMON_FIXTURE,
  IVYSAUR_ENTITY_INCOMPLETE_POKEMON_FIXTURE,
  LIST_ENTITY_INCOMPLETE_POKEMON_FIXTURE,
  VENUSAUR_ENTITY_INCOMPLETE_POKEMON_FIXTURE,
} from '@repo/mock/pokemon/fixtures/incompletes/index';
import { BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE } from '@repo/mock/pokemon/fixtures/completes/index';

import { PokemonService } from './pokemon.service';
import { Pokemon } from './pokemon.entity';
import { PokemonTypeService } from './pokemon-type/pokemon-type.service';
import { PokemonMoveService } from './pokemon-move/pokemon-move.service';
import { PokemonAbilityService } from './pokemon-ability/pokemon-ability.service';

describe('PokemonService', () => {
  let service: PokemonService;
  let repository: Repository<Pokemon>;
  let typeService: PokemonTypeService;
  let moveService: PokemonMoveService;
  let abilityService: PokemonAbilityService;
  let business: ExternalPokemonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        { provide: getRepositoryToken(Pokemon), useClass: Repository },
        {
          provide: ExternalPokemonService,
          useValue: {
            limit: 1302,
            buildList: jest.fn(),
            completeOne: jest.fn(),
            getEvolutions: jest.fn(),
          },
        },
        {
          provide: PokemonTypeService,
          useValue: {
            findList: jest.fn(),
          },
        },
        {
          provide: PokemonMoveService,
          useValue: {
            findList: jest.fn(),
          },
        },
        {
          provide: PokemonAbilityService,
          useValue: {
            findList: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
    repository = module.get<Repository<Pokemon>>(getRepositoryToken(Pokemon));
    typeService = module.get<PokemonTypeService>(PokemonTypeService);
    moveService = module.get<PokemonMoveService>(PokemonMoveService);
    abilityService = module.get<PokemonAbilityService>(PokemonAbilityService);
    business = module.get<ExternalPokemonService>(ExternalPokemonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(typeService).toBeDefined();
    expect(moveService).toBeDefined();
    expect(abilityService).toBeDefined();
    expect(business).toBeDefined();
  });

  describe('findAll()', () => {
    it('Must return all pokemons from an external api since the database is empty', async () => {
      jest.spyOn(repository, 'count').mockResolvedValueOnce(0);

      jest
        .spyOn(business, 'buildList')
        .mockResolvedValueOnce(LIST_ENTITY_INCOMPLETE_POKEMON_FIXTURE);

      LIST_ENTITY_INCOMPLETE_POKEMON_FIXTURE.forEach((pokemon) => {
        jest.spyOn(repository, 'save').mockResolvedValueOnce(pokemon);
      });

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        orderBy: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getMany: jest
          .fn()
          .mockReturnValueOnce(LIST_ENTITY_INCOMPLETE_POKEMON_FIXTURE),
      } as any);

      expect(await service.findAll({})).toEqual(
        LIST_ENTITY_INCOMPLETE_POKEMON_FIXTURE,
      );
    });
    it('Must return error when the api failed', async () => {
      jest.spyOn(repository, 'count').mockResolvedValueOnce(0);

      jest
        .spyOn(business, 'buildList')
        .mockRejectedValueOnce(new Error('Internal Server Error'));

      const errorSpy = jest
        .spyOn(service as any, 'error')
        .mockImplementation((err) => {
          throw err;
        });

      await expect(service.findAll({})).rejects.toThrow(
        'Internal Server Error',
      );
      expect(errorSpy).toHaveBeenCalledWith(new Error('Internal Server Error'));
    });
  });

  describe('findOne(value)', () => {
    it('must return a complete pokemon from the database', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest
          .fn()
          .mockReturnValueOnce(BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE),
      } as any);
      expect(
        await service.findOne({ value: BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE.name }),
      ).toEqual(BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE);
    });
    it('must return a incomplete pokemon from the database', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest
          .fn()
          .mockReturnValueOnce(BULBASAUR_ENTITY_INCOMPLETE_POKEMON_FIXTURE),
      } as any);
      expect(
        await service.findOnePokemon(
          BULBASAUR_ENTITY_INCOMPLETE_POKEMON_FIXTURE.id,
          false,
        ),
      ).toEqual(BULBASAUR_ENTITY_INCOMPLETE_POKEMON_FIXTURE);
    });
    it('must complete the data of a pokemon from the database through external api', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest
          .fn()
          .mockReturnValueOnce(BULBASAUR_ENTITY_INCOMPLETE_POKEMON_FIXTURE),
      } as any);

      jest
        .spyOn(business, 'completeOne')
        .mockResolvedValueOnce(BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE);

      jest
        .spyOn(moveService, 'findList')
        .mockResolvedValueOnce(BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE.moves);

      jest
        .spyOn(typeService, 'findList')
        .mockResolvedValueOnce(BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE.types);

      jest
        .spyOn(abilityService, 'findList')
        .mockResolvedValueOnce(
          BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE.abilities,
        );

      jest
        .spyOn(business, 'getEvolutions')
        .mockResolvedValueOnce(
          BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE.evolutions.map(
            (evolution) => evolution.name,
          ),
        );

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest
          .fn()
          .mockReturnValueOnce(BULBASAUR_ENTITY_INCOMPLETE_POKEMON_FIXTURE),
      } as any);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest
          .fn()
          .mockReturnValueOnce(IVYSAUR_ENTITY_INCOMPLETE_POKEMON_FIXTURE),
      } as any);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest
          .fn()
          .mockReturnValueOnce(VENUSAUR_ENTITY_INCOMPLETE_POKEMON_FIXTURE),
      } as any);

      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest
          .fn()
          .mockReturnValueOnce(BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE),
      } as any);

      expect(
        await service.findOnePokemon(BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE.name),
      ).toEqual(BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE);
    });
  });
});