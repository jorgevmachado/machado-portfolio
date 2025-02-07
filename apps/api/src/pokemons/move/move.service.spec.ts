import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Repository } from 'typeorm';

import { getRepositoryToken } from '@nestjs/typeorm';

import { ExternalPokemonService } from '@repo/business/pokemon/externalPokemonService';

import { BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE } from '@repo/mock/pokemon/fixtures/completes/index';

import { Move } from '../entities/move.entity';

import { MoveService } from './move.service';

describe('MoveService', () => {
  let service: MoveService;
  let repository: Repository<Move>;
  let business: ExternalPokemonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoveService,
        { provide: getRepositoryToken(Move), useClass: Repository },
        {
          provide: ExternalPokemonService,
          useValue: {
            buildMove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MoveService>(MoveService);
    repository = module.get<Repository<Move>>(getRepositoryToken(Move));
    business = module.get<ExternalPokemonService>(ExternalPokemonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(business).toBeDefined();
  });

  describe('findList(responseMove)', () => {
    it('should return a list of Pokémon moves from the database', async () => {
      BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE.moves.forEach((move) => {
        jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
          andWhere: jest.fn(),
          getOne: jest.fn().mockReturnValueOnce(move),
        } as any);
      });

      expect(
        await service.findList(BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE.moves),
      ).toEqual(BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE.moves);
    });

    it('must save a list of pokemon moves in the database when none exist', async () => {
      BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE.moves.forEach(() => {
        jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
          andWhere: jest.fn(),
          getOne: jest.fn().mockReturnValueOnce(null),
        } as any);
      });

      BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE.moves.forEach((move) => {
        jest.spyOn(business, 'buildMove').mockResolvedValueOnce({
          ...move,
          ensureAttributes: jest.fn(),
          ensureOrder: jest.fn(),
        } as any);
      });

      BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE.moves.forEach((move) => {
        jest.spyOn(repository, 'save').mockResolvedValueOnce(move);
      });

      BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE.moves.forEach((move) => {
        jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
          andWhere: jest.fn(),
          getOne: jest.fn().mockReturnValueOnce(move),
        } as any);
      });

      expect(
        await service.findList(BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE.moves),
      ).toEqual(BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE.moves);
    });
  });
});