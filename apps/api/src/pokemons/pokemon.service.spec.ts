import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { PokemonExternalBusiness } from '@repo/business/pokemon/external/pokemonExternalBusiness';
import { ExternalPokemonService } from '@repo/business/pokemonNew/externalPokemonService';

import { LIST_ENTITY_INCOMPLETE_POKEMON_FIXTURE } from '@repo/mock/pokemon/fixtures';

import { PokemonService } from './pokemon.service';
import { Pokemon } from './entities/pokemon.entity';
import { TypeService } from './type/type.service';
import { MoveService } from './move/move.service';
import { AbilityService } from './ability/ability.service';

describe('PokemonService', () => {
  let service: PokemonService;
  let repository: Repository<Pokemon>;
  let typeService: TypeService;
  let moveService: MoveService;
  let abilityService: AbilityService;
  let businessExternal: PokemonExternalBusiness;
  let business: ExternalPokemonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        { provide: getRepositoryToken(Pokemon), useClass: Repository },
        {
          provide: PokemonExternalBusiness,
          useValue: {
            limit: 1302,
            getOne: jest.fn(),
            getEvolutions: jest.fn(),
          },
        },
        {
          provide: ExternalPokemonService,
          useValue: {
            limit: 1302,
            BuildList: jest.fn(),
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
    business = module.get<ExternalPokemonService>(ExternalPokemonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(typeService).toBeDefined();
    expect(moveService).toBeDefined();
    expect(abilityService).toBeDefined();
    expect(businessExternal).toBeDefined();
    expect(business).toBeDefined();
  });

  describe('findAll()', () => {
    it('Must return all pokemons from an external api since the database is empty', async () => {
      jest.spyOn(repository, 'count').mockResolvedValueOnce(0);

      jest
        .spyOn(business, 'BuildList')
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
  });
});